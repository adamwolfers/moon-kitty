import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-md">
            <p className="text-6xl mb-4">🐱</p>
            <h2 className="text-2xl font-display text-glow mb-2">
              Something went wrong
            </h2>
            <p className="text-starlight">
              Even cats land on their feet sometimes. Try refreshing the page.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
