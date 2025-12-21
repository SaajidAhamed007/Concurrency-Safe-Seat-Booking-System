import React from 'react'
import { Link } from 'react-router-dom'

type EventItem = {
  id: number
  title: string
  date: string
  location: string
  price: string
  img?: string
}

const sampleEvents: EventItem[] = [
  { id: 1, title: 'Indie Music Night', date: 'Jan 12, 2026', location: 'Downtown Hall', price: '$25', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Food Truck Festival', date: 'Feb 4, 2026', location: 'Riverside Park', price: 'Free', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Tech Talks: AI', date: 'Mar 2, 2026', location: 'Tech Hub', price: '$10', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
  { id: 4, title: 'Outdoor Cinema', date: 'Mar 20, 2026', location: 'Green Meadow', price: '$8', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 5, title: 'Charity Run 5K', date: 'Apr 5, 2026', location: 'City Loop', price: '$35', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
  { id: 6, title: 'Classic Jazz Evening', date: 'Apr 18, 2026', location: 'The Blue Room', price: '$30', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
  { id: 7, title: 'Startup Pitch Night', date: 'May 1, 2026', location: 'Innovation Center', price: 'Free', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80' },
]


const EventsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Upcoming Events</h2>
          <p className="text-slate-500">Find something fun, inspiring, or delicious to do!</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleEvents.map((e) => (
            <article key={e.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
              {e.img && (
                <img src={e.img} alt={e.title} className="h-40 w-full object-cover" />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{e.title}</h3>
                <div className="text-xs text-slate-500 mb-2">{e.date} &bull; {e.location}</div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-indigo-600 font-semibold text-base">{e.price}</span>
                  <Link to={`/book/${e.id}`} className="text-sm px-4 py-1.5 rounded-md bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition">Book</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default EventsPage
