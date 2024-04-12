import { useDraggable } from '@dnd-kit/core'
import { useSubscribe } from 'syncosaurus'
import { CSS } from '@dnd-kit/utilities'
import pieces from './pieces/index.js'

export function PieceTransparent({ id, children, styles, synco }) {
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
          <div className="absolute w-32 -translate-y-px opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 2:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-x-[8px] -translate-y-[0.25px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
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
          <div className="absolute w-32 -translate-x-[25px] -translate-y-[0.25px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 4:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-x-[0px] -translate-y-[3.25px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 5:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-x-[24px] -translate-y-[24.25px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 6:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-x-[25px] -translate-y-[4.6px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 7:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-y-[25.25px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 8:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-x-[12.5px] -translate-y-[25.25px] opacity-90 hover:contrast-125 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    case 9:
      return (
        <div
          ref={setNodeRef}
          className="w-24 aspect-square z-40 overflow-visible"
          style={{ ...style, ...styles, ...syncoPosition }}
          {...listeners}
          {...attributes}
        >
          <div className="absolute w-32 -translate-x-[25px] -translate-y-[25.25px] opacity-90 hover:contrast-125 hover:brightness-90 hover:drop-shadow-md">
            <img src={pieces[id - 1]} alt="piece1" />
          </div>
          {children}
        </div>
      )
    default:
      return <></>
  }
}
