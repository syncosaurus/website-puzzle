const restartPuzzle = (tx, { startPosArr }) => {
  tx.set('free', [1, 2, 3, 4, 5, 6, 7, 8, 9])
  tx.set('placed', [])

  startPosArr.forEach(piece => {
    tx.set(piece.id, {
      position: {
        x: piece.x,
        y: piece.y,
        scaleX: 1,
        scaleY: 1,
      },
      dragSessionStart: {
        x: piece.x,
        y: piece.y,
      },
      placed: false,
    })
  })
}

const placePiece = (tx, { id }) => {
  const prevPiece = tx.get(id)
  const nextPiece = { ...prevPiece, placed: true }
  tx.set(id, nextPiece)

  const prevFree = tx.get('free') || [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const nextFree = prevFree.filter(x => x !== id)
  tx.set('free', nextFree)

  const prevPlaced = tx.get('placed') || []
  const nextPlaced = prevPlaced.concat(id)
  tx.set('placed', nextPlaced)
}

const dragStart = (tx, { id }) => {
  const prev = tx.get(id) || { position: { x: 0, y: 0 } }
  const newDragSession = {
    x: prev.position.x,
    y: prev.position.y,
  }

  const next = {
    ...prev,
    dragSessionStart: newDragSession,
  }
  tx.set(id, next)
}

const dragMove = (tx, { id, delta }) => {
  if (delta.x === undefined || delta.y === undefined) return
  const prev = tx.get(id) || { position: { x: 0, y: 0 } }
  const newPosition = {
    x: prev.dragSessionStart.x + delta.x,
    y: prev.dragSessionStart.y + delta.y,
    scaleX: 1,
    scaleY: 1,
  }
  const next = { ...prev, position: newPosition }
  tx.set(id, next)
}

export default { restartPuzzle, placePiece, dragStart, dragMove }
