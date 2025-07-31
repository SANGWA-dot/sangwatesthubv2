"use client"

import type React from "react"
import Link from "next/link"
import { User, ArrowRightIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Car,
  BookOpen,
  Trophy,
  Users,
  Star,
  Shield,
  Target,
  Clock,
  Sparkles,
  Play,
  ChevronRight,
  Globe,
  Heart,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Languages,
} from "lucide-react"
import AIChatbot from "@/components/ai-chatbot"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    title: "Sangwa Test Hub",
    subtitle: "Rwanda's #1 Driving License Platform",
    heroTitle: "Master Your Driving License Exam",
    heroSubtitle:
      "Join over 50,000 successful drivers who passed their Rwanda driving license exam with our AI-powered learning platform. 95% success rate guaranteed!",
    startPractice: "Start Free Practice",
    viewPremium: "View Premium Content",
    signIn: "Sign In",
    getStarted: "Get Started",
    phoneNumber: "Phone Number",
    password: "Password",
    fullName: "Full Name",
    location: "Location",
    login: "Login",
    register: "Register",
    noAccount: "Don't have an account? Register",
    haveAccount: "Have an account? Sign In",
    loading: "Loading...",
    enterPhone: "Enter phone number",
    enterPassword: "Enter password",
    enterName: "Enter your full name",
    enterLocation: "Province/District/Sector",
    loginToAccount: "Sign In to Account",
    createAccount: "Create New Account",
    signInWithPhone: "Sign in with your phone number and password",
    createNewAccount: "Create a new account to get started",
  },
  rw: {
    title: "Sangwa Test Hub",
    subtitle: "Ikizamini cyo Gutwara Ibinyabiziga #1 mu Rwanda",
    heroTitle: "Tsinda Ikizamini cyo Gutwara Ibinyabiziga",
    heroSubtitle:
      "iyi ni system yakozwe na sangwa bruce kujyirango ifashe abantu bifuza gukorera provizwari 'uruhushya rwagateganyo rwo gutwara ibinyabiziga' ni ibibazo 20 ,ni iyi system igamije gufasha abantu kwihugura no kwiga",
    startPractice: "Tangira Kwiga Ubuntu",
    viewPremium: "Reba Ibicuruzwa bya Premium",
    signIn: "Injira",
    getStarted: "Tangira",
    phoneNumber: "Nimero ya Telefoni",
    password: "Ijambo ry'Ibanga",
    fullName: "Amazina Yose",
    location: "Ahantu Ubarizwa",
    login: "Injira",
    register: "Iyandikishe",
    noAccount: "Ntufite konti? Iyandikishe",
    haveAccount: "Ufite konti? Injira",
    loading: "Gutegereza...",
    enterPhone: "Andika nimero ya telefoni",
    enterPassword: "Andika ijambo ry'ibanga",
    enterName: "Andika amazina yawe yose",
    enterLocation: "Intara/Akarere/Umurenge",
    loginToAccount: "Injira mu Konti",
    createAccount: "Kora Konti Nshya",
    signInWithPhone: "Connectez-vous avec votre numéro de téléphone et mot de passe",
    createNewAccount: "Créez un nouveau compte pour commencer",
  },
  fr: {
    title: "Sangwa Test Hub",
    subtitle: "Plateforme #1 d'Examen de Permis de Conduire au Rwanda",
    heroTitle: "Maîtrisez Votre Examen de Permis de Conduire",
    heroSubtitle:
      "Rejoignez plus de 50 000 conducteurs qui ont réussi leur examen de permis de conduire au Rwanda avec notre plateforme d'apprentissage alimentée par l'IA. 95% de taux de réussite garanti!",
    startPractice: "Commencer la Pratique Gratuite",
    viewPremium: "Voir le Contenu Premium",
    signIn: "Se Connecter",
    getStarted: "Commencer",
    phoneNumber: "Numéro de Téléphone",
    password: "Mot de Passe",
    fullName: "Nom Complet",
    location: "Localisation",
    login: "Connexion",
    register: "S'inscrire",
    noAccount: "Pas de compte? S'inscrire",
    haveAccount: "Avez-vous un compte? Se connecter",
    loading: "Chargement...",
    enterPhone: "Entrez le numéro de téléphone",
    enterPassword: "Entrez le mot de passe",
    enterName: "Entrez votre nom complet",
    enterLocation: "Province/District/Secteur",
    loginToAccount: "Se Connecter au Compte",
    createAccount: "Créer un Nouveau Compte",
    signInWithPhone: "Connectez-vous avec votre numéro de téléphone et mot de passe",
    createNewAccount: "Créez un nouveau compte pour commencer",
  },
}

export default function HomePage() {
  const router = useRouter()
  const [language, setLanguage] = useState("rw")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Login form data
  const [loginData, setLoginData] = useState({
    phoneNumber: "",
    password: "",
  })

  // Registration form data
  const [registerData, setRegisterData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    password: "",
    confirmPassword: "",
  })

  const t = translations[language]

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")
    const isAdmin = sessionStorage.getItem("isAdmin")

    if (isLoggedIn && !isAdmin) {
      router.push("/welcome")
    } else if (isAdmin) {
      router.push("/admin-dashboard")
    }

    // Load saved language
    const savedLanguage = localStorage.getItem("selectedLanguage")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [router])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem("selectedLanguage", newLanguage)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!loginData.phoneNumber.trim() || !loginData.password.trim()) {
      setError(
        language === "en"
          ? "Please fill all fields"
          : language === "rw"
            ? "Uzuza amakuru yose"
            : "Veuillez remplir tous les champs",
      )
      setIsLoading(false)
      return
    }

    try {
      // Check for admin credentials
      if (loginData.phoneNumber === "0794290803" && loginData.password === "Sangwa@123") {
        // Admin login
        sessionStorage.setItem("isAdmin", "true")
        sessionStorage.setItem("adminName", "Sangwa Bruce")
        sessionStorage.setItem("adminPhone", "0794290803")
        sessionStorage.setItem("loginTime", new Date().toISOString())
        router.push("/admin-dashboard")
        return
      }

      // Regular user login
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const user = users.find((u: any) => u.phoneNumber === loginData.phoneNumber && u.password === loginData.password)

      if (user) {
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("userName", user.fullName)
        sessionStorage.setItem("userPhoneNumber", user.phoneNumber)
        sessionStorage.setItem("userLocation", user.location)
        sessionStorage.setItem("loginTime", new Date().toISOString())
        router.push("/welcome")
      } else {
        setError(
          language === "en"
            ? "Invalid phone number or password"
            : language === "rw"
              ? "Nimero ya telefoni cyangwa ijambo ry'ibanga si byo"
              : "Numéro de téléphone ou mot de passe invalide",
        )
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(
        language === "en"
          ? "An error occurred. Please try again."
          : language === "rw"
            ? "Habaye ikosa. Gerageza ukundi."
            : "Une erreur s'est produite. Veuillez réessayer.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (
      !registerData.fullName.trim() ||
      !registerData.phoneNumber.trim() ||
      !registerData.location.trim() ||
      !registerData.password.trim()
    ) {
      setError(
        language === "en"
          ? "Please fill all fields"
          : language === "rw"
            ? "Uzuza amakuru yose"
            : "Veuillez remplir tous les champs",
      )
      setIsLoading(false)
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError(
        language === "en"
          ? "Passwords don't match"
          : language === "rw"
            ? "Amagambo y'ibanga ntabwo ahura"
            : "Les mots de passe ne correspondent pas",
      )
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError(
        language === "en"
          ? "Password must be at least 6 characters"
          : language === "rw"
            ? "Ijambo ry'ibanga rigomba kuba rifite byibura inyuguti 6"
            : "Le mot de passe doit contenir au moins 6 caractères",
      )
      setIsLoading(false)
      return
    }

    try {
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      // Check if phone number already exists
      const existingUser = users.find((u: any) => u.phoneNumber === registerData.phoneNumber)
      if (existingUser) {
        setError(
          language === "en"
            ? "Phone number already registered"
            : language === "rw"
              ? "Iyi nimero ya telefoni isanzwe iyanditswe"
              : "Numéro de téléphone déjà enregistré",
        )
        setIsLoading(false)
        return
      }

      // Add new user
      const newUser = {
        fullName: registerData.fullName,
        phoneNumber: registerData.phoneNumber,
        location: registerData.location,
        password: registerData.password,
        registeredAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(users))

      setSuccess(
        language === "en"
          ? "✅ Registration successful! You can now sign in."
          : language === "rw"
            ? "✅ Kwiyandikisha byagenze neza! Ubu ushobora kwinjira."
            : "✅ Inscription réussie! Vous pouvez maintenant vous connecter.",
      )

      // Reset form
      setRegisterData({
        fullName: "",
        phoneNumber: "",
        location: "",
        password: "",
        confirmPassword: "",
      })

      // Switch to login after 2 seconds
      setTimeout(() => {
        setIsRegistering(false)
        setSuccess("")
      }, 2000)
    } catch (error) {
      console.error("Registration error:", error)
      setError(
        language === "en"
          ? "Registration failed. Please try again."
          : language === "rw"
            ? "Kwiyandikisha byanze. Gerageza ukundi."
            : "Échec de l'inscription. Veuillez réessayer.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-400">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <Languages className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rw">🇷🇼 Kinyarwanda</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">🇷🇼 Rwanda's Most Advanced Driving Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
                onClick={() => document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="mr-3 w-5 h-5 group-hover:animate-pulse" />
                {t.startPractice}
                <ArrowRightIcon className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 px-12 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/40 bg-transparent"
                onClick={() => router.push("/premium-book")}
              >
                <BookOpen className="mr-3 w-5 h-5" />
                {t.viewPremium}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Loved by 50K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login/Registration Section */}
      <section id="login-section" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto mb-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">
                {isRegistering ? t.createAccount : t.loginToAccount}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {isRegistering ? t.createNewAccount : t.signInWithPhone}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isRegistering ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      {t.phoneNumber}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t.enterPhone}
                        value={loginData.phoneNumber}
                        onChange={(e) => setLoginData({ ...loginData, phoneNumber: e.target.value })}
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      {t.password}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.enterPassword}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pr-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? t.loading : t.login}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      {t.noAccount}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                      {t.fullName}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder={t.enterName}
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regPhone" className="text-white">
                      {t.phoneNumber}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="regPhone"
                        type="tel"
                        placeholder={t.enterPhone}
                        value={registerData.phoneNumber}
                        onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      {t.location}
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        type="text"
                        placeholder={t.enterLocation}
                        value={registerData.location}
                        onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regPassword" className="text-white">
                      {t.password}
                    </Label>
                    <Input
                      id="regPassword"
                      type="password"
                      placeholder={t.enterPassword}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      {language === "en"
                        ? "Confirm Password"
                        : language === "rw"
                          ? "Emeza Ijambo ry'Ibanga"
                          : "Confirmer le Mot de Passe"}
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={
                        language === "en"
                          ? "Confirm your password"
                          : language === "rw"
                            ? "Emeza ijambo ry'ibanga"
                            : "Confirmez votre mot de passe"
                      }
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? t.loading : t.register}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(false)}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      {t.haveAccount}
                    </button>
                  </div>
                </form>
              )}

              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 text-center">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-300 text-center">{success}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
              ✨ Revolutionary Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                To Pass With Flying Colors
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Smart Practice",
                description: "AI-powered adaptive learning system",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: BookOpen,
                title: "Expert Content",
                description: "1000+ questions with detailed explanations",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Shield,
                title: "24/7 Support",
                description: "Expert guidance whenever you need it",
                color: "from-green-500 to-emerald-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "95%", label: "Success Rate", icon: Trophy },
              { number: "50K+", label: "Students", icon: Users },
              { number: "1000+", label: "Questions", icon: BookOpen },
              { number: "24/7", label: "Support", icon: Clock },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{t.title}</h3>
                  <p className="text-gray-400">By Sangwa Bruce - Rwanda's Premier Platform</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30 mb-6">
                <p className="text-white font-semibold mb-2">📞 Developer Contact</p>
                <p className="text-blue-300">Sangwa Bruce Principe</p>
                <p className="text-gray-300">Phone: +250 794 290 803</p>
                <p className="text-gray-300">WhatsApp: +250 733 296 834</p>
                <p className="text-gray-400 text-sm">Available for support & inquiries</p>

                {/* Meet the Developer Button */}
                <Link
                  href="/developer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  Meet the Developer
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {["Practice Tests", "Premium Content", "Study Materials", "Success Stories"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                      <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {["Help Center", "Contact Developer", "FAQ", "AI Assistant"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                      <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Sangwa Test Hub. Developed by Sangwa Bruce Principe (+250 794 290 803 | +250 733 296 834). Made
              with ❤️ for Rwandan drivers.
            </p>
            <p className="text-gray-500 text-sm mt-2">"The Hub of Creativity" - Transforming Rwanda's Digital Future</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot - Always visible */}
      <AIChatbot />

      {/* Custom Styles */}
      <style jsx>{`
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
    </div>
  )
}
