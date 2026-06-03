import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMoonPhase } from '../useMoonPhase'
import * as moonClient from '../../api/moonClient'
import type { MoonPhaseData } from '../../types/moon'

const mockData: MoonPhaseData = {
  phase_name: 'Waning Gibbous',
  illumination: 96,
  phase_emoji: '🌖',
  cat_description: 'The moon is winding down, like a cat after a long play session',
}

describe('useMoonPhase', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in a loading state', () => {
    vi.spyOn(moonClient, 'fetchMoonPhase').mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useMoonPhase())

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('returns data on success', async () => {
    vi.spyOn(moonClient, 'fetchMoonPhase').mockResolvedValue(mockData)

    const { result } = renderHook(() => useMoonPhase())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('returns error on failure', async () => {
    vi.spyOn(moonClient, 'fetchMoonPhase').mockRejectedValue(new Error('API error: 500'))

    const { result } = renderHook(() => useMoonPhase())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe('API error: 500')
  })
})
