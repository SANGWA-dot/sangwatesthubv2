"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, Smartphone, ArrowLeft, CheckCircle, Copy, Phone } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Select method, 2: Enter details, 3: Payment instructions
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleMethodSelect = (method: string) => {
    setPaymentMethod(method)
    setError("")
  }

  const handleContinue = () => {
    if (!paymentMethod) {
      setError("Hitamo uburyo bwo kwishyura")
      return
    }
    setStep(2)
  }

  const handlePhoneSubmit = () => {
    setError("")

    if (!phoneNumber.trim()) {
      setError("Andika nimero ya telefoni")
      return
    }

    // Phone number validation
    const phoneRegex = /^(078|079|072|073)\d{7}$/
    if (!phoneRegex.test(phoneNumber)) {
      setError("Nimero ya telefoni ntiyuzuye. Koresha uburyo bwa 078xxxxxxx")
      return
    }

    try {
      // Store user payment request for admin review
      const paymentRequest = {
        phoneNumber,
        paymentMethod,
        amount: 2000,
        timestamp: new Date().toISOString(),
        status: "pending",
        userInfo: {
          name: sessionStorage.getItem("userName") || "Unknown",
          location: sessionStorage.getItem("userLocation") || "Unknown",
          idNumber: sessionStorage.getItem("userIdNumber") || "Unknown",
        },
      }

      // Store in localStorage for admin to review
      const existingRequests = JSON.parse(localStorage.getItem("paymentRequests") || "[]")

      // Check if user already has a pending request
      const existingRequest = existingRequests.find(
        (req: any) => req.phoneNumber === phoneNumber && req.status === "pending",
      )

      if (existingRequest) {
        setError("Usanzwe ufite icyifuzo cyo kwishyura gitegereje. Tegereza kwemezwa.")
        return
      }

      existingRequests.push(paymentRequest)
      localStorage.setItem("paymentRequests", JSON.stringify(existingRequests))

      setStep(3)
    } catch (error) {
      console.error("Error storing payment request:", error)
      setError("Habaye ikosa. Gerageza ukundi.")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBackToWelcome = () => {
    router.push("/welcome")
  }

  const ussdCode = "*182*1*1*0794290803*2000#"

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F] px-4 py-8">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Design_a_vibrant_modern_3D_logo_for_Sangwa_3.jpg-3jsi7OzDx1SWm8cjO8qndyGPcMGM6O.jpeg"
                alt="Sangwa Logo"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <CardTitle className="text-lg sm:text-2xl font-bold text-gray-800">
            {step === 1 && "Hitamo Uburyo bwo Kwishyura"}
            {step === 2 && "Andika Nimero ya Telefoni"}
            {step === 3 && "Amabwiriza yo Kwishyura"}
          </CardTitle>
          {step < 3 && <p className="text-gray-600">Serivisi Zinyongera - 2,000 RWF</p>}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Select Payment Method */}
          {step === 1 && (
            <div className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={handleMethodSelect}>
                <div className="flex items-center space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="mtn" id="mtn" />
                  <Label htmlFor="mtn" className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base">MTN Mobile Money</div>
                      <div className="text-xs sm:text-sm text-gray-500">078xxxxxxx, 079xxxxxxx</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="airtel" id="airtel" />
                  <Label htmlFor="airtel" className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base">Airtel Money</div>
                      <div className="text-xs sm:text-sm text-gray-500">072xxxxxxx, 073xxxxxxx</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => router.push("/welcome")} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Subira
                </Button>
                <Button onClick={handleContinue} className="flex-1 bg-green-600 hover:bg-green-700">
                  Komeza
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Enter Phone Number */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">
                  {paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money"}
                </div>
                <div className="text-sm text-blue-600">2,000 RWF</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nimero ya Telefoni</Label>
                <Input
                  id="phone"
                  placeholder={paymentMethod === "mtn" ? "078xxxxxxx" : "072xxxxxxx"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
              </div>

              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Subira
                </Button>
                <Button onClick={handlePhoneSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                  Komeza
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Instructions */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">Amabwiriza yo Kwishyura</h3>
                <div className="space-y-1 text-sm text-green-700">
                  <div>Uburyo: {paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money"}</div>
                  <div>Nimero yawe: {phoneNumber}</div>
                  <div>Amafaranga: 2,000 RWF</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-blue-800">Kora iki kugira ngo wishyure:</h4>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-blue-700">
                    <strong>1.</strong> Kanda kuri telefoni yawe: <strong>*182#</strong>
                  </div>
                  <div className="text-sm text-blue-700">
                    <strong>2.</strong> Cyangwa koresha kode yuzuye:
                  </div>

                  <div className="bg-white p-3 rounded border border-blue-300 relative">
                    <div className="font-mono text-lg font-bold text-center text-blue-900">{ussdCode}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => copyToClipboard(ussdCode)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  {copied && (
                    <div className="text-xs text-green-600 text-center">✓ Byakopoye! Shyira muri telefoni yawe</div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <div className="font-medium mb-1">Nyuma yo kwishyura:</div>
                    <ul className="space-y-1 text-xs">
                      <li>• Subira kuri sisitemu nyuma y'amasaha 2-24</li>
                      <li>• Konte yawe izahindurwa kuri Premium</li>
                      <li>• Uzabona serivisi zinyongera zose</li>
                      <li>• Niba wasoje wishyura hamagara 0794290803 tugufashe</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-bold text-green-800 mb-1">Icyifuzo cyawe cyoherejwe!</h4>
                  <p className="text-sm text-green-700">
                    Nyuma yo kwishyura, konte yawe izahindurwa kuri Premium mu masaha 2-24.
                  </p>
                </div>
              </div>

              <Button onClick={handleBackToWelcome} className="w-full bg-blue-600 hover:bg-blue-700">
                Subira ku Rupapuro Rwambere
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
