import Button from './Button.jsx'

export default {
  title: 'Base/Button',
  component: Button,
  args: { children: 'Trouver ma salle' },
}

export const Primary = {}
export const Secondary = { args: { variant: 'secondary', children: 'Voir toutes les salles' } }
export const Large = { args: { size: 'lg' } }
export const Disabled = { args: { disabled: true, children: 'Réserver' } }
export const Loading = { args: { loading: true, children: 'Envoi de la réservation…' } }
export const LongLabel = {
  args: { children: 'Réserver La Cave aux mille bouteilles pour 6 joueurs samedi à 20h30' },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
}
export const AsLink = { args: { href: '#salles', variant: 'secondary', children: 'Lien vers les salles' } }
