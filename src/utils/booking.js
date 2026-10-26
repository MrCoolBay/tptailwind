import rooms from '../data/rooms.json'

export const findRoom = (id) => rooms.find((room) => room.id === Number(id))

// Date du jour au format des <input type="date"> (AAAA-MM-JJ), en heure locale
export function todayIso() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export const formatLongDate = (iso) =>
  new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`))

// Une règle par champ : renvoie le message d'erreur, ou une chaîne vide si tout va bien
export function validateField(name, values) {
  const room = findRoom(values.roomId)
  switch (name) {
    case 'roomId':
      return room ? '' : 'Choisissez une salle.'
    case 'date':
      if (!values.date) return 'Choisissez une date.'
      return values.date < todayIso() ? 'Cette date est passée : choisissez aujourd’hui ou plus tard.' : ''
    case 'slot':
      return values.slot ? '' : 'Choisissez un créneau.'
    case 'players': {
      const players = Number(values.players)
      if (!room) return ''
      return players >= room.playersMin && players <= room.playersMax
        ? ''
        : `Cette salle accueille de ${room.playersMin} à ${room.playersMax} joueurs.`
    }
    case 'name':
      return values.name.trim().length >= 2 ? '' : 'Indiquez votre nom (2 caractères minimum).'
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()) ? '' : "L'adresse doit ressembler à nom@exemple.fr."
    case 'phone':
      return /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(values.phone.trim())
        ? ''
        : 'Le numéro doit ressembler à 06 12 34 56 78.'
    default:
      return ''
  }
}

export const FIELDS = ['roomId', 'date', 'slot', 'players', 'name', 'email', 'phone']

export function validateAll(values) {
  return Object.fromEntries(FIELDS.map((name) => [name, validateField(name, values)]).filter(([, error]) => error))
}
