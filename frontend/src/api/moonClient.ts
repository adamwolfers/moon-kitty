import type { MoonPhaseData } from '../types/moon'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchMoonPhase(): Promise<MoonPhaseData> {
  const response = await fetch(`${API_BASE}/api/v1/moon_phase`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}
