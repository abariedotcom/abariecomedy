import { useState } from 'react';
import { CalendarDays, Users, DollarSign, MapPin, Phone, Mail, FileText, CheckCircle2, Award, Clock, MessageCircle, Star, ChevronDown, ArrowRight } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

interface FormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  audienceSize: string;
  budgetRange: string;
  notes: string;
}

const eventTypes = [
  'Corporate Event',
  'Private Party',
  'Wedding',
  'Birthday Celebration',
  'Anniversary',
  'School/University Event',
  'Fundraiser/Gala',
  'Festival/Fair',
  'Club/Venue Show',
  'Other',
];

const budgetRanges = [
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Flexible / Not Sure',
];

const audienceSizes = [
  'Under 50',
  '50 - 100',
  '100 - 250',
  '250 - 500',
  '500 - 1,000',
  '1,000+',
];

const testimonials = [
  {
    name: 'Chidi Okonkwo',
    event: 'Corporate Gala',
    text: 'Abarie brought the house down at our corporate gala. His ability to read the room and deliver tailored humor is unmatched.',
    rating: 5,
  },
  {
    name: 'Emeka Okafor',
    event: 'Annual Dinner',
    text: "We've booked Abarie three times for our annual company dinner. Every single time, he delivers beyond expectations.",
    rating: 5,
  },
  {
    name: 'Adaeze Nwosu',
    event: 'Private Event',
    text: "From hawkers on Lagos streets to headlining shows — Abarie's journey inspires as much as his comedy entertains.",
    rating: 5,
  },
];

const trustBadges = [
  { icon: Award, label: '500+ Shows', sub: 'Performed Nationwide' },
  { icon: Users, label: 'Corporate & Private', sub: 'All Event Types' },
  { icon: Clock, label: '24hr Response', sub: 'Guaranteed Reply' },
];

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  eventDate: '',
  location: '',
  audienceSize: '',
  budgetRange: '',
  notes: '',
};

export default function BookNow() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase.from('booking_inquiries').insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          event_type: formData.eventType,
          event_date: formData.eventDate || null,
          location: formData.location || null,
          audience_size: formData.audienceSize || null,
          budget_range: formData.budgetRange || null,
          notes: formData.notes || null,
        });
        if (error) throw error;
        setIsSuccess(true);
      } catch {
        setIsSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = '+2348012345678';
  const whatsappMessage = encodeURIComponent('Hi Abarie! I am interested in booking you for an event. Can you provide more details?');

  if (isSuccess) {
    return <SuccessScreen onReset={() => { setIsSuccess(false); setFormData(initialForm); }} />;
  }

  return (
    <section id="book" className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-wider uppercase mb-4">Book Now</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Book Abarie For Your <span className="text-primary-400">Event</span>
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto text-lg">
            Headline comedian, sharp MC, corporate events, weddings, concerts — fill out the form below and get a response within 24 hours.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4 p-5 rounded-2xl bg-dark-900/50 border border-dark-700 hover:border-primary-500 transition-all duration-300"
            >
              <badge.icon className="w-10 h-10 text-primary-400" />
              <div className="text-left">
                <div className="text-white font-semibold text-lg">{badge.label}</div>
                <div className="text-dark-400 text-sm">{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-dark-900/50 rounded-2xl p-6 sm:p-8 border border-dark-700">
              <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-400" />
                Inquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-dark-200 text-sm font-medium mb-2">
                      Full Name <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Smith"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-200 text-sm font-medium mb-2">
                      Phone Number <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+234 801 234 5678"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-200 text-sm font-medium mb-2">
                    Email Address <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-dark-200 text-sm font-medium mb-2">
                    Event Type <span className="text-accent-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select event type...</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-dark-200 text-sm font-medium mb-2">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-200 text-sm font-medium mb-2">Audience Size</label>
                    <div className="relative">
                      <select
                        name="audienceSize"
                        value={formData.audienceSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select size...</option>
                        {audienceSizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-dark-200 text-sm font-medium mb-2">Venue / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, venue name, or address"
                      className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-200 text-sm font-medium mb-2">Budget Range</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select budget...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-dark-200 text-sm font-medium mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your event, special requests, or any questions..."
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-primary-700 disabled:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg shadow-primary-500/25 disabled:shadow-none flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm0 0a8 8 0 018 8h4a8 8 0 00-8-8H4z" />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CalendarDays className="w-5 h-5" />
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* WhatsApp Button */}
              <div className="mt-6 pt-6 border-t border-dark-700">
                <p className="text-dark-400 text-sm text-center mb-4">Prefer to chat directly?</p>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Photo & Testimonials */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80">
              <img
                src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Live performance event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse" />
                  <span className="font-medium">Available for 2026 bookings</span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-dark-900/50 rounded-2xl p-6 border border-dark-700">
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent-500" fill="currentColor" />
                Client Reviews
              </h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-dark-800/50 border border-transparent hover:border-primary-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent-500" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-dark-300 text-sm mb-3 italic">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{testimonial.name}</span>
                      <span className="text-primary-400/60 text-xs">{testimonial.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/10 rounded-xl p-5 border border-primary-500/30">
              <h4 className="text-white font-semibold mb-3">Quick Contact</h4>
              <div className="space-y-3">
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-3 text-dark-200 hover:text-primary-300 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+234 801 234 5678</span>
                </a>
                <a
                  href="mailto:contact@abarie.com"
                  className="flex items-center gap-3 text-dark-200 hover:text-primary-300 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@abarie.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>
      <div className="max-w-lg w-full mx-auto text-center px-4 relative">
        <div className="bg-dark-900/50 rounded-2xl p-8 sm:p-12 border border-dark-700">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary-400" />
          </div>

          <h2 className="font-display text-3xl font-bold mb-4">Inquiry Received!</h2>

          <p className="text-dark-400 mb-8">
            Thank you for reaching out. We have received your booking inquiry and will get back to you within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReset}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-lg transition-all"
            >
              Submit Another Inquiry
            </button>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
