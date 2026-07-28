import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Clock, Users, Star } from 'lucide-react';
import { STATS } from '../data/mockData';

export default function Hero({ onOpenBooking, onOpenConsult }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-ambient-grid">
      {/* Background Orbs */}
      <div className="glow-orb w-96 h-96 bg-indigo-600/30 top-10 left-1/4 -z-10" />
      <div className="glow-orb w-80 h-80 bg-purple-600/25 bottom-10 right-1/4 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/50 text-indigo-300 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>1:1 맞춤형 프리미엄 딥 다이브 컨설팅</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              당신의 비전과 성장을 위한 <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                프리미엄 1:1 맞춤 상담
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              커리어 전략, 프라이빗 자산 진단, 브랜드 UI/UX 크리틱부터 마인드 웰니스까지.
              검증된 수석 컨설턴트와의 실시간 1:1 세션을 간편하게 예약해 보세요.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all text-base"
              >
                <Calendar className="w-5 h-5" />
                <span>실시간 예약하기</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#quick-consult"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-200 border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 transition-all text-base"
              >
                <span>간단 상담 문의</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>IndexedDB 로컬 보안 저장</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>1분 내 즉시 확정</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>평점 4.98 / 5.0</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-indigo-500/20 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                      AURA
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">오늘의 1:1 추천 세션</h3>
                      <p className="text-xs text-indigo-300">실시간 상담 예약 가능</p>
                    </div>
                  </div>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                {/* Card Item Preview */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                      Popular Session
                    </span>
                    <span className="text-slate-400">소요시간: 50분 / 90분</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">1:1 커리어 & 비즈니스 전략 컨설팅</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    경력 14년 이상의 수석 전략가와 함께 이력서, 포트폴리오 및 중장기 캐리어 로드맵을 밀착 설계합니다.
                  </p>
                </div>

                {/* Quick Availability */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 font-medium">오늘 예약 가능 슬롯</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={onOpenBooking} className="py-2 rounded-lg bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all text-center">
                      14:00 가능
                    </button>
                    <button onClick={onOpenBooking} className="py-2 rounded-lg bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all text-center">
                      16:30 가능
                    </button>
                    <button onClick={onOpenBooking} className="py-2 rounded-lg bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all text-center">
                      19:00 가능
                    </button>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>선택 날짜로 예약 진행</span>
                </button>
              </div>

              {/* Decorative floating badge */}
              <div className="absolute -bottom-5 -left-5 glass-card px-4 py-3 rounded-2xl flex items-center gap-3 border border-emerald-500/30 shadow-xl hidden sm:flex">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">IndexedDB 보안 연동</p>
                  <p className="text-slate-400">내 브라우저에 안전 보관</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Stats Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-800/80">
          {STATS.map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
