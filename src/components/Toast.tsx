import type React from "react"

interface ToastProps {
  message: string
  isVisible: boolean
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-2xl shadow-lg z-50 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"
      }`}
      style={{ backgroundColor: "#A0E4D0" }}
    >
      <p className="text-black font-medium">{message}</p>
    </div>
  )
}
