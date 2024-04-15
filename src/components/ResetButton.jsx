const ResetButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white bg-gradient-to-br from-syncoGreen to-syncoBlue hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2"
    >
      Reset Puzzle
    </button>
  )
}

export default ResetButton
