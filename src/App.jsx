import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceShowcase from './components/ServiceShowcase';
import QuickConsultForm from './components/QuickConsultForm';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MyBookingsModal from './components/MyBookingsModal';
import ToastNotification from './components/ToastNotification';
import { getAllAppointments, getAllConsultations } from './services/dbService';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  
  // Custom booking modal parameters when selected from price calculator or service cards
  const [bookingParams, setBookingParams] = useState({
    service: null,
    duration: null,
    price: null,
  });

  const [toast, setToast] = useState(null);
  const [totalBookingCount, setTotalBookingCount] = useState(0);

  // Sync theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Load IndexedDB count for Navbar badge
  const updateCounts = async () => {
    try {
      const apts = await getAllAppointments();
      const cns = await getAllConsultations();
      setTotalBookingCount(apts.length + cns.length);
    } catch (e) {
      console.error('Count update error:', e);
    }
  };

  useEffect(() => {
    updateCounts();
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenBooking = (service = null, duration = null, price = null) => {
    setBookingParams({ service, duration, price });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Toast Notification Container */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Header & Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={totalBookingCount}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Landing Sections */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenConsult={() => {
            const el = document.getElementById('quick-consult');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ServiceShowcase
          onSelectServiceForBooking={(service, duration, price) => handleOpenBooking(service, duration, price)}
        />

        <QuickConsultForm
          onConsultSaved={updateCounts}
          showToast={showToast}
        />

        <Reviews />

        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Interactive 4-step Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingParams.service}
        initialDuration={bookingParams.duration}
        initialPrice={bookingParams.price}
        onBookingSaved={updateCounts}
        showToast={showToast}
      />

      {/* IndexedDB My Bookings & Consultation Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        showToast={showToast}
        onDataChanged={updateCounts}
      />

    </div>
  );
}
