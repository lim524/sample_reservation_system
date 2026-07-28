import React, { useState } from 'react';
import { X, Calendar, Clock, User, CheckCircle2, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, QrCode } from 'lucide-react';
import { SERVICES, CONSULTANTS, TIME_SLOTS } from '../data/mockData';
import { addAppointment } from '../services/dbService';

export default function BookingModal({ isOpen, onClose, initialService, initialDuration, initialPrice, onBookingSaved, showToast }) {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState(initialService || SERVICES[0]);
  const [selectedConsultant, setSelectedConsultant] = useState(CONSULTANTS[0]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [duration, setDuration] = useState(initialDuration || 50);
  const [calculatedPrice, setCalculatedPrice] = useState(initialPrice || 120000);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  if (!isOpen) return null;

  // When step 1 changes service, update default price & duration
  const handleServiceChange = (service) => {
    setSelectedService(service);
    const dur = service.durationOptions[0];
    setDuration(dur);
    setCalculatedPrice(Math.round((service.pricePerHour * (dur / 60)) / 1000) * 1000);
  };

  const handleFinalSubmit = async () => {
    if (!customerName || !phone) {
      showToast('성함과 연락처를 입력해 주세요.', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        consultantName: selectedConsultant.name,
        date: selectedDate,
        time: selectedTime,
        duration: duration,
        price: calculatedPrice,
        customerName,
        phone,
        email,
        notes,
      };

      const res = await addAppointment(payload);
      setLoading(false);
      setCompletedBooking(res.data);
      setStep(4);
      if (onBookingSaved) onBookingSaved();
      showToast('예약이 IndexedDB에 안전하게 저장되었습니다!', 'success');
    } catch (err) {
      setLoading(false);
      showToast('예약 저장 실패: ' + err.message, 'error');
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setCompletedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6 my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">1:1 컨설팅 예약 신청</h3>
              <p className="text-xs text-indigo-400">Step {step} / 4</p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Select Service & Consultant */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">1. 예약할 서비스 선택</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleServiceChange(s)}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                      selectedService.id === s.id
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{s.category}</span>
                    </div>
                    <p className="text-slate-400 mt-1 line-clamp-1">{s.shortDesc}</p>
                    <p className="text-indigo-400 font-bold mt-2">{s.pricePerHour.toLocaleString()} 원 / 60분</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">2. 담당 컨설턴트 지정</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CONSULTANTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConsultant(c)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      selectedConsultant.id === c.id
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-white">{c.name}</p>
                    <p className="text-[11px] text-purple-300 mt-0.5">{c.role}</p>
                    <p className="text-[10px] text-slate-400 mt-1">★ {c.rating} ({c.reviewsCount})</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 text-xs transition-all flex items-center gap-1"
              >
                <span>다음 단계 (날짜/시간)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Date & Time Picker */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">상담희망 날짜 선택</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">실시간 진행 시간 선택</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot, i) => (
                    <button
                      key={i}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedTime === slot.time
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                          : slot.available
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-950/50 border-slate-900 text-slate-600 cursor-not-allowed line-through'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Price Preview */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-300">선택 서비스: <strong className="text-white">{selectedService.name}</strong></span>
              <span className="text-indigo-300 font-bold text-sm">{calculatedPrice.toLocaleString()} 원</span>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>이전</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 text-xs transition-all flex items-center gap-1"
              >
                <span>다음 단계 (고객 정보)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Customer Form */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">신청자 정보 입력</h4>
              <p className="text-xs text-slate-400">예약 확인 및 안내를 위해 정확한 연락처를 입력해 주세요.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">성함 *</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">연락처 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">이메일</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">사전 요청사항</label>
                <textarea
                  rows={2}
                  placeholder="컨설턴트에게 사전 전달할 서류나 문의사항을 입력하세요."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>이전</span>
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={loading}
                className="px-7 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? '저장 처리 중...' : '예약 완료 및 IndexedDB 저장'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Digital Pass */}
        {step === 4 && completedBooking && (
          <div className="text-center space-y-6 animate-fade-in py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">1:1 예약이 확정되었습니다!</h3>
              <p className="text-xs text-slate-300">
                예약 내역이 브라우저 <strong className="text-indigo-400">IndexedDB</strong>에 저장되었습니다.
              </p>
            </div>

            {/* Digital Voucher Card */}
            <div className="glass-card p-6 rounded-2xl border border-indigo-500/40 text-left space-y-4 relative overflow-hidden bg-slate-900">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block">DIGITAL RESERVATION PASS</span>
                  <h4 className="font-bold text-white text-base">{completedBooking.serviceName}</h4>
                </div>
                <QrCode className="w-10 h-10 text-indigo-400/60" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">예약자 성함</span>
                  <span className="font-bold text-white">{completedBooking.customerName} ({completedBooking.phone})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">전담 컨설턴트</span>
                  <span className="font-bold text-indigo-300">{completedBooking.consultantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">예약 날짜 & 시간</span>
                  <span className="font-bold text-white">{completedBooking.date} / {completedBooking.time}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">결제 예정 금액</span>
                  <span className="font-bold text-emerald-400">{completedBooking.price.toLocaleString()} 원</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>예약 코드: <code className="text-slate-200">{completedBooking.id}</code></span>
                <span className="text-emerald-400">STATUS: CONFIRMED</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 text-xs transition-all"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
