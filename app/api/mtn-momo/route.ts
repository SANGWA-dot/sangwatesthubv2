import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// MTN MoMo Sandbox Configuration
const MTN_BASE_URL = "https://sandbox.momodeveloper.mtn.com"
const MTN_COLLECTION_URL = `${MTN_BASE_URL}/collection`
const MTN_TARGET_ENVIRONMENT = "sandbox"
const MTN_CURRENCY = "EUR" // Sandbox uses EUR

// Get credentials from environment variables
function getCredentials() {
  const apiUser = process.env.MTN_MOMO_API_USER
  const apiKey = process.env.MTN_MOMO_API_KEY
  const subscriptionKey = process.env.MTN_MOMO_SUBSCRIPTION_KEY

  if (!apiUser || !apiKey || !subscriptionKey) {
    throw new Error("MTN MoMo credentials not configured. Please set MTN_MOMO_API_USER, MTN_MOMO_API_KEY, and MTN_MOMO_SUBSCRIPTION_KEY environment variables.")
  }

  return { apiUser, apiKey, subscriptionKey }
}

// Generate OAuth2 access token for Collection
async function getAccessToken(): Promise<string> {
  const { apiUser, apiKey, subscriptionKey } = getCredentials()
  
  const basicAuth = Buffer.from(`${apiUser}:${apiKey}`).toString("base64")

  const response = await fetch(`${MTN_COLLECTION_URL}/token/`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Token error response:", response.status, errorText)
    throw new Error(`Failed to get access token: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.access_token
}

// Request to Pay - initiate a payment request to the user's phone
async function requestToPay(
  amount: string,
  phoneNumber: string,
  externalId: string,
  payerMessage: string,
  payeeNote: string,
): Promise<{ referenceId: string }> {
  const { subscriptionKey } = getCredentials()
  const accessToken = await getAccessToken()
  const referenceId = crypto.randomUUID()

  // Format phone number: remove leading 0 and add country code 250 (Rwanda)
  const formattedPhone = phoneNumber.startsWith("0")
    ? `250${phoneNumber.substring(1)}`
    : phoneNumber.startsWith("250")
      ? phoneNumber
      : `250${phoneNumber}`

  const requestBody = {
    amount: amount,
    currency: MTN_CURRENCY,
    externalId: externalId,
    payer: {
      partyIdType: "MSISDN",
      partyId: formattedPhone,
    },
    payerMessage: payerMessage,
    payeeNote: payeeNote,
  }

  console.log("Request to Pay body:", JSON.stringify(requestBody))
  console.log("Reference ID:", referenceId)

  const response = await fetch(`${MTN_COLLECTION_URL}/v1_0/requesttopay`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "X-Reference-Id": referenceId,
      "X-Target-Environment": MTN_TARGET_ENVIRONMENT,
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Request to Pay error:", response.status, errorText)
    throw new Error(`Request to Pay failed: ${response.status} - ${errorText}`)
  }

  // 202 Accepted means the request was successfully submitted
  return { referenceId }
}

// Check the status of a Request to Pay transaction
async function getTransactionStatus(referenceId: string): Promise<any> {
  const { subscriptionKey } = getCredentials()
  const accessToken = await getAccessToken()

  const response = await fetch(
    `${MTN_COLLECTION_URL}/v1_0/requesttopay/${referenceId}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "X-Target-Environment": MTN_TARGET_ENVIRONMENT,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Transaction status error:", response.status, errorText)
    throw new Error(`Failed to get transaction status: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

// Get account balance
async function getAccountBalance(): Promise<any> {
  const { subscriptionKey } = getCredentials()
  const accessToken = await getAccessToken()

  const response = await fetch(`${MTN_COLLECTION_URL}/v1_0/account/balance`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "X-Target-Environment": MTN_TARGET_ENVIRONMENT,
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to get balance: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case "requestToPay": {
        const { amount, phoneNumber, payerMessage, payeeNote } = body
        
        if (!amount || !phoneNumber) {
          return NextResponse.json(
            { success: false, error: "Amount and phone number are required" },
            { status: 400 },
          )
        }

        const externalId = `SANGWA-${Date.now()}-${Math.random().toString(36).substring(7)}`
        
        const result = await requestToPay(
          amount.toString(),
          phoneNumber,
          externalId,
          payerMessage || "Kwishyura Sangwa Test Hub Premium - 2,000 RWF",
          payeeNote || "Sangwa Test Hub Premium Subscription",
        )

        return NextResponse.json({
          success: true,
          referenceId: result.referenceId,
          externalId,
          message: "Payment request sent to your phone. Please check and confirm.",
        })
      }

      case "checkStatus": {
        const { referenceId } = body
        
        if (!referenceId) {
          return NextResponse.json(
            { success: false, error: "Reference ID is required" },
            { status: 400 },
          )
        }

        const status = await getTransactionStatus(referenceId)

        return NextResponse.json({
          success: true,
          status: status.status, // SUCCESSFUL, FAILED, PENDING
          financialTransactionId: status.financialTransactionId,
          reason: status.reason,
          amount: status.amount,
          currency: status.currency,
          payer: status.payer,
          externalId: status.externalId,
        })
      }

      case "getBalance": {
        const balance = await getAccountBalance()

        return NextResponse.json({
          success: true,
          availableBalance: balance.availableBalance,
          currency: balance.currency,
        })
      }

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 },
        )
    }
  } catch (error: any) {
    console.error("MTN MoMo API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}
