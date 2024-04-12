import { useEffect, useState } from 'react'

import { DndContext } from '@dnd-kit/core'
import { createBoard } from '../utils/helpers'
import RowGenerator from './RowGenerator'
import { Piece } from './Piece'
import { PieceTransparent } from './PieceTransparent'
import { useSubscribe } from 'syncosaurus'

const getFree = tx => tx.get('free')
const getPlaced = tx => tx.get('placed')

function Board({ height, width, synco }) {
  const [board, setBoard] = useState([])
  const freePieceIds = useSubscribe(synco, getFree, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  const placedPieceIds = useSubscribe(synco, getPlaced, [])

  useEffect(() => {
    setBoard(createBoard({ height, width }))
  }, [height, width])

  const handleDragEnd = e => {
    if (e.over === null || e.active.id !== e.over.id) {
      const x = e.delta.x
      const y = e.delta.y
      synco.mutate.movePiece({ id: e.active.id, delta: { x, y } })
      return
    }

    synco.mutate.placePiece(e.active.id)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {freePieceIds.map(id => (
        <PieceTransparent
          key={id}
          id={id}
          className="puzzle-piece"
          styles={{
            position: 'absolute',
          }}
          synco={synco}
        />
      ))}
      <div className="h-screen flex items-center justify-center">
        <RowGenerator
          rows={board}
          placedPieceIds={placedPieceIds}
          synco={synco}
        />
      </div>
    </DndContext>
  )
}

export default Board
