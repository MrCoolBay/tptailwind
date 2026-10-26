import { useEffect, useRef, useState } from 'react'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import HomeView from './views/HomeView.jsx'
import RoomsView from './views/RoomsView.jsx'
import BookingView from './views/BookingView.jsx'
import { EMPTY_FILTERS } from './utils/rooms.js'

// Les vues du site : la navigation suit l'ancre de l'URL (#salles), donc le bouton Retour fonctionne
const VIEWS = {
  accueil: 'Huit Clés · Escape game à Reims, 8 salles de 2 à 8 joueurs',
  salles: 'Les 8 salles · Huit Clés, escape game à Reims',
  reserver: 'Réserver une salle · Huit Clés, escape game à Reims',
}

const viewFromHash = () => {
  const hash = window.location.hash.slice(1)
  return hash in VIEWS ? hash : 'accueil'
}

export default function App() {
  const [view, setView] = useState(viewFromHash)
  // Les filtres vivent ici : ils survivent au passage par la réservation, et le nombre de joueurs pré-remplit le formulaire
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [bookingRoomId, setBookingRoomId] = useState(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const onHashChange = () => setView(viewFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // À chaque changement de vue : titre de l'onglet, retour en haut, focus sur le titre (annoncé aux lecteurs d'écran)
  useEffect(() => {
    document.title = VIEWS[view]
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    document.querySelector('main h1')?.focus()
  }, [view])

  function startBooking(room) {
    setBookingRoomId(room.id)
    window.location.hash = 'reserver'
  }

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brass-300 focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
        onClick={(event) => {
          event.preventDefault()
          document.querySelector('main h1')?.focus()
        }}
      >
        Aller au contenu
      </a>
      <SiteHeader currentView={view} />
      <main id="contenu">
        {view === 'accueil' && <HomeView />}
        {view === 'salles' && <RoomsView filters={filters} onFiltersChange={setFilters} onBook={startBooking} />}
        {view === 'reserver' && <BookingView initialRoomId={bookingRoomId} initialPlayers={filters.players} />}
      </main>
      <SiteFooter />
    </>
  )
}
