import Button from '../components/base/Button.jsx'
import { KeyLogo } from '../components/SiteHeader.jsx'
import rooms from '../data/rooms.json'
import { formatEuros, lowestPrice } from '../utils/pricing.js'

// Chiffres dérivés des données : ils restent justes si une salle est ajoutée
const accessibleCount = rooms.filter((room) => room.wheelchair).length
const youngestAge = Math.min(...rooms.map((room) => room.minAge))
const maxPlayers = Math.max(...rooms.map((room) => room.playersMax))

const offers = [
  { title: `Les ${rooms.length} salles`, price: `dès ${formatEuros(lowestPrice)} par joueur`, text: '60 à 90 minutes, de Facile à Expert, prix dégressif selon la taille du groupe.' },
  { title: 'Formule anniversaire', price: '+60 € par groupe', text: "Une salle et l'espace goûter privatisé, dès 8 ans." },
  { title: 'Team building', price: 'sur devis', text: "Jusqu'à 4 salles en même temps, 30 personnes au maximum." },
  { title: 'Carte cadeau', price: 'de 50 € à 250 €', text: 'Valable 1 an, dans toutes les salles.' },
]

const steps = [
  { title: 'Choisissez votre salle', text: 'Filtrez par nombre de joueurs, difficulté et accessibilité.' },
  { title: 'Réservez un créneau', text: 'Le prix total est affiché avant de valider.' },
  { title: 'Arrivez 15 minutes avant', text: 'Un maître du jeu vous explique les règles, puis la porte se ferme.' },
]

export default function HomeView() {
  return (
    <>
      <section className="container-page grid items-center gap-10 py-14 md:py-24 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="text-sm font-semibold tracking-widest text-verdigris-300 uppercase">Escape game · Reims centre</p>
          <h1 tabIndex={-1} className="mt-4 font-display text-5xl leading-none font-semibold tracking-tight text-balance focus:outline-none sm:text-6xl">
            {rooms.length} salles. Une heure pour vous échapper.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            De 2 à {maxPlayers} joueurs, dès {youngestAge} ans, de Facile à Expert. Le prix total s'affiche avant de réserver.
          </p>
          <Button href="#salles" size="lg" className="mt-8">
            Trouver ma salle
          </Button>

          <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-3">
            <li className="border-l-2 border-brass-400 pl-3">
              <span className="block font-semibold">dès {formatEuros(lowestPrice)}</span> par joueur
            </li>
            <li className="border-l-2 border-verdigris-400 pl-3">
              <span className="block font-semibold">{accessibleCount} salles</span> accessibles en fauteuil
            </li>
            <li className="border-l-2 border-line pl-3">
              <span className="block font-semibold">7 jours sur 7</span> de 10h à 23h
            </li>
          </ul>
        </div>

        <div className="hidden justify-center lg:flex" aria-hidden="true">
          <div className="grid size-80 place-items-center rounded-full border border-line bg-surface shadow-2xl shadow-brass-500/10">
            <KeyLogo className="size-44 -rotate-45 text-brass-400" />
          </div>
        </div>
      </section>

      <section aria-labelledby="formules" className="container-page py-10">
        <h2 id="formules" className="font-display text-3xl font-semibold">
          Nos formules
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <li key={offer.title} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="font-display text-lg font-semibold">{offer.title}</h3>
              <p className="mt-1 font-semibold text-brass-300">{offer.price}</p>
              <p className="mt-2 text-sm text-muted">{offer.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="deroulement" className="container-page py-10">
        <h2 id="deroulement" className="font-display text-3xl font-semibold">
          Comment ça se passe
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-raised font-display text-lg font-semibold text-brass-300" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
