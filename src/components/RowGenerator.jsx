import BoardRow from './BoardRow'

function RowGenerator({ rows, placedPieceIds, synco }) {
  return (
    <div>
      {rows.map((row, idx) => {
        return (
          <BoardRow
            key={idx}
            row={row}
            placedPieceIds={placedPieceIds}
            synco={synco}
          />
        )
      })}
    </div>
  )
}

export default RowGenerator
