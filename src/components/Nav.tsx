import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ticket } from 'lucide-react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const sectionHref = (anchor: string) => (isHome ? anchor : `/${anchor}`);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.webp"
              alt="Abarie.com Comedy"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-200 hover:text-primary-400 transition-colors font-medium">
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-primary-400'
                  : 'text-dark-200 hover:text-primary-400'
              }`}
            >
              About
            </Link>
            <Link
              to="/events"
              className={`font-medium transition-colors ${
                location.pathname === '/events'
                  ? 'text-primary-400'
                  : 'text-dark-200 hover:text-primary-400'
              }`}
            >
              Events
            </Link>
            <Link
              to="/tickets"
              className={`font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname === '/tickets'
                  ? 'text-accent-400'
                  : 'text-dark-200 hover:text-accent-400'
              }`}
            >
              <Ticket size={16} /> Get Your Tickets
            </Link>
            <Link
              to="/portfolio"
              className={`font-medium transition-colors ${
                location.pathname === '/portfolio'
                  ? 'text-primary-400'
                  : 'text-dark-200 hover:text-primary-400'
              }`}
            >
              Portfolio
            </Link>
            <a href={sectionHref('#contact')} className="text-dark-200 hover:text-primary-400 transition-colors font-medium">
              Contact
            </a>
            <a
              href={sectionHref('#book')}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-primary-500/25"
            >
              Book Now
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-dark-200 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block py-2 text-dark-200 hover:text-primary-400 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className={`block py-2 font-medium transition-colors ${
              location.pathname === '/about' ? 'text-primary-400' : 'text-dark-200 hover:text-primary-400'
            }`}>
              About
            </Link>
            <Link to="/events" className={`block py-2 font-medium transition-colors ${
              location.pathname === '/events' ? 'text-primary-400' : 'text-dark-200 hover:text-primary-400'
            }`}>
              Events
            </Link>
            <Link to="/tickets" className={`block py-2 font-medium transition-colors flex items-center gap-1.5 ${
              location.pathname === '/tickets' ? 'text-accent-400' : 'text-dark-200 hover:text-accent-400'
            }`}>
              <Ticket size={16} /> Get Your Tickets
            </Link>
            <Link to="/portfolio" className={`block py-2 font-medium transition-colors ${
              location.pathname === '/portfolio' ? 'text-primary-400' : 'text-dark-200 hover:text-primary-400'
            }`}>
              Portfolio
            </Link>
            <a href={sectionHref('#contact')} className="block py-2 text-dark-200 hover:text-primary-400 transition-colors font-medium">
              Contact
            </a>
            <a
              href={sectionHref('#book')}
              className="block bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center px-6 py-3 rounded-full font-semibold"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}