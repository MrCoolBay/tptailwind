// Les 4 niveaux : le libellé est toujours écrit, la couleur ne porte jamais seule l'information
export const DIFFICULTIES = [
  { value: 1, label: 'Facile' },
  { value: 2, label: 'Moyen' },
  { value: 3, label: 'Difficile' },
  { value: 4, label: 'Expert' },
]

export const difficultyLabel = (value) => DIFFICULTIES.find((d) => d.value === value)?.label

export const fitsPlayers = (room, players) => players >= room.playersMin && players <= room.playersMax

// « 18:30 » => « 18h30 »
export const formatSlot = (slot) => slot.replace(':', 'h')

// Aucun filtre actif : tous joueurs, toutes difficultés, accessibilité indifférente
export const EMPTY_FILTERS = { players: null, difficulties: new Set(), wheelchair: false }
