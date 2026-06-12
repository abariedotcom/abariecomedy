import { Link } from 'react-router-dom';
import { Calendar, Play, Instagram, Youtube, Twitter } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="https://images.pexels.com/photos/12275710/pexels-photo-12275710.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Abarie Comedy"
                className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-amber-400 shadow-2xl shadow-amber-400/20"
              />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Abarie <span className="text-amber-400">Comedy</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Bringing laughter to stages everywhere. Stand-up comedian,
              writer, and your new favorite performer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-gray-900 font-semibold rounded-xl hover:bg-amber-300 transition-all hover:scale-105 shadow-lg shadow-amber-400/20"
              >
                <Calendar className="w-5 h-5" />
                Upcoming Shows
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl border border-gray-700 hover:border-amber-400 hover:text-amber-400 transition-all">
                <Play className="w-5 h-5" />
                Watch Videos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-amber-400 hover:bg-gray-700 transition-all"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
