"use client"

import type React from "react"
import { useState } from "react"
import { useFormValidation } from "../hooks/use-form-validation"
import { useToast } from "../hooks/use-toast"
import { useDropdown } from "../hooks/use-dropdown"
import { Toast } from "../components/toast"
import { MultiSelectDropdown } from "../components/multi-select-dropdown"
import { YearDropdown } from "../components/year-dropdown"
import { layoutStyles, gradientStyles, inputStyles, buttonStyles, tabStyles } from "../styles/components"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"book" | "author">("book")
  const { toast, showToast } = useToast()
  const { validateBookForm, validateAuthorForm } = useFormValidation()
  const {
    isGenreDropdownOpen,
    isPublishedYearDropdownOpen,
    isBirthYearDropdownOpen,
    setIsGenreDropdownOpen,
    setIsPublishedYearDropdownOpen,
    setIsBirthYearDropdownOpen,
    handleGenreDropdownToggle,
    handlePublishedYearDropdownToggle,
    handleBirthYearDropdownToggle,
  } = useDropdown()

  const [bookForm, setBookForm] = useState({
    title: "",
    genre: [] as string[],
    publishedYear: "",
  })

  const [authorForm, setAuthorForm] = useState({
    firstName: "",
    lastName: "",
    birthYear: "",
  })

  const [bookErrors, setBookErrors] = useState<Record<string, string>>({})
  const [authorErrors, setAuthorErrors] = useState<Record<string, string>>({})

  const genreOptions = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Poetry",
    "Drama",
    "Horror",
    "Adventure",
    "Comedy",
  ]

  const currentYear = new Date().getFullYear()
  const publishedYearOptions = Array.from({ length: currentYear - 1799 }, (_, i) => currentYear - i)
  const birthYearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateBookForm(bookForm)
    setBookErrors(errors)

    if (Object.keys(errors).length === 0) {
      showToast("Book has been submitted successfully!")
      alert(JSON.stringify(bookForm, null, 2))
    }
  }

  const handleAuthorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateAuthorForm(authorForm)
    setAuthorErrors(errors)

    if (Object.keys(errors).length === 0) {
      showToast("Author has been submitted successfully!")
      alert(JSON.stringify(authorForm, null, 2))
    }
  }

  const handleGenreSelect = (genre: string) => {
    if (bookForm.genre.includes(genre)) {
      setBookForm({
        ...bookForm,
        genre: bookForm.genre.filter((g) => g !== genre),
      })
    } else {
      setBookForm({
        ...bookForm,
        genre: [...bookForm.genre, genre],
      })
    }
    clearBookError("genre")
  }

  const removeGenre = (genreToRemove: string) => {
    setBookForm({
      ...bookForm,
      genre: bookForm.genre.filter((g) => g !== genreToRemove),
    })
    clearBookError("genre")
  }

  const clearBookError = (field: string) => {
    if (bookErrors[field]) {
      const currentErrors = validateBookForm(bookForm)
      if (!currentErrors[field]) {
        setBookErrors({ ...bookErrors, [field]: "" })
      }
    }
  }

  const clearAuthorError = (field: string) => {
    if (authorErrors[field]) {
      const currentErrors = validateAuthorForm(authorForm)
      if (!currentErrors[field]) {
        setAuthorErrors({ ...authorErrors, [field]: "" })
      }
    }
  }

  return (
    <div className={layoutStyles.page}>
      <Toast message={toast.message} visible={toast.visible} isVisible={toast.isVisible} />

      <div className={layoutStyles.main}>
        <div className={layoutStyles.sidebar}>
          <div className={gradientStyles.container}>
            <div className={gradientStyles.content}>
              <h2 className={gradientStyles.title}>
                Organise Your <em className="italic font-medium">Library</em>
              </h2>
              <p className={gradientStyles.subtitle}>
                Keep track of your favourite books and authors. Build your personal collection, one entry at a time.
              </p>
            </div>
          </div>
        </div>

        <div className={layoutStyles.content}>
          <div className={layoutStyles.formContainer}>

            <div className={layoutStyles.header}>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">LIBRARY COLLECTION</p>
              <h1 className="text-4xl font-black text-black mb-6 leading-tight">
                Add Your{" "}
                <span className="font-medium">
                  / <em className="italic font-medium">{activeTab === "book" ? "Books" : "Authors"}</em>
                </span>
              </h1>

              <div className={tabStyles.container}>
                <button
                  onClick={() => setActiveTab("book")}
                  className={`${tabStyles.button} ${
                    activeTab === "book"
                      ? "bg-[#A0E4D0] text-black"
                      : tabStyles.inactive
                  }`}
                >
                  Books
                </button>
                <button
                  onClick={() => setActiveTab("author")}
                  className={`${tabStyles.button} ${
                    activeTab === "author"
                      ? "bg-[#D9C5E6] text-black"
                      : tabStyles.inactive
                  }`}
                >
                  Authors
                </button>
              </div>
            </div>

            {activeTab === "book" ? (
              <form onSubmit={handleBookSubmit} className={layoutStyles.form}>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
                    Book Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={bookForm.title}
                    onChange={(e) => {
                      setBookForm({ ...bookForm, title: e.target.value })
                      clearBookError("title")
                    }}
                    className={`${inputStyles.base} ${
                      bookErrors.title
                        ? inputStyles.error
                        : `${inputStyles.normal} focus:border-[#A0E4D0] focus:ring-2 focus:ring-[#A0E4D0]/20`
                    }`}
                    placeholder="Enter book title"
                  />
                  {bookErrors.title && <p className="mt-2 text-sm text-red-500">{bookErrors.title}</p>}
                </div>

                <MultiSelectDropdown
                  label="Genre*"
                  options={genreOptions}
                  selectedValues={bookForm.genre}
                  onSelect={handleGenreSelect}
                  onRemove={removeGenre}
                  isOpen={isGenreDropdownOpen}
                  onToggle={handleGenreDropdownToggle}
                  placeholder="Select genres"
                  error={bookErrors.genre}
                  accentColor="#A0E4D0"
                />

                <YearDropdown
                  label="Published Year*"
                  value={bookForm.publishedYear}
                  onChange={(year) => {
                    setBookForm({ ...bookForm, publishedYear: year })
                    setIsPublishedYearDropdownOpen(false)
                    clearBookError("publishedYear")
                  }}
                  options={publishedYearOptions}
                  isOpen={isPublishedYearDropdownOpen}
                  onToggle={handlePublishedYearDropdownToggle}
                  placeholder="Select published year"
                  error={bookErrors.publishedYear}
                  accentColor="#A0E4D0"
                />

                <button
                  type="submit"
                  className={`${buttonStyles.base} bg-[#A0E4D0] text-black hover:bg-[#A0E4D0]/90`}
                >
                  Submit
                </button>
              </form>
            ) : (
              <form onSubmit={handleAuthorSubmit} className={layoutStyles.form}>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={authorForm.firstName}
                    onChange={(e) => {
                      setAuthorForm({ ...authorForm, firstName: e.target.value })
                      clearAuthorError("firstName")
                    }}
                    className={`${inputStyles.base} ${
                      authorErrors.firstName
                        ? inputStyles.error
                        : `${inputStyles.normal} focus:border-[#D9C5E6] focus:ring-2 focus:ring-[#D9C5E6]/20`
                    }`}
                    placeholder="Enter first name"
                  />
                  {authorErrors.firstName && <p className="mt-2 text-sm text-red-500">{authorErrors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={authorForm.lastName}
                    onChange={(e) => {
                      setAuthorForm({ ...authorForm, lastName: e.target.value })
                      clearAuthorError("lastName")
                    }}
                    className={`${inputStyles.base} ${
                      authorErrors.lastName
                        ? inputStyles.error
                        : `${inputStyles.normal} focus:border-[#D9C5E6] focus:ring-2 focus:ring-[#D9C5E6]/20`
                    }`}
                    placeholder="Enter last name"
                  />
                  {authorErrors.lastName && <p className="mt-2 text-sm text-red-500">{authorErrors.lastName}</p>}
                </div>

                <YearDropdown
                  label="Birth Year*"
                  value={authorForm.birthYear}
                  onChange={(year) => {
                    setAuthorForm({ ...authorForm, birthYear: year })
                    setIsBirthYearDropdownOpen(false)
                    clearAuthorError("birthYear")
                  }}
                  options={birthYearOptions}
                  isOpen={isBirthYearDropdownOpen}
                  onToggle={handleBirthYearDropdownToggle}
                  placeholder="Select birth year"
                  error={authorErrors.birthYear}
                  accentColor="#D9C5E6"
                />

                <button
                  type="submit"
                  className={`${buttonStyles.base} bg-[#D9C5E6] text-black hover:bg-[#D9C5E6]/90`}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
