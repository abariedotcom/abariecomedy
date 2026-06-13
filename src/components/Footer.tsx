import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Ticket } from 'lucide-react';

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.52 1.18 2.89 2.89 0 0 1 2.31-4.26V9.23a6.32 6.32 0 0 0-5.61 6.47 6.32 6.32 0 0 0 6.32 6.32 6.32 6.32 0 0 0 6.32-6.32V9.12a8.61 8.61 0 0 0 4.76 1.43V7.17a4.83 4.83 0 0 1-1.36-.48z" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img
                src="/images/logo.webp"
                alt="Abarie.com Comedy"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-dark-400 mb-6">
              Nigeria's most electrifying stand-up comedian and compere. Based in Lagos, performing everywhere.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/Abariedotcomcomedy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/abarie.com_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@abarie.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
              <a
                href="https://www.youtube.com/@Abarie.comcomedy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-dark-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-dark-400 hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/events" className="text-dark-400 hover:text-primary-400 transition-colors">Events</Link></li>
              <li><Link to="/portfolio" className="text-dark-400 hover:text-primary-400 transition-colors">Portfolio</Link></li>
              <li><a href="/#book" className="text-dark-400 hover:text-primary-400 transition-colors">Book Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Get Tickets</h4>
            <ul className="space-y-3">
              <li><Link to="/tickets" className="text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-2"><Ticket size={16} /> Buy Event Tickets</Link></li>
              <li><a href="/#services" className="text-dark-400 hover:text-primary-400 transition-colors">Stand-Up Comedy</a></li>
              <li><a href="/#services" className="text-dark-400 hover:text-primary-400 transition-colors">Event Compere</a></li>
              <li><a href="/#services" className="text-dark-400 hover:text-primary-400 transition-colors">Corporate Shows</a></li>
              <li><a href="/#services" className="text-dark-400 hover:text-primary-400 transition-colors">Private Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-400">Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-400 flex-shrink-0" size={20} />
                <a href="tel:+2348012345678" className="text-dark-400 hover:text-primary-400 transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-400 flex-shrink-0" size={20} />
                <a href="mailto:contact@abarie.com" className="text-dark-400 hover:text-primary-400 transition-colors">
                  contact@abarie.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-center md:text-left">
              © 2025 Abarie.com Entertainment. All rights reserved.
            </p>
            <p className="text-dark-500 text-sm">
              Built with heart for Nigeria's Rib-Cracker
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}