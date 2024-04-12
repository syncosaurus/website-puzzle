import { Droppable } from './Droppable'
import { Piece } from './Piece'

function BoardRow({ row, placedPieceIds, synco }) {
  return (
    <div className="flex col-span-3">
      {row.map(cell => {
        return (
          <Droppable id={cell.id} key={cell.id} cell={cell}>
            {placedPieceIds.includes(cell.id) && (
              <Piece key={cell.id} id={cell.id} synco={synco} />
            )}
          </Droppable>
        )
      })}
    </div>
  )
}

export default BoardRow
