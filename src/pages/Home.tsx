import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, ChevronLeft, ChevronRight, Play,
  Calendar, Star, Users, Award, Mic,
  Drama, UserCheck, Sparkles, ExternalLink, ArrowRight,
  Phone, Mail,
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const heroSlides = [
  { src: '/images/hero-1.webp', alt: "Abarie.com - Nigeria's Rib-Cracker" },
  { src: '/images/hero-2.webp', alt: 'Abarie.com - So Far So Good' },
  { src: '/images/hero-3.webp', alt: 'Abarie.com Live on Stage' },
];

const stats = [
  { number: '50+', label: 'Shows', icon: Mic },
  { number: '100K+', label: 'Followers', icon: Users },
  { number: '4+', label: 'Years Active', icon: Calendar },
  { number: '3', label: 'Awards', icon: Award },
];

const services = [
  {
    icon: Mic,
    title: 'Stand-Up Comedy',
    description: 'Headline comedy performances that leave audiences in stitches. From corporate events to sold-out arenas.',
  },
  {
    icon: UserCheck,
    title: 'Event Compere (MC)',
    description: 'Professional Master of Ceremonies for corporate events, weddings, concerts, and award ceremonies.',
  },
  {
    icon: Drama,
    title: 'Corporate Shows',
    description: 'Clean, tailored comedy for corporate audiences. Team building events, annual dinners, and product launches.',
  },
  {
    icon: Sparkles,
    title: 'Private Events',
    description: 'Weddings, birthday parties, and special occasions. Making your memorable moments even more magical.',
  },
];

const upcomingEvents = [
  { title: 'So Far So Good 3.0', date: 'Coming Soon', venue: 'Lagos, Nigeria', image: '/images/event-1.webp' },
  { title: 'Corporate Comedy Night', date: 'Monthly', venue: 'Lagos', image: '/images/event-2.webp' },
  { title: 'Campus Tour', date: 'TBA', venue: 'Nationwide', image: '/images/event-3.webp' },
];

const portfolioItems = [
  { title: 'So Far So Good 2.0 Highlights', category: 'Show', image: '/images/portfolio-1.webp', link: 'https://youtube.com/@abariedotcom' },
  { title: 'Mudiaga Comedy Show', category: 'Performance', image: '/images/portfolio-2.webp', link: 'https://youtube.com/@abariedotcom' },
  { title: 'So Far So Good 1.0', category: 'Show', image: '/images/portfolio-3.webp', link: 'https://youtube.com/@abariedotcom' },
  { title: 'Live on Stage', category: 'Performance', image: '/images/portfolio-4.webp', link: 'https://youtube.com/@abariedotcom' },
  { title: 'Behind The Scenes', category: 'Exclusive', image: '/images/portfolio-5.webp', link: 'https://youtube.com/@abariedotcom' },
  { title: 'Abarie in Action', category: 'Live', image: '/images/portfolio-6.webp', link: 'https://youtube.com/@abariedotcom' },
];

const testimonials = [
  {
    quote: "Abarie brought the house down at our corporate gala. His ability to read the room and deliver tailored humor is unmatched.",
    author: 'Chidi Okonkwo',
    role: 'Event Director, Tech Summit Nigeria',
  },
  {
    quote: "From hawkers on Lagos streets to headlining shows - Abarie's journey inspires as much as his comedy entertains. True talent.",
    author: 'Adaeze Nwosu',
    role: 'Entertainment Journalist',
  },
  {
    quote: "We've booked Abarie three times for our annual company dinner. Every single time, he delivers beyond expectations.",
    author: 'Emeka Okafor',
    role: 'HR Director, FirstBank Nigeria',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      {/* Hero */}
      <section id="home" className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/50 to-dark-950" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-5xl mx-auto">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 animate-fade-in">
              The One &amp; Only
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
              <span className="text-white">ABARIE</span>
              <span className="text-accent-500">.COM</span>
            </h1>
            <p className="text-xl sm:text-2xl text-dark-200 mb-8 max-w-3xl mx-auto animate-slide-up">
              From hawking vegetables on the streets of Lagos to headlining sold-out shows &mdash;
              Nigeria's most electrifying stand-up comedian and compere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <a
                href="#book"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                Book Abarie <ArrowRight size={20} />
              </a>
              <Link
                to="/about"
                className="border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-dark-950 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-dark-900/50 hover:bg-primary-500 rounded-full transition-all backdrop-blur-sm">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-dark-900/50 hover:bg-primary-500 rounded-full transition-all backdrop-blur-sm">
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary-400 w-8' : 'bg-dark-400 hover:bg-dark-300 w-3'}`}
            />
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section id="about" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="/images/about-portrait.webp"
                  alt="Abarie - Nigeria's Rib-Cracker"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-2xl shadow-2xl">
                <p className="font-display text-4xl font-bold">4+ Years</p>
                <p className="text-primary-100">Making People Laugh</p>
              </div>
            </div>

            <div>
              <p className="text-primary-400 font-medium tracking-wider uppercase mb-4">About Abarie</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Comedy Was Always <span className="text-primary-400">In Him</span>
              </h2>
              <div className="space-y-4 text-dark-300 text-lg">
                <p>
                  Born in Lagos and raised with deep Nnewi, Anambra State roots, Ifeanyichukwu Daniel Okeke &mdash;
                  the man the world knows as <span className="text-primary-400 font-semibold">Abarie.com</span> &mdash;
                  didn't discover comedy. Comedy found him.
                </p>
                <p>
                  On construction sites, in market stalls, and through years of humble hustle, his gift for
                  making people laugh was simply undeniable. His career ignited in 2021 and has not slowed since.
                </p>
              </div>

              <blockquote className="mt-8 border-l-4 border-primary-500 pl-6 italic text-dark-200">
                "From selling vegetables to fend for my large family, to being a labourer at construction
                sites &mdash; I never let my reality then judge my future."
              </blockquote>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary-400 hover:text-primary-300 font-semibold text-lg group transition-colors"
              >
                Read Full Story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-200 group-hover:scale-110 transition-transform" />
                <p className="font-display text-5xl sm:text-6xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-primary-200 font-medium text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4">Don't Miss Out</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Upcoming <span className="text-primary-400">Events</span>
            </h2>
            <p className="mt-4 text-dark-400 text-lg max-w-2xl mx-auto">
              Be part of the experience. Catch Abarie live at these upcoming shows and events.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="group bg-dark-800/50 rounded-2xl overflow-hidden hover:bg-dark-800 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary-400 text-sm mb-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-dark-400">
                    <MapPin size={16} />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#book"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-accent-500/25"
            >
              Book for Your Event <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4">What I Offer</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Services &amp; <span className="text-primary-400">Expertise</span>
            </h2>
            <p className="mt-4 text-dark-400 text-lg max-w-2xl mx-auto">
              From headline comedy to corporate MC &mdash; Abarie.com delivers every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-dark-800/50 rounded-2xl hover:bg-gradient-to-b hover:from-primary-600 hover:to-primary-700 transition-all duration-300 border border-dark-700 hover:border-primary-500"
              >
                <service.icon className="w-14 h-14 text-primary-400 group-hover:text-white mb-6 transition-colors" />
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark-400 group-hover:text-primary-100 transition-colors">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4">My Work</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Video <span className="text-primary-400">Portfolio</span>
            </h2>
            <p className="mt-4 text-dark-400 text-lg max-w-2xl mx-auto">
              Click any card to watch the full video on YouTube.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center">
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-primary-400 text-sm font-medium">{item.category}</p>
                  <h3 className="font-display text-xl font-bold mt-1 group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://youtube.com/@abariedotcom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold text-lg group transition-colors"
            >
              More Videos on YouTube <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4">What People Say</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              The Crowd <span className="text-primary-400">Never Lies</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-dark-800/50 rounded-2xl p-8 relative border border-dark-700">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-accent-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-dark-200 italic mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-dark-400 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="py-24 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Book Abarie For Your Event
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Headline comedian, sharp MC, corporate events, weddings, concerts &mdash;
            Abarie.com delivers every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2348012345678"
              className="bg-white text-primary-700 hover:bg-dark-100 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
