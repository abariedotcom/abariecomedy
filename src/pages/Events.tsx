import { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket, Star, Users, Phone, Mail, ArrowRight, CheckCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const featuredEvents = [
  { id: 1, title: "So Far So Good 3.0", date: "Coming Soon", time: "TBA", venue: "Eko Convention Centre", location: "Lagos, Nigeria", price: "Tickets Available Soon", image: "/images/event-1.webp", description: "The highly anticipated third edition of Abarie's flagship comedy show. Bigger, bolder, and guaranteed to crack your ribs.", featured: true },
  { id: 2, title: "Corporate Comedy Night", date: "Monthly", time: "7:00 PM", venue: "Various Venues", location: "Lagos", price: "Invite Only", image: "/images/event-2.webp", description: "Exclusive comedy experiences tailored for corporate audiences. Clean humor, premium networking, and unforgettable entertainment.", featured: true },
];

const upcomingEvents = [
  { id: 3, title: "Campus Tour 2026", date: "TBA", time: "Various", venue: "Universities Nationwide", location: "Nigeria", price: "Student Pricing", image: "/images/event-3.webp", available: true },
  { id: 4, title: "Abarie Live in Abuja", date: "August 2026", time: "7:00 PM", venue: "Transcorp Hilton", location: "Abuja, Nigeria", price: "From ₦15,000", image: "/images/portfolio-1.webp", available: true },
  { id: 5, title: "Comedy Festival Lagos", date: "September 2026", time: "Multiple Shows", venue: "Freedom Park", location: "Lagos Island", price: "From ₦10,000", image: "/images/portfolio-2.webp", available: true },
  { id: 6, title: "Year-End Special", date: "December 2026", time: "8:00 PM", venue: "Eko Hotels", location: "Lagos, Nigeria", price: "VIP Available", image: "/images/portfolio-3.webp", available: false },
];

export default function Events() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        email,
        source: 'events_newsletter',
      });
      if (error) throw error;
      setIsSuccess(true);
      setEmail('');
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="inline-block px-4 py-1 bg-primary-400/10 border border-primary-400/30 rounded-full text-primary-400 text-sm font-medium mb-6">Live Performances</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Upcoming <span className="text-primary-400">Events</span></h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">Catch Abarie live on stage! From intimate comedy clubs to massive arenas, there's nothing like the energy of a live show.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-10"><Star className="w-5 h-5 text-accent-500" /><h2 className="font-display text-3xl font-bold">Featured Shows</h2></div>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="group relative bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300">
                <div className="lg:flex">
                  <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden"><img src={event.image} alt={event.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="lg:w-1/2 p-6 flex flex-col">
                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6"><span className="px-3 py-1 bg-accent-500 text-dark-950 text-sm font-bold rounded-full">Featured</span></div>
                    <h3 className="font-display text-2xl font-bold mb-3 mt-6 lg:mt-0 group-hover:text-primary-400 transition-colors">{event.title}</h3>
                    <p className="text-dark-400 text-sm mb-4 flex-1">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-dark-300 text-sm"><Calendar className="w-4 h-4 text-primary-400" /><span>{event.date}</span></div>
                      <div className="flex items-center gap-2 text-dark-300 text-sm"><Clock className="w-4 h-4 text-primary-400" /><span>{event.time}</span></div>
                      <div className="flex items-center gap-2 text-dark-300 text-sm"><MapPin className="w-4 h-4 text-primary-400" /><span>{event.venue} - {event.location}</span></div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary-400 font-semibold">{event.price}</span>
                      <Link to="/tickets" className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-dark-950 font-semibold rounded-lg transition-colors flex items-center gap-2"><Ticket className="w-4 h-4" />Get Tickets</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-10"><Users className="w-5 h-5 text-primary-400" /><h2 className="font-display text-3xl font-bold">All Shows</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group bg-dark-800/50 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/30 transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  {!event.available && <div className="absolute inset-0 bg-dark-950/70 flex items-center justify-center"><span className="px-4 py-2 bg-dark-800 text-dark-300 font-semibold rounded-lg">Coming Soon</span></div>}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary-400 transition-colors">{event.title}</h3>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-dark-400"><Calendar className="w-4 h-4 text-primary-400" /><span>{event.date}</span></div>
                    <div className="flex items-center gap-2 text-dark-400"><MapPin className="w-4 h-4 text-primary-400" /><span>{event.venue}</span></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-400 font-semibold text-sm">{event.price}</span>
                    <button disabled={!event.available} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${event.available ? 'bg-dark-700 text-white hover:bg-dark-600' : 'bg-dark-700/50 text-dark-500 cursor-not-allowed'}`}>{event.available ? 'Details' : 'TBA'}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/20 rounded-2xl p-8 md:p-12 border border-primary-500/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">Want Abarie at Your Event?</h2>
                <p className="text-dark-300 mb-6">Looking to book Abarie for your corporate event, wedding, private party, or show? Get in touch to discuss availability, pricing, and how we can make your event unforgettable.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+2348012345678" className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-dark-100 px-6 py-3 rounded-full font-semibold transition-all"><Phone size={20} /> Call Now</a>
                  <a href="mailto:contact@abarie.com" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-700 px-6 py-3 rounded-full font-semibold transition-all"><Mail size={20} /> Send Email</a>
                </div>
              </div>
              <div className="hidden md:block"><img src="/images/portfolio-4.webp" alt="Abarie performing live" className="w-full h-64 object-cover object-top rounded-xl" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-950">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Never Miss a Show</h3>
          <p className="text-dark-400 mb-8">Subscribe to get notified about new dates, exclusive pre-sales, and behind-the-scenes content.</p>

          {isSuccess ? (
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary-400" />
              <span className="text-primary-400 font-medium">You're subscribed! We'll keep you updated.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-700 text-dark-950 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-8 px-4 bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"><ArrowRight size={20} className="rotate-180" />Back to Homepage</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}