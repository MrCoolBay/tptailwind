import styles from './RoomCard.module.scss'
import { difficultyLabel } from '../../utils/rooms.js'
import { formatEuros, pricePerPlayer, totalPrice } from '../../utils/pricing.js'

// Correspondance explicite niveau => classe du module (pas de nom de classe construit)
const levelClasses = {
  1: styles['level-1'],
  2: styles['level-2'],
  3: styles['level-3'],
  4: styles['level-4'],
}

function LockIcon({ filled }) {
  return (
    <svg className={`${styles.lock} ${filled ? styles.filled : ''}`} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
    </svg>
  )
}

export default function RoomCard({ room, players = null, onOpen }) {
  return (
    <article className={`${styles.card} ${levelClasses[room.difficulty]}`}>
      <p className={styles.level}>
        <span className={styles.gauge} aria-hidden="true">
          {[1, 2, 3, 4].map((step) => (
            <LockIcon key={step} filled={step <= room.difficulty} />
          ))}
        </span>
        <span>
          <span className="sr-only">Difficulté : </span>
          {difficultyLabel(room.difficulty)}
        </span>
      </p>

      <div>
        <h3 className="font-display text-xl leading-tight font-semibold text-balance">
          <button type="button" className={styles.open} onClick={() => onOpen?.(room)}>
            {room.name}
          </button>
        </h3>
        <p className="mt-1 text-sm text-muted">{room.theme}</p>
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <li>
          {room.playersMin} à {room.playersMax} joueurs
        </li>
        <li>{room.duration} min</li>
        <li>dès {room.minAge} ans</li>
      </ul>

      <p className={`flex items-center gap-1.5 text-sm font-medium ${room.wheelchair ? 'text-verdigris-300' : 'text-muted'}`}>
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {room.wheelchair ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          )}
        </svg>
        {room.wheelchair ? 'Accessible en fauteuil' : 'Non accessible en fauteuil (escalier)'}
      </p>

      <p className="mt-auto border-t border-line pt-3 text-sm">
        {players ? (
          <>
            <span className="text-lg font-bold text-brass-300">{formatEuros(totalPrice(players))}</span> pour {players} joueurs
          </>
        ) : (
          <>
            dès <span className="text-lg font-bold text-brass-300">{formatEuros(pricePerPlayer(room.playersMax))}</span> par joueur
          </>
        )}
      </p>
    </article>
  )
}
