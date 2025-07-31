import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes (NOT permanent)
// In production, you would use a real database
let users: any[] = []
let paymentRequests: any[] = []
let premiumUsers: any[] = []

// Load data from localStorage simulation (server-side)
function loadData() {
  if (typeof window !== "undefined") {
    const storedUsers = localStorage.getItem("registeredUsers")
    const storedPayments = localStorage.getItem("paymentRequests")
    const storedPremium = localStorage.getItem("premiumUsers")

    if (storedUsers) users = JSON.parse(storedUsers)
    if (storedPayments) paymentRequests = JSON.parse(storedPayments)
    if (storedPremium) premiumUsers = JSON.parse(storedPremium)
  }
}

// Save data to localStorage simulation (server-side)
function saveData() {
  if (typeof window !== "undefined") {
    localStorage.setItem("registeredUsers", JSON.stringify(users))
    localStorage.setItem("paymentRequests", JSON.stringify(paymentRequests))
    localStorage.setItem("premiumUsers", JSON.stringify(premiumUsers))
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  try {
    switch (action) {
      case "getPremiumUsers":
        return NextResponse.json({
          success: true,
          premiumUsers: premiumUsers || [],
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case "login":
        const { phoneNumber, password } = body

        // Check admin credentials
        if (phoneNumber === "0794290803" && password === "Sangwa@123") {
          return NextResponse.json({
            success: true,
            user: {
              phoneNumber: "0794290803",
              fullName: "Sangwa Bruce",
              role: "admin",
            },
          })
        }

        // Check regular users (from localStorage in browser)
        return NextResponse.json({
          success: false,
          error: "Invalid credentials",
        })

      case "register":
        const { fullName, phoneNumber: regPhone, location, password: regPassword } = body

        // In a real app, you'd save to database
        // For now, we'll return success and let frontend handle localStorage
        return NextResponse.json({
          success: true,
          message: "User registered successfully",
        })

      case "getAllUsers":
        // In production, this would fetch from database
        // For demo, return empty array - frontend uses localStorage
        return NextResponse.json({
          success: true,
          users: [],
        })

      case "getPaymentRequests":
        // Return payment requests
        return NextResponse.json({
          success: true,
          paymentRequests: paymentRequests || [],
        })

      case "submitPayment":
        const { phoneNumber: payPhone, paymentMethod, amount, userInfo } = body

        const newPaymentRequest = {
          phoneNumber: payPhone,
          paymentMethod,
          amount: amount || 2000,
          timestamp: new Date().toISOString(),
          status: "pending",
          userInfo: userInfo || {
            name: "Unknown User",
            location: "Unknown",
            idNumber: "Unknown",
          },
        }

        paymentRequests.push(newPaymentRequest)
        saveData()

        return NextResponse.json({
          success: true,
          message: "Payment request submitted successfully",
        })

      case "confirmPayment":
        const { phoneNumber: confirmPhone, adminName } = body

        // Find and update payment request
        const paymentIndex = paymentRequests.findIndex(
          (req) => req.phoneNumber === confirmPhone && req.status === "pending",
        )

        if (paymentIndex === -1) {
          return NextResponse.json({
            success: false,
            error: "Payment request not found",
          })
        }

        // Update payment status
        paymentRequests[paymentIndex].status = "confirmed"
        paymentRequests[paymentIndex].confirmedAt = new Date().toISOString()
        paymentRequests[paymentIndex].confirmedBy = adminName

        // Add to premium users
        const premiumUser = {
          phoneNumber: confirmPhone,
          name: paymentRequests[paymentIndex].userInfo?.name || "Premium User",
          isPremium: true,
          subscriptionStart: new Date().toISOString(),
          subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          paymentAmount: paymentRequests[paymentIndex].amount,
          confirmedBy: adminName,
        }

        premiumUsers.push(premiumUser)
        saveData()

        return NextResponse.json({
          success: true,
          message: "Payment confirmed successfully",
        })

      case "rejectPayment":
        const { phoneNumber: rejectPhone, adminName: rejectAdmin, reason } = body

        // Find and update payment request
        const rejectIndex = paymentRequests.findIndex(
          (req) => req.phoneNumber === rejectPhone && req.status === "pending",
        )

        if (rejectIndex === -1) {
          return NextResponse.json({
            success: false,
            error: "Payment request not found",
          })
        }

        // Update payment status
        paymentRequests[rejectIndex].status = "rejected"
        paymentRequests[rejectIndex].rejectedAt = new Date().toISOString()
        paymentRequests[rejectIndex].rejectedBy = rejectAdmin
        paymentRequests[rejectIndex].rejectionReason = reason

        saveData()

        return NextResponse.json({
          success: true,
          message: "Payment rejected successfully",
        })

      case "getPremiumUsers":
        return NextResponse.json({
          success: true,
          premiumUsers: premiumUsers || [],
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
