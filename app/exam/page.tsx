"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { allQuestions } from "@/data/questions"
import { AlertCircle, Clock, Crown } from "lucide-react"

export default function ExamPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user information from session storage
    const storedUserName = sessionStorage.getItem("userName")
    const storedPhoneNumber = sessionStorage.getItem("userPhoneNumber")

    if (!storedUserName || !storedPhoneNumber) {
      router.push("/login")
      return
    }

    setUserName(storedUserName)
    setUserPhoneNumber(storedPhoneNumber)

    // Check premium status
    try {
      const premiumUsers = JSON.parse(localStorage.getItem("premiumUsers") || "[]")
      const premiumUser = premiumUsers.find(
        (user: any) =>
          user.phoneNumber === storedPhoneNumber && user.isPremium && new Date(user.subscriptionEnd) > new Date(),
      )

      if (premiumUser) {
        setIsPremium(true)
        sessionStorage.setItem("isPremium", "true")
      } else {
        setIsPremium(false)
        sessionStorage.setItem("isPremium", "false")

        // Check exam attempts for free users
        const examHistory = JSON.parse(localStorage.getItem("examHistory") || "[]")
        const userAttempts = examHistory.filter((attempt: any) => attempt.phoneNumber === storedPhoneNumber)

        if (userAttempts.length >= 2) {
          alert(
            "🚫 IKIZAMINI KIRANGIYE!\n\n" +
              "Wakoze ikizamini inshuro 2 zemewe ku bakoresha b'ubusa.\n\n" +
              "Kugira ngo ukomeze gukora ibizamini:\n" +
              "• Kwishyura 2,000 RWF\n" +
              "• Ubone ubushobozi bwose bwa Premium\n" +
              "• Ukore ibizamini byinshi nta kiguzi\n\n" +
              "Hamagara: +250794290803",
          )
          router.push("/welcome")
          return
        }
      }
    } catch (error) {
      console.error("Error checking premium status:", error)
      setIsPremium(false)
    }

    // Load questions based on premium status
    loadQuestions()
  }, [router])

  const loadQuestions = () => {
    let availableQuestions = []

    if (isPremium) {
      // Premium users get all questions
      availableQuestions = [...allQuestions]
    } else {
      // Free users get limited questions (first 50)
      availableQuestions = allQuestions.slice(0, 50)
    }

    // Separate questions with images (road signs) and without images
    const questionsWithImages = availableQuestions.filter((q) => q.image)
    const questionsWithoutImages = availableQuestions.filter((q) => !q.image)

    // Shuffle both arrays
    const shuffledWithImages = [...questionsWithImages].sort(() => 0.5 - Math.random())
    const shuffledWithoutImages = [...questionsWithoutImages].sort(() => 0.5 - Math.random())

    // Take exactly 2 questions with images (ibyapa) and 18 without images
    const selectedWithImages = shuffledWithImages.slice(0, 2)
    const selectedWithoutImages = shuffledWithoutImages.slice(0, 18)

    // Combine and shuffle again for random order
    const combinedQuestions = [...selectedWithImages, ...selectedWithoutImages]
    const finalQuestions = combinedQuestions.sort(() => 0.5 - Math.random())

    setQuestions(finalQuestions)
    setSelectedAnswers(Array(20).fill(""))
    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          // Store answers in session storage
          sessionStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers))
          sessionStorage.setItem("examQuestions", JSON.stringify(questions))
          router.push("/results")
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLoading, questions, selectedAnswers, router])

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && selectedAnswers[currentQuestion]) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitExam = () => {
    // Check if all questions are answered
    if (selectedAnswers.some((answer) => !answer)) {
      alert("Ugomba gusubiza ibibazo byose mbere yo kurangiza ikizamini")
      return
    }

    // Store answers and questions in session storage
    sessionStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers))
    sessionStorage.setItem("examQuestions", JSON.stringify(questions))

    // Record exam attempt for free users
    if (!isPremium) {
      try {
        const examHistory = JSON.parse(localStorage.getItem("examHistory") || "[]")
        examHistory.push({
          phoneNumber: userPhoneNumber,
          timestamp: new Date().toISOString(),
          completed: true,
        })
        localStorage.setItem("examHistory", JSON.stringify(examHistory))
      } catch (error) {
        console.error("Error recording exam attempt:", error)
      }
    }

    router.push("/results")
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A192F] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Gutegura ikizamini...</p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="flex flex-col min-h-screen bg-[#0A192F] text-white">
      <header className="bg-[#0A192F] border-b border-gray-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Design_a_vibrant_modern_3D_logo_for_Sangwa_3.jpg-8qNi0znRpwzEQv4sfCZ16nvu7K2orD.jpeg"
                alt="Sangwa Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-xl font-bold">Ikizamini cyo Gutwara Ibinyabiziga</h1>
          </div>
          <div className="flex items-center gap-4">
            {isPremium && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1 rounded-full">
                <Crown className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Premium</span>
              </div>
            )}
            <div className="text-sm">
              <span className="font-medium">Umukandida:</span> {userName}
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-red-400" />
              <span className="font-mono text-md text-red-400">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Ikibazo {currentQuestion + 1} kuri {questions.length}
              </span>
              <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-6 bg-white text-gray-800">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">{question.question}</h2>

              {question.image && (
                <div className="mb-4 flex justify-center">
                  <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                    <img
                      src={question.image || "/placeholder.svg"}
                      alt="Ishusho y'ikibazo"
                      className="rounded-lg max-h-64 max-w-full h-auto"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                        e.currentTarget.onerror = null // Prevent infinite loop
                      }}
                    />
                  </div>
                </div>
              )}

              <RadioGroup
                value={selectedAnswers[currentQuestion]}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-3 rounded hover:bg-gray-50 border border-gray-200"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Gusubirinyuma
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={goToNextQuestion}
                className="bg-green-700 hover:bg-green-800"
                disabled={!selectedAnswers[currentQuestion]}
              >
                Ikibazo Gikurikira
              </Button>
            ) : (
              <Button onClick={submitExam} className="bg-green-700 hover:bg-green-800">
                Rangiza Ikizamini
              </Button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : selectedAnswers[index] ? "outline" : "ghost"}
                className={`h-10 w-10 ${
                  index === currentQuestion
                    ? "bg-green-700"
                    : selectedAnswers[index]
                      ? "border-green-700 text-green-700"
                      : "bg-gray-800 text-white"
                }`}
                onClick={() => {
                  // Only allow going to questions that have been answered or the current question
                  if (index <= currentQuestion || selectedAnswers[index]) {
                    setCurrentQuestion(index)
                  }
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {!selectedAnswers[currentQuestion] && (
            <div className="mt-4 flex items-center gap-2 text-amber-400">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">Hitamo igisubizo kimwe mbere yo gukomeza.</p>
            </div>
          )}

          {!isPremium && (
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-yellow-500">Serivisi Zinyongera</h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Ufite ibibazo 50 gusa. Kwishyura 2000 RWF ukabona ibibazo byose (433+) n'igitabo cy'amategeko.
              </p>
              <Button
                onClick={() => router.push("/payment")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                Kwishyura Serivisi Zinyongera
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#0A192F] border-t border-gray-700 py-4 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Ikizamini cyo Gutwara Ibinyabiziga. Uburenganzira bwose bwihariwe.</p>
          <p className="text-sm mt-1">Developed by Sangwa Bruce | +250794290803</p>
        </div>
      </footer>
    </div>
  )
}
