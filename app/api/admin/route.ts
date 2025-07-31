import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for admin profiles
const adminProfiles: any[] = []

export async function GET() {
  // Return default admin profile if none exists
  const adminProfile = adminProfiles.find((p) => p.phoneNumber === "0794290803") || {
    id: "admin",
    name: "Sangwa Bruce",
    phoneNumber: "0794290803",
    profilePicture: null,
  }

  return NextResponse.json({ success: true, profile: adminProfile })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case "updateProfile":
        const { profilePicture } = body

        // Find existing admin profile or create new one
        let adminProfile = adminProfiles.find((p) => p.phoneNumber === "0794290803")

        if (adminProfile) {
          adminProfile.profilePicture = profilePicture
          adminProfile.updatedAt = new Date().toISOString()
        } else {
          adminProfile = {
            id: "admin",
            name: "Sangwa Bruce",
            phoneNumber: "0794290803",
            profilePicture,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          adminProfiles.push(adminProfile)
        }

        return NextResponse.json({ success: true, profile: adminProfile })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Admin API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
