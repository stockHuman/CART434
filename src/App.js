import React from 'react'

// Site layout (as imported)
import Menu from './components/layout/Menu'
import Intro from './components/layout/Intro'
import Application from './components/layout/Application'
import About from './components/layout/About'
import Footer from './components/layout/Footer'

// CSS styling
import './scss/main.scss'

export default () => {
  return (
    <div id="app-container">
      <Menu />
      <Intro />
      <Application />
      <About />
      <Footer />
    </div>
  )
}
