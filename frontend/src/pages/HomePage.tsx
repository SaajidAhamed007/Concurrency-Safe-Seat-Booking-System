import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">Find and Book Events Near You</h1>
        <p className="text-lg text-slate-600 mb-8">Browse upcoming events, reserve seats, and manage your bookings in one place.</p>

        <Link
          to="/events"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          See Events
        </Link>
      </div>
    </main>
  )
}

export default HomePage
