import React from 'react'


const BookingPage = () => {
  // In a real app, event info would be fetched by ID from route params

  const event = {
    title: 'Sample Event',
    date: 'Jan 12, 2026',
    location: 'Downtown Hall',
    price: '$25',
  }

  // Example seat map: 5 rows x 8 seats
  const rows = 5;
  const cols = 8;
  const [selectedSeats, setSelectedSeats] = React.useState<number[]>([]);
  // Example: seats 7, 8, 15 are already booked
  const bookedSeats = [7, 8, 15];

  function handleSeatClick(seat: number) {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Your Seat</h2>
        <div className="mb-6 text-slate-600">
          <div className="font-semibold text-slate-800">{event.title}</div>
          <div className="text-sm">{event.date} &bull; {event.location}</div>
          <div className="text-indigo-600 font-semibold mt-1">{event.price}</div>
        </div>

        <div className="mb-6">
          <div className="mb-2 text-slate-700 font-medium">Select your seat(s):</div>
          <div className="grid grid-cols-8 gap-2 justify-center">
            {Array.from({ length: rows * cols }, (_, i) => {
              const seatNum = i + 1;
              const isBooked = bookedSeats.includes(seatNum);
              const isSelected = selectedSeats.includes(seatNum);
              return (
                <button
                  key={seatNum}
                  type="button"
                  className={`w-8 h-8 rounded flex items-center justify-center border text-xs font-semibold
                    ${isBooked ? 'bg-slate-300 text-slate-400 cursor-not-allowed' :
                      isSelected ? 'bg-indigo-600 text-white border-indigo-600' :
                      'bg-white text-slate-700 border-slate-300 hover:bg-indigo-50'}
                  `}
                  disabled={isBooked}
                  onClick={() => handleSeatClick(seatNum)}
                  aria-label={`Seat ${seatNum}${isBooked ? ' (booked)' : ''}`}
                >
                  {seatNum}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-slate-500">Gray = booked, Indigo = selected</div>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" className="w-full border border-slate-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full border border-slate-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="you@email.com" />
          </div>
          <button type="submit" className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow" disabled={selectedSeats.length === 0}>Book Now</button>
        </form>
      </div>
    </main>
  )
}

export default BookingPage
