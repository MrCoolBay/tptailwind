import { useEffect, useRef } from 'react'
import Button from './base/Button.jsx'
import pricing from '../data/pricing.json'
import { difficultyLabel, formatSlot } from '../utils/rooms.js'
import { formatEuros, pricePerPlayer, totalPrice } from '../utils/pricing.js'

// <dialog> natif : focus piégé, Échap ferme, le reste de la page devient inerte
export default function RoomModal({ room, players, onClose, onBook }) {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (room && !dialog.open) {
      triggerRef.current = document.activeElement
      dialog.showModal()
    }
  }, [room])

  function handleClose() {
    onClose()
    triggerRef.current?.focus()
  }

  // Les tarifs qui concernent cette salle uniquement (de playersMin à playersMax)
  const groupSizes = room
    ? Array.from({ length: room.playersMax - room.playersMin + 1 }, (_, index) => room.playersMin + index)
    : []

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
      aria-labelledby="room-modal-title"
      className="mt-auto mb-0 max-h-[92dvh] w-full max-w-full overflow-y-auto rounded-t-3xl border border-line bg-surface text-parchment backdrop:bg-ink/80 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-xl sm:rounded-3xl"
    >
      {room && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-semibold tracking-widest text-verdigris-300 uppercase">
              {difficultyLabel(room.difficulty)} · {room.duration} min
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              aria-label="Fermer la fiche"
              className="-mt-3 -mr-3 grid size-11 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-raised hover:text-parchment focus-visible:outline-2 focus-visible:outline-brass-300"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <h2 id="room-modal-title" className="mt-2 font-display text-3xl leading-tight font-semibold text-balance">
            {room.name}
          </h2>
          <p className="mt-1 text-muted">{room.theme}</p>
          <p className="mt-4 leading-relaxed">{room.story}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-ink p-4 text-sm">
            <div>
              <dt className="text-muted">Joueurs</dt>
              <dd className="font-semibold">
                {room.playersMin} à {room.playersMax}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Âge minimum</dt>
              <dd className="font-semibold">{room.minAge} ans (mineurs accompagnés)</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Accès</dt>
              <dd className={`font-semibold ${room.wheelchair ? 'text-verdigris-300' : ''}`}>
                {room.wheelchair
                  ? 'Accessible en fauteuil roulant : salle de plain-pied, portes de 90 cm'
                  : 'Non accessible en fauteuil roulant : salle à l’étage, escalier étroit'}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Créneaux chaque jour</dt>
              <dd className="font-semibold">{room.slots.map(formatSlot).join(' · ')}</dd>
            </div>
          </dl>

          <section aria-labelledby="room-modal-price" className="mt-6">
            <h3 id="room-modal-price" className="font-semibold">
              Prix
            </h3>
            {players && players >= room.playersMin && players <= room.playersMax ? (
              <p className="mt-1">
                <span className="font-display text-3xl font-semibold text-brass-300">{formatEuros(totalPrice(players))}</span> au total pour{' '}
                {players} joueurs ({formatEuros(pricePerPlayer(players))} par joueur)
              </p>
            ) : (
              <table className="mt-2 w-full text-sm">
                <caption className="sr-only">Prix total selon le nombre de joueurs</caption>
                <thead className="text-left text-muted">
                  <tr>
                    <th scope="col" className="py-1 font-medium">Joueurs</th>
                    <th scope="col" className="py-1 font-medium">Par joueur</th>
                    <th scope="col" className="py-1 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {groupSizes.map((size) => (
                    <tr key={size} className="border-t border-line/60">
                      <td className="py-1.5">{size}</td>
                      <td className="py-1.5">{formatEuros(pricePerPlayer(size))}</td>
                      <td className="py-1.5 font-semibold">{formatEuros(totalPrice(size))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="mt-2 text-xs text-muted">
              Tarif dégressif : {formatEuros(pricing.perPlayer[0].price)} par joueur à 2, {formatEuros(pricing.perPlayer.at(-1).price)} dès{' '}
              {pricing.perPlayer.at(-1).players}.
            </p>
          </section>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => dialogRef.current.close()}>
              Retour aux salles
            </Button>
            <Button onClick={() => onBook(room)}>Réserver cette salle</Button>
          </div>
        </div>
      )}
    </dialog>
  )
}
