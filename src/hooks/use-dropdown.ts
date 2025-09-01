"use client"

import { useEffect } from "react"

export const useDropdown = () => {
  const closeAllDropdowns = () => {
    const event = new CustomEvent("closeAllDropdowns")
    window.dispatchEvent(event)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-dropdown]")) {
        closeAllDropdowns()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return { closeAllDropdowns }
}
