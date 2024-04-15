const ResetButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-syncoGreen to-syncoBlue group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none"
    >
      <span className="relative px-2.5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Reset Puzzle
      </span>
    </button>
  )
}

export default ResetButton
