import { Calendar, MapPin, Clock, Ticket, Star, Phone, Mail, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getActiveEvents, type Event } from '../lib/supabase';

const pastEvents = [
  {
    id: 3,
    title: "So Far So Good 2.0",
    date: "2024",
    time: "7:00 PM",
    venue: "Eko Convention Centre",
    location: "Lagos, Nigeria",
    price: "Sold Out",
    image: "/images/portfolio-1.webp",
    description: "The second edition of Abarie's flagship show. A night of non-stop laughter that had Lagos talking for weeks.",
    youtubeUrl: "https://www.youtube.com/watch?v=gqENYWBeIXA",
  },
  {
    id: 4,
    title: "Mudiaga Comedy Show",
    date: "2024",
    time: "6:00 PM",
    venue: "4th Service with Mudiaga",
    location: "Lagos, Nigeria",
    price: "Completed",
    image: "/images/portfolio-2.webp",
    description: "Abarie delivered a show-stopping performance at the Mudiaga Comedy Show.",
    youtubeUrl: "https://www.youtube.com/watch?v=dPP57_KVzzs",
  },
  {
    id: 5,
    title: "So Far So Good 1.0",
    date: "2022",
    time: "7:00 PM",
    venue: "Terra Kulture",
    location: "Lagos, Nigeria",
    price: "Sold Out",
    image: "/images/portfolio-3.webp",
    description: "The debut edition of the So Far So Good franchise. The show that started it all.",
    youtubeUrl: "https://www.youtube.com/watch?v=7-2g37FDszo",
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Tickets() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const activeEvents = await getActiveEvents();
      setEvents(activeEvents);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary-400/10 border border-primary-400/30 rounded-full text-primary-400 text-sm font-medium mb-6">
              Live Shows
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Get Your <span className="text-primary-400">Tickets</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Secure your spot at Abarie's live performances. Experience the magic of stand-up comedy live on stage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <Ticket className="w-5 h-5 text-primary-400" />
            <h2 className="font-display text-3xl font-bold">Upcoming Shows</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            </div>
          ) : events.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group relative bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
                      <img
                        src={event.image_url || '/images/event-1.webp'}
                        alt={event.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="lg:w-1/2 p-6 flex flex-col">
                      <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                        <span className="px-3 py-1 bg-accent-500 text-dark-950 text-sm font-bold rounded-full">
                          Featured
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold mb-3 mt-6 lg:mt-0 group-hover:text-primary-400 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-dark-400 text-sm mb-4 flex-1">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-dark-300 text-sm">
                          <Calendar className="w-4 h-4 text-primary-400" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-dark-300 text-sm">
                          <Clock className="w-4 h-4 text-primary-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-dark-300 text-sm">
                          <MapPin className="w-4 h-4 text-primary-400" />
                          <span>{event.venue} - {event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-sm">
                          <span className="text-dark-400">From </span>
                          <span className="text-primary-400 font-bold text-lg">{formatPrice(event.price_regular)}</span>
                        </div>
                        <Link
                          to={`/book/${event.id}`}
                          className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-dark-950 font-semibold rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Ticket className="w-4 h-4" />
                          Get Tickets
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-800/30 rounded-2xl border border-dark-700">
              <Calendar className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400 text-lg">No upcoming events at the moment.</p>
              <p className="text-dark-500 mt-2">Check out past shows below or subscribe to get notified.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-accent-500" />
            <h2 className="font-display text-3xl font-bold">Past Shows</h2>
          </div>
          <p className="text-dark-400 mb-10 max-w-2xl">
            Missed a show? Relive the moments on YouTube. These are highlights from previous performances that had audiences in stitches.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-dark-800/50 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center shadow-lg">
                      <ArrowRight size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary-400 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-dark-400">
                      <Calendar className="w-4 h-4 text-primary-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-dark-400">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-dark-500 font-medium text-sm">{event.price}</span>
                    <a
                      href={event.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-dark-700 text-white hover:bg-dark-600 transition-colors flex items-center gap-1"
                    >
                      Watch <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Be the First to Know
          </h3>
          <p className="text-dark-400 mb-8">
            Subscribe to get notified when tickets go on sale for upcoming shows.
            Early access, exclusive pre-sales, and special offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-dark-950 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              Notify Me <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      <section className="py-20 px-4 bg-dark-950">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 rounded-2xl p-8 md:p-12 border border-primary-500/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">
                  Want Abarie at Your Event?
                </h2>
                <p className="text-dark-300 mb-6">
                  Looking to book Abarie for your corporate event, wedding, private party, or show?
                  Get in touch to discuss availability, pricing, and how we can make your event unforgettable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+2348012345678"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-dark-100 px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    <Phone size={20} /> Call Now
                  </a>
                  <a
                    href="mailto:contact@abarie.com"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-700 px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    <Mail size={20} /> Send Email
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src="/images/portfolio-4.webp"
                  alt="Abarie performing live"
                  className="w-full h-64 object-cover object-top rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
          >
            <ArrowRight size={20} className="rotate-180" />
            Back to Homepage
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}