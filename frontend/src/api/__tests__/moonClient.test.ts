import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchMoonPhase } from '../moonClient'
import type { MoonPhaseData } from '../../types/moon'

const mockData: MoonPhaseData = {
  phase_name: 'Waning Gibbous',
  illumination: 96,
  phase_emoji: '🌖',
  cat_description: 'The moon is winding down, like a cat after a long play session',
}

describe('fetchMoonPhase', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches moon phase data from the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    }))

    const result = await fetchMoonPhase()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/moon_phase')
    )
    expect(result).toEqual(mockData)
  })

  it('throws on HTTP error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }))

    await expect(fetchMoonPhase()).rejects.toThrow('API error: 500')
  })
})
