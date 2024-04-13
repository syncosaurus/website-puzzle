const restartPuzzle = tx => {
  tx.set('free', [1, 2, 3, 4, 5, 6, 7, 8, 9])
  tx.set('placed', [])

  for (let i = 1; i <= 9; i++) {
    tx.set(i, {
      position: {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
      },
      dragSessionStart: {
        x: 0,
        y: 0,
      },
      placed: false,
    })
  }
}

const placePiece = (tx, id) => {
  // change prop
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

const dragStart = (tx, { id, userID }) => {
  const prev = tx.get(id) || { position: { x: 0, y: 0 } }
  const next = {
    ...prev,
    dragSessionStart: {
      currentDragID: userID,
      x: prev.position.x,
      y: prev.position.y,
    },
  }
  console.log('startPrev', prev, 'startNext', next)
  tx.set(id, next)
}

const dragMove = (tx, { id, delta }) => {
  if (delta.x === undefined || delta.y === undefined) return
  console.log(id, delta)
  const prev = tx.get(id) || { position: { x: 0, y: 0 } }
  console.log(prev)
  const newPosition = {
    x: prev.dragSessionStart.x + delta.x,
    y: prev.dragSessionStart.y + delta.y,
    scaleX: 1,
    scaleY: 1,
  }
  const next = { ...prev, position: newPosition }
  console.log('movePrev', prev, 'moveNext', next)
  tx.set(id, next)
}

const dragEnd = (tx, { id, delta }) => {
  if (delta.x === undefined || delta.y === undefined) return
  const prev = tx.get(id) || { position: { x: 0, y: 0 } }
  const newPosition = {
    x: prev.dragSessionStart.x + delta.x,
    y: prev.dragSessionStart.y + delta.y,
    scaleX: 1,
    scaleY: 1,
  }
  const next = { ...prev, position: newPosition, dragSessionStart: {} }
  tx.set(id, next)
  console.log('endPrev', prev, 'endNext', next)
  console.log('moved piece:', id)
}

export default { restartPuzzle, placePiece, dragStart, dragMove, dragEnd }
