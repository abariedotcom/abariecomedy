import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Portfolio from './pages/Portfolio';
import Tickets from './pages/Tickets';
import BookEvent from './pages/BookEvent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/book/:eventId" element={<BookEvent />} />
      </Routes>
    </BrowserRouter>
  );
}