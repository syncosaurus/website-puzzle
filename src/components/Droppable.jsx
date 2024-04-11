import { useDroppable } from '@dnd-kit/core'

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return isOver ? (
    <div
      ref={setNodeRef}
      className="bg-green-700 w-24 aspect-square border-black shadow-inner shadow-slate-950"
    >
      {children}
    </div>
  ) : (
    <div
      ref={setNodeRef}
      className="bg-slate-500 w-24 aspect-square border-black shadow-inner shadow-slate-950"
    >
      {children}
    </div>
  )
}
