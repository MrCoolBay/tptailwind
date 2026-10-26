import Field from './Field.jsx'

export default {
  title: 'Base/Field',
  component: Field,
  args: { id: 'email', label: 'Adresse e-mail', type: 'email', autoComplete: 'email' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
}

export const Default = {}
export const WithHint = { args: { hint: 'Nous y envoyons la confirmation de réservation.' } }
export const Filled = { args: { defaultValue: 'ines.martin@exemple.fr' } }
export const Error = {
  args: { defaultValue: 'ines.martin@', error: "L'adresse doit ressembler à nom@exemple.fr." },
}
export const Disabled = { args: { disabled: true, defaultValue: 'ines.martin@exemple.fr' } }
export const Select = {
  args: { id: 'players', label: 'Nombre de joueurs', as: 'select', type: undefined, defaultValue: '5' },
  render: (args) => (
    <Field {...args}>
      {[2, 3, 4, 5, 6].map((n) => (
        <option key={n} value={n}>
          {n} joueurs
        </option>
      ))}
    </Field>
  ),
}
