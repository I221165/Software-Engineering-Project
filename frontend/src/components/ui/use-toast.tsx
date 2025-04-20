"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface ToastProps {
  title: string
  description: string
  variant?: "default" | "destructive"
}

let toastContainer: HTMLDivElement | null = null

export function toast({ title, description, variant = "default" }: ToastProps) {
  if (typeof window === "undefined") return

  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "fixed top-4 right-4 z-50 flex flex-col gap-2"
    document.body.appendChild(toastContainer)
  }

  const toastElement = document.createElement("div")
  toastElement.className = `p-4 rounded-md shadow-md ${
    variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"
  }`
  toastElement.innerHTML = `
    <h3 class="font-bold">${title}</h3>
    <p>${description}</p>
  `

  toastContainer.appendChild(toastElement)

  setTimeout(() => {
    toastElement.remove()
  }, 3000)
} 