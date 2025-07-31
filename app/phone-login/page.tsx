"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Phone, MapPin, User, ArrowLeft, Sparkles, Shield, CheckCircle } from "lucide-react"

export default function PhoneLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    location: "",
    idNumber: "",
  })
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const rwandanProvinces = [
    "Kigali City",
    "Eastern Province",
    "Northern Province",
    "Southern Province",
    "Western Province",
  ]

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name.trim()) {
      newErrors.name = "Amazina yawe ni ngombwa"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Nimero ya telefoni ni ngombwa"
    } else if (!/^(078|079|072|073)\d{7}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Nimero ya telefoni ntiyuzuye. Koresha uburyo bwa 078xxxxxxx"
    }

    if (!formData.location) {
      newErrors.location = "Hitamo intara yawe"
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "Nimero y'indangamuntu ni ngombwa"
    } else if (!/^\d{16}$/.test(formData.idNumber)) {
      newErrors.idNumber = "Nimero y'indangamuntu igomba kuba ifite imibare 16"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store user data in session storage
      sessionStorage.setItem("userName", formData.name)
      sessionStorage.setItem("userPhone", formData.phoneNumber)
      sessionStorage.setItem("userLocation", formData.location)
      sessionStorage.setItem("userIdNumber", formData.idNumber)

      // Store in localStorage for persistence
      const userData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        idNumber: formData.idNumber,
        registrationDate: new Date().toISOString(),
        isPremium: false,
      }

      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const userExists = existingUsers.find((user: any) => user.phoneNumber === formData.phoneNumber)

      if (!userExists) {
        existingUsers.push(userData)
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))
      }

      // Redirect to welcome page
      router.push("/welcome")
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ submit: "Habaye ikosa. Gerageza ukundi." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-white hover:bg-white/10 transition-all duration-300"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Join DriveTest Pro</CardTitle>
            <CardDescription className="text-gray-300 text-lg">Start your journey to driving success</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Amazina yawe yuzuye
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Urugero: Jean Baptiste Mukamana"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                />
                {errors.name && (
                  <div className="flex items-center text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Nimero ya telefoni
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="078xxxxxxx"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                  maxLength={10}
                />
                {errors.phoneNumber && (
                  <div className="flex items-center text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phoneNumber}
                  </div>
                )}
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Intara yawe
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20">
                    <SelectValue placeholder="Hitamo intara yawe" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {rwandanProvinces.map((province) => (
                      <SelectItem key={province} value={province} className="text-white hover:bg-slate-700">
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && (
                  <div className="flex items-center text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.location}
                  </div>
                )}
              </div>

              {/* ID Number Field */}
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-white font-medium flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Nimero y'indangamuntu
                </Label>
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="1234567890123456"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                  maxLength={16}
                />
                {errors.idNumber && (
                  <div className="flex items-center text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.idNumber}
                  </div>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="flex items-center text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Kwiyandikisha...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Kwiyandikisha & Tangira
                  </div>
                )}
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-green-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-blue-400" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-purple-400" />
                  <span>Trusted</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
