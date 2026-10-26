import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import '../src/style.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  // Chaque story est rendue sur le fond du site, avec sa typographie
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-ink p-6 font-sans text-parchment scheme-dark">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Une violation d'accessibilité fait échouer la story
    a11y: { test: 'error' },
  },
}
export default preview
