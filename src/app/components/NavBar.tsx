'use client'

import Link from 'next/link'
import { Button } from "./ui/button"
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Timeless Love
        </Link>
        <ul className="hidden md:flex space-x-4">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/gallery" className="nav-link">Gallery</Link></li>
          <li><Link href="/add-memory" className="nav-link">Add Memory</Link></li>
          <li><Link href="/about" className="nav-link">About</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
          <Button>Sign up</Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
    </header>
  )
}