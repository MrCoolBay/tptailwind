import RoomCard from './RoomCard.jsx'
import rooms from '../../data/rooms.json'

export default {
  title: 'Base/RoomCard',
  component: RoomCard,
  args: { room: rooms[0] },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
}

// Une story par variante de difficulté générée par la boucle SASS
export const Facile = {}
export const Moyen = { args: { room: rooms[1] } }
export const Difficile = { args: { room: rooms[3] } }
export const Expert = { args: { room: rooms[6] } }
export const WithGroupPrice = { args: { players: 5 } }
export const NotAccessible = { args: { room: rooms[5] } }
export const LongContent = {
  args: {
    room: {
      ...rooms[2],
      name: "L'Atelier de l'horloger et le mystère de la grande pendule de la cathédrale",
      theme: 'Mécanismes, engrenages, automates et secrets de compagnons horlogers rémois',
    },
  },
}

export const Grid = {
  render: () => (
    <ul className="grid gap-4 sm:grid-cols-2">
      {rooms.slice(0, 4).map((room) => (
        <li key={room.id}>
          <RoomCard room={room} />
        </li>
      ))}
    </ul>
  ),
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
}
