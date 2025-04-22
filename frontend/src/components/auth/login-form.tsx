"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/services/authService"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      setError(null)
      const user = await login(values.email, values.password)
      
      // Role-based redirection
      if (user) {
        switch (user.role) {
          case "admin":
            router.push("/admin")
            break
          case "bankManager":
            router.push("/client-summaries")
            break
          case "loanDistributor":
            router.push("/loan-distributor")
            break
          case "financial_advisor":
            router.push("/advisor")
            break
          case "premium":
            router.push("/premium/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Email"
            type="email"
            {...form.register("email")}
            disabled={loading}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Password"
            type="password"
            {...form.register("password")}
            disabled={loading}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="text-sm text-gray-500">
        <p>Demo credentials:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Regular User: john@example.com</li>
          <li>Premium User: jane@example.com</li>
          <li>Admin: admin@example.com</li>
          <li>Loan Distributor: loan@example.com</li>
          <li>Bank Manager: bank@example.com</li>
        </ul>
      </div>
    </div>
  )
}
