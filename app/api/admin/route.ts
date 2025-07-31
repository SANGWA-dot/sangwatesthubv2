import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for admin profiles (NOT permanent)
const adminProfiles: any[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const phoneNumber = searchParams.get("phoneNumber")

    if (!phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number required",
        },
        { status: 400 },
      )
    }

    // Find admin profile
    const profile = adminProfiles.find((p) => p.phoneNumber === phoneNumber)

    return NextResponse.json({
      success: true,
      profilePicture: profile?.profilePicture || null,
    })
  } catch (error) {
    console.error("Admin API Error:", error)
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
    const { action, phoneNumber, profilePicture } = body

    switch (action) {
      case "updateProfile":
        if (!phoneNumber) {
          return NextResponse.json(
            {
              success: false,
              error: "Phone number required",
            },
            { status: 400 },
          )
        }

        // Find existing profile or create new one
        const existingIndex = adminProfiles.findIndex((p) => p.phoneNumber === phoneNumber)

        if (existingIndex >= 0) {
          adminProfiles[existingIndex].profilePicture = profilePicture
          adminProfiles[existingIndex].updatedAt = new Date().toISOString()
        } else {
          adminProfiles.push({
            phoneNumber,
            profilePicture,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }

        return NextResponse.json({
          success: true,
          message: "Profile updated successfully",
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
    console.error("Admin API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
