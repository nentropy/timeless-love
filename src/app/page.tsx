import Hero from './components/Hero'
import { Button } from "./components/ui/button"
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Timeless Love?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface for effortless memory creation and sharing.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Secure Storage</h3>
              <p className="text-gray-600">Your memories are safely stored and protected.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Beautiful Presentation</h3>
              <p className="text-gray-600">Showcase your memories in stunning, customizable layouts.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Start Your Journey?</h2>
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}