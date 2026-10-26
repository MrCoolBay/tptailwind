// Atome bouton : une API courte (variante, taille) plutôt que des classes libres
const variants = {
  primary: 'bg-brass-400 text-ink hover:bg-brass-300',
  secondary: 'border border-line text-parchment hover:border-brass-400 hover:bg-surface-raised',
}
const sizes = { md: 'px-5 text-sm', lg: 'px-7 text-base' }

export default function Button({ variant = 'primary', size = 'md', href, loading = false, disabled = false, className = '', children, ...rest }) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  // Un lien si href est fourni, sinon un vrai bouton
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && (
        <svg className="size-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  )
}
