import { Link } from 'react-router-dom';
import {
  ArrowRight, Mic, Users, Calendar, Award, Star,
  MapPin, Phone, Mail, MessageSquare, Smile, Heart,
  TrendingUp, Zap, Globe, CheckCircle,
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const milestones = [
  {
    year: 'Early Life',
    title: 'Born Into Hustle',
    description:
      "Ifeanyichukwu Daniel Okeke was born in Lagos and raised with deep Nnewi, Anambra State roots. Growing up in a large family meant finding ways to make ends meet from a young age \u2014 and finding ways to make people smile along the way.",
    highlight: 'Lagos & Nnewi',
  },
  {
    year: 'The Grind',
    title: 'From Street to Stage',
    description:
      "While hawking vegetables in Lagos streets and working shifts on construction sites, Ifeanyichukwu discovered that his sharpest tool was his wit. He could make an entire crowd of strangers erupt in laughter with nothing but a word and a look.",
    highlight: 'Lagos Markets',
  },
  {
    year: '2021',
    title: 'The Spark That Lit a Fire',
    description:
      "His career officially ignited in 2021. What began as informal performances quickly evolved into a recognised comedy act. Abarie.com was born \u2014 and Nigeria's entertainment scene took notice.",
    highlight: 'Career Launch',
  },
  {
    year: '2022',
    title: 'So Far So Good 1.0',
    description:
      'Abarie launched his own headline show franchise, "So Far So Good" \u2014 a bold move that announced him as not just a performer, but a producer and visionary. The first edition sold out and delivered unforgettable nights.',
    highlight: 'Franchise Born',
  },
  {
    year: '2023',
    title: 'Building the Brand',
    description:
      "With growing demand for his MC services at corporate events and weddings across Nigeria, Abarie cemented himself as a versatile entertainment powerhouse. Surpassed 50K followers on social media.",
    highlight: '50K+ Followers',
  },
  {
    year: '2024',
    title: 'Headlining Nigeria',
    description:
      "So Far So Good 2.0 broke new records. Abarie shared stages with Nigeria's biggest comedy names, expanded his touring footprint, and crossed 100K followers \u2014 a milestone that reflected his massive organic fanbase.",
    highlight: '100K Milestone',
  },
  {
    year: 'Now',
    title: 'The Rib-Cracker Reigns',
    description:
      "Today, Abarie.com is Nigeria's most in-demand stand-up comedian and compere. With So Far So Good 3.0 on the horizon and a growing global audience, the best chapters are still being written.",
    highlight: 'The Future',
  },
];

const craftItems = [
  {
    icon: Smile,
    title: 'Observational Comedy',
    description:
      "Abarie mines everyday Nigerian life \u2014 the markets, the traffic, the family WhatsApp groups \u2014 and turns the ordinary into the extraordinary. His audiences see themselves in every punchline.",
  },
  {
    icon: Heart,
    title: 'Authentic Storytelling',
    description:
      "His comedy is rooted in real experience. From selling vegetables to building sites to the spotlight \u2014 Abarie's stories carry genuine weight, making the laughter feel earned and the connection feel real.",
  },
  {
    icon: Zap,
    title: 'Electric Stage Energy',
    description:
      "There is no fourth wall when Abarie takes the mic. He fills every corner of a room, reads the crowd in seconds, and adapts on the fly \u2014 a skill forged performing for tough audiences in unforgiving settings.",
  },
  {
    icon: Globe,
    title: 'Cross-Cultural Reach',
    description:
      "Lagos-born with Igbo heritage, Abarie speaks fluently across Nigeria's cultural tapestry. His comedy resonates whether the audience is a corporate boardroom or a community hall in the East.",
  },
  {
    icon: TrendingUp,
    title: 'Consistent Growth',
    description:
      "Four years into his career, Abarie is still accelerating. Each show is bigger than the last, each crowd more enthusiastic \u2014 a sign of an artist who is constantly evolving and investing in his craft.",
  },
  {
    icon: CheckCircle,
    title: 'Reliable Professionalism',
    description:
      "Event planners and corporate clients trust Abarie not just to perform, but to elevate. He arrives prepared, delivers on brief, and always leaves audiences asking when he's coming back.",
  },
];

const stats = [
  { number: '50+', label: 'Live Shows', icon: Mic },
  { number: '100K+', label: 'Social Followers', icon: Users },
  { number: '4+', label: 'Years Active', icon: Calendar },
  { number: '3', label: 'Industry Awards', icon: Award },
];

const testimonials = [
  {
    quote: "Abarie brought the house down at our corporate gala. His ability to read the room and deliver tailored humor is unmatched.",
    author: 'Chidi Okonkwo',
    role: 'Event Director, Tech Summit Nigeria',
  },
  {
    quote: "From hawkers on Lagos streets to headlining shows \u2014 Abarie's journey inspires as much as his comedy entertains. True talent.",
    author: 'Adaeze Nwosu',
    role: 'Entertainment Journalist',
  },
  {
    quote: "We've booked Abarie three times for our annual company dinner. Every single time, he delivers beyond expectations.",
    author: 'Emeka Okafor',
    role: 'HR Director, FirstBank Nigeria',
  },
];

const philosophyCards = [
  { label: 'Mission', value: 'Make Nigeria Laugh', icon: Smile },
  { label: 'Style', value: 'Observational & Raw', icon: Mic },
  { label: 'Reach', value: 'Pan-Nigerian', icon: Globe },
  { label: 'Standard', value: 'Deliver Every Time', icon: CheckCircle },
];

export default function About() {
  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-2.webp"
            alt="Abarie on stage"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/70 to-dark-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-40 w-full">
          <div className="max-w-2xl">
            <p className="text-primary-400 font-medium tracking-[0.2em] uppercase text-sm mb-6">
              The Story Behind the Laughter
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-6">
              Meet <br />
              <span className="text-primary-400">Abarie</span>
              <span className="text-accent-500">.com</span>
            </h1>
            <p className="text-xl text-dark-200 leading-relaxed mb-8 max-w-xl">
              Ifeanyichukwu Daniel Okeke. Comedian. Compere. Storyteller. One of Nigeria's most
              electrifying voices on stage \u2014 and one of its most genuine off it.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/#book"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-primary-500/25 flex items-center gap-2"
              >
                Book Abarie <ArrowRight size={20} />
              </a>
              <a
                href="https://youtube.com/@abariedotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/30 text-white hover:border-primary-400 hover:text-primary-400 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-600 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(({ number, label, icon: Icon }, i) => (
              <div key={i} className="group">
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary-200 group-hover:scale-110 transition-transform" />
                <p className="font-display text-4xl sm:text-5xl font-bold text-white">{number}</p>
                <p className="text-primary-100 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is He */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">The Man Behind the Mic</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-8 leading-tight">
                Comedy Was Never a<br />
                <span className="text-primary-400">Choice. It Was a Calling.</span>
              </h2>
              <div className="space-y-5 text-dark-300 text-lg leading-relaxed">
                <p>
                  Born in Lagos and steeped in the rich culture of Nnewi, Anambra State,
                  Ifeanyichukwu Daniel Okeke grew up understanding hustle intimately. From hawking
                  vegetables through Lagos streets to pouring concrete on construction sites, his
                  early life was defined by grit \u2014 and an irrepressible ability to find humour in
                  every corner of hardship.
                </p>
                <p>
                  The world came to know him as <span className="text-primary-400 font-semibold">Abarie.com</span> \u2014
                  a name that blends internet-age branding with old-school stage charisma. His
                  comedy is unmistakably Nigerian: observational, sharp, deeply human, and utterly
                  contagious.
                </p>
                <p>
                  When his career ignited in 2021, it was not by accident. It was the result of a
                  lifetime of watching people, listening to stories, and perfecting the art of
                  timing in the most unforgiving classroom there is \u2014 real life.
                </p>
                <p>
                  Today he stands as one of Nigeria's most in-demand stand-up comedians and
                  comperes, a headline act who has shared stages with the country's biggest names,
                  and the visionary behind the{' '}
                  <span className="text-accent-400 font-semibold italic">So Far So Good</span>{' '}
                  franchise \u2014 his own flagship show series that sells out every time.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-portrait.webp"
                  alt="Abarie - Nigeria's Rib-Cracker"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-2xl max-w-[220px]">
                <MessageSquare className="text-primary-400 mb-3" size={28} />
                <p className="text-white font-medium italic leading-snug text-sm">
                  "I never let my reality then judge my future."
                </p>
                <p className="text-primary-400 text-xs mt-2 font-semibold">\u2014 Abarie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Quote */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-3.webp"
            alt="Abarie performing"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-dark-950/85" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-16 h-16 text-primary-500/50 mx-auto mb-8" />
          <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-8">
            "From selling vegetables to fend for my large family, to being a labourer at
            construction sites \u2014 I never let my reality then{' '}
            <span className="text-primary-400">judge my future.</span>"
          </blockquote>
          <p className="text-primary-300 text-lg font-semibold tracking-wide">
            \u2014 Ifeanyichukwu Daniel Okeke (Abarie.com)
          </p>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">The Road Here</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              A Journey Worth <span className="text-primary-400">Telling</span>
            </h2>
            <p className="mt-4 text-dark-400 text-lg max-w-2xl mx-auto">
              Every great comedian has a story. Abarie's is one of the most compelling in Nigerian entertainment.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-700 to-transparent hidden sm:block" />

            <div className="space-y-12">
              {milestones.map((m, index) => (
                <div
                  key={index}
                  className={`relative flex gap-8 sm:gap-0 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-full lg:w-[calc(50%-3rem)] pl-10 sm:pl-0 ${
                      index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                    }`}
                  >
                    <div className="bg-dark-800/60 border border-dark-700 rounded-2xl p-6 hover:border-primary-700 transition-colors group">
                      <span className="inline-block bg-primary-500/20 text-primary-400 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                        {m.year}
                      </span>
                      <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-dark-300 leading-relaxed">{m.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-accent-400 text-sm font-semibold">
                        <MapPin size={14} />
                        {m.highlight}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-primary-500 border-4 border-dark-900 shadow-lg shadow-primary-500/50 hidden sm:block" />

                  <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">What Sets Him Apart</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              The <span className="text-primary-400">Craft</span> of Abarie
            </h2>
            <p className="mt-4 text-dark-400 text-lg max-w-2xl mx-auto">
              Great comedy is a skill. World-class comedy is an art. Here's what makes Abarie's performances unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {craftItems.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 bg-dark-800/40 rounded-2xl border border-dark-700 hover:border-primary-600 transition-all duration-300 hover:bg-dark-800/80"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 flex items-center justify-center mb-6 transition-colors">
                  <item.icon className="text-primary-400" size={28} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-dark-400 leading-relaxed group-hover:text-dark-300 transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="py-16 bg-dark-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">In the Moment</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
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

      {/* Testimonials */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">What People Say</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              The Crowd <span className="text-primary-400">Never Lies</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-dark-800/50 rounded-2xl p-8 border border-dark-700 hover:border-primary-700 transition-colors flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-accent-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-dark-200 italic mb-6 flex-1 leading-relaxed">"{t.quote}"</p>
                <div className="border-t border-dark-700 pt-4">
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-dark-400 text-sm mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-400 font-medium tracking-wider uppercase mb-4 text-sm">His Philosophy</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-8 leading-tight">
                Comedy That <br />
                <span className="text-primary-400">Connects, Heals</span><br />
                and Lasts
              </h2>
              <div className="space-y-6 text-dark-300 text-lg leading-relaxed">
                <p>
                  For Abarie, comedy is not simply entertainment \u2014 it is a language. A way of
                  processing the complexity of modern Nigerian life, of building bridges between
                  strangers, and of reminding people that beneath all the hustle, there is always
                  something worth laughing about.
                </p>
                <p>
                  He believes that the best comedy punches up, never down. It draws from the
                  richness of shared experience \u2014 the chaos of Lagos traffic, the dynamics of
                  Nigerian families, the absurdities of daily life \u2014 and turns them into moments of
                  genuine connection.
                </p>
                <p>
                  Whether he is headlining a 2,000-seat show or hosting an intimate corporate
                  dinner for 80, Abarie brings the same energy: total commitment, genuine warmth,
                  and a burning desire to send every single person home lighter than they arrived.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {philosophyCards.map(({ label, value, icon: Icon }, i) => (
                <div key={i} className="bg-dark-800/60 border border-dark-700 rounded-2xl p-6 hover:border-primary-600 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <Icon className="text-primary-400" size={24} />
                  </div>
                  <p className="text-dark-400 text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
                  <p className="font-display text-lg font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Ready to Book Abarie?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Headline comedian, sharp MC, corporate events, weddings, concerts \u2014
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
          <p className="mt-8 text-primary-200 text-sm">
            Or explore more at{' '}
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
