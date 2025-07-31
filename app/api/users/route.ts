import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
const users: any[] = []
const paymentRequests: any[] = []

export async function GET() {
  return NextResponse.json({ users, paymentRequests })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case "register":
        const { name, phoneNumber, password, nationalId, profilePicture } = body

        // Check if user already exists
        const existingUser = users.find((u) => u.phoneNumber === phoneNumber)
        if (existingUser) {
          return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          phoneNumber,
          password,
          nationalId,
          profilePicture,
          isPremium: false,
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        return NextResponse.json({ success: true, user: newUser })

      case "login":
        const { phoneNumber: loginPhone, password: loginPassword } = body

        // Check for admin credentials
        if (loginPhone === "0794290803" && loginPassword === "Sangwa@123") {
          return NextResponse.json({
            success: true,
            user: {
              id: "admin",
              name: "Sangwa Bruce",
              phoneNumber: "0794290803",
              isAdmin: true,
            },
          })
        }

        // Check regular users
        const user = users.find((u) => u.phoneNumber === loginPhone && u.password === loginPassword)
        if (!user) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        return NextResponse.json({ success: true, user })

      case "submitPayment":
        const { userId, amount, method, transactionId, screenshot } = body

        const paymentRequest = {
          id: Date.now().toString(),
          userId,
          amount,
          method,
          transactionId,
          screenshot,
          status: "pending",
          createdAt: new Date().toISOString(),
        }

        paymentRequests.push(paymentRequest)
        return NextResponse.json({ success: true, paymentRequest })

      case "getPaymentRequests":
        return NextResponse.json({ success: true, paymentRequests })

      case "confirmPayment":
        const { paymentId: confirmId } = body
        const paymentToConfirm = paymentRequests.find((p) => p.id === confirmId)

        if (paymentToConfirm) {
          paymentToConfirm.status = "confirmed"

          // Make user premium
          const userToUpgrade = users.find((u) => u.id === paymentToConfirm.userId)
          if (userToUpgrade) {
            userToUpgrade.isPremium = true
          }
        }

        return NextResponse.json({ success: true })

      case "rejectPayment":
        const { paymentId: rejectId } = body
        const paymentToReject = paymentRequests.find((p) => p.id === rejectId)

        if (paymentToReject) {
          paymentToReject.status = "rejected"
        }

        return NextResponse.json({ success: true })

      case "getAllUsers":
        return NextResponse.json({ success: true, users })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
