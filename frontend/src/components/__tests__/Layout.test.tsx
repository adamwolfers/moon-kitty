import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Layout } from '../Layout'

describe('Layout', () => {
  it('renders children', () => {
    render(<Layout><p>Hello Moon</p></Layout>)
    expect(screen.getByText('Hello Moon')).toBeInTheDocument()
  })

  it('renders with a main landmark', () => {
    render(<Layout><p>content</p></Layout>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('displays the app title', () => {
    render(<Layout><p>content</p></Layout>)
    expect(screen.getByText('Moon Kitty')).toBeInTheDocument()
  })
})
