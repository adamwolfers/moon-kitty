import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-display text-glow tracking-tight">
          Moon Kitty
        </h1>
        <p className="text-starlight mt-2 text-lg">
          Your celestial feline companion
        </p>
      </header>
      <main className="w-full max-w-lg">
        {children}
      </main>
    </div>
  )
}
