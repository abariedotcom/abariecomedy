import { Link } from 'react-router-dom';
import { CalendarDays, Phone, Mail, ArrowRight } from 'lucide-react';

export default function BookNow() {
  return (
    <section id="book" className="py-24 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
          Ready to Book Abarie?
        </h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Headline comedian, sharp MC, corporate events, weddings, concerts —
          Abarie.com delivers every time. Get a response within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/book"
            className="bg-white text-primary-700 hover:bg-dark-100 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <CalendarDays size={20} /> Book Now <ArrowRight size={20} />
          </Link>
          <a
            href="tel:+2348012345678"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Phone size={20} /> Call Now
          </a>
          <a
            href="mailto:contact@abarie.com"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Mail size={20} /> Send Email
          </a>
        </div>
        <p className="mt-8 text-primary-200 text-sm">
          Or book directly via{' '}
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}