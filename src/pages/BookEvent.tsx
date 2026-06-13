import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, CreditCard, Check, Shield, Info } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';

type TicketTier = 'regular' | 'vip' | 'table-of-5' | 'vip-table-of-5';

interface TicketOption {
  id: TicketTier;
  name: string;
  description: string;
  price: number;
  perks: string[];
  popular?: boolean;
}

const eventDetails: Record<string, { title: string; date: string; venue: string; location: string; image: string }> = {
  sfsg3: {
    title: "So Far So Good 3.0",
    date: "2026-08-15T19:00:00",
    venue: "Eko Convention Centre",
    location: "Lagos, Nigeria",
    image: "/images/event-1.webp",
  },
};

const defaultEvent = {
  title: "So Far So Good 3.0",
  date: "2026-08-15T19:00:00",
  venue: "Eko Convention Centre",
  location: "Lagos, Nigeria",
  image: "/images/event-1.webp",
};

const ticketOptions: TicketOption[] = [
  {
    id: 'regular',
    name: 'Regular',
    description: 'General admission seating',
    price: 5000,
    perks: ['Standard seating', 'Access to main show'],
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'Premium seating with exclusive perks',
    price: 15000,
    perks: ['Front-row seating', 'VIP lounge access', 'Complimentary drink'],
    popular: true,
  },
  {
    id: 'table-of-5',
    name: 'Regular Table (5 seats)',
    description: 'Reserve a table for your group',
    price: 20000,
    perks: ['Reserved table for 5', 'Standard seating area', 'Group experience'],
  },
  {
    id: 'vip-table-of-5',
    name: 'VIP Table (5 seats)',
    description: 'The ultimate group experience',
    price: 65000,
    perks: ['Reserved VIP table for 5', 'VIP lounge access', 'Complimentary drinks', 'Meet & greet photo'],
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function BookEvent() {
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedTier, setSelectedTier] = useState<TicketTier>('vip');
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });

  const event = (eventId && eventDetails[eventId]) || defaultEvent;
  const selected = ticketOptions.find((t) => t.id === selectedTier)!;
  const totalAmount = selected.price * quantity;

  const isTableTicket = selectedTier === 'table-of-5' || selectedTier === 'vip-table-of-5';
  const effectiveQuantity = isTableTicket ? quantity * 5 : quantity;
  const maxQuantity = isTableTicket ? 4 : 10;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const flutterwaveLink = `https://checkout.flutterwave.com/v3/hosted/pay?amount=${totalAmount}&currency=NGN&email=${encodeURIComponent(customerInfo.email)}&phone_number=${encodeURIComponent(customerInfo.phone)}&name=${encodeURIComponent(customerInfo.name)}&description=${encodeURIComponent(`${event.title} - ${selected.name} x${quantity}`)}&meta[event]=${encodeURIComponent(event.title)}&meta[ticket_type]=${encodeURIComponent(selected.name)}&meta[quantity]=${quantity}`;

  if (showPayment) {
    return (
      <div className="min-h-screen bg-dark-950 text-white font-sans">
        <Nav />

        <section className="pt-32 pb-8 px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              to={`/book/${eventId || 'sfsg3'}`}
              onClick={() => setShowPayment(false)}
              className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8"
            >
              <ArrowLeft size={20} /> Back to ticket selection
            </Link>

            <div className="bg-dark-800/50 rounded-2xl border border-primary-500/30 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">Complete Payment</h1>
                  <p className="text-dark-400 text-sm">Secure payment via Flutterwave</p>
                </div>
              </div>

              <div className="bg-dark-900 rounded-xl p-5 mb-6 space-y-4">
                <h3 className="font-semibold text-dark-300 text-sm uppercase tracking-wide">Order Summary</h3>
                <div className="flex justify-between">
                  <span className="text-dark-300">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">{selected.name}</span>
                  <span className="text-white">{formatPrice(selected.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">Quantity</span>
                  <span className="text-white">{quantity} {isTableTicket ? `(${effectiveQuantity} seats)` : ''}</span>
                </div>
                <div className="border-t border-dark-700 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary-400">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="bg-dark-900 rounded-xl p-5 mb-6 space-y-3">
                <h3 className="font-semibold text-dark-300 text-sm uppercase tracking-wide">Customer Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-dark-500">Name</span>
                    <p className="text-white">{customerInfo.name}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Email</span>
                    <p className="text-white">{customerInfo.email}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Phone</span>
                    <p className="text-white">{customerInfo.phone}</p>
                  </div>
                </div>
              </div>

              <a
                href={flutterwaveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 flex items-center justify-center gap-3"
              >
                <CreditCard className="w-5 h-5" />
                Pay {formatPrice(totalAmount)} with Flutterwave
              </a>

              <div className="flex items-center gap-2 mt-4 text-dark-500 text-sm justify-center">
                <Shield className="w-4 h-4" />
                <span>Secured by Flutterwave - your payment is safe</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      <section className="pt-32 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/tickets"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} /> Back to Events
          </Link>

          <div className="bg-dark-800/50 rounded-2xl overflow-hidden border border-dark-700 mb-10">
            <div className="md:flex">
              <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <span className="inline-block px-3 py-1 bg-accent-500 text-dark-950 text-sm font-bold rounded-full mb-4">
                  Forthcoming Event
                </span>
                <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {event.title}
                </h1>
                <div className="mb-5">
                  <CountdownTimer targetDate={event.date} label="Countdown to Showtime" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-dark-300">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <span>{new Date(event.date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <Clock className="w-5 h-5 text-primary-400" />
                    <span>{new Date(event.date).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold mb-2">Choose Your Tickets</h2>
            <p className="text-dark-400 mb-6">Select the ticket type that suits you and proceed to payment.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {ticketOptions.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedTier === tier.id
                      ? 'border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/10'
                      : 'border-dark-700 bg-dark-800/50 hover:border-dark-600'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 right-4 px-3 py-1 bg-accent-500 text-dark-950 text-xs font-bold rounded-full">
                      Popular
                    </span>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                    <span className="text-primary-400 font-bold text-xl">
                      {formatPrice(tier.price)}
                    </span>
                  </div>

                  <p className="text-dark-400 text-sm mb-4">{tier.description}</p>

                  <ul className="space-y-1.5">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-dark-300 text-sm">
                        <Check className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {selectedTier === tier.id && (
                    <div className="absolute top-3 left-3">
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-dark-950" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div className="bg-dark-800/50 rounded-2xl border border-dark-700 p-6 md:p-8">
              <h2 className="font-display text-xl font-bold mb-6">Your Details</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="e.g. 08012345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Number of {isTableTicket ? 'Tables' : 'Tickets'}
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {isTableTicket ? (num === 1 ? 'table' : 'tables') : (num === 1 ? 'ticket' : 'tickets')}
                        {isTableTicket && ` (${num * 5} seats)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-dark-900 rounded-lg p-5 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-dark-400">
                    {quantity} x {selected.name}
                    {isTableTicket && ` (${effectiveQuantity} seats total)`}
                  </span>
                  <span className="text-white">{formatPrice(selected.price * quantity)}</span>
                </div>
                <div className="border-t border-dark-700 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary-400">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-dark-950 font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>

              <div className="flex items-center gap-2 mt-4 text-dark-500 text-sm justify-center">
                <Info className="w-4 h-4" />
                <span>You'll be redirected to Flutterwave to complete your payment securely</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="py-12" />
      <Footer />
    </div>
  );
}
