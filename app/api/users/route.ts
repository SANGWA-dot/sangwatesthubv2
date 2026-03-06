import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  try {
    const supabase = await createClient()

    switch (action) {
      case "getPremiumUsers":
        const { data: premiumUsers, error: premiumError } = await supabase
          .from("premium_users")
          .select("*")
          .order("created_at", { ascending: false })

        if (premiumError) {
          console.error("Error fetching premium users:", premiumError)
          return NextResponse.json({
            success: false,
            error: premiumError.message,
          }, { status: 500 })
        }

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
    const supabase = await createClient()
    const body = await request.json()
    const { action } = body

    switch (action) {
      case "login":
        const { phoneNumber, password } = body

        // First check admins table
        const { data: admin, error: adminError } = await supabase
          .from("admins")
          .select("*")
          .eq("phone_number", phoneNumber)
          .single()

        if (admin && !adminError) {
          const isValidPassword = await bcrypt.compare(password, admin.password_hash)
          if (isValidPassword) {
            return NextResponse.json({
              success: true,
              user: {
                phoneNumber: admin.phone_number,
                fullName: admin.full_name,
                role: "admin",
              },
            })
          }
        }

        // Check regular users
        const { data: user, error: userError } = await supabase
          .from("registered_users")
          .select("*")
          .eq("phone_number", phoneNumber)
          .single()

        if (user && !userError) {
          const isValidPassword = await bcrypt.compare(password, user.password_hash)
          if (isValidPassword) {
            return NextResponse.json({
              success: true,
              user: {
                phoneNumber: user.phone_number,
                fullName: user.full_name,
                role: user.role || "user",
              },
            })
          }
        }

        // Fallback to hardcoded admin for initial setup
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

        return NextResponse.json({
          success: false,
          error: "Invalid credentials",
        })

      case "register":
        const { fullName, phoneNumber: regPhone, location, password: regPassword } = body

        // Check if user already exists
        const { data: existingUser } = await supabase
          .from("registered_users")
          .select("id")
          .eq("phone_number", regPhone)
          .single()

        if (existingUser) {
          return NextResponse.json({
            success: false,
            error: "Phone number already registered",
          })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(regPassword, 10)

        // Insert new user
        const { error: insertError } = await supabase
          .from("registered_users")
          .insert({
            phone_number: regPhone,
            full_name: fullName,
            location: location,
            password_hash: hashedPassword,
            role: "user",
          })

        if (insertError) {
          console.error("Error registering user:", insertError)
          return NextResponse.json({
            success: false,
            error: insertError.message,
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "User registered successfully",
        })

      case "getAllUsers":
        const { data: allUsers, error: usersError } = await supabase
          .from("registered_users")
          .select("id, phone_number, full_name, location, role, created_at")
          .order("created_at", { ascending: false })

        if (usersError) {
          console.error("Error fetching users:", usersError)
          return NextResponse.json({
            success: false,
            error: usersError.message,
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          users: allUsers || [],
        })

      case "getPaymentRequests":
        const { data: paymentRequests, error: paymentsError } = await supabase
          .from("payment_requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (paymentsError) {
          console.error("Error fetching payments:", paymentsError)
          return NextResponse.json({
            success: false,
            error: paymentsError.message,
          }, { status: 500 })
        }

        // Transform to match expected format
        const transformedPayments = paymentRequests?.map(p => ({
          phoneNumber: p.phone_number,
          paymentMethod: p.payment_method,
          amount: p.amount,
          timestamp: p.created_at,
          status: p.status,
          userInfo: {
            name: p.user_name,
            location: p.user_location,
            idNumber: p.user_id_number,
          },
          mtnReferenceId: p.mtn_reference_id,
          mtnStatus: p.mtn_status,
          financialTransactionId: p.financial_transaction_id,
          confirmedAt: p.confirmed_at,
          confirmedBy: p.confirmed_by,
        })) || []

        return NextResponse.json({
          success: true,
          paymentRequests: transformedPayments,
        })

      case "submitPayment":
        const { 
          phoneNumber: payPhone, 
          paymentMethod, 
          amount, 
          userInfo, 
          mtnReferenceId, 
          mtnStatus, 
          financialTransactionId 
        } = body

        const paymentStatus = mtnStatus === "SUCCESSFUL" ? "confirmed" : "pending"

        // Insert payment request
        const { error: paymentInsertError } = await supabase
          .from("payment_requests")
          .insert({
            phone_number: payPhone,
            payment_method: paymentMethod,
            amount: amount || 2000,
            status: paymentStatus,
            user_name: userInfo?.name || "Unknown User",
            user_location: userInfo?.location || "Unknown",
            user_id_number: userInfo?.idNumber || "Unknown",
            mtn_reference_id: mtnReferenceId || null,
            mtn_status: mtnStatus || null,
            financial_transaction_id: financialTransactionId || null,
            confirmed_at: mtnStatus === "SUCCESSFUL" ? new Date().toISOString() : null,
            confirmed_by: mtnStatus === "SUCCESSFUL" ? "MTN MoMo Auto" : null,
          })

        if (paymentInsertError) {
          console.error("Error inserting payment:", paymentInsertError)
          return NextResponse.json({
            success: false,
            error: paymentInsertError.message,
          }, { status: 500 })
        }

        // If MTN payment was successful, auto-add to premium users
        if (mtnStatus === "SUCCESSFUL") {
          const subscriptionEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

          // Check if user already has premium
          const { data: existingPremium } = await supabase
            .from("premium_users")
            .select("id")
            .eq("phone_number", payPhone)
            .single()

          if (existingPremium) {
            // Update existing premium subscription
            await supabase
              .from("premium_users")
              .update({
                subscription_end: subscriptionEnd,
                payment_amount: amount || 2000,
                mtn_reference_id: mtnReferenceId,
                financial_transaction_id: financialTransactionId,
                updated_at: new Date().toISOString(),
              })
              .eq("phone_number", payPhone)
          } else {
            // Insert new premium user
            await supabase
              .from("premium_users")
              .insert({
                phone_number: payPhone,
                full_name: userInfo?.name || "Premium User",
                is_premium: true,
                subscription_start: new Date().toISOString(),
                subscription_end: subscriptionEnd,
                payment_amount: amount || 2000,
                confirmed_by: "MTN MoMo Auto",
                mtn_reference_id: mtnReferenceId || null,
                financial_transaction_id: financialTransactionId || null,
              })
          }
        }

        return NextResponse.json({
          success: true,
          message: "Payment request submitted successfully",
        })

      case "confirmPayment":
        const { phoneNumber: confirmPhone, adminName } = body

        // Find pending payment request
        const { data: pendingPayment, error: findError } = await supabase
          .from("payment_requests")
          .select("*")
          .eq("phone_number", confirmPhone)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (findError || !pendingPayment) {
          return NextResponse.json({
            success: false,
            error: "Payment request not found",
          })
        }

        // Update payment status
        const { error: updatePaymentError } = await supabase
          .from("payment_requests")
          .update({
            status: "confirmed",
            confirmed_at: new Date().toISOString(),
            confirmed_by: adminName,
            updated_at: new Date().toISOString(),
          })
          .eq("id", pendingPayment.id)

        if (updatePaymentError) {
          console.error("Error updating payment:", updatePaymentError)
          return NextResponse.json({
            success: false,
            error: updatePaymentError.message,
          }, { status: 500 })
        }

        // Check if user already has premium
        const { data: existingPremiumUser } = await supabase
          .from("premium_users")
          .select("id")
          .eq("phone_number", confirmPhone)
          .single()

        const subscriptionEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        if (existingPremiumUser) {
          // Update existing premium subscription
          await supabase
            .from("premium_users")
            .update({
              subscription_end: subscriptionEndDate,
              payment_amount: pendingPayment.amount,
              confirmed_by: adminName,
              updated_at: new Date().toISOString(),
            })
            .eq("phone_number", confirmPhone)
        } else {
          // Add to premium users
          await supabase
            .from("premium_users")
            .insert({
              phone_number: confirmPhone,
              full_name: pendingPayment.user_name || "Premium User",
              is_premium: true,
              subscription_start: new Date().toISOString(),
              subscription_end: subscriptionEndDate,
              payment_amount: pendingPayment.amount,
              confirmed_by: adminName,
            })
        }

        return NextResponse.json({
          success: true,
          message: "Payment confirmed successfully",
        })

      case "rejectPayment":
        const { phoneNumber: rejectPhone, adminName: rejectAdmin, reason } = body

        // Find pending payment request
        const { data: rejectPayment, error: rejectFindError } = await supabase
          .from("payment_requests")
          .select("id")
          .eq("phone_number", rejectPhone)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (rejectFindError || !rejectPayment) {
          return NextResponse.json({
            success: false,
            error: "Payment request not found",
          })
        }

        // Update payment status to rejected
        const { error: rejectUpdateError } = await supabase
          .from("payment_requests")
          .update({
            status: "rejected",
            confirmed_by: rejectAdmin,
            confirmed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", rejectPayment.id)

        if (rejectUpdateError) {
          console.error("Error rejecting payment:", rejectUpdateError)
          return NextResponse.json({
            success: false,
            error: rejectUpdateError.message,
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "Payment rejected successfully",
        })

      case "getPremiumUsers":
        const { data: premUsers, error: premUsersError } = await supabase
          .from("premium_users")
          .select("*")
          .order("created_at", { ascending: false })

        if (premUsersError) {
          console.error("Error fetching premium users:", premUsersError)
          return NextResponse.json({
            success: false,
            error: premUsersError.message,
          }, { status: 500 })
        }

        // Transform to match expected format
        const transformedPremUsers = premUsers?.map(p => ({
          phoneNumber: p.phone_number,
          name: p.full_name,
          isPremium: p.is_premium,
          subscriptionStart: p.subscription_start,
          subscriptionEnd: p.subscription_end,
          paymentAmount: p.payment_amount,
          confirmedBy: p.confirmed_by,
          mtnReferenceId: p.mtn_reference_id,
          financialTransactionId: p.financial_transaction_id,
        })) || []

        return NextResponse.json({
          success: true,
          premiumUsers: transformedPremUsers,
        })

      case "checkPremiumStatus":
        const { phoneNumber: checkPhone } = body

        const { data: premiumStatus, error: checkError } = await supabase
          .from("premium_users")
          .select("*")
          .eq("phone_number", checkPhone)
          .single()

        if (checkError || !premiumStatus) {
          return NextResponse.json({
            success: true,
            isPremium: false,
          })
        }

        // Check if subscription is still valid
        const isValid = new Date(premiumStatus.subscription_end) > new Date()

        return NextResponse.json({
          success: true,
          isPremium: isValid,
          subscriptionEnd: premiumStatus.subscription_end,
        })

      case "removePremiumUser":
        const { phoneNumber: removePhone } = body

        const { error: removeError } = await supabase
          .from("premium_users")
          .delete()
          .eq("phone_number", removePhone)

        if (removeError) {
          console.error("Error removing premium user:", removeError)
          return NextResponse.json({
            success: false,
            error: removeError.message,
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "Premium user removed successfully",
        })

      case "createAdmin":
        const { fullName: adminFullName, phoneNumber: adminPhone, password: adminPassword } = body

        // Hash admin password
        const adminHashedPassword = await bcrypt.hash(adminPassword, 10)

        const { error: createAdminError } = await supabase
          .from("admins")
          .insert({
            phone_number: adminPhone,
            full_name: adminFullName,
            password_hash: adminHashedPassword,
            role: "admin",
          })

        if (createAdminError) {
          console.error("Error creating admin:", createAdminError)
          return NextResponse.json({
            success: false,
            error: createAdminError.message,
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "Admin created successfully",
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
