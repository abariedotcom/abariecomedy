import { Calendar, MapPin, Clock, Ticket, Star, Users } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: "Stand-Up Night Live",
    date: "June 28, 2026",
    time: "8:00 PM",
    venue: "The Comedy Cellar",
    location: "Downtown LA",
    price: "$25",
    image: "https://images.pexels.com/photos/7131494/pexels-photo-7131494.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    available: true,
  },
  {
    id: 2,
    title: "Comedy Festival 2026",
    date: "July 15-17, 2026",
    time: "Multiple Shows",
    venue: "City Convention Center",
    location: "Las Vegas, NV",
    price: "From $45",
    image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    available: true,
  },
  {
    id: 3,
    title: "Open Mic Tuesdays",
    date: "Every Tuesday",
    time: "7:00 PM",
    venue: "Laugh Factory",
    location: "Hollywood, CA",
    price: "$10",
    image: "https://images.pexels.com/photos/1701783/pexels-photo-1701783.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    available: true,
  },
  {
    id: 4,
    title: "Special Release Show",
    date: "August 5, 2026",
    time: "9:00 PM",
    venue: "The Improv",
    location: "New York, NY",
    price: "$35",
    image: "https://images.pexels.com/photos/2022860/pexels-photo-2022860.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    available: true,
  },
  {
    id: 5,
    title: "Holiday Special",
    date: "December 20, 2026",
    time: "7:30 PM",
    venue: "Grand Theater",
    location: "Chicago, IL",
    price: "$40",
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    available: false,
  },
];

export function EventsPage() {
  const featuredEvents = upcomingEvents.filter((e) => e.featured);
  const otherEvents = upcomingEvents.filter((e) => !e.featured);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 text-sm font-medium mb-6">
              Live Performances
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Upcoming <span className="text-amber-400">Events</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Catch me live on stage! From intimate comedy clubs to massive festivals,
              there's nothing like the energy of a live show.
            </p>
          </div>

          {/* Featured Events */}
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Featured Shows</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-amber-400 text-gray-900 text-sm font-bold rounded-full">
                      Featured
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{event.venue} - {event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-400">{event.price}</span>
                      <button className="px-6 py-2 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-2">
                        <Ticket className="w-4 h-4" />
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Other Events */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Users className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">All Shows</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-400">{event.price}</span>
                      <button
                        disabled={!event.available}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                          event.available
                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                            : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {event.available ? 'View Details' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-gradient-to-r from-amber-900/30 to-amber-700/20 rounded-2xl p-8 md:p-12 border border-amber-400/20">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Never Miss a Show
              </h3>
              <p className="text-gray-400 mb-8">
                Subscribe to get notified about new dates, exclusive pre-sales,
                and behind-the-scenes content.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
