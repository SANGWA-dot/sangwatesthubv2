"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  Smartphone,
  ArrowLeft,
  CheckCircle,
  Phone,
  Loader2,
  XCircle,
  RefreshCw,
} from "lucide-react"

type PaymentStep = "select-method" | "enter-phone" | "processing" | "success" | "failed"

export default function PaymentPage() {
  const router = useRouter()
  const [step, setStep] = useState<PaymentStep>("select-method")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [referenceId, setReferenceId] = useState("")
  const [transactionStatus, setTransactionStatus] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [pollCount, setPollCount] = useState(0)

  const MAX_POLLS = 30 // Poll for max ~60 seconds (every 2 seconds)

  const handleMethodSelect = (method: string) => {
    setPaymentMethod(method)
    setError("")
  }

  const handleContinue = () => {
    if (!paymentMethod) {
      setError("Hitamo uburyo bwo kwishyura")
      return
    }
    setStep("enter-phone")
  }

  const handlePhoneSubmit = async () => {
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

    // Only MTN numbers for MTN MoMo
    if (paymentMethod === "mtn" && !phoneNumber.startsWith("078") && !phoneNumber.startsWith("079")) {
      setError("MTN Mobile Money ikoresha nimero zitangira na 078 cyangwa 079 gusa")
      return
    }

    // Start payment processing
    setStep("processing")
    setStatusMessage("Kohereza icyifuzo cyo kwishyura...")

    try {
      const response = await fetch("/api/mtn-momo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "requestToPay",
          amount: "2000",
          phoneNumber,
          payerMessage: "Kwishyura Sangwa Test Hub Premium - 2,000 RWF",
          payeeNote: "Sangwa Test Hub Premium Subscription",
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Habaye ikosa mu kohereza icyifuzo. Gerageza ukundi.")
        setStep("failed")
        return
      }

      setReferenceId(data.referenceId)
      setStatusMessage("Icyifuzo cyoherejwe kuri telefoni yawe. Emeza kwishyura kuri telefoni...")
      setPollCount(0)
    } catch (err) {
      console.error("Payment request error:", err)
      setError("Habaye ikosa mu kohereza icyifuzo. Gerageza ukundi.")
      setStep("failed")
    }
  }

  // Poll for transaction status
  const checkStatus = useCallback(async () => {
    if (!referenceId || step !== "processing") return

    try {
      const response = await fetch("/api/mtn-momo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "checkStatus",
          referenceId,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        console.error("Status check failed:", data.error)
        return
      }

      setTransactionStatus(data.status)

      if (data.status === "SUCCESSFUL") {
        setStep("success")
        setStatusMessage("Kwishyura byagenze neza!")

        // Also submit payment to the main system for admin tracking
        try {
          await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "submitPayment",
              phoneNumber,
              paymentMethod,
              amount: 2000,
              userInfo: {
                name: sessionStorage.getItem("userName") || "Unknown",
                location: sessionStorage.getItem("userLocation") || "Unknown",
                idNumber: sessionStorage.getItem("userIdNumber") || "Unknown",
              },
              mtnReferenceId: referenceId,
              mtnStatus: "SUCCESSFUL",
              financialTransactionId: data.financialTransactionId,
            }),
          })
        } catch (submitErr) {
          console.error("Error submitting payment to system:", submitErr)
        }

        return
      }

      if (data.status === "FAILED") {
        setStep("failed")
        setError(data.reason?.message || "Kwishyura ntibikozwe. Gerageza ukundi.")
        return
      }

      // Still PENDING
      setPollCount((prev) => prev + 1)
      setStatusMessage("Tegereza... Emeza kwishyura kuri telefoni yawe.")
    } catch (err) {
      console.error("Status check error:", err)
    }
  }, [referenceId, step, phoneNumber, paymentMethod])

  useEffect(() => {
    if (step !== "processing" || !referenceId) return

    if (pollCount >= MAX_POLLS) {
      setStep("failed")
      setError("Igihe cyo kwishyura cyararangiye. Gerageza ukundi.")
      return
    }

    const timer = setTimeout(() => {
      checkStatus()
    }, 2000)

    return () => clearTimeout(timer)
  }, [step, referenceId, pollCount, checkStatus])

  const handleRetry = () => {
    setStep("enter-phone")
    setError("")
    setReferenceId("")
    setTransactionStatus("")
    setStatusMessage("")
    setPollCount(0)
  }

  const handleBackToWelcome = () => {
    router.push("/welcome")
  }

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
            {step === "select-method" && "Hitamo Uburyo bwo Kwishyura"}
            {step === "enter-phone" && "Andika Nimero ya Telefoni"}
            {step === "processing" && "Kwishyura Kuri Gutegurwa..."}
            {step === "success" && "Kwishyura Byagenze Neza!"}
            {step === "failed" && "Kwishyura Ntibikozwe"}
          </CardTitle>
          {(step === "select-method" || step === "enter-phone") && (
            <p className="text-gray-600">Serivisi Zinyongera - 2,000 RWF</p>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Select Payment Method */}
          {step === "select-method" && (
            <div className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={handleMethodSelect}>
                <div className="flex items-center space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="mtn" id="mtn" />
                  <Label htmlFor="mtn" className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base text-gray-800">MTN Mobile Money</div>
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
                      <div className="font-medium text-sm sm:text-base text-gray-800">Airtel Money</div>
                      <div className="text-xs sm:text-sm text-gray-500">072xxxxxxx, 073xxxxxxx</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => router.push("/welcome")} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Subira
                </Button>
                <Button onClick={handleContinue} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Komeza
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Enter Phone Number */}
          {step === "enter-phone" && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">
                  {paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money"}
                </div>
                <div className="text-sm text-blue-600">2,000 RWF</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Nimero ya Telefoni</Label>
                <Input
                  id="phone"
                  placeholder={paymentMethod === "mtn" ? "078xxxxxxx" : "072xxxxxxx"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
              </div>

              {paymentMethod === "mtn" && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-yellow-800">
                      <p className="font-medium mb-1">Uko bikorwa:</p>
                      <ol className="list-decimal list-inside space-y-0.5">
                        <li>Andika nimero yawe ya MTN MoMo</li>
                        <li>Kanda "Kwishyura"</li>
                        <li>Uzabona ubutumwa kuri telefoni yawe</li>
                        <li>Emeza kwishyura kuri telefoni</li>
                        <li>Tegereza gato - sisitemu izakwemeza</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("select-method")} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Subira
                </Button>
                <Button
                  onClick={handlePhoneSubmit}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
                >
                  Kwishyura 2,000 RWF
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Processing Payment */}
          {step === "processing" && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <div className="absolute inset-0 border-4 border-yellow-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Kwishyura Kuri Gutegurwa</h3>
                <p className="text-gray-600 text-sm">{statusMessage}</p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Reba kuri telefoni yawe!</p>
                    <p>
                      Uzabona ubutumwa bwa MTN Mobile Money bwo kwishyura 2,000 RWF.
                      Kanda <strong>1</strong> kugira ngo wemeze kwishyura.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Gutegereza igisubizo... ({pollCount}/{MAX_POLLS})</span>
                </div>
              </div>

              <Button variant="outline" onClick={handleRetry} className="w-full">
                Hagarika no Gusubira Inyuma
              </Button>
            </div>
          )}

          {/* Step 4: Payment Success */}
          {step === "success" && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="font-bold text-green-800 text-xl mb-2">Byagenze Neza!</h3>
                <p className="text-green-700">Kwishyura kwawe kwemejwe na MTN Mobile Money.</p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uburyo:</span>
                  <span className="font-medium text-gray-800">MTN Mobile Money</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nimero:</span>
                  <span className="font-medium text-gray-800">{phoneNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amafaranga:</span>
                  <span className="font-medium text-gray-800">2,000 RWF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">SUCCESSFUL</span>
                </div>
                {referenceId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-xs text-gray-800">{referenceId.substring(0, 18)}...</span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Ibikurikira:</p>
                  <ul className="space-y-1 text-xs">
                    <li>- Konte yawe izahindurwa kuri Premium mu masaha 2-24</li>
                    <li>- Uzabona serivisi zinyongera zose</li>
                    <li>- Niba wasoje wishyura hamagara 0794290803</li>
                  </ul>
                </div>
              </div>

              <Button onClick={handleBackToWelcome} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Subira ku Rupapuro Rwambere
              </Button>
            </div>
          )}

          {/* Step 5: Payment Failed */}
          {step === "failed" && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="font-bold text-red-800 text-xl mb-2">Kwishyura Ntibikozwe</h3>
                <p className="text-red-600 text-sm">{error || "Habaye ikosa mu kwishyura."}</p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">Impamvu bishobora:</p>
                  <ul className="space-y-1 text-xs">
                    <li>- Amafaranga adasobanuka kuri konti yawe</li>
                    <li>- Wanze kwishyura kuri telefoni</li>
                    <li>- Nimero ya telefoni ntitari iyukuri</li>
                    <li>- Hari ikibazo cya netiweri</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBackToWelcome} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Subira
                </Button>
                <Button onClick={handleRetry} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Gerageza Ukundi
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
