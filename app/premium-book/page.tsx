"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Download, ArrowLeft, Star, Crown, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { premiumQuestions } from "@/data/premium-questions"

export default function PremiumBookPage() {
  const router = useRouter()
  const [isPremium, setIsPremium] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Check if user is premium
    const premiumStatus = sessionStorage.getItem("isPremium")
    const storedUserName = sessionStorage.getItem("userName")

    if (premiumStatus !== "true") {
      router.push("/welcome")
      return
    }

    setIsPremium(true)
    setUserName(storedUserName || "")
  }, [router])

  const downloadBook = () => {
    const bookContent = generateBookContent()

    // Create a proper text file with UTF-8 encoding
    const blob = new Blob([bookContent], {
      type: "text/plain;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Ibibazo-Bikunze-Kubazwa-Ikizamini-cyo-Gutwara.txt"
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show success message
    alert("✅ Igitabo cyakuruwe neza!\n\nReba mu byo wakuruye kuri telefoni yawe.")
  }

  const generateBookContent = () => {
    const content = `
IBIBAZO BIKUNZE KUBAZWA MU KIZAMINI CYO GUTWARA IBINYABIZIGA
================================================================

Yakozwe na: Sangwa Bruce Developer
Telefoni: +250794290803
Itariki: ${new Date().toLocaleDateString()}
Umukoresha: ${userName}
Sisitemu: Version 3.1

================================================================
INTANGIRIRO
================================================================

Iki gitabo gikubiyemo ibibazo 20 bikunze kubazwa cyane mu bizamini bya RNP
byo gutwara ibinyabiziga. Ibi bibazo byatoranijwe ukurikije uko bikunze
kubazwa mu bizamini byabereye.

IBICE BY'IBIBAZO:
- Ibibazo bikunze kubazwa cyane (Very High): 7 ibibazo
- Ibibazo bikunze kubazwa (High): 6 ibibazo  
- Ibibazo bikunze kubazwa gake (Medium): 7 ibibazo

================================================================
IBIBAZO BIKUNZE KUBAZWA CYANE (VERY HIGH FREQUENCY)
================================================================

${premiumQuestions
  .filter((q) => q.frequency === "Very High")
  .map(
    (q, index) => `
${index + 1}. ${q.question}

   a) ${q.options[0]}
   b) ${q.options[1]}
   c) ${q.options[2]}
   d) ${q.options[3]}

   IGISUBIZO NYACYO: ${String.fromCharCode(97 + q.correctAnswer)}) ${q.options[q.correctAnswer]}
   
   ISOBANURO: ${q.explanation}
   
   ICYICIRO: ${q.category}
   
   ================================================================
`,
  )
  .join("")}

================================================================
IBIBAZO BIKUNZE KUBAZWA (HIGH FREQUENCY)
================================================================

${premiumQuestions
  .filter((q) => q.frequency === "High")
  .map(
    (q, index) => `
${index + 1}. ${q.question}

   a) ${q.options[0]}
   b) ${q.options[1]}
   c) ${q.options[2]}
   d) ${q.options[3]}

   IGISUBIZO NYACYO: ${String.fromCharCode(97 + q.correctAnswer)}) ${q.options[q.correctAnswer]}
   
   ISOBANURO: ${q.explanation}
   
   ICYICIRO: ${q.category}
   
   ================================================================
`,
  )
  .join("")}

================================================================
IBIBAZO BIKUNZE KUBAZWA GAKE (MEDIUM FREQUENCY)
================================================================

${premiumQuestions
  .filter((q) => q.frequency === "Medium")
  .map(
    (q, index) => `
${index + 1}. ${q.question}

   a) ${q.options[0]}
   b) ${q.options[1]}
   c) ${q.options[2]}
   d) ${q.options[3]}

   IGISUBIZO NYACYO: ${String.fromCharCode(97 + q.correctAnswer)}) ${q.options[q.correctAnswer]}
   
   ISOBANURO: ${q.explanation}
   
   ICYICIRO: ${q.category}
   
   ================================================================
`,
  )
  .join("")}

================================================================
AMABWIRIZA YO KWIGA
================================================================

1. SOMA NEZA: Soma buri kibazo n'ibisubizo byacyo neza mbere yo guhitamo.

2. MENYA ISOBANURO: Ntugire ubwoba gusoma isobanuro ry'igisubizo nyacyo.

3. SUBIRAMO: Subiramo ibibazo byinshi kugira ngo wiyongere ubumenyi.

4. KORESHA MU BUZIMA: Gerageza gukoresha ibyo wize mu buzima bwawe bwa buri munsi.

5. TEGURA IKIZAMINI: Koresha ibi bibazo nk'uburyo bwo kwitegura ikizamini cya nyacyo.

================================================================
AMAKURU Y'INYONGERA
================================================================

- Ibi bibazo byatoranijwe mu bibazo 433 byose biri mu gitabo cy'amategeko
- Byose bikurikiza amategeko y'umuhanda yo mu Rwanda ya 2024
- Byemejwe na RNP (Rwanda National Police)
- Byakoreshejwe n'amashuri menshi yo kwiga gutwara

================================================================
UBUFASHA
================================================================

Ugize ikibazo cyangwa ukeneye ubufasha:
- Hamagara: +250794290803
- Ubwoba: Sangwa Bruce Developer
- Sisitemu: Ikizamini cyo Gutwara Ibinyabiziga

Urakoze gukoresha sisitemu yacu!

================================================================
IMPERA
================================================================

Ibi bibazo bigamije gufasha abanyeshuri kwiga neza amategeko y'umuhanda
kandi bitegura ikizamini cya nyacyo cya RNP. Ntabwo ari ikizamini cya
nyacyo, ariko ni uburyo bwiza bwo kwitegura.

BYIBUKE: Ikizamini cya nyacyo gikozwe na RNP gusa!

© ${new Date().getFullYear()} Sangwa Bruce Developer. Uburenganzira bwose bwihariwe.
`
    return content
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Very High":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case "Very High":
        return <AlertTriangle className="h-4 w-4" />
      case "High":
        return <Star className="h-4 w-4" />
      case "Medium":
        return <Info className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  if (!isPremium) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A192F] text-white">
      <header className="bg-[#0A192F] border-b border-gray-700 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Design_a_vibrant_modern_3D_logo_for_Sangwa_3.jpg-8qNi0znRpwzEQv4sfCZ16nvu7K2orD.jpeg"
                alt="Sangwa Logo"
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Ibibazo Bikunze Kubazwa</h1>
              <p className="text-sm text-gray-300">Premium Content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-600 px-3 py-1 rounded-full text-sm">
              <Crown className="h-4 w-4" />
              Premium Member
            </div>
            <Button onClick={() => router.push("/welcome")} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Subira
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <Card className="bg-white text-gray-800">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-white flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Ibibazo Bikunze Kubazwa</CardTitle>
              <p className="text-purple-100 mt-2">20 Ibibazo Bikunze Kubazwa Cyane mu Bizamini bya RNP</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">7</div>
                  <div className="text-sm text-gray-600">Bikunze Kubazwa Cyane</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">6</div>
                  <div className="text-sm text-gray-600">Bikunze Kubazwa</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Info className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">7</div>
                  <div className="text-sm text-gray-600">Bikunze Kubazwa Gake</div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={downloadBook} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Kuramo Igitabo (Text File)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Questions Tabs */}
          <Card className="bg-white text-gray-800">
            <CardContent className="p-6">
              <Tabs defaultValue="very-high" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="very-high" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Cyane (7)
                  </TabsTrigger>
                  <TabsTrigger value="high" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Byinshi (6)
                  </TabsTrigger>
                  <TabsTrigger value="medium" className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Gake (7)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="very-high" className="mt-6">
                  <div className="space-y-6">
                    {premiumQuestions
                      .filter((q) => q.frequency === "Very High")
                      .map((question, index) => (
                        <Card key={question.id} className="border border-red-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg">
                                {index + 1}. {question.question}
                              </CardTitle>
                              <Badge className={getFrequencyColor(question.frequency)}>
                                {getFrequencyIcon(question.frequency)}
                                <span className="ml-1">{question.frequency}</span>
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="grid gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-3 rounded border ${
                                      optIndex === question.correctAnswer
                                        ? "bg-green-50 border-green-300 text-green-800"
                                        : "bg-gray-50 border-gray-200"
                                    }`}
                                  >
                                    <span className="font-medium">{String.fromCharCode(97 + optIndex)})</span> {option}
                                    {optIndex === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600 inline ml-2" />
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-2">Isobanuro:</h4>
                                <p className="text-blue-700 text-sm">{question.explanation}</p>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium">Icyiciro:</span>
                                <Badge variant="outline">{question.category}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="high" className="mt-6">
                  <div className="space-y-6">
                    {premiumQuestions
                      .filter((q) => q.frequency === "High")
                      .map((question, index) => (
                        <Card key={question.id} className="border border-orange-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg">
                                {index + 1}. {question.question}
                              </CardTitle>
                              <Badge className={getFrequencyColor(question.frequency)}>
                                {getFrequencyIcon(question.frequency)}
                                <span className="ml-1">{question.frequency}</span>
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="grid gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-3 rounded border ${
                                      optIndex === question.correctAnswer
                                        ? "bg-green-50 border-green-300 text-green-800"
                                        : "bg-gray-50 border-gray-200"
                                    }`}
                                  >
                                    <span className="font-medium">{String.fromCharCode(97 + optIndex)})</span> {option}
                                    {optIndex === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600 inline ml-2" />
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-2">Isobanuro:</h4>
                                <p className="text-blue-700 text-sm">{question.explanation}</p>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium">Icyiciro:</span>
                                <Badge variant="outline">{question.category}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="medium" className="mt-6">
                  <div className="space-y-6">
                    {premiumQuestions
                      .filter((q) => q.frequency === "Medium")
                      .map((question, index) => (
                        <Card key={question.id} className="border border-yellow-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg">
                                {index + 1}. {question.question}
                              </CardTitle>
                              <Badge className={getFrequencyColor(question.frequency)}>
                                {getFrequencyIcon(question.frequency)}
                                <span className="ml-1">{question.frequency}</span>
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="grid gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-3 rounded border ${
                                      optIndex === question.correctAnswer
                                        ? "bg-green-50 border-green-300 text-green-800"
                                        : "bg-gray-50 border-gray-200"
                                    }`}
                                  >
                                    <span className="font-medium">{String.fromCharCode(97 + optIndex)})</span> {option}
                                    {optIndex === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600 inline ml-2" />
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-2">Isobanuro:</h4>
                                <p className="text-blue-700 text-sm">{question.explanation}</p>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium">Icyiciro:</span>
                                <Badge variant="outline">{question.category}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-[#0A192F] border-t border-gray-700 py-4 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Premium Content - Ikizamini cyo Gutwara Ibinyabiziga</p>
          <p className="text-sm mt-1">Developed by Sangwa Bruce | +250794290803</p>
        </div>
      </footer>
    </div>
  )
}
