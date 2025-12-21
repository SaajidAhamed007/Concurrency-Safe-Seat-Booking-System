import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import BookingPage from './pages/BookingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/book/:eventId' element={<BookingPage />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
