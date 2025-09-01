"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface YearDropdownProps {
  value: string
  onChange: (year: string) => void
  placeholder: string
  startYear: number
  endYear: number
  error?: string
  accentColor: string
}

export const YearDropdown: React.FC<YearDropdownProps> = ({
  value,
  onChange,
  placeholder,
  startYear,
  endYear,
  error,
  accentColor,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleCloseAll = () => setIsOpen(false)
    window.addEventListener("closeAllDropdowns", handleCloseAll)
    return () => window.removeEventListener("closeAllDropdowns", handleCloseAll)
  }, [])

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)

  return (
    <div className="relative" data-dropdown>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 flex items-center justify-between ${
          error ? "border-2 border-red-500 bg-red-50" : "border border-gray-200 bg-gray-50 hover:border-gray-300"
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => {
                onChange(year.toString())
                setIsOpen(false)
              }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700"
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
