import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '../Layout'

function renderLayout(children: React.ReactNode, route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Layout>{children}</Layout>
    </MemoryRouter>
  )
}

describe('Layout', () => {
  it('renders children', () => {
    renderLayout(<p>Hello Moon</p>)
    expect(screen.getByText('Hello Moon')).toBeInTheDocument()
  })

  it('renders with a main landmark', () => {
    renderLayout(<p>content</p>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('displays the app title', () => {
    renderLayout(<p>content</p>)
    expect(screen.getByText('Moon Kitty')).toBeInTheDocument()
  })

  it('shows gallery link on root route', () => {
    renderLayout(<p>content</p>, '/')
    expect(screen.getByRole('link', { name: 'All Phases' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Tonight' })).not.toBeInTheDocument()
  })

  it('shows tonight link on gallery route', () => {
    renderLayout(<p>content</p>, '/gallery')
    expect(screen.getByRole('link', { name: 'Tonight' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'All Phases' })).not.toBeInTheDocument()
  })
})
