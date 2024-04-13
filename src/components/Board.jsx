import { useEffect, useState } from 'react'

import { DndContext } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { createBoard } from '../utils/helpers'
import RowGenerator from './RowGenerator'
import { Piece } from './Piece'
import { PieceTransparent } from './PieceTransparent'
import { useSubscribe } from 'syncosaurus'

const getFree = tx => tx.get('free')
const getPlaced = tx => tx.get('placed')

function Board({ height, width, synco, userID }) {
  const [board, setBoard] = useState([])
  const freePieceIds = useSubscribe(synco, getFree, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  const placedPieceIds = useSubscribe(synco, getPlaced, [])
  const [amDragging, setAmDragging] = useState({})

  useEffect(() => {
    setBoard(createBoard({ height, width }))
  }, [height, width])

  const handleDragEnd = e => {
    console.log('end event', e)
    setAmDragging({})
    if (e.over === null || e.active.id !== e.over.id) {
      const x = e.delta.x
      const y = e.delta.y
      synco.mutate.dragEnd({ id: e.active.id, delta: { x, y } })
      return
    }

    synco.mutate.placePiece(e.active.id)
  }

  const handleDragMove = e => {
    console.log('move event', e)
    const x = e.delta.x
    const y = e.delta.y
    setAmDragging({ id: e.active.id, delta: { x, y } })
    synco.mutate.dragMove({ id: e.active.id, delta: { x, y } })
  }

  const handleDragStart = e => {
    console.log('start event', e)
    setAmDragging({ id: e.active.id, delta: { x: 0, y: 0 } })
    synco.mutate.dragStart({ id: e.active.id, userID })
    return
  }

  return (
    <>
      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <div className="absolute h-full w-screen items-center justify-center overflow-hidden overscroll-none">
          {freePieceIds.map(id => (
            <PieceTransparent
              key={id}
              id={id}
              className="puzzle-piece"
              styles={{
                position: 'absolute',
              }}
              synco={synco}
              amDragging={amDragging}
            />
          ))}
          <div className="h-full flex items-center justify-center">
            <RowGenerator
              rows={board}
              placedPieceIds={placedPieceIds}
              synco={synco}
            />
            <div className="inline-block">
              <button onClick={() => synco.mutate.restartPuzzle()}>
                Reset Puzzle
              </button>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default Board
