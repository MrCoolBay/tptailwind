import { useState } from 'react'
import rooms from '../data/rooms.json'
import Button from '../components/base/Button.jsx'
import Field from '../components/base/Field.jsx'
import { difficultyLabel, formatSlot } from '../utils/rooms.js'
import { formatEuros, pricePerPlayer, totalPrice } from '../utils/pricing.js'
import { FIELDS, findRoom, formatLongDate, todayIso, validateAll, validateField } from '../utils/booking.js'

function initialValues(roomId, players) {
  const room = findRoom(roomId)
  // Le nombre de joueurs choisi dans les filtres est repris s'il convient à la salle
  const fits = room && players >= room.playersMin && players <= room.playersMax
  return {
    roomId: room ? String(room.id) : '',
    date: '',
    slot: '',
    players: room ? String(fits ? players : room.playersMin) : '',
    name: '',
    email: '',
    phone: '',
  }
}

export default function BookingView({ initialRoomId, initialPlayers }) {
  const [values, setValues] = useState(() => initialValues(initialRoomId, initialPlayers))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('editing') // editing | sending | sent

  const room = findRoom(values.roomId)
  const players = Number(values.players)
  const playerOptions = room
    ? Array.from({ length: room.playersMax - room.playersMin + 1 }, (_, index) => room.playersMin + index)
    : []
  const errorCount = Object.keys(errors).length

  function handleChange(event) {
    const { name, value } = event.target
    let next = { ...values, [name]: value }
    // Changer de salle : on garde le créneau et les joueurs seulement s'ils restent valables
    if (name === 'roomId') {
      const newRoom = findRoom(value)
      next = {
        ...next,
        slot: newRoom?.slots.includes(values.slot) ? values.slot : '',
        players: newRoom ? String(Math.min(Math.max(players || newRoom.playersMin, newRoom.playersMin), newRoom.playersMax)) : '',
      }
    }
    setValues(next)
    // Une erreur déjà affichée disparaît dès que la saisie devient correcte
    if (errors[name]) setErrors(updateError(errors, name, validateField(name, next)))
  }

  // Validation à la sortie du champ, pas pendant la frappe
  function handleBlur(event) {
    const { name } = event.target
    setErrors(updateError(errors, name, validateField(name, values)))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const allErrors = validateAll(values)
    setErrors(allErrors)
    const firstInvalid = FIELDS.find((name) => allErrors[name])
    if (firstInvalid) {
      document.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    // Pas de serveur : on simule l'envoi pour montrer l'état de chargement
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      window.scrollTo(0, 0)
    }, 900)
  }

  function bookAnother() {
    setValues(initialValues(null, null))
    setErrors({})
    setStatus('editing')
  }

  if (status === 'sent') {
    return (
      <div className="container-page max-w-2xl py-10 md:py-14">
        <div className="rounded-3xl border border-verdigris-400 bg-surface p-6 sm:p-8" role="status">
          <p className="flex items-center gap-2 font-semibold text-verdigris-300">
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Réservation confirmée
          </p>
          <h1 tabIndex={-1} ref={(node) => node?.focus()} className="mt-3 font-display text-3xl font-semibold focus:outline-none sm:text-4xl">
            À {formatLongDate(values.date)}, {values.name.trim().split(' ')[0]} !
          </h1>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Salle</dt>
              <dd className="font-semibold">{room.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Quand</dt>
              <dd className="font-semibold">
                {formatLongDate(values.date)} à {formatSlot(values.slot)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Joueurs</dt>
              <dd className="font-semibold">{players}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">À régler sur place</dt>
              <dd className="font-semibold text-brass-300">{formatEuros(totalPrice(players))}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted">
            Arrivez 15 minutes avant le début. Le récapitulatif est envoyé à {values.email.trim()} (site de démonstration : aucun e-mail
            n'est réellement envoyé).
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={bookAnother}>Réserver une autre salle</Button>
            <Button href="#accueil" variant="secondary">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 tabIndex={-1} className="font-display text-4xl font-semibold tracking-tight focus:outline-none sm:text-5xl">
        Réserver une salle
      </h1>
      <p className="mt-2 text-muted">Tous les champs sont obligatoires. Le paiement se fait sur place.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-8">
          {errorCount > 0 && (
            <p role="alert" className="rounded-xl border border-danger-400 p-4 text-sm font-medium text-danger-300">
              {errorCount === 1 ? '1 champ est à corriger.' : `${errorCount} champs sont à corriger.`}
            </p>
          )}

          <Field id="roomId" name="roomId" label="Salle" as="select" value={values.roomId} error={errors.roomId} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Choisir une salle</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({difficultyLabel(r.difficulty)}, {r.playersMin} à {r.playersMax} joueurs)
              </option>
            ))}
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="date"
              name="date"
              type="date"
              label="Date"
              hint="Ouvert 7 jours sur 7"
              min={todayIso()}
              value={values.date}
              error={errors.date}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              id="players"
              name="players"
              label="Nombre de joueurs"
              as="select"
              disabled={!room}
              hint={room ? `De ${room.playersMin} à ${room.playersMax} pour cette salle` : 'Choisissez d’abord une salle'}
              value={values.players}
              error={errors.players}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {!room && <option value="">—</option>}
              {playerOptions.map((n) => (
                <option key={n} value={n}>
                  {n} joueurs
                </option>
              ))}
            </Field>
          </div>

          <fieldset aria-describedby={errors.slot ? 'slot-error' : undefined}>
            <legend className="text-sm font-semibold">Créneau</legend>
            {room ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {room.slots.map((slot) => (
                  <label
                    key={slot}
                    className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line-strong px-4 text-sm font-medium transition hover:border-brass-400 has-checked:border-brass-300 has-checked:bg-brass-300 has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brass-300"
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot}
                      checked={values.slot === slot}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="sr-only"
                    />
                    {formatSlot(slot)}
                  </label>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted">Les créneaux s'affichent une fois la salle choisie.</p>
            )}
            {errors.slot && (
              <p id="slot-error" className="mt-1.5 text-sm font-medium text-danger-300">
                {errors.slot}
              </p>
            )}
          </fieldset>

          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <Field id="name" name="name" label="Nom et prénom" autoComplete="name" value={values.name} error={errors.name} onChange={handleChange} onBlur={handleBlur} className="sm:col-span-2" />
            <Field id="email" name="email" type="email" inputMode="email" label="E-mail" autoComplete="email" hint="Pour recevoir le récapitulatif" value={values.email} error={errors.email} onChange={handleChange} onBlur={handleBlur} />
            <Field id="phone" name="phone" type="tel" inputMode="tel" label="Téléphone" autoComplete="tel" hint="En cas d’imprévu le jour J" value={values.phone} error={errors.phone} onChange={handleChange} onBlur={handleBlur} />
          </div>

          <Button type="submit" size="lg" loading={status === 'sending'} className="self-stretch sm:self-start">
            {status === 'sending' ? 'Envoi de la réservation…' : 'Confirmer la réservation'}
          </Button>
        </form>

        {/* Le prix est visible avant de valider, et se met à jour avec la salle et le nombre de joueurs */}
        <aside aria-labelledby="recap" className="rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24 lg:self-start">
          <h2 id="recap" className="font-semibold">
            Votre réservation
          </h2>
          {room ? (
            <>
              <p className="mt-2 font-display text-xl font-semibold">{room.name}</p>
              <p className="text-sm text-muted">
                {difficultyLabel(room.difficulty)} · {room.duration} min · dès {room.minAge} ans
              </p>
              <p className="mt-4 text-sm" aria-live="polite">
                {players} joueurs × {formatEuros(pricePerPlayer(players))} ={' '}
                <span className="block font-display text-3xl font-semibold text-brass-300">{formatEuros(totalPrice(players))}</span>
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">
              Choisissez une salle pour voir le prix. <a href="#salles" className="font-medium text-brass-300 underline underline-offset-4">Comparer les salles</a>
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}

// Ajoute ou retire l'erreur d'un champ sans modifier l'objet d'origine
function updateError(errors, name, message) {
  const next = { ...errors }
  if (message) next[name] = message
  else delete next[name]
  return next
}
