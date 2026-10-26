import { useState } from 'react'
import FilterChip from './FilterChip.jsx'

export default {
  title: 'Base/FilterChip',
  component: FilterChip,
  args: { children: 'Facile' },
}

export const Off = {}
export const On = { args: { pressed: true } }
export const Disabled = { args: { disabled: true, children: 'Expert' } }

// Un groupe interactif : cliquer ou appuyer sur Espace bascule l'état
export const Group = {
  render: () => {
    const [selected, setSelected] = useState(new Set(['Facile']))
    const toggle = (label) =>
      setSelected((previous) => {
        const next = new Set(previous)
        if (next.has(label)) next.delete(label)
        else next.add(label)
        return next
      })
    return (
      <div role="group" aria-label="Difficulté" className="flex flex-wrap gap-2">
        {['Facile', 'Moyen', 'Difficile', 'Expert'].map((label) => (
          <FilterChip key={label} pressed={selected.has(label)} onClick={() => toggle(label)}>
            {label}
          </FilterChip>
        ))}
      </div>
    )
  },
}
