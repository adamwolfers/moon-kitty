import { MoonIcon } from './MoonIcon'
import type { MoonPhaseData } from '../types/moon'

interface MoonPhaseDisplayProps {
  data: MoonPhaseData | null
  error?: string | null
}

export function MoonPhaseDisplay({ data, error }: MoonPhaseDisplayProps) {
  if (error) {
    return (
      <div className="text-center text-red-300">
        <p>{error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center text-whisker animate-pulse">
        <p>Loading moon phase...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <MoonIcon phaseEmoji={data.phase_emoji} phaseName={data.phase_name} />
      <h2 className="text-3xl font-display text-glow">
        {data.phase_name}
      </h2>
      <p className="text-xl text-moon-gold font-semibold">
        {data.illumination}% illuminated
      </p>
      <p className="text-lg text-starlight italic max-w-md">
        {data.cat_description}
      </p>
    </div>
  )
}
