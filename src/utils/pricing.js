import pricing from '../data/pricing.json'

// Prix par joueur selon la taille du groupe : au-delà de la dernière ligne, le dernier tarif s'applique
export function pricePerPlayer(players) {
  const rows = pricing.perPlayer
  const row = rows.findLast((r) => players >= r.players) ?? rows[0]
  return row.price
}

export const totalPrice = (players) => pricePerPlayer(players) * players

export const formatEuros = (amount) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 }).format(amount)

// Le prix d'appel affiché partout : le tarif le plus bas
export const lowestPrice = Math.min(...pricing.perPlayer.map((r) => r.price))
