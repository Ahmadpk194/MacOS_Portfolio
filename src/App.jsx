import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dock, Navbar, Welcome } from '#components'

function App() {

  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
    </main>
  )
}

export default App
