"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLoanApplication, updateLoanStatus } from "@/services/loanDistributorService"
import { toast } from "@/components/ui/use-toast"
import type { LoanApplication } from "@/types"

export function ApplicationDetails() {
  const [application, setApplication] = useState<LoanApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    loadApplication()
  }, [params.id])

  const loadApplication = async () => {
    try {
      const data = await getLoanApplication(params.id as string)
      setApplication(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load application details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    if (!application) return

    try {
      await updateLoanStatus(application.id, status)
      toast({
        title: "Success",
        description: `Loan application ${status} successfully`,
      })
      router.push("/loan-distributor")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update loan status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!application) {
    return <div>Application not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Application Details</h2>
        <Button variant="outline" onClick={() => router.push("/loan-distributor")}>
          Back to Applications
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Applicant</p>
                <p className="text-lg font-semibold">{application.userName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-lg font-semibold">${application.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Purpose</p>
                <p className="text-lg font-semibold">{application.purpose}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  className={
                    application.status === "pending"
                      ? "bg-yellow-500"
                      : application.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                >
                  {application.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial History */}
        <Card>
          <CardHeader>
            <CardTitle>Financial History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p className="text-lg font-semibold">{application.creditScore}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-lg font-semibold">
                  ${application.financialHistory.monthlyIncome.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-lg font-semibold">
                  ${application.financialHistory.monthlyExpenses.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-lg font-semibold">
                  ${application.financialHistory.savings.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Existing Loans</p>
                <p className="text-lg font-semibold">{application.financialHistory.existingLoans}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment History</p>
                <p className="text-lg font-semibold">{application.financialHistory.paymentHistory}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {application.status === "pending" && (
          <div className="flex gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleStatusUpdate("approved")}
            >
              Approve Application
            </Button>
            <Button variant="destructive" onClick={() => handleStatusUpdate("rejected")}>
              Reject Application
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 