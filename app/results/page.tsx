"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import AIChatbot from "@/components/ai-chatbot"

export default function ResultsPage() {
  const [userName, setUserName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [score, setScore] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [smsSent, setSmsSent] = useState(false)
  const router = useRouter()

  // Add this function to show what SMS sending would look like
  const sendSmsWithResults = async (phoneNumber: string, score: number, total: number, passed: boolean) => {
    if (!phoneNumber || smsSent) return

    try {
      console.log("Sending SMS to:", phoneNumber)
      console.log("Message:", `Sangwa Test Hub: ${passed ? "Watsinze" : "Watsinzwe"} n'amanota ${score}/${total}`)
      setSmsSent(true)
    } catch (error) {
      console.error("Error sending SMS:", error)
    }
  }

  useEffect(() => {
    // Get user information from session storage
    const storedUserName = sessionStorage.getItem("userName")
    const storedPhoneNumber = sessionStorage.getItem("userPhoneNumber")

    if (!storedUserName) {
      router.push("/")
      return
    }

    setUserName(storedUserName)
    setPhoneNumber(storedPhoneNumber || "")

    const answers = JSON.parse(sessionStorage.getItem("selectedAnswers") || "[]")
    const examQuestions = JSON.parse(sessionStorage.getItem("examQuestions") || "[]")

    setSelectedAnswers(answers)
    setQuestions(examQuestions)

    // Calculate score
    let correctAnswers = 0
    answers.forEach((answer: any, index: number) => {
      if (answer === examQuestions[index]?.correctAnswer) {
        correctAnswers++
      }
    })

    setScore(correctAnswers)
    setLoading(false)

    // Send SMS with results
    sendSmsWithResults(storedPhoneNumber, correctAnswers, examQuestions.length, correctAnswers >= 12)
  }, [router])

  const passed = score >= 12 // 60% passing score

  const handleGoHome = () => {
    // Clear all session data
    sessionStorage.clear()
    // Redirect to home page
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A192F] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Gutegereza...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A192F] text-white">
      <header className="bg-[#0A192F] border-b border-gray-700 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Design_a_vibrant_modern_3D_logo_for_Sangwa_3.jpg-8qNi0znRpwzEQv4sfCZ16nvu7K2orD.jpeg"
                alt="Sangwa Test Hub Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-xl font-bold">Sangwa Test Hub - Ikizamini cyo Gutwara Ibinyabiziga</h1>
          </div>
          <div className="text-sm">
            <span className="font-medium">Umukozi:</span> {userName}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8 bg-white text-gray-800">
            <CardHeader className={`text-white ${passed ? "bg-green-600" : "bg-red-600"}`}>
              <CardTitle className="text-center text-2xl">{passed ? "Watsinze!" : "Watsinzwe"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">
                  {score} / {questions.length}
                </div>
                <p className="text-lg text-gray-600">Amanota yawe: {((score / questions.length) * 100).toFixed(0)}%</p>
                <p className="mt-4">
                  {passed
                    ? "Wishimiye ikizamini cyo gutwara ibinyabiziga. Ushobora gukomeza ugatanga ibindi byangombwa bisabwa."
                    : "Ntabwo wishimiye ikizamini. Ugomba kugira nibura 60% kugira ngo utsinde."}
                </p>
              </div>

              {/* SMS status */}
              <div className="mt-4 text-center text-sm">
                {phoneNumber && (
                  <p className="text-gray-600">
                    {smsSent ? `Ubutumwa bwoherejwe kuri ${phoneNumber}` : `Numero ya telefoni: ${phoneNumber}`}
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleGoHome}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Home className="mr-2 w-5 h-5" />
                  Subira ku Ntangiriro
                </Button>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mb-4 text-white">Ibisubizo Byawe</h2>

          {questions.map((question: any, index: number) => (
            <Card key={index} className="mb-4 bg-white text-gray-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  )}

                  <div>
                    <h3 className="font-medium mb-2">
                      Ikibazo {index + 1}: {question.question}
                    </h3>

                    {question.image && (
                      <div className="mb-4 mt-2">
                        <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                          <img
                            src={question.image || "/placeholder.svg"}
                            alt="Ishusho y'ikibazo"
                            className="rounded-lg max-h-48 max-w-full h-auto"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                              e.currentTarget.onerror = null
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="pl-4 border-l-2 border-gray-200">
                      <p className="mb-1">
                        <span className="font-medium">Igisubizo cyawe:</span>{" "}
                        <span
                          className={
                            selectedAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"
                          }
                        >
                          {selectedAnswers[index] || "Nta gisubizo"}
                        </span>
                      </p>

                      {selectedAnswers[index] !== question.correctAnswer && (
                        <p className="text-green-600">
                          <span className="font-medium">Igisubizo nyacyo:</span> {question.correctAnswer}
                        </p>
                      )}

                      {question.explanation && (
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Ibisobanuro:</span> {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-[#0A192F] border-t border-gray-700 py-4 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Sangwa Test Hub. Uburenganzira bwose bwihariwe.</p>
          <p className="text-sm mt-1">Developed by Sangwa Bruce | +250794290803</p>
        </div>
      </footer>

      {/* AI Chatbot - Always visible */}
      <AIChatbot />
    </div>
  )
}
