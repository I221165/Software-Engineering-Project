import type { LoanApplication } from "@/types"

// Dummy data for loan applications
const dummyApplications: LoanApplication[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    amount: 5000,
    purpose: "Home Renovation",
    status: "pending",
    submittedDate: "2024-04-18",
    creditScore: 750,
    financialHistory: {
      monthlyIncome: 5000,
      monthlyExpenses: 3000,
      savings: 10000,
      existingLoans: 1,
      paymentHistory: "Good",
    },
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    amount: 10000,
    purpose: "Business Expansion",
    status: "pending",
    submittedDate: "2024-04-17",
    creditScore: 680,
    financialHistory: {
      monthlyIncome: 6000,
      monthlyExpenses: 4000,
      savings: 15000,
      existingLoans: 0,
      paymentHistory: "Excellent",
    },
  },
]

// Get all loan applications
export const getLoanApplications = async (): Promise<LoanApplication[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyApplications)
    }, 500)
  })
}

// Get a specific loan application
export const getLoanApplication = async (id: string): Promise<LoanApplication | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const application = dummyApplications.find((app) => app.id === id)
      resolve(application || null)
    }, 500)
  })
}

// Update loan application status
export const updateLoanStatus = async (
  id: string,
  status: "approved" | "rejected"
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const application = dummyApplications.find((app) => app.id === id)
      if (application) {
        application.status = status
        // In a real app, this would send a notification to the user
        console.log(`Notification sent to user ${application.userId} about loan ${status}`)
      }
      resolve()
    }, 500)
  })
}

// Calculate tax for a loan
export const calculateTax = async (amount: number): Promise<{
  principal: number
  taxRate: number
  taxAmount: number
  netAmount: number
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taxRate = 0.05 // 5% tax rate
      const taxAmount = amount * taxRate
      const netAmount = amount - taxAmount

      resolve({
        principal: amount,
        taxRate,
        taxAmount,
        netAmount,
      })
    }, 500)
  })
} 