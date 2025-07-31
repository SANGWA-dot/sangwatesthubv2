"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Crown,
  LogOut,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Shield,
  Star,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import AIChatbot from "@/components/ai-chatbot"

export default function WelcomePage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [examAttempts, setExamAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName")
    const storedUserPhone = sessionStorage.getItem("userPhoneNumber")
    const storedUserLocation = sessionStorage.getItem("userLocation")

    if (!storedUserName || !storedUserPhone) {
      router.push("/")
      return
    }

    setUserName(storedUserName)
    setUserPhone(storedUserPhone)
    setUserLocation(storedUserLocation || "")

    // Check premium status and exam attempts
    checkUserStatus(storedUserPhone)
  }, [router])

  const checkUserStatus = (phoneNumber: string) => {
    try {
      // Check premium status
      const premiumUsers = JSON.parse(localStorage.getItem("premiumUsers") || "[]")
      const premiumUser = premiumUsers.find((user: any) => user.phoneNumber === phoneNumber && user.isPremium)

      if (premiumUser) {
        setIsPremium(true)
      }

      // Check exam attempts for free users
      if (!premiumUser) {
        const examHistory = JSON.parse(localStorage.getItem("examHistory") || "[]")
        const userAttempts = examHistory.filter((attempt: any) => attempt.phoneNumber === phoneNumber)
        setExamAttempts(userAttempts.length)
      }
    } catch (error) {
      console.error("Error checking user status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartExam = () => {
    if (!isPremium && examAttempts >= 2) {
      alert(
        "🚫 EXAM LIMIT REACHED!\n\n" +
          "You've completed 2 free practice exams.\n\n" +
          "Upgrade to Premium to:\n" +
          "• Take unlimited practice exams\n" +
          "• Access 1000+ premium questions\n" +
          "• Get detailed explanations\n" +
          "• Receive priority support\n\n" +
          "Contact Sangwa Bruce: +250 794 290 803",
      )
      return
    }
    router.push("/exam")
  }

  const handleLogout = () => {
    sessionStorage.clear()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sangwa Test Hub</h1>
                <p className="text-gray-400">Version 7.0 - Your Success Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  PREMIUM
                </Badge>
              )}
              <div className="text-right">
                <div className="text-white font-semibold">{userName}</div>
                <div className="text-gray-400 text-sm">{userLocation}</div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-400/50 text-red-400 hover:bg-red-400/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome back,</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {userName}!
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to continue your journey to driving success? Let's pick up where you left off.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{isPremium ? "∞" : `${2 - examAttempts}`}</div>
              <div className="text-gray-400 text-sm">Exams Left</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{isPremium ? "1000+" : "50"}</div>
              <div className="text-gray-400 text-sm">Questions</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl text-center hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">20</div>
              <div className="text-gray-400 text-sm">Minutes</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Start Exam Card */}
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-500/50 backdrop-blur-xl hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <Play className="w-6 h-6 text-white" />
                </div>
                Start Practice Exam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">20</div>
                  <div className="text-gray-400 text-sm">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">20</div>
                  <div className="text-gray-400 text-sm">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">60%</div>
                  <div className="text-gray-400 text-sm">To Pass</div>
                </div>
              </div>

              {!isPremium && (
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center text-orange-300 mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Free Plan Limit</span>
                  </div>
                  <p className="text-orange-200 text-sm">
                    You have {2 - examAttempts} practice exam{2 - examAttempts !== 1 ? "s" : ""} remaining. Upgrade to
                    Premium for unlimited access!
                  </p>
                </div>
              )}

              <Button
                onClick={handleStartExam}
                disabled={!isPremium && examAttempts >= 2}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isPremium && examAttempts >= 2 ? (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Upgrade to Continue
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Exam Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Premium/Upgrade Card */}
          <Card
            className={`backdrop-blur-xl hover:scale-105 transition-all duration-300 ${
              isPremium
                ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
                : "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${
                    isPremium
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  {isPremium ? <Crown className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
                </div>
                {isPremium ? "Premium Features" : "Upgrade to Premium"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isPremium ? (
                <>
                  <div className="space-y-3">
                    {[
                      "Unlimited practice exams",
                      "1000+ premium questions",
                      "Detailed explanations",
                      "Priority support",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-200">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => router.push("/premium-book")}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Access Premium Content
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-white mb-2">2,000 RWF</div>
                    <div className="text-gray-400">One-time payment for lifetime access</div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Unlimited practice exams",
                      "1000+ premium questions",
                      "AI-powered learning",
                      "Detailed explanations",
                      "Priority support",
                      "Success guarantee",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-200">
                        <Star className="w-5 h-5 text-purple-400 mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => router.push("/payment")}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Shield className="w-8 h-8 mr-3 text-green-400" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Questions? Contact Sangwa Bruce directly at{" "}
                <span className="text-blue-400 font-semibold">+250 794 290 803</span>
              </p>
              <p className="text-gray-500 text-sm">Available 24/7 • Response within 1 hour • Expert guidance</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Sangwa Test Hub Version 7. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Developed by Sangwa Bruce | +250 794 290 803</p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
