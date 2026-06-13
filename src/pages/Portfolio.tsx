import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, ExternalLink, Filter, X, Phone, Mail,
  Camera, Video, Mic, Star, Eye,
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const categories = ['All', 'Show', 'Performance', 'Live', 'Exclusive', 'Behind The Scenes'];

const portfolioItems = [
  {
    id: 1,
    title: 'So Far So Good 2.0 Highlights',
    category: 'Show',
    image: '/images/portfolio-1.webp',
    link: 'https://youtube.com/@abariedotcom',
    description: 'Highlights from the second edition of Abarie\'s flagship show. A night of non-stop laughter that had Lagos talking for weeks.',
    tags: ['Headline Show', 'Lagos', '2024'],
  },
  {
    id: 2,
    title: 'Mudiaga Comedy Show',
    category: 'Performance',
    image: '/images/portfolio-2.webp',
    link: 'https://youtube.com/@abariedotcom',
    description: 'Abarie delivers a show-stopping performance at the Mudiaga Comedy Show, proving why he\'s one of Nigeria\'s finest.',
    tags: ['Guest Performance', 'Comedy Night'],
  },
  {
    id: 3,
    title: 'So Far So Good 1.0',
    category: 'Show',
    image: '/images/portfolio-3.webp',
    link: 'https://youtube.com/@abariedotcom',
    description: 'The debut edition of the So Far So Good franchise. The show that started it all and set the standard for everything after.',
    tags: ['Headline Show', 'Debut', '2022'],
  },
  {
    id: 4,
    title: 'Live on Stage',
    category: 'Live',
    image: '/images/portfolio-4.webp',
    link: 'https://youtube.com/@abariedotcom',
    description: 'Raw, unfiltered Abarie doing what he does best — commanding a stage and owning every second of it.',
    tags: ['Live Show', 'Stand-Up'],
  },
  {
    id: 5,
    title: 'Behind The Scenes',
    category: 'Behind The Scenes',
    image: '/images/portfolio-5.webp',
    link: 'https://youtube.com/@abariedotcom',
    description: 'A glimpse behind the curtain. The preparation, the focus, and the moments before the mic goes live.',
    tags: ['BTS', 'Exclusive'],
  },
  {
    id: 6,
    title: 'Abarie in Action',
    category: 'Live',
    image: '/images/portfolio-6.webp',
    link: 'https://youtube.com/@abariedotcom',
    description: 'Electrifying energy meets razor-sharp wit. Abarie in his element, delivering punchlines that leave no rib uncracked.',
    tags: ['Live Performance', 'Crowd Work'],
  },
];

const stats = [
  { number: '50+', label: 'Performances', icon: Mic },
  { number: '6+', label: 'Headline Shows', icon: Video },
  { number: '100K+', label: 'Views Online', icon: Eye },
  { number: '4.9', label: 'Audience Rating', icon: Star },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[number] | null>(null);

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Show': return Video;
      case 'Performance': return Mic;
      case 'Live': return Camera;
      case 'Behind The Scenes': return Eye;
      case 'Exclusive': return Star;
      default: return Camera;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/90 to-dark-950" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-primary-400/10 border border-primary-400/30 rounded-full text-primary-400 text-sm font-medium mb-6">
              Video Portfolio
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              The <span className="text-primary-400">Highlights</span>
            </h1>
            <p className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              From sold-out headline shows to unforgettable guest performances — explore the moments that define Abarie.com.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {stats.map(({ number, label, icon: Icon }, i) => (
              <div
                key={i}
                className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 text-center hover:border-primary-500/30 transition-colors group"
              >
                <Icon className="w-7 h-7 text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-display text-3xl font-bold text-white">{number}</p>
                <p className="text-dark-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <Filter className="text-dark-400 w-5 h-5" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-primary-500 text-dark-950 shadow-lg shadow-primary-500/25'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white border border-dark-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <div
                  key={item.id}
                  className="group bg-dark-800/40 rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-dark-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={28} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-950/80 backdrop-blur-sm text-primary-400 text-xs font-semibold rounded-full border border-dark-700">
                        <CategoryIcon size={12} />
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-dark-700 text-dark-300 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-primary-400 hover:text-primary-300 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Eye size={14} /> View Details
                      </button>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-400 hover:text-accent-400 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink size={14} /> YouTube
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400 text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-dark-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-dark-900 border border-dark-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-dark-950/40 flex items-center justify-center">
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-500/40 transition-colors transform hover:scale-110"
                >
                  <Play size={36} className="text-white ml-1" fill="white" />
                </a>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-950/80 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 text-primary-400 text-sm font-semibold rounded-full border border-primary-500/30">
                  {(() => { const Icon = getCategoryIcon(selectedItem.category); return <Icon size={14} />; })()}
                  {selectedItem.category}
                </span>
                {selectedItem.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-dark-800 text-dark-300 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-dark-300 leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-dark-950 px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  <Play size={18} /> Watch on YouTube
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="inline-flex items-center justify-center gap-2 border border-dark-600 text-dark-300 hover:text-white hover:border-dark-400 px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Width Gallery Strip */}
      <section className="py-16 bg-dark-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">In the Moment</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Captured <span className="text-primary-400">On Stage</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="aspect-square rounded-xl overflow-hidden group">
              <img
                src={`/images/portfolio-${n}.webp`}
                alt={`Abarie performance ${n}`}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-red-900/30 to-red-800/10 border border-red-700/30 rounded-2xl p-8 sm:p-12">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-6">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              More on <span className="text-red-500">YouTube</span>
            </h2>
            <p className="text-dark-300 text-lg mb-8 max-w-xl mx-auto">
              Subscribe to the channel for full performances, behind-the-scenes content, and new releases.
            </p>
            <a
              href="https://youtube.com/@abariedotcom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-red-500/25"
            >
              Visit YouTube Channel <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Want This Energy at Your Event?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Book Abarie for your corporate event, wedding, concert, or private show. Every performance is unforgettable.
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
          <p className="mt-8 text-primary-200 text-sm">
            Or head back to{' '}
            <Link to="/" className="underline hover:text-white transition-colors">
              the homepage
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
