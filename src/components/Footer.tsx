import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center space-x-1 mb-6">
              <span className="font-display text-3xl font-bold text-primary-400">Abarie</span>
              <span className="text-accent-500 text-3xl font-bold">.com</span>
            </Link>
            <p className="text-dark-400 mb-6">
              Nigeria's most electrifying stand-up comedian and compere. Based in Lagos, performing everywhere.
            </p>
            <div className="flex gap-4">
              {[
                { href: 'https://facebook.com/abariedotcom', Icon: Facebook },
                { href: 'https://instagram.com/abariedotcom', Icon: Instagram },
                { href: 'https://twitter.com/abariedotcom', Icon: Twitter },
                { href: 'https://youtube.com/@abariedotcom', Icon: Youtube },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-dark-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-dark-400 hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/events" className="text-dark-400 hover:text-primary-400 transition-colors">Events</Link></li>
              <li><a href="/#portfolio" className="text-dark-400 hover:text-primary-400 transition-colors">Portfolio</a></li>
              <li><a href="/#book" className="text-dark-400 hover:text-primary-400 transition-colors">Book Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold mb-6">Services</h4>
            <ul className="space-y-3">
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
