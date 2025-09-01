import React, { useState } from "react"
import { useToast } from "./hooks/use-toast"
import { useDropdown } from "./hooks/use-dropdown"
import { useFormValidation } from "./hooks/use-form-validation"
import { MultiSelectDropdown } from "./components/MultiSelectDropdown"
import { YearDropdown } from "./components/YearDropdown"
import { Toast } from "./components/Toast"
import "./App.css"

interface BookForm {
  title: string
  genre: string[]
  publishedYear: string
}

interface AuthorForm {
  firstName: string
  lastName: string
  birthYear: string
}

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
]

function App() {
  const [activeTab, setActiveTab] = useState<"books" | "authors">("books")
  const { toast, showToast } = useToast()
  const { closeAllDropdowns } = useDropdown()

  const [bookForm, setBookForm] = useState<BookForm>({
    title: "",
    genre: [],
    publishedYear: "",
  })

  const [authorForm, setAuthorForm] = useState<AuthorForm>({
    firstName: "",
    lastName: "",
    birthYear: "",
  })

  const [bookErrors, setBookErrors] = useState<Record<string, string>>({})
  const [authorErrors, setAuthorErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { validateBookForm } = useFormValidation()

  const validateAuthorForm = (form: AuthorForm) => {
    const errors: Record<string, string> = {}

    if (!form.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!form.birthYear) {
      errors.birthYear = "Birth year is required"
    } else {
      const year = Number.parseInt(form.birthYear)
      const currentYear = new Date().getFullYear()
      if (year < 1900 || year > currentYear) {
        errors.birthYear = `Birth year must be between 1900 and ${currentYear}`
      }
    }

    return errors
  }

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const errors = validateBookForm(bookForm)
    setBookErrors(errors)

    if (Object.keys(errors).length === 0) {
      alert(JSON.stringify(bookForm, null, 2))

      showToast("Book submitted successfully!")

      setBookForm({ title: "", genre: [], publishedYear: "" })
    }

    setIsSubmitting(false)
  }

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const errors = validateAuthorForm(authorForm)
    setAuthorErrors(errors)

    if (Object.keys(errors).length === 0) {
      alert(JSON.stringify(authorForm, null, 2))

      showToast("Author submitted successfully!")

      setAuthorForm({ firstName: "", lastName: "", birthYear: "" })
    }

    setIsSubmitting(false)
  }

  const clearBookError = (field: string, value: string) => {
    if (bookErrors[field]) {
      const errors = validateBookForm({ ...bookForm, [field]: value })
      if (!errors[field]) {
        setBookErrors((prev) => ({ ...prev, [field]: "" }))
      }
    }
  }

  const clearAuthorError = (field: string, value: string) => {
    if (authorErrors[field]) {
      const errors = validateAuthorForm({ ...authorForm, [field]: value })
      if (!errors[field]) {
        setAuthorErrors((prev) => ({ ...prev, [field]: "" }))
      }
    }
  }

  const handleGenreSelect = (genre: string) => {
    const newGenres = bookForm.genre.includes(genre)
      ? bookForm.genre.filter((g) => g !== genre)
      : [...bookForm.genre, genre]

    setBookForm({ ...bookForm, genre: newGenres })
    clearBookError("genre", newGenres.join(","))
  }

  const currentYear = new Date().getFullYear()
  const publishedYearOptions = Array.from({ length: currentYear - 1799 }, (_, i) => currentYear - i)
  const birthYearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)

  return (
    <div className="min-h-screen bg-white">
      <Toast message={toast?.message || ""} visible={!!toast} isVisible={toast?.isVisible || false} />

      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 relative p-8">
          <div className="w-full bg-gradient-to-br from-[#FFC8E1] via-[#A0E4D0] to-[#AFC9DC] relative rounded-3xl">
            <div className="absolute bottom-0 left-0 right-0 p-12 text-black">
              <h2 className="text-5xl font-black mb-4 leading-tight">
                Organise Your <em className="italic font-medium">Library</em>
              </h2>
              <p className="text-lg text-black/70 leading-relaxed max-w-md font-medium">
                Keep track of your favourite books and authors. Build your personal collection, one entry at a time.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">LIBRARY COLLECTION</p>
              <h1 className="text-4xl font-black text-black mb-6 leading-tight">
                Add Your{" "}
                <span className="font-medium">
                  / <em className="italic font-medium">{activeTab === "books" ? "Books" : "Authors"}</em>
                </span>
              </h1>

              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setActiveTab("books")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "books"
                      ? "bg-[#A0E4D0] text-black"
                      : "text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  Books
                </button>
                <button
                  onClick={() => setActiveTab("authors")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "authors"
                      ? "bg-[#D9C5E6] text-black"
                      : "text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  Authors
                </button>
              </div>
            </div>

            {activeTab === "books" ? (
              <form onSubmit={handleBookSubmit} className="space-y-6">
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
                      clearBookError("title", e.target.value)
                    }}
                    className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all focus:outline-none ${
                      bookErrors.title
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#A0E4D0] focus:ring-2 focus:ring-[#A0E4D0]/20"
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
                  onRemove={(genre) => handleGenreSelect(genre)}
                  isOpen={false}
                  onToggle={() => {}}
                  placeholder="Select genres"
                  error={bookErrors.genre}
                  accentColor="#A0E4D0"
                />

                <YearDropdown
                  label="Published Year*"
                  value={bookForm.publishedYear}
                  onChange={(year) => {
                    setBookForm({ ...bookForm, publishedYear: year })
                    clearBookError("publishedYear", year)
                  }}
                  options={publishedYearOptions}
                  isOpen={false}
                  onToggle={() => {}}
                  placeholder="Select published year"
                  error={bookErrors.publishedYear}
                  accentColor="#A0E4D0"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#A0E4D0] text-black font-medium py-3 px-6 rounded-lg hover:bg-[#A0E4D0]/90 transition-all text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAuthorSubmit} className="space-y-6">
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
                      clearAuthorError("firstName", e.target.value)
                    }}
                    className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all focus:outline-none ${
                      authorErrors.firstName
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#D9C5E6] focus:ring-2 focus:ring-[#D9C5E6]/20"
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
                      clearAuthorError("lastName", e.target.value)
                    }}
                    className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all focus:outline-none ${
                      authorErrors.lastName
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#D9C5E6] focus:ring-2 focus:ring-[#D9C5E6]/20"
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
                    clearAuthorError("birthYear", year)
                  }}
                  options={birthYearOptions}
                  isOpen={false}
                  onToggle={() => {}}
                  placeholder="Select birth year"
                  error={authorErrors.birthYear}
                  accentColor="#D9C5E6"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D9C5E6] text-black font-medium py-3 px-6 rounded-lg hover:bg-[#D9C5E6]/90 transition-all text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
