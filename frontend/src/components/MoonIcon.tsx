interface MoonIconProps {
  phaseEmoji: string
  phaseName: string
}

export function MoonIcon({ phaseEmoji, phaseName }: MoonIconProps) {
  return (
    <div
      aria-label={phaseName}
      className="text-9xl leading-none select-none drop-shadow-[0_0_40px_rgba(240,230,255,0.3)]"
    >
      {phaseEmoji}
    </div>
  )
}
