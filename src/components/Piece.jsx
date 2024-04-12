import { useDraggable } from '@dnd-kit/core'
import { useSubscribe } from 'syncosaurus'
import { CSS } from '@dnd-kit/utilities'
import pieces from './pieces/index.js'

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

  if (pieces[id - 1] == undefined) return

  switch (id) {
    case 1:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-[121px] -translate-y-px">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 2:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-[120px] -translate-x-7">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 3:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-[100px] -translate-x-7 -translate-y-1">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    default:
      return <div>hello</div>
  }
}
