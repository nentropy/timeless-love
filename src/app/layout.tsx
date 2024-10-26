'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Breadcrumbs from './components/Breadcrumbs'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <Breadcrumbs pathname={pathname} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}