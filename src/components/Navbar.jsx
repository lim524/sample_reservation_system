import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Moon, Sun, Menu, X, BookmarkCheck } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenMyBookings, bookingCount, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'glass-panel py-3 shadow-lg border-b border-indigo-500/10' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              AURA
            </span>
            <span className="text-[10px] font-medium text-indigo-400/80 -mt-1 tracking-widest uppercase">
              Premium Consulting
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-indigo-400 transition-colors">서비스 소개</a>
          <a href="#calculator" className="hover:text-indigo-400 transition-colors">실시간 견적</a>
          <a href="#quick-consult" className="hover:text-indigo-400 transition-colors">간단 문의</a>
          <a href="#reviews" className="hover:text-indigo-400 transition-colors">고객 후기</a>
          <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all"
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* My Bookings (IndexedDB Viewer) */}
          <button
            onClick={onOpenMyBookings}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-400 transition-all"
          >
            <BookmarkCheck className="w-4 h-4 text-indigo-400" />
            <span>내 예약/상담</span>
            {bookingCount > 0 && (
              <span className="ml-1 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Book Now Button */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>상담 예약하기</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-indigo-500/20 px-4 pt-3 pb-6 mt-2 flex flex-col gap-4">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">서비스 소개</a>
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">실시간 견적</a>
          <a href="#quick-consult" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">간단 문의</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">고객 후기</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-1">FAQ</a>
          
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenMyBookings(); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-sm font-medium"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>내 예약/상담 확인 ({bookingCount})</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>상담 예약하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
