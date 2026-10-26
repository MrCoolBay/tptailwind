// Champ de formulaire : label toujours visible, aide et erreur reliées au champ par aria-describedby
export default function Field({ id, label, hint, error, as: Control = 'input', className = '', children, ...rest }) {
  const hintId = hint ? `${id}-hint` : null
  const errorId = error ? `${id}-error` : null
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}

      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`mt-2 block min-h-11 w-full rounded-xl border bg-ink px-3.5 text-base text-parchment transition placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? 'border-danger-400' : 'border-line hover:border-brass-500'
        }`}
        {...rest}
      >
        {children}
      </Control>

      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger-300">
          <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v6M12 16.5v.5" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
