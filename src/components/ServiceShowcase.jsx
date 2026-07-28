import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { CheckCircle, TrendingUp, ShieldCheck, Palette, HeartPulse, Calculator, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function ServiceShowcase({ onSelectServiceForBooking }) {
  // Live Price Calculator State
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [selectedDuration, setSelectedDuration] = useState(SERVICES[0].durationOptions[0]);
  const [isPriority, setIsPriority] = useState(false);

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Calculate price dynamically
  const baseRate = currentService.pricePerHour;
  const durationFactor = selectedDuration / 60;
  const priorityMultiplier = isPriority ? 1.25 : 1.0;
  const calculatedPrice = Math.round((baseRate * durationFactor * priorityMultiplier) / 1000) * 1000;

  const iconMap = {
    TrendingUp: <TrendingUp className="w-6 h-6 text-amber-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    Palette: <Palette className="w-6 h-6 text-indigo-400" />,
    HeartPulse: <HeartPulse className="w-6 h-6 text-rose-400" />,
  };

  return (
    <section id="services" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            Custom Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            전문 분야별 1:1 맞춤형 컨설팅 프로그램
          </h2>
          <p className="text-slate-400 text-base">
            당신의 분야와 목적으로 정밀 타겟팅된 전문 세션을 선택하고, 맞춤 솔루션을 제공받으세요.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-card p-7 rounded-3xl border border-slate-800 flex flex-col justify-between relative group hover:border-indigo-500/40"
            >
              <div className="space-y-5">
                {/* Card Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
                    {iconMap[service.iconName]}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${service.accentColor} text-white shadow-sm`}>
                    {service.badge}
                  </span>
                </div>

                {/* Title & Category */}
                <div>
                  <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Price & CTA */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">기본 단가 (60분 기준)</span>
                  <span className="text-lg font-extrabold text-white">
                    {service.pricePerHour.toLocaleString()} 원
                  </span>
                </div>

                <button
                  onClick={() => onSelectServiceForBooking(service)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>예약 선택</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Price Calculator Section */}
        <div id="calculator" className="pt-10">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              
              {/* Left Form Controls */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">실시간 1:1 견적 계산기</h3>
                    <p className="text-xs text-slate-400">원하시는 세션 옵션을 직접 조합하여 예상 비용을 확인해 보세요.</p>
                  </div>
                </div>

                {/* Service Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">1. 세션 카테고리 선택</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedServiceId(s.id);
                          setSelectedDuration(s.durationOptions[0]);
                        }}
                        className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                          selectedServiceId === s.id
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold text-white">{s.name}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{s.category}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Options */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">2. 소요시간 선택</label>
                  <div className="flex flex-wrap gap-3">
                    {currentService.durationOptions.map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          selectedDuration === dur
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{dur}분 세션</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <input
                      type="checkbox"
                      checked={isPriority}
                      onChange={(e) => setIsPriority(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-white">우선 세션 배치 (24시간 이내 패스트트랙 세션)</p>
                      <p className="text-slate-400">주말/야간 또는 긴급 일정 우선 배정 (+25% 할증 적용)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Right Calculated Result Box */}
              <div className="w-full lg:w-80 glass-card p-6 rounded-2xl border border-indigo-500/30 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">산출 견적서</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">선택 서비스:</span>
                      <span className="font-medium text-white truncate max-w-[140px]">{currentService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">소요 시간:</span>
                      <span className="font-medium text-white">{selectedDuration} 분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">우선 배치:</span>
                      <span className="font-medium text-white">{isPriority ? '적용 (+25%)' : '미적용'}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">최종 예상 비용</span>
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                      {calculatedPrice.toLocaleString()} 원
                    </p>
                    <span className="text-[11px] text-emerald-400 block pt-1">✓ 부가세(VAT) 포함 / 수수료 없음</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceForBooking(currentService, selectedDuration, calculatedPrice)}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>이 견적으로 예약 진행하기</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
