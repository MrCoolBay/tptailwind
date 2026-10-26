const links = [
  { view: 'salles', label: 'Les salles' },
  { view: 'reserver', label: 'Réserver' },
]

export function KeyLogo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="11" cy="16" r="6" stroke="currentColor" strokeWidth="3" />
      <path d="M17 16h11M24 16v4M27.5 16v3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function SiteHeader({ currentView }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/90 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <a
          href="#accueil"
          className="flex min-h-11 items-center gap-2 rounded-lg font-display text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
        >
          <KeyLogo className="size-8 text-brass-400" />
          Huit Clés
        </a>

        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <li key={link.view}>
                <a
                  href={`#${link.view}`}
                  aria-current={currentView === link.view ? 'page' : undefined}
                  className="flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted transition hover:text-parchment focus-visible:outline-2 focus-visible:outline-brass-300 aria-[current=page]:bg-surface-raised aria-[current=page]:text-parchment sm:px-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
