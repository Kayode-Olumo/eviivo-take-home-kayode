# Eviivo Book App

A modern web application for managing your personal book collection and author database.

## Overview

This is a React-based web application built with Next.js that allows users to:
- Add and manage books with titles, genres, and publication years
- Add and manage authors with biographical information
- Organize their personal library collection

## Features

- **Book Management**: Add books with title, genre selection, and publication year
- **Author Management**: Add authors with first name, last name, and birth year
- **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations
- **Form Validation**: Real-time validation with error handling
- **Toast Notifications**: User feedback for successful submissions

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React hooks and custom hooks

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
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and design system
└── public/            # Static assets
```

## Design System

The app uses a custom design system with:
- Color palette with gradients and accent colors
- Typography system with custom fonts
- Spacing and border radius tokens
- Component variants for consistent styling