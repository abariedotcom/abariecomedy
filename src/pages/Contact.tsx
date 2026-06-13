import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  enquiry: string;
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  enquiry: '',
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        enquiry: formData.enquiry,
        source: 'contact_form',
      });
      if (error) throw error;
      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData(initialForm);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-400/10 border border-primary-400/30 rounded-full text-primary-400 text-sm font-medium mb-6">Get In Touch</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="text-primary-400">Us</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Have a question, want to book Abarie for an event, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              {isSuccess ? (
                <div className="bg-dark-800/50 rounded-2xl p-8 sm:p-12 border border-dark-700 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary-400" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-dark-400 mb-8">
                    Thank you for reaching out! We've received your message and will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-400 text-dark-950 font-semibold rounded-lg transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-dark-800/50 rounded-2xl p-6 sm:p-8 border border-dark-700">
                  <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-primary-400" />
                    Send a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-dark-200 text-sm font-medium mb-2">
                          First Name <span className="text-accent-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            placeholder="John"
                            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-dark-200 text-sm font-medium mb-2">
                          Last Name <span className="text-accent-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            placeholder="Smith"
                            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-dark-200 text-sm font-medium mb-2">
                        Email Address <span className="text-accent-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-dark-200 text-sm font-medium mb-2">
                        Your Enquiry <span className="text-accent-500">*</span>
                      </label>
                      <textarea
                        name="enquiry"
                        value={formData.enquiry}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
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
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 w-5" />
                          <span>Send Message</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Cards */}
              <div className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
                <h3 className="font-display text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Phone</p>
                      <a href="tel:+2348012345678" className="text-white font-medium hover:text-primary-400 transition-colors">
                        +234 801 234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Email</p>
                      <a href="mailto:contact@abarie.com" className="text-white font-medium hover:text-primary-400 transition-colors">
                        contact@abarie.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm mb-1">Location</p>
                      <p className="text-white font-medium">Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-primary-600/20 to-accent-500/10 rounded-2xl p-6 border border-primary-500/30">
                <h3 className="font-display text-xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link to="/about" className="flex items-center gap-2 text-dark-200 hover:text-primary-400 transition-colors">
                    <ArrowRight size={16} />
                    About Abarie
                  </Link>
                  <Link to="/events" className="flex items-center gap-2 text-dark-200 hover:text-primary-400 transition-colors">
                    <ArrowRight size={16} />
                    Upcoming Events
                  </Link>
                  <Link to="/tickets" className="flex items-center gap-2 text-dark-200 hover:text-accent-400 transition-colors">
                    <ArrowRight size={16} />
                    Get Tickets
                  </Link>
                  <a href="/#book" className="flex items-center gap-2 text-dark-200 hover:text-primary-400 transition-colors">
                    <ArrowRight size={16} />
                    Book Abarie
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden h-48">
                <img
                  src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Comedy show"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4 bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors">
            <ArrowRight size={20} className="rotate-180" />
            Back to Homepage
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );