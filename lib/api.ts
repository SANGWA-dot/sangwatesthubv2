// API functions for the Sangwa Test Hub system
const API_BASE_URL = "/api"

export const api = {
  // User authentication
  async login(phoneNumber: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          phoneNumber,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      return await response.json()
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // User registration
  async register(userData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          ...userData,
        }),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      return await response.json()
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  // Get admin profile
  async getAdminProfile(phoneNumber: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin?phoneNumber=${phoneNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to get admin profile")
      }

      return await response.json()
    } catch (error) {
      console.error("Get admin profile error:", error)
      return { profilePicture: null }
    }
  },

  // Update admin profile
  async updateAdminProfile(phoneNumber: string, profilePicture: string | null) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "updateProfile",
          phoneNumber,
          profilePicture,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update admin profile")
      }

      return await response.json()
    } catch (error) {
      console.error("Update admin profile error:", error)
      throw error
    }
  },

  // Get payment requests
  async getPaymentRequests() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getPaymentRequests",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get payment requests")
      }

      return await response.json()
    } catch (error) {
      console.error("Get payment requests error:", error)
      return { paymentRequests: [] }
    }
  },

  // Confirm payment
  async confirmPayment(phoneNumber: string, adminName: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "confirmPayment",
          phoneNumber,
          adminName,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to confirm payment")
      }

      return await response.json()
    } catch (error) {
      console.error("Confirm payment error:", error)
      throw error
    }
  },

  // Reject payment
  async rejectPayment(phoneNumber: string, adminName: string, reason: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "rejectPayment",
          phoneNumber,
          adminName,
          reason,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to reject payment")
      }

      return await response.json()
    } catch (error) {
      console.error("Reject payment error:", error)
      throw error
    }
  },

  // Get all users
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getAllUsers",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get users")
      }

      return await response.json()
    } catch (error) {
      console.error("Get users error:", error)
      return { users: [] }
    }
  },

  // Submit payment request
  async submitPayment(paymentData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submitPayment",
          ...paymentData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit payment")
      }

      return await response.json()
    } catch (error) {
      console.error("Submit payment error:", error)
      throw error
    }
  },

  // MTN Mobile Money - Request to Pay
  async mtnRequestToPay(phoneNumber: string, amount: string = "2000") {
    try {
      const response = await fetch(`${API_BASE_URL}/mtn-momo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "requestToPay",
          amount,
          phoneNumber,
          payerMessage: "Kwishyura Sangwa Test Hub Premium - 2,000 RWF",
          payeeNote: "Sangwa Test Hub Premium Subscription",
        }),
      })

      if (!response.ok) {
        throw new Error("MTN MoMo request failed")
      }

      return await response.json()
    } catch (error) {
      console.error("MTN MoMo request error:", error)
      throw error
    }
  },

  // MTN Mobile Money - Check Transaction Status
  async mtnCheckStatus(referenceId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/mtn-momo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "checkStatus",
          referenceId,
        }),
      })

      if (!response.ok) {
        throw new Error("MTN MoMo status check failed")
      }

      return await response.json()
    } catch (error) {
      console.error("MTN MoMo status check error:", error)
      throw error
    }
  },

  // MTN Mobile Money - Get Account Balance
  async mtnGetBalance() {
    try {
      const response = await fetch(`${API_BASE_URL}/mtn-momo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getBalance",
        }),
      })

      if (!response.ok) {
        throw new Error("MTN MoMo balance check failed")
      }

      return await response.json()
    } catch (error) {
      console.error("MTN MoMo balance check error:", error)
      throw error
    }
  },
}
