import Board from './components/Board'
import Syncosaurus, { useUpdateMyPresence } from 'syncosaurus'
import mutators from './mutators'
import { useEffect } from 'react'
import Cursors from './components/Cursors'

const userID = String(Math.floor(Math.random() * 100))

const synco = new Syncosaurus({
  mutators,
  userID,
  server: import.meta.env.VITE_DO_URL,
})

function App() {
  useUpdateMyPresence(synco)

  useEffect(() => {
    synco.launch('foo')
  }, [])
  return (
    <>
      <Cursors synco={synco} />
      <Board height={3} width={3} synco={synco} userID={userID} />
    </>
  )
}

export default App
