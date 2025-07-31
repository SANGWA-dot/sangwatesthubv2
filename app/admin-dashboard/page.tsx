"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Shield,
  LogOut,
  Phone,
  MapPin,
  Calendar,
  Users,
  Crown,
  AlertTriangle,
  Camera,
  Upload,
  User,
} from "lucide-react"
import { api } from "@/lib/api"
import Link from "next/link"

interface PaymentRequest {
  phoneNumber: string
  paymentMethod: string
  amount: number
  timestamp: string
  status: string
  confirmedAt?: string
  confirmedBy?: string
  rejectedAt?: string
  rejectedBy?: string
  rejectionReason?: string
  userInfo: {
    name: string
    location: string
    idNumber: string
  }
}

interface RegisteredUser {
  id: string
  fullName: string
  phoneNumber: string
  location: string
  idNumber: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([])
  const [confirmedPayments, setConfirmedPayments] = useState<PaymentRequest[]>([])
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([])
  const [premiumUsers, setPremiumUsers] = useState<any[]>([])
  const [adminName, setAdminName] = useState("")
  const [loginTime, setLoginTime] = useState("")
  const [adminProfilePicture, setAdminProfilePicture] = useState("")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🔐 HARDCODED ADMIN VALIDATION
  const ADMIN_PHONE = "0794290803"

  useEffect(() => {
    // ✅ STRICT ADMIN VALIDATION - HARDCODED CREDENTIALS ONLY
    const isAdmin = sessionStorage.getItem("isAdmin")
    const storedAdminName = sessionStorage.getItem("adminName")
    const adminPhone = sessionStorage.getItem("adminPhone")
    const storedLoginTime = sessionStorage.getItem("loginTime")

    // Check if user is admin with EXACT hardcoded credentials
    if (!isAdmin || isAdmin !== "true" || adminPhone !== ADMIN_PHONE) {
      // Redirect to login page (not admin-login since it doesn't exist)
      router.push("/login")
      return
    }

    setAdminName(storedAdminName || "Sangwa Bruce Developer")
    setLoginTime(storedLoginTime || "")

    // Load admin data and dashboard data
    loadAdminData()
  }, [router])

  const loadAdminData = async () => {
    try {
      setIsLoading(true)

      // Load admin profile picture
      const profileResult = await api.getAdminProfile(ADMIN_PHONE)
      if (profileResult.profilePicture) {
        setAdminProfilePicture(profileResult.profilePicture)
      }

      // Load all dashboard data
      await loadData()
    } catch (error) {
      console.error("Error loading admin data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadData = async () => {
    try {
      // Get all users
      const usersResult = await api.getAllUsers()
      setRegisteredUsers(usersResult.users || [])

      // Get premium users
      const premiumResult = await fetch("/api/users?action=getPremiumUsers")
      const premiumData = await premiumResult.json()
      setPremiumUsers(premiumData.premiumUsers || [])

      // Get payment requests
      const paymentResult = await api.getPaymentRequests()
      const allRequests = paymentResult.paymentRequests || []

      setPaymentRequests(allRequests.filter((req: PaymentRequest) => req.status === "pending"))
      setConfirmedPayments(allRequests.filter((req: PaymentRequest) => req.status === "confirmed"))
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("❌ IKOSA: Ifoto ni nini cyane. Hitamo ifoto ntoya kuruta 5MB.")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("❌ IKOSA: Hitamo ifoto gusa (JPG, PNG, GIF, etc.)")
        return
      }

      const reader = new FileReader()
      reader.onload = async (e) => {
        const result = e.target?.result as string

        try {
          await api.updateAdminProfile(ADMIN_PHONE, result)
          setAdminProfilePicture(result)
          setIsProfileDialogOpen(false)
          alert("✅ Ifoto yawe yashyizweho neza!")
        } catch (error) {
          console.error("Error updating profile picture:", error)
          alert("❌ IKOSA: Habaye ikosa mu gushyira ifoto. Gerageza ukundi.")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProfilePicture = async () => {
    try {
      await api.updateAdminProfile(ADMIN_PHONE, null)
      setAdminProfilePicture("")
      setIsProfileDialogOpen(false)
      alert("✅ Ifoto yasibwe!")
    } catch (error) {
      console.error("Error removing profile picture:", error)
      alert("❌ IKOSA: Habaye ikosa mu gusiba ifoto. Gerageza ukundi.")
    }
  }

  const confirmPayment = async (phoneNumber: string) => {
    try {
      // Find the user in registered users
      const user = registeredUsers.find((u) => u.phoneNumber === phoneNumber)
      if (!user) {
        alert(
          "⚠️ IKOSA: Uyu mukoresha ntiyandikishije!\n\nAsabwe kwiyandikisha mbere yo kwishyura.\nNtushobora kwemeza kwishyura kwa muntu utiyandikishije.",
        )
        return
      }

      const result = await api.confirmPayment(phoneNumber, adminName)

      if (result.success) {
        // Refresh the data
        await loadData()

        // Success message
        alert(
          `🎉 KWISHYURA KWEMEJWE NEZA!\n\n` +
            `👤 Umukoresha: ${user.fullName}\n` +
            `📞 Telefoni: ${phoneNumber}\n` +
            `💰 Amafaranga: 2,000 RWF\n` +
            `📅 Igihe: 30 amatsiku\n` +
            `✅ Status: Premium Active\n\n` +
            `🚀 Ubu afite ubushobozi bwose bwa Premium:\n` +
            `• Ibibazo byose (433+)\n` +
            `• Igitabo cya Premium\n` +
            `• Ubushobozi bwose bw'ikizamini\n\n` +
            `Kwemejwe na: ${adminName}`,
        )
      } else {
        alert("❌ IKOSA: " + (result.error || "Ntibishoboka kwemeza kwishyura."))
      }
    } catch (error) {
      console.error("Error confirming payment:", error)
      alert("❌ IKOSA: Habaye ikosa mu kwemeza kwishyura. Gerageza ukundi.")
    }
  }

  const rejectPayment = async (phoneNumber: string) => {
    try {
      // Ask admin for rejection reason
      const reason = prompt(
        "🚫 ANZA KWISHYURA\n\nAndika impamvu yo kwanza icyifuzo cyo kwishyura:\n\n(Uyu mukoresha azabona ubu butumwa)",
        "Kwishyura ntikwemejwe. Hamagara +250794290803 kugira ngo ubone amakuru y'inyongera.",
      )

      if (!reason || reason.trim() === "") {
        alert("❌ Ugomba kwandika impamvu yo kwanza icyifuzo!")
        return
      }

      const result = await api.rejectPayment(phoneNumber, adminName, reason.trim())

      if (result.success) {
        // Refresh the data
        await loadData()

        alert(
          `❌ KWISHYURA KWANZWE\n\n` +
            `📞 Telefoni: ${phoneNumber}\n` +
            `👤 Kwanzwe na: ${adminName}\n` +
            `📝 Impamvu: ${reason}\n\n` +
            `Umukoresha azabona ubu butumwa igihe azagaruka kuri sisitemu.`,
        )
      } else {
        alert("❌ IKOSA: " + (result.error || "Ntibishoboka kwanza icyifuzo."))
      }
    } catch (error) {
      console.error("Error rejecting payment:", error)
      alert("❌ IKOSA: Habaye ikosa. Gerageza ukundi.")
    }
  }

  const handleLogout = () => {
    // Clear admin session
    sessionStorage.removeItem("isAdmin")
    sessionStorage.removeItem("adminName")
    sessionStorage.removeItem("adminPhone")
    sessionStorage.removeItem("adminRole")
    sessionStorage.removeItem("loginTime")

    // Redirect to home page instead of login
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("rw-RW", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatLoginTime = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleString("rw-RW", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalPendingAmount = paymentRequests.reduce((sum, req) => sum + req.amount, 0)
  const totalConfirmedAmount = confirmedPayments.reduce((sum, req) => sum + req.amount, 0)
  const activePremiumUsers = premiumUsers.filter(
    (user) => user.isPremium && new Date(user.subscriptionEnd) > new Date(),
  ).length

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A192F] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Gukuramo amakuru ya Admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A192F] text-white">
      <header className="bg-[#0A192F] border-b border-gray-700 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-300">Gucunga Kwishyura - Ikizamini cyo Gutwara</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Admin Profile Picture */}
              <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                      {adminProfilePicture ? (
                        <img
                          src={adminProfilePicture || "/placeholder.svg"}
                          alt="Admin Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Crown className="h-6 w-6 text-yellow-600" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Camera className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Guhindura Ifoto ya Profile
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center mb-4">
                        {adminProfilePicture ? (
                          <img
                            src={adminProfilePicture || "/placeholder.svg"}
                            alt="Admin Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Crown className="h-12 w-12 text-yellow-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Hitamo ifoto nshya ya profile yawe (Max: 5MB)</p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />

                    <div className="flex gap-2">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Hitamo Ifoto
                      </Button>

                      {adminProfilePicture && (
                        <Button
                          onClick={removeProfilePicture}
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                        >
                          Siba Ifoto
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Ifoto igomba kuba ntoya kuruta 5MB</p>
                      <p>• Uburyo bwemewe: JPG, PNG, GIF</p>
                      <p>• Ifoto nziza ni iy'urukiramende</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="text-right">
                <div className="font-medium flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-400" />
                  {adminName}
                </div>
                <div className="text-sm text-gray-300 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {ADMIN_PHONE}
                  {loginTime && <span className="ml-2 text-xs">• {formatLoginTime(loginTime)}</span>}
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400 hover:bg-red-900 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sohoka
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-6">
            <Card className="bg-white text-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Abakoresha Bose</p>
                    <p className="text-2xl font-bold text-blue-600">{registeredUsers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Premium Active</p>
                    <p className="text-2xl font-bold text-purple-600">{activePremiumUsers}</p>
                  </div>
                  <Crown className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Bitegereje Kwemeza</p>
                    <p className="text-2xl font-bold text-orange-600">{paymentRequests.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Byemejwe</p>
                    <p className="text-2xl font-bold text-green-600">{confirmedPayments.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Amafaranga Yinjije</p>
                    <p className="text-2xl font-bold text-green-600">{totalConfirmedAmount.toLocaleString()} RWF</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Requests - Main Focus */}
          <Card className="bg-white text-gray-800 border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Clock className="h-5 w-5" />
                Kwishyura Gutegereje Kwemeza ({paymentRequests.length})
              </CardTitle>
              <p className="text-sm text-orange-700">
                ⚡ Emeza kwishyura kugira ngo abakoresha babone ubushobozi bwose bwa Premium
              </p>
            </CardHeader>
            <CardContent className="p-6">
              {paymentRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-300" />
                  <p className="text-lg font-medium text-green-600">✅ Nta kwishyura gutegereje</p>
                  <p className="text-sm">Abakoresha bose bashyuye cyangwa nta basabye kwishyura</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Umukoresha</TableHead>
                      <TableHead>Telefoni</TableHead>
                      <TableHead>Ahantu</TableHead>
                      <TableHead>Uburyo</TableHead>
                      <TableHead>Amafaranga</TableHead>
                      <TableHead>Itariki</TableHead>
                      <TableHead>Ibikorwa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRequests.map((request, index) => {
                      const user = registeredUsers.find((u) => u.phoneNumber === request.phoneNumber)
                      return (
                        <TableRow key={index} className={!user ? "bg-red-50 border-red-200" : "hover:bg-gray-50"}>
                          <TableCell>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {user ? user.fullName : request.userInfo.name}
                                {!user && (
                                  <span className="text-red-600 text-xs bg-red-100 px-2 py-1 rounded flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    Ntiyandikishije
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user ? user.idNumber : request.userInfo.idNumber}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="font-mono">{request.phoneNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {user ? user.location : request.userInfo.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={request.paymentMethod === "mtn" ? "default" : "secondary"}>
                              {request.paymentMethod === "mtn" ? "MTN MoMo" : "Airtel Money"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold text-green-600">
                            {request.amount.toLocaleString()} RWF
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{formatDate(request.timestamp)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => confirmPayment(request.phoneNumber)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                                disabled={!user}
                                title={!user ? "Umukoresha agomba kwiyandikisha mbere" : "Emeza kwishyura"}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Emeza
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejectPayment(request.phoneNumber)}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                title="Anza kwishyura"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Anza
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Additional Management Tabs */}
          <Card className="bg-white text-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gucunga Abakoresha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Abakoresha Bose ({registeredUsers.length})
                  </TabsTrigger>
                  <TabsTrigger value="premium" className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Premium Active ({activePremiumUsers})
                  </TabsTrigger>
                </TabsList>

                {/* Registered Users Tab */}
                <TabsContent value="users" className="mt-6">
                  {registeredUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nta bakoresha biyandikishije</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amazina</TableHead>
                          <TableHead>Telefoni</TableHead>
                          <TableHead>Ahantu</TableHead>
                          <TableHead>ID Number</TableHead>
                          <TableHead>Yiyandikishije</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registeredUsers.map((user, index) => {
                          const isPremium = premiumUsers.some(
                            (pUser) =>
                              pUser.phoneNumber === user.phoneNumber &&
                              pUser.isPremium &&
                              new Date(pUser.subscriptionEnd) > new Date(),
                          )
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{user.fullName}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="font-mono">{user.phoneNumber}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  {user.location}
                                </div>
                              </TableCell>
                              <TableCell className="font-mono">{user.idNumber}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{formatDate(user.createdAt)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={isPremium ? "default" : "secondary"}
                                  className="flex items-center gap-1"
                                >
                                  {isPremium && <Crown className="h-3 w-3" />}
                                  {isPremium ? "Premium" : "Ubuntu"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                {/* Premium Users Tab */}
                <TabsContent value="premium" className="mt-6">
                  {premiumUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Crown className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nta bakoresha ba Premium</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amazina</TableHead>
                          <TableHead>Telefoni</TableHead>
                          <TableHead>Amafaranga</TableHead>
                          <TableHead>Yatangiye</TableHead>
                          <TableHead>Irangira</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {premiumUsers.map((user, index) => {
                          const isActive = new Date(user.subscriptionEnd) > new Date()
                          return (
                            <TableRow key={index} className={isActive ? "bg-green-50" : "bg-red-50"}>
                              <TableCell className="font-medium flex items-center gap-2">
                                <Crown className="h-4 w-4 text-yellow-500" />
                                {user.name}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="font-mono">{user.phoneNumber}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-bold text-green-600">
                                {user.paymentAmount?.toLocaleString() || "2,000"} RWF
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{formatDate(user.subscriptionStart)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{formatDate(user.subscriptionEnd)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={isActive ? "default" : "destructive"}
                                  className="flex items-center gap-1"
                                >
                                  {isActive && <Crown className="h-3 w-3" />}
                                  {isActive ? "Active Premium" : "Expired"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-[#0A192F] border-t border-gray-700 py-4 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Admin Dashboard - Ikizamini cyo Gutwara Ibinyabiziga</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <p className="text-sm">🔐 Cloud-Based Admin System</p>
            <Link
              href="/developer"
              className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1 transition-colors"
            >
              <User className="h-3 w-3" />
              Developer Profile
            </Link>
            <p className="text-sm">+250794290803 | +250733296834</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
