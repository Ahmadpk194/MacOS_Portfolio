import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dock, Navbar, Welcome } from '#components'
import gsap from 'gsap'

import { Draggable } from 'gsap/Draggable';
import { Finder, Resume, Safari, Terminal, Text, Image, Contact } from '#windows'
gsap.registerPlugin(Draggable)

function App() {

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Contact/>
    </main>
  )
}

export default App
