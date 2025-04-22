export interface User {
  id: string
  name: string
  email: string
  role: "regular" | "premium" | "admin" | "loanDistributor" | "bankManager" | "financial_advisor"
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  category: string
  date: Date
  description?: string
  type: "income" | "expense"
}

export interface Budget {
  id: string
  userId: string
  month: number
  year: number
  categories: BudgetCategory[]
}

export interface BudgetCategory {
  category: string
  limit: number
  spent: number
}

export interface Bill {
  id: string
  userId: string
  name: string
  dueDate: Date
  amount: number
  isRecurring: boolean
}

export interface SavingsGoal {
  id: string
  userId: string
  name: string
  targetAmount: number
  currentAmount: number
}

export interface LoanApplication {
  id: string
  userId: string
  userName: string
  amount: number
  purpose: string
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  creditScore: number
  financialHistory: {
    monthlyIncome: number
    monthlyExpenses: number
    savings: number
    existingLoans: number
    paymentHistory: string
  }
}

export interface Notification {
  id: string
  title: string
  message: string
  recipient: string
  date: string
  read: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface DashboardStats {
  totalIncome: number
  totalExpense: number
  savingsRate: number
  upcomingBills: number
  pendingLoans: number
}

export type CategoryColors = Record<string, string>

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

export interface TaxCalculation {
  principal: number
  taxRate: number
  taxAmount: number
  netAmount: number
}

export type UserRole = "regular" | "premium" | "admin" | "loanDistributor" | "bankManager" | "financial_advisor";
