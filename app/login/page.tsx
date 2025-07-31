"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Phone, MapPin, User, CreditCard, Shield, Crown } from "lucide-react"
import { api } from "@/lib/api"
import AIChatbot from "@/components/ai-chatbot"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // User Login Form
  const [userLoginData, setUserLoginData] = useState({
    phoneNumber: "",
    password: "",
  })

  // User Registration Form
  const [userRegisterData, setUserRegisterData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  })

  // Admin Login Form
  const [adminLoginData, setAdminLoginData] = useState({
    phoneNumber: "",
    password: "",
  })

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await api.loginUser(userLoginData.phoneNumber, userLoginData.password)

      if (result.success) {
        // Store user session
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("userPhone", result.user.phoneNumber)
        sessionStorage.setItem("userName", result.user.fullName)
        sessionStorage.setItem("userLocation", result.user.location)
        sessionStorage.setItem("userIdNumber", result.user.idNumber)
        sessionStorage.setItem("loginTime", new Date().toISOString())

        // Redirect to welcome page
        router.push("/welcome")
      } else {
        setError(result.error || "Habaye ikosa mu kwinjira. Gerageza ukundi.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Habaye ikosa mu kwinjira. Reba interineti yawe.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (userRegisterData.password !== userRegisterData.confirmPassword) {
      setError("Amagambo y'ibanga ntabwo ahura. Gerageza ukundi.")
      setIsLoading(false)
      return
    }

    if (userRegisterData.password.length < 6) {
      setError("Ijambo ry'ibanga rigomba kuba rifite byibura inyuguti 6.")
      setIsLoading(false)
      return
    }

    try {
      const result = await api.registerUser({
        fullName: userRegisterData.fullName,
        phoneNumber: userRegisterData.phoneNumber,
        location: userRegisterData.location,
        idNumber: userRegisterData.idNumber,
        password: userRegisterData.password,
      })

      if (result.success) {
        setSuccess("✅ Kwiyandikisha byagenze neza! Ubu ushobora kwinjira mu konti yawe.")
        setUserRegisterData({
          fullName: "",
          phoneNumber: "",
          location: "",
          idNumber: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        setError(result.error || "Habaye ikosa mu kwiyandikisha. Gerageza ukundi.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("Habaye ikosa mu kwiyandikisha. Reba interineti yawe.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await api.loginAdmin(adminLoginData.phoneNumber, adminLoginData.password)

      if (result.success) {
        // Store admin session
        sessionStorage.setItem("isAdmin", "true")
        sessionStorage.setItem("adminName", result.admin.name)
        sessionStorage.setItem("adminPhone", result.admin.phone)
        sessionStorage.setItem("adminRole", result.admin.role)
        sessionStorage.setItem("loginTime", new Date().toISOString())

        // Redirect to admin dashboard
        router.push("/admin-dashboard")
      } else {
        setError("❌ Amakuru y'admin ntabwo ari yo. Gerageza ukundi.")
      }
    } catch (error) {
      console.error("Admin login error:", error)
      setError("Habaye ikosa mu kwinjira nk'admin. Reba interineti yawe.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CreditCard className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sangwa Test Hub</h1>
          <p className="text-gray-600">Ikizamini cyo Gutwara Ibinyabiziga</p>
          <p className="text-sm text-blue-600 mt-1">🌐 Cloud-Based System - Access from Any Device</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800">Ikaze kuri Sangwa Test Hub</CardTitle>
            <CardDescription>Hitamo uburyo bwo kwinjira cyangwa kwiyandikisha</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login" className="text-sm">
                  Kwinjira
                </TabsTrigger>
                <TabsTrigger value="register" className="text-sm">
                  Kwiyandikisha
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-sm">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {/* User Login Tab */}
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone">Nimero ya Telefoni</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-phone"
                        type="tel"
                        placeholder="078XXXXXXX"
                        value={userLoginData.phoneNumber}
                        onChange={(e) => setUserLoginData({ ...userLoginData, phoneNumber: e.target.value })}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Ijambo ry'Ibanga</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Andika ijambo ry'ibanga"
                        value={userLoginData.password}
                        onChange={(e) => setUserLoginData({ ...userLoginData, password: e.target.value })}
                        className="pr-10"
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

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Gutegereza..." : "Kwinjira"}
                  </Button>
                </form>
              </TabsContent>

              {/* User Registration Tab */}
              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleUserRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Amazina Yose</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Andika amazina yawe yose"
                        value={userRegisterData.fullName}
                        onChange={(e) => setUserRegisterData({ ...userRegisterData, fullName: e.target.value })}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Nimero ya Telefoni</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="078XXXXXXX"
                        value={userRegisterData.phoneNumber}
                        onChange={(e) => setUserRegisterData({ ...userRegisterData, phoneNumber: e.target.value })}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-location">Ahantu Ubarizwa</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-location"
                        type="text"
                        placeholder="Intara/Akarere/Umurenge"
                        value={userRegisterData.location}
                        onChange={(e) => setUserRegisterData({ ...userRegisterData, location: e.target.value })}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-id">Nimero y'Indangamuntu</Label>
                    <Input
                      id="register-id"
                      type="text"
                      placeholder="1XXXXXXXXXXXXXXX"
                      value={userRegisterData.idNumber}
                      onChange={(e) => setUserRegisterData({ ...userRegisterData, idNumber: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Ijambo ry'Ibanga</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Byibura inyuguti 6"
                      value={userRegisterData.password}
                      onChange={(e) => setUserRegisterData({ ...userRegisterData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Emeza Ijambo ry'Ibanga</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Ongera wandike ijambo ry'ibanga"
                      value={userRegisterData.confirmPassword}
                      onChange={(e) => setUserRegisterData({ ...userRegisterData, confirmPassword: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Gutegereza..." : "Kwiyandikisha"}
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Login Tab */}
              <TabsContent value="admin" className="space-y-4 mt-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-red-800">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Admin Access Only</span>
                  </div>
                  <p className="text-xs text-red-600 mt-1">Hardcoded credentials required for system security</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-phone">Admin Phone Number</Label>
                    <div className="relative">
                      <Crown className="absolute left-3 top-3 h-4 w-4 text-yellow-500" />
                      <Input
                        id="admin-phone"
                        type="tel"
                        placeholder="Admin phone number"
                        value={adminLoginData.phoneNumber}
                        onChange={(e) => setAdminLoginData({ ...adminLoginData, phoneNumber: e.target.value })}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showAdminPassword ? "text" : "password"}
                        placeholder="Admin password"
                        value={adminLoginData.password}
                        onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
                        className="pr-10"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Admin Login"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2024 Sangwa Test Hub | Developed by Sangwa Bruce</p>
          <p className="mt-1">📞 Support: +250794290803</p>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
