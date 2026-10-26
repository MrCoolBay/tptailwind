import { useRef, useState } from 'react'
import rooms from '../data/rooms.json'
import Button from '../components/base/Button.jsx'
import FilterChip from '../components/base/FilterChip.jsx'
import RoomCard from '../components/base/RoomCard.jsx'
import RoomModal from '../components/RoomModal.jsx'
import { DIFFICULTIES, EMPTY_FILTERS, fitsPlayers } from '../utils/rooms.js'

const playerCounts = Array.from({ length: 7 }, (_, index) => index + 2) // 2 à 8

function FilterGroup({ label, children }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

export default function RoomsView({ filters, onFiltersChange, onBook }) {
  const [openRoom, setOpenRoom] = useState(null)
  const countRef = useRef(null)

  // Liste dérivée pendant le rendu : les trois filtres se combinent
  const visibleRooms = rooms.filter(
    (room) =>
      (filters.players === null || fitsPlayers(room, filters.players)) &&
      (filters.difficulties.size === 0 || filters.difficulties.has(room.difficulty)) &&
      (!filters.wheelchair || room.wheelchair),
  )
  const hasFilters = filters.players !== null || filters.difficulties.size > 0 || filters.wheelchair

  const setPlayers = (players) => onFiltersChange({ ...filters, players: filters.players === players ? null : players })

  // On ne modifie jamais le Set en place : on en crée un nouveau
  function toggleDifficulty(value) {
    const next = new Set(filters.difficulties)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    onFiltersChange({ ...filters, difficulties: next })
  }

  function resetFilters() {
    onFiltersChange(EMPTY_FILTERS)
    countRef.current?.focus()
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 tabIndex={-1} className="font-display text-4xl font-semibold tracking-tight focus:outline-none sm:text-5xl">
        Les salles
      </h1>
      <p className="mt-2 text-muted">Choisissez le nombre de joueurs : le prix total s'affiche sur chaque salle.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <section aria-label="Filtres" className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24 lg:self-start">
          <FilterGroup label="Nombre de joueurs">
            {playerCounts.map((count) => (
              <FilterChip key={count} pressed={filters.players === count} onClick={() => setPlayers(count)}>
                {count}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Difficulté (plusieurs choix possibles)">
            {DIFFICULTIES.map((difficulty) => (
              <FilterChip
                key={difficulty.value}
                pressed={filters.difficulties.has(difficulty.value)}
                onClick={() => toggleDifficulty(difficulty.value)}
              >
                {difficulty.label}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Accessibilité">
            <FilterChip pressed={filters.wheelchair} onClick={() => onFiltersChange({ ...filters, wheelchair: !filters.wheelchair })}>
              Accessible en fauteuil
            </FilterChip>
          </FilterGroup>
        </section>

        <section aria-labelledby="resultats">
          <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
            <h2 id="resultats" ref={countRef} tabIndex={-1} aria-live="polite" className="font-semibold focus:outline-none">
              {visibleRooms.length === 0
                ? 'Aucune salle'
                : `${visibleRooms.length} salle${visibleRooms.length > 1 ? 's' : ''} sur ${rooms.length}`}
            </h2>
            {hasFilters && visibleRooms.length > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-11 rounded-lg text-sm font-medium text-brass-300 underline underline-offset-4 hover:text-parchment focus-visible:outline-2 focus-visible:outline-brass-300"
              >
                Effacer les filtres
              </button>
            )}
          </div>

          {visibleRooms.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-line p-8 text-center">
              <p className="font-display text-xl font-semibold">Aucune salle ne correspond à tous ces critères.</p>
              <p className="mt-2 text-muted">
                Essayez une autre difficulté ou un autre nombre de joueurs : nos 8 salles accueillent de 2 à 8 personnes.
              </p>
              <Button className="mt-6" onClick={resetFilters}>
                Voir toutes les salles
              </Button>
            </div>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleRooms.map((room) => (
                <li key={room.id}>
                  <RoomCard room={room} players={filters.players} onOpen={setOpenRoom} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <RoomModal room={openRoom} players={filters.players} onClose={() => setOpenRoom(null)} onBook={onBook} />
    </div>
  )
}
