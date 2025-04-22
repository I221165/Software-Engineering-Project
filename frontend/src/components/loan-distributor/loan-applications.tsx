"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { getLoanApplications, updateLoanStatus } from "@/services/loanDistributorService"
import { toast } from "@/components/ui/use-toast"

interface LoanApplication {
  id: string
  userId: string
  userName: string
  amount: number
  purpose: string
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  creditScore: number
}

export function LoanApplications() {
  const [applications, setApplications] = useState<LoanApplication[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const data = await getLoanApplications()
      setApplications(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load loan applications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId: string, status: "approved" | "rejected") => {
    try {
      await updateLoanStatus(applicationId, status)
      toast({
        title: "Success",
        description: `Loan application ${status} successfully`,
      })
      loadApplications() // Reload the list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update loan status",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Loan Applications</h2>
        <Button onClick={() => router.push("/loan-distributor/tax-calculator")}>
          Tax Calculator
        </Button>
      </div>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{application.userName}</CardTitle>
                <Badge className={getStatusColor(application.status)}>
                  {application.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-semibold">${application.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purpose</p>
                  <p className="text-lg font-semibold">{application.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                  <p className="text-lg font-semibold">{application.creditScore}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-lg font-semibold">
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/loan-distributor/applications/${application.id}`)}
                >
                  View Details
                </Button>
                {application.status === "pending" && (
                  <>
                    <Button
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusUpdate(application.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusUpdate(application.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 