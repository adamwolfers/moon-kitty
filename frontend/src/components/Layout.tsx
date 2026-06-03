import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-display text-glow tracking-tight">
          Moon Kitty
        </h1>
        <p className="text-starlight mt-2 text-lg">
          Your lunar feline companion
        </p>
        <nav className="mt-4 flex gap-4 justify-center text-sm">
          {location.pathname !== '/' && (
            <Link to="/" className="text-purr-ple hover:text-glow transition-colors">
              Tonight
            </Link>
          )}
          {location.pathname !== '/gallery' && (
            <Link to="/gallery" className="text-purr-ple hover:text-glow transition-colors">
              All Phases
            </Link>
          )}
        </nav>
      </header>
      <main className="w-full max-w-lg">
        {children}
      </main>
    </div>
  )
}
