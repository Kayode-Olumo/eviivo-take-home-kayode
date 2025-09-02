# Eviivo Take Home - Book Collection App

A modern web application for managing your personal book collection and author database, built with Next.js and React.

## Overview

This is a React-based web application built with Next.js that allows users to:
- Add and manage books with titles, genres, and publication years
- Add and manage authors with biographical information
- Organize their personal library collection with a beautiful, responsive interface

## Features

- **Book Management**: Add books with title, multi-select genre, and publication year
- **Author Management**: Add authors with first name, last name, and birth year
- **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations
- **Form Validation**: Real-time validation with error handling and user feedback
- **Toast Notifications**: User feedback for successful submissions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Built with accessibility best practices

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript for type safety
- **State Management**: React hooks and custom hooks
- **Form Handling**: Custom form validation hooks
- **UI Components**: Custom components with organized styles

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── multi-select-dropdown.tsx
│   ├── year-dropdown.tsx
│   └── toast.tsx
├── hooks/                # Custom React hooks
│   ├── use-dropdown.ts
│   ├── use-form-validation.ts
│   ├── use-form.ts
│   └── use-toast.ts
├── styles/               # Organized component styles
│   └── components.ts
├── lib/                  # Utility functions and design system
│   ├── utils.ts
│   └── design-system.ts
└── public/               # Static assets
```

## Design System

The app uses a custom design system with:
- **Color Palette**: Teal (#A0E4D0) and Purple (#D9C5E6) accent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing tokens throughout the application
- **Components**: Organized style objects for maintainable code
- **Gradients**: Beautiful gradient backgrounds for visual appeal

## Key Components

### MultiSelectDropdown
- Handles genre selection with chip-style display
- Supports multiple selections with remove functionality
- Dynamic color theming based on accent colors

### YearDropdown
- Year selection for book publication and author birth years
- Dropdown interface with search functionality
- Validation for reasonable year ranges

### Form Validation
- Real-time validation with error messages
- Custom validation hooks for reusability
- User-friendly error display

## Browser Compatibility

- Modern browsers with ES6+ support
- Responsive design for all screen sizes
- Accessibility features for screen readers

## Deployment

The application can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Self-hosted solutions

## Development

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling