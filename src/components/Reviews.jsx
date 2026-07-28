import React from 'react';
import { REVIEWS, CONSULTANTS } from '../data/mockData';
import { Star, Quote, Award, Sparkles } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Customer Reviews */}
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-950/50 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AURA와 함께한 리더들의 생생한 후기
            </h2>
            <p className="text-slate-400 text-sm">
              실제 1:1 컨설팅을 경험하신 고객님들이 증명하는 99.4% 만족도의 비결입니다.
            </p>
          </div>

          {/* Reviews Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="glass-card p-7 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 relative">
                <Quote className="w-8 h-8 text-indigo-500/30 absolute top-6 right-6" />

                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    "{rev.content}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{rev.author}</h4>
                    <p className="text-xs text-slate-400">{rev.company}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-medium">
                    {rev.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Consultants Showcase */}
        <div className="space-y-12 pt-10 border-t border-slate-800">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              Expert Consultants
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              분야별 최고 수준의 수석 컨설턴트진
            </h2>
            <p className="text-slate-400 text-sm">
              평균 경력 12년 이상의 현업 핵심 리더들로 구성된 전문 위원을 만나보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONSULTANTS.map((c) => (
              <div key={c.id} className="glass-panel p-6 rounded-3xl border border-slate-800 text-center space-y-4 hover:border-indigo-500/30 transition-all">
                {/* Avatar Badge */}
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center font-extrabold text-xl border shadow-lg ${c.avatarBg}`}>
                  {c.name.substring(0, 2)}
                </div>

                <div>
                  <h3 className="font-bold text-white text-lg">{c.name}</h3>
                  <p className="text-xs text-indigo-400 font-semibold mt-0.5">{c.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{c.experience}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{c.rating}</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">리뷰 {c.reviewsCount}건</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
