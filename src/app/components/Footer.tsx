'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your Mailchimp list
    // For this example, we'll just log it to the console
    console.log('Submitting email:', email)
    // Reset the form
    setEmail('')
    alert('Thank you for signing up for alpha access!')
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Timeless Love</h3>
            <p className="text-sm">Capture and cherish your most precious moments.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
              <li><Link href="/gallery" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Gallery</Link></li>
              <li><Link href="/add-memory" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Add Memory</Link></li>
              <li><Link href="/about" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@timelesslove.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sign up for Alpha Access</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-center">
          © 2024 Timeless Love. All rights reserved.
        </div>
      </div>
    </footer>
  )
}