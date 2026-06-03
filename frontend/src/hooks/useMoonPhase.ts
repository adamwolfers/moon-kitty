import { useState, useEffect } from 'react'
import { fetchMoonPhase } from '../api/moonClient'
import type { MoonPhaseData } from '../types/moon'

export function useMoonPhase() {
  const [data, setData] = useState<MoonPhaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchMoonPhase()
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
