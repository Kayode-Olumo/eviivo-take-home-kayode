export const multiSelectStyles = {
  container: "relative",
  label: "block text-sm font-medium text-black mb-2",
  
  trigger: {
    base: "w-full min-h-[48px] px-4 py-3 bg-gray-50 rounded-lg border cursor-pointer transition-all",
    error: "border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100",
    normal: "border-gray-200",
  },
  
  content: "flex flex-wrap gap-2 items-center",
  placeholder: "text-gray-400",
  arrow: "ml-auto w-5 h-5 text-gray-400 transition-transform",
  arrowOpen: "rotate-180",
  menu: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto",
  menuItem: "px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between",
  menuItemSelected: "text-gray-700",
  checkIcon: "w-5 h-5",
  error: "mt-2 text-sm text-red-500",
}

export const chipStyles = {
  base: "inline-flex items-center gap-1 px-2 py-1 text-sm rounded-md border",
  removeButton: "ml-1",
}

export const colorSchemes = {
  teal: {
    focus: "focus-within:border-teal-400 focus-within:ring-teal-100",
    chip: "bg-teal-100 text-teal-700 border-teal-200",
    chipHover: "hover:text-teal-600",
    selected: "bg-teal-50 text-teal-700",
    text: "text-teal-700",
  },
  purple: {
    focus: "focus-within:border-purple-400 focus-within:ring-purple-100",
    chip: "bg-purple-100 text-purple-700 border-purple-200",
    chipHover: "hover:text-purple-600",
    selected: "bg-purple-50 text-purple-700",
    text: "text-purple-700",
  },
}

export const getColorClasses = (accentColor: string) => {
  switch (accentColor) {
    case "#A0E4D0":
      return colorSchemes.teal
    case "#D9C5E6":
      return colorSchemes.purple
    default:
      return colorSchemes.teal
  }
}

export const inputStyles = {
  base: "w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all focus:outline-none",
  normal: "border-gray-200",
  error: "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100",
}

export const buttonStyles = {
  base: "w-full font-medium py-3 px-6 rounded-lg transition-all text-sm",
  primary: "text-black",
  secondary: "text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200",
}

export const tabStyles = {
  container: "flex gap-2 mb-8",
  button: "px-4 py-2 rounded-lg text-sm font-medium transition-all",
  active: "text-black",
  inactive: "text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200",
}

export const layoutStyles = {
  page: "min-h-screen bg-white",
  main: "flex min-h-screen",
  sidebar: "hidden lg:flex lg:w-1/2 relative p-8",
  content: "w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12",
  formContainer: "w-full max-w-md",
  header: "mb-8",
  form: "space-y-6",
}

export const gradientStyles = {
  container: "w-full bg-gradient-to-br from-[#FFC8E1] via-[#A0E4D0] to-[#AFC9DC] relative rounded-3xl",
  content: "absolute bottom-0 left-0 right-0 p-12 text-black",
  title: "text-5xl font-black mb-4 leading-tight",
  subtitle: "text-lg text-black/70 leading-relaxed max-w-md font-medium",
}
