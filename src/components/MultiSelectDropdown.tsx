"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface MultiSelectDropdownProps {
  options: string[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder: string
  error?: string
  accentColor: string
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
  error,
  accentColor,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleCloseAll = () => setIsOpen(false)
    window.addEventListener("closeAllDropdowns", handleCloseAll)
    return () => window.removeEventListener("closeAllDropdowns", handleCloseAll)
  }, [])

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option))
    } else {
      onChange([...selectedValues, option])
    }
  }

  const removeChip = (option: string) => {
    onChange(selectedValues.filter((v) => v !== option))
  }

  return (
    <div className="relative" data-dropdown>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 min-h-[48px] flex flex-wrap items-center gap-2 ${
          error ? "border-2 border-red-500 bg-red-50" : "border border-gray-200 bg-gray-50 hover:border-gray-300"
        }`}
      >
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border border-gray-300 text-gray-700"
              style={{ backgroundColor: accentColor + "20" }}
            >
              {value}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeChip(value)
                }}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <svg
          className={`ml-auto w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
            >
              <span className="text-gray-700">{option}</span>
              {selectedValues.includes(option) && (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
