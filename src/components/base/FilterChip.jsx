// Puce de filtre : l'état actif se voit par le fond ET par la coche, jamais par la couleur seule
export default function FilterChip({ pressed = false, disabled = false, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 disabled:cursor-not-allowed disabled:opacity-60 ${
        pressed ? 'border-brass-300 bg-brass-300 text-ink' : 'border-line text-parchment hover:border-brass-400'
      }`}
    >
      {pressed && (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {children}
    </button>
  )
}
