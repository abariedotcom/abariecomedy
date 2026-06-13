import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Loader2, User, Mail, Phone, CreditCard, Check, AlertCircle } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getEventById, createBooking, type Event } from '../lib/supabase';

type TicketType = 'regular' | 'vip';

interface FormData {
  name: string;
  email: string;
  phone: string;
  ticketType: TicketType;
  quantity: number;
}

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

export default function BookEvent() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    ticketType: 'regular',
    quantity: 1,
  });

  useEffect(() => {
    async function fetchEvent() {
      if (!eventId) return;
      const eventData = await getEventById(eventId);
      setEvent(eventData);
      setLoading(false);
    }
    fetchEvent();
  }, [eventId]);

  const ticketPrice = event
    ? formData.ticketType === 'vip' && event.price_vip
      ? event.price_vip
      : event.price_regular
    : 0;

  const totalAmount = ticketPrice * formData.quantity;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setSubmitting(true);
    setError(null);

    try {
      const booking = await createBooking({
        event_id: event.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ticket_type: formData.ticketType,
        quantity: formData.quantity,
        total_amount: totalAmount,
      });

      if (booking) {
        setBookingRef(booking.id);
        setSuccess(true);
      } else {
        setError('Failed to create booking. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-950 text-white">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-dark-400 mb-8">The event you're looking for doesn't exist or is no longer available.</p>
          <Link
            to="/tickets"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-dark-950 font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={20} /> View All Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-dark-950 text-white">
        <Nav />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="text-center bg-dark-800/50 rounded-2xl p-8 border border-dark-700">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-dark-400 mb-6">
              Thank you for booking tickets for {event.title}. A confirmation email will be sent to {formData.email}.
            </p>
            <div className="bg-dark-900 rounded-lg p-4 mb-6 text-left">
              <p className="text-dark-400 text-sm mb-2">Booking Reference</p>
              <p className="text-primary-400 font-mono text-lg">{bookingRef}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tickets"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-dark-950 font-semibold rounded-lg transition-colors"
              >
                Book More Tickets
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const ticketsRemaining = event.tickets_available - event.tickets_sold;

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      <section className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/tickets"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} /> Back to Events
          </Link>

          <div className="bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700">
            <div className="md:flex">
              <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                <img
                  src={event.image_url || '/images/event-1.webp'}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <span className="inline-block px-3 py-1 bg-accent-500 text-dark-950 text-sm font-bold rounded-full mb-4">
                  Featured Event
                </span>
                <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">{event.title}</h1>
                <p className="text-dark-400 mb-6">{event.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-dark-300">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <Clock className="w-5 h-5 text-primary-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-dark-400 text-sm">
                  <Ticket className="w-4 h-4" />
                  <span>{ticketsRemaining} tickets available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 rounded-2xl border border-dark-700 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-400" />
              Book Your Tickets
            </h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Number of Tickets
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'ticket' : 'tickets'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-3">
                  Ticket Type
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, ticketType: 'regular' }))}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      formData.ticketType === 'regular'
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-dark-700 hover:border-dark-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Regular</span>
                      <span className="text-primary-400 font-bold">{formatPrice(event.price_regular)}</span>
                    </div>
                    <p className="text-dark-400 text-sm">General admission seating</p>
                  </button>

                  {event.price_vip && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, ticketType: 'vip' }))}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        formData.ticketType === 'vip'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-700 hover:border-dark-600'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">VIP</span>
                        <span className="text-primary-400 font-bold">{formatPrice(event.price_vip)}</span>
                      </div>
                      <p className="text-dark-400 text-sm">Premium seating with exclusive perks</p>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-dark-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-400">
                    {formData.quantity} x {formData.ticketType === 'vip' ? 'VIP' : 'Regular'} ticket{formData.quantity > 1 ? 's' : ''}
                  </span>
                  <span className="text-white">{formatPrice(ticketPrice * formData.quantity)}</span>
                </div>
                <div className="border-t border-dark-700 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary-400">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 disabled:cursor-not-allowed text-dark-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Ticket className="w-5 h-5" />
                    Confirm Booking
                  </>
                )}
              </button>

              <p className="text-dark-500 text-sm text-center">
                By booking, you agree to receive email confirmations and event updates.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}