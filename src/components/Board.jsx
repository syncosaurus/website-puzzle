import { useEffect, useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { createBoard } from '../utils/helpers'
import RowGenerator from './RowGenerator'
import { PieceTransparent } from './PieceTransparent'
import { useSubscribe } from 'syncosaurus'
import { getRandomInt } from '../utils/helpers'
import ResetButton from './ResetButton'

const getFree = tx => tx.get('free')
const getPlaced = tx => tx.get('placed')

function Board({ height, width, synco }) {
  const [board, setBoard] = useState([])
  const freePieceIds = useSubscribe(synco, getFree, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  const placedPieceIds = useSubscribe(synco, getPlaced, [])
  const [amDragging, setAmDragging] = useState({})

  useEffect(() => {
    setBoard(createBoard({ height, width }))
  }, [height, width])

  const handleDragEnd = e => {
    setAmDragging({})
    if (e.over === null || e.active.id !== e.over.id) {
      const x = e.delta.x
      const y = e.delta.y
      synco.mutate.dragMove({ id: e.active.id, delta: { x, y } })
      return
    }

    synco.mutate.placePiece({ id: e.active.id })
  }

  const handleDragMove = e => {
    const x = e.delta.x
    const y = e.delta.y
    setAmDragging({ id: e.active.id, delta: { x, y } })
    synco.mutate.dragMove({ id: e.active.id, delta: { x, y } })
  }

  const handleDragStart = e => {
    setAmDragging({ id: e.active.id, delta: { x: 0, y: 0 } })
    synco.mutate.dragStart({ id: e.active.id })
  }

  const handleReset = e => {
    e.preventDefault()
    let randomPosArray = []
    for (let i = 1; i <= 9; i++) {
      randomPosArray.push({
        id: i,
        x: getRandomInt(400),
        y: getRandomInt(200) + 100,
      })
    }
    synco.mutate.restartPuzzle({ startPosArr: randomPosArray })
  }

  return (
    <>
      <DndContext
        modifiers={[restrictToParentElement]}
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
            <div className="absolute translate-x-48 translate-y-[175px]">
              <ResetButton onClick={handleReset} />
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default Board
