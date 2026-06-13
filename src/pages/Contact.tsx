import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getSupabase } from '../lib/supabase';

const enquiryTypes = [
  { value: 'booking', label: 'Booking Inquiry' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'wedding', label: 'Wedding/MC Services' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'media', label: 'Media/Press' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    enquiry_type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const supabase = getSupabase();
    if (!supabase) {
      setStatus('error');
      setErrorMessage('Database connection is not configured. Please check back later.');
      return;
    }

    try {
      const { error } = await supabase.from('leads').insert([formData]);

      if (error) {
        throw error;
      }

      setStatus('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        enquiry_type: '',
        message: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-400 font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Let's Connect
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Get in <span className="text-primary-400">Touch</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Ready to book Abarie for your event? Have a question? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">Contact Information</h2>
                <p className="text-dark-400">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Location</p>
                    <p className="text-dark-400">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Phone</p>
                    <a href="tel:+2348012345678" className="text-dark-400 hover:text-primary-400 transition-colors">
                      +234 801 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Email</p>
                    <a href="mailto:contact@abarie.com" className="text-dark-400 hover:text-primary-400 transition-colors">
                      contact@abarie.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-dark-500 text-sm">
                  For urgent bookings, call directly or reach out on social media.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-dark-800/60 border border-dark-700 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Send a Message</h3>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-green-400" size={32} />
                    </div>
                    <h4 className="font-display text-2xl font-bold mb-3">Message Sent!</h4>
                    <p className="text-dark-400 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="first_name" className="block text-dark-300 font-medium mb-2">
                          First Name <span className="text-accent-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block text-dark-300 font-medium mb-2">
                          Last Name <span className="text-accent-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-dark-300 font-medium mb-2">
                        Email Address <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquiry_type" className="block text-dark-300 font-medium mb-2">
                        Inquiry Type <span className="text-accent-500">*</span>
                      </label>
                      <select
                        id="enquiry_type"
                        name="enquiry_type"
                        value={formData.enquiry_type}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-dark-500">Select inquiry type</option>
                        {enquiryTypes.map(option => (
                          <option key={option.value} value={option.value} className="text-white">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-dark-300 font-medium mb-2">
                        Message <span className="text-accent-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-dark-900 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                        placeholder="Tell us about your event or inquiry..."
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
