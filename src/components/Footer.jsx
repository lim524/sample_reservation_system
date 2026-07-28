import React from 'react';
import { Sparkles, ShieldCheck, Github, Globe } from 'lucide-react';

export default function Footer({ onOpenBooking, onOpenMyBookings }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                AURA Consulting
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              AURA Premium Consulting은 최고의 비즈니스, 자산, 크리에이티브 파트너와 함께 1:1 맞춤형 세션을 제공합니다. 브라우저 로컬 데이터베이스(IndexedDB) 연동으로 안전하게 예약을 저장하고 관리하세요.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Client-Side IndexedDB Ready / Vercel Deploy Optimized</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">주요 메뉴</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">서비스 소개</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">실시간 견적 계산기</a></li>
              <li><a href="#quick-consult" className="hover:text-white transition-colors">빠른 상담 문의</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">고객 후기</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Action */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">예약 관리</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenBooking} className="hover:text-indigo-400 text-left transition-colors">
                  실시간 1:1 예약 신청
                </button>
              </li>
              <li>
                <button onClick={onOpenMyBookings} className="hover:text-indigo-400 text-left transition-colors">
                  내 예약 및 상담 내역 (IndexedDB)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AURA Premium Consulting. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">개인정보 처리방침</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">이용약관</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
