import { useDraggable } from '@dnd-kit/core'
import { useSubscribe } from 'syncosaurus'
import { CSS } from '@dnd-kit/utilities'

export function Piece({ id, children, styles, synco }) {
  const getPiece = tx => tx.get(String(id))
  const params = useSubscribe(synco, getPiece, {
    position: {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    },
    placed: false,
  })

  let syncoPosition
  if (!params.placed) {
    syncoPosition = {
      left: `${params.position.x}px`,
      top: `${params.position.y}px`,
    }
  } else {
    syncoPosition = {}
  }

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-400 w-24 aspect-square z-40"
      style={{ ...style, ...styles, ...syncoPosition }}
      {...listeners}
      {...attributes}
    >
      {id}
      {children}
    </div>
  )
}
