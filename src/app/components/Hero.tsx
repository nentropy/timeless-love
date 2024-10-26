'use client';

import { Button } from "./ui/button"
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Capture Your Timeless Moments</h1>
        <p className="text-xl mb-8">Create, store, and share your precious memories with loved ones.</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/add-memory">Create Memory</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gallery">Explore Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}