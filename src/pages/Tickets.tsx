import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Ticket, Star, Phone, Mail, ArrowRight, ExternalLink, X, Check, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity_available: number;
  quantity_sold: number;
  description: string;
  perks: string[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  image_url: string;
  tickets_available: number;
  tickets_sold: number;
  ticket_tiers: TicketTier[];
}

// Past events used as placeholders
const pastEvents = [
  {
    id: 'past-1',
    title: "So Far So Good 2.0",
    date: "2024",
    venue: "Eko Convention Centre",
    location: "Lagos, Nigeria",
    image: "/images/portfolio-1.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=gqENYWBeIXA",
  },
  {
    id: 'past-2',
    title: "Mudiaga Comedy Show",
    date: "2024",
    venue: "4th Service with Mudiaga",
    location: "Lagos, Nigeria",
    image: "/images/portfolio-2.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=dPP57_KVzzs",
  },
  {
    id: 'past-3',
    title: "So Far So Good 1.0",
    date: "2022",
    venue: "Terra Kulture",
    location: "Lagos, Nigeria",
    image: "/images/portfolio-3.webp",
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const { data: eventsData, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });

      if (error) throw error;

      // Fetch ticket tiers for each event
      const eventsWithTiers = await Promise.all(
        (eventsData || []).map(async (event) => {
          const { data: tiers } = await supabase
            .from('ticket_tiers')
            .select('*')
            .eq('event_id', event.id);
          return { ...event, ticket_tiers: tiers || [] };
        })
      );

      setEvents(eventsWithTiers);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  function openBookingModal(event: Event, tier: TicketTier) {
    setSelectedEvent(event);
    setSelectedTier(tier);
    setQuantity(1);
    setFormData({ name: '', email: '', phone: '' });
    setShowBookingModal(true);
    setShowConfirmation(false);
  }

  function closeBookingModal() {
    setShowBookingModal(false);
    setSelectedEvent(null);
    setSelectedTier(null);
  }

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEvent || !selectedTier) return;

    setBookingLoading(true);

    try {
      const totalAmount = selectedTier.price * quantity;
      const reference = `ABR-${Date.now().toString(36).toUpperCase()}`;

      const { error } = await supabase
        .from('ticket_bookings')
        .insert({
          event_id: selectedEvent.id,
          ticket_tier_id: selectedTier.id,
          booking_reference: reference,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          quantity: quantity,
          total_amount: totalAmount,
          payment_status: 'pending',
        });

      if (error) throw error;

      setBookingReference(reference);
      setShowConfirmation(true);

      // Refresh events to update ticket counts
      fetchEvents();
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  }

  const totalAmount = selectedTier ? selectedTier.price * quantity : 0;

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      {/* Hero Section */}
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

      {/* Upcoming Events with Tickets */}
      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <Ticket className="w-5 h-5 text-primary-400" />
            <h2 className="font-display text-3xl font-bold">Available Shows</h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-dark-400">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all"
                >
                  <div className="lg:flex">
                    <div className="lg:w-2/5 aspect-video lg:aspect-auto overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="lg:w-3/5 p-6 lg:p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-accent-500 text-dark-950 text-sm font-bold rounded-full">
                          Upcoming
                        </span>
                        <span className="text-dark-500 text-sm">
                          {event.tickets_available - event.tickets_sold} tickets left
                        </span>
                      </div>

                      <h3 className="font-display text-3xl font-bold mb-3">{event.title}</h3>
                      <p className="text-dark-400 mb-6">{event.description}</p>

                      <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-dark-300">
                          <Calendar className="w-4 h-4 text-primary-400" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-dark-300">
                          <Clock className="w-4 h-4 text-primary-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-dark-300">
                          <MapPin className="w-4 h-4 text-primary-400" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {/* Ticket Tiers */}
                      <div className="grid sm:grid-cols-3 gap-4">
                        {event.ticket_tiers.map((tier) => {
                          const remaining = tier.quantity_available - tier.quantity_sold;
                          const isSoldOut = remaining <= 0;
                          return (
                            <div
                              key={tier.id}
                              className={`p-4 rounded-xl border transition-all ${
                                isSoldOut
                                  ? 'bg-dark-800/30 border-dark-700'
                                  : 'bg-dark-700/30 border-primary-500/30 hover:border-primary-500 hover:bg-dark-700/50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-lg">{tier.name}</h4>
                                {tier.name === 'VVIP' && (
                                  <Star className="w-4 h-4 text-accent-500" fill="currentColor" />
                                )}
                              </div>
                              <p className="text-primary-400 font-display text-2xl font-bold mb-2">
                                {formatPrice(tier.price)}
                              </p>
                              <p className="text-dark-400 text-sm mb-3">{tier.description}</p>
                              <div className="flex items-center gap-2 text-xs text-dark-500 mb-3">
                                <Users size={12} />
                                <span>{remaining} available</span>
                              </div>
                              {isSoldOut ? (
                                <button
                                  disabled
                                  className="w-full py-2 rounded-lg bg-dark-800 text-dark-500 font-semibold cursor-not-allowed"
                                >
                                  Sold Out
                                </button>
                              ) : (
                                <button
                                  onClick={() => openBookingModal(event, tier)}
                                  className="w-full py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                  <Ticket size={16} /> Buy Now
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-dark-800/30 rounded-2xl border border-dark-700">
              <Calendar className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400 text-lg">No upcoming events at the moment.</p>
              <p className="text-dark-500 mt-2">Subscribe below to get notified when tickets are available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-16 px-4 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-accent-500" />
            <h2 className="font-display text-3xl font-bold">Past Shows</h2>
          </div>
          <p className="text-dark-400 mb-10 max-w-2xl">
            Missed a show? Relive the moments on YouTube. These are highlights from previous performances.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-dark-800/50 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/30 transition-all"
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
                  <a
                    href={event.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    Watch on YouTube <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification Signup */}
      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Be the First to Know
          </h3>
          <p className="text-dark-400 mb-8">
            Subscribe to get notified when tickets go on sale for upcoming shows.
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

      {/* Book for Your Event */}
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
                  Get in touch to discuss availability and pricing.
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
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
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

      {/* Booking Modal */}
      {showBookingModal && selectedEvent && selectedTier && (
        <div className="fixed inset-0 z-[100] bg-dark-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {!showConfirmation ? (
              <>
                <div className="p-6 border-b border-dark-700">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold">Book Tickets</h2>
                    <button
                      onClick={closeBookingModal}
                      className="p-2 hover:bg-dark-800 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Event Summary */}
                  <div className="bg-dark-800/50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-lg mb-2">{selectedEvent.title}</h3>
                    <p className="text-dark-400 text-sm mb-3">{formatDate(selectedEvent.date)} at {selectedEvent.time}</p>
                    <div className="flex items-center gap-2 text-dark-400 text-sm">
                      <MapPin size={14} />
                      <span>{selectedEvent.venue}, {selectedEvent.location}</span>
                    </div>
                  </div>

                  {/* Ticket Selection */}
                  <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-primary-400 text-sm font-medium">{selectedTier.name} Ticket</span>
                        <p className="font-display text-2xl font-bold">{formatPrice(selectedTier.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(selectedTier.quantity_available - selectedTier.quantity_sold, quantity + 1))}
                          className="w-10 h-10 rounded-full bg-dark-700 hover:bg-dark-600 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {selectedTier.perks && selectedTier.perks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedTier.perks.map((perk, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-dark-700 rounded-full text-dark-300">
                            {perk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Customer Details Form */}
                  <form onSubmit={handleBooking}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                          placeholder="+234 xxx xxx xxxx"
                        />
                      </div>
                    </div>

                    {/* Total */}
                    <div className="bg-dark-800 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-dark-400">Subtotal ({quantity} ticket{quantity > 1 ? 's' : ''})</span>
                        <span>{formatPrice(selectedTier.price * quantity)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-dark-700">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-display text-2xl font-bold text-primary-400">{formatPrice(totalAmount)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={20} />
                          Proceed to Payment
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-dark-400 mb-6">Your tickets have been reserved.</p>

                <div className="bg-dark-800 rounded-xl p-4 mb-6">
                  <p className="text-sm text-dark-400 mb-1">Booking Reference</p>
                  <p className="font-display text-3xl font-bold text-primary-400">{bookingReference}</p>
                </div>

                <p className="text-dark-400 text-sm mb-6">
                  A confirmation email has been sent to <span className="text-white">{formData.email}</span>.
                  Please save your booking reference for ticket collection.
                </p>

                <button
                  onClick={closeBookingModal}
                  className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-dark-950 font-semibold rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
