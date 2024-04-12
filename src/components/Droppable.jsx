import { useDroppable } from '@dnd-kit/core'

import pieces from './pieces/index'

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return isOver ? (
    <div
      ref={setNodeRef}
      className="bg-green-700 w-24 aspect-square border-black shadow-inner shadow-slate-950"
    >
      {id === 1 && <img src={pieces[9]} className=" absolute" />}
      {children}
    </div>
  ) : (
    <div ref={setNodeRef} className="w-24 aspect-square">
      {id === 1 && <img src={pieces[9]} className=" absolute" />}
      {children}
    </div>
  )
}
