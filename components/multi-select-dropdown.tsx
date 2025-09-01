"use client"

import { multiSelectStyles, chipStyles, getColorClasses } from "../styles/components"

interface MultiSelectDropdownProps {
  label: string
  options: string[]
  selectedValues: string[]
  onSelect: (value: string) => void
  onRemove: (value: string) => void
  isOpen: boolean
  onToggle: () => void
  placeholder: string
  error?: string
  accentColor: string
}

export function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onSelect,
  onRemove,
  isOpen,
  onToggle,
  placeholder,
  error,
  accentColor,
}: MultiSelectDropdownProps) {
  const colors = getColorClasses(accentColor)
  
  return (
    <div className={multiSelectStyles.container}>
      <label className={multiSelectStyles.label}>{label}</label>
      <div
        data-dropdown
        className={`${multiSelectStyles.trigger.base} ${
          error ? multiSelectStyles.trigger.error : `${multiSelectStyles.trigger.normal} ${colors.focus}`
        }`}
        onClick={onToggle}
      >
        <div className={multiSelectStyles.content}>
          {selectedValues.length > 0 ? (
            selectedValues.map((value) => (
              <span
                key={value}
                className={`${chipStyles.base} ${colors.chip}`}
              >
                {value}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(value)
                  }}
                  className={`${chipStyles.removeButton} ${colors.text} ${colors.chipHover}`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className={multiSelectStyles.placeholder}>{placeholder}</span>
          )}
          <svg
            className={`${multiSelectStyles.arrow} ${isOpen ? multiSelectStyles.arrowOpen : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div data-dropdown className={multiSelectStyles.menu}>
          {options.map((option) => (
            <div
              key={option}
              className={`${multiSelectStyles.menuItem} ${
                selectedValues.includes(option) ? colors.selected : multiSelectStyles.menuItemSelected
              }`}
              onClick={() => onSelect(option)}
            >
              <span>{option}</span>
              {selectedValues.includes(option) && (
                <svg className={`${multiSelectStyles.checkIcon} ${colors.text}`} fill="currentColor" viewBox="0 0 20 20">
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

      {error && <p className={multiSelectStyles.error}>{error}</p>}
    </div>
  )
}
