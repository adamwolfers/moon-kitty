import { MoonIcon } from './MoonIcon'
import { LoadingSkeleton } from './LoadingSkeleton'
import type { MoonPhaseData } from '../types/moon'

interface MoonPhaseDisplayProps {
  data: MoonPhaseData | null
  error?: string | null
}

export function MoonPhaseDisplay({ data, error }: MoonPhaseDisplayProps) {
  if (error) {
    return (
      <div role="alert" className="text-center text-purr-ple">
        <p>{error}</p>
      </div>
    )
  }

  if (!data) {
    return <LoadingSkeleton />
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
