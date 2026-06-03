import { MoonPhaseDisplay } from './MoonPhaseDisplay'
import type { MoonPhaseData } from '../types/moon'

const ALL_PHASES: MoonPhaseData[] = [
  { phase_name: 'New Moon', illumination: 0, phase_emoji: '\u{1F311}', cat_description: 'The New Mew-n is hiding, just like a cat in a cardboard box' },
  { phase_name: 'Waxing Crescent', illumination: 25, phase_emoji: '\u{1F312}', cat_description: "A sliver of moonlight appears, like a cat's eye opening from a nap" },
  { phase_name: 'First Quarter', illumination: 50, phase_emoji: '\u{1F313}', cat_description: 'The half moon hangs like a cat perched on a windowsill' },
  { phase_name: 'Waxing Gibbous', illumination: 75, phase_emoji: '\u{1F314}', cat_description: 'The moon is almost full, round as a well-fed kitty' },
  { phase_name: 'Full Moon', illumination: 100, phase_emoji: '\u{1F315}', cat_description: 'The Full Meow-n shines bright, time for midnight zoomies' },
  { phase_name: 'Waning Gibbous', illumination: 96, phase_emoji: '\u{1F316}', cat_description: 'The moon is winding down, like a cat after a long play session' },
  { phase_name: 'Last Quarter', illumination: 50, phase_emoji: '\u{1F317}', cat_description: 'Half the moon remains, like a cat half-hidden under a blanket' },
  { phase_name: 'Waning Crescent', illumination: 10, phase_emoji: '\u{1F318}', cat_description: 'Just a whisker of moon left before the sky goes dark' },
]

export function PhaseGallery() {
  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-2xl font-display text-glow text-center">All Moon Phases</h2>
      {ALL_PHASES.map((phase) => (
        <div key={phase.phase_name} className="border border-stardust rounded-lg p-8">
          <MoonPhaseDisplay data={phase} />
        </div>
      ))}
      <div className="border border-stardust rounded-lg p-8">
        <p className="text-whisker text-center text-sm mb-4">Loading state:</p>
        <MoonPhaseDisplay data={null} />
      </div>
      <div className="border border-stardust rounded-lg p-8">
        <p className="text-whisker text-center text-sm mb-4">Error state:</p>
        <MoonPhaseDisplay data={null} error="Failed to fetch moon phase data" />
      </div>
    </div>
  )
}
