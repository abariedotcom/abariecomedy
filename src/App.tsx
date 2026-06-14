import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Portfolio from './pages/Portfolio';
import Tickets from './pages/Tickets';
import Contact from './pages/Contact';
import Book from './pages/Book';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}