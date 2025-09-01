"use client"

import { useState, useCallback } from "react"

interface ToastState {
  message: string
  isVisible: boolean
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string) => {
    setToast({ message, isVisible: true })

    // Start fade out after 2.7 seconds
    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, isVisible: false } : null))
    }, 2700)

    // Remove from DOM after fade out completes
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }, [])

  return { toast, showToast }
}
