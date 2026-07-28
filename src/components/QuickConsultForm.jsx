import React, { useState } from 'react';
import { Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { addConsultation } from '../services/dbService';

export default function QuickConsultForm({ onConsultSaved, showToast }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    category: '커리어 & 비즈니스 전략',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      showToast('성함과 연락처를 입력해 주세요.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await addConsultation(formData);
      setLoading(false);
      setSubmittedData(res.data);
      if (onConsultSaved) onConsultSaved();
      showToast('상담 문의가 IndexedDB에 안전하게 등록되었습니다!', 'success');
    } catch (err) {
      setLoading(false);
      showToast('상담 저장 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <section id="quick-consult" className="py-20 relative bg-slate-900/50 border-y border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-500/20 shadow-2xl relative">
          
          {submittedData ? (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">상담 신청이 완료되었습니다!</h3>
                <p className="text-sm text-slate-300">
                  입력하신 문의 내역이 <strong className="text-indigo-400">IndexedDB</strong> 로컬 데이터베이스에 저장되었습니다.
                </p>
                <p className="text-xs text-slate-400">접수 번호: <code className="text-indigo-300 font-mono">{submittedData.id}</code></p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedData(null);
                    setFormData({
                      customerName: '',
                      phone: '',
                      email: '',
                      category: '커리어 & 비즈니스 전략',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 transition-all"
                >
                  새 문의 작성하기
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Form Title */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">빠른 1:1 맞춤 상담 신청</h3>
                  <p className="text-xs text-slate-400">궁금하신 사항을 남겨주시면 전담 수석 컨설턴트가 2시간 이내에 안내 연락을 드립니다.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">성함 *</label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">연락처 *</label>
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">이메일 주소</label>
                    <input
                      type="email"
                      placeholder="example@aura.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">관심 상담 분야</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="커리어 & 비즈니스 전략">1:1 커리어 & 비즈니스 전략</option>
                      <option value="자산 및 포트폴리오 진단">프라이빗 자산 및 포트폴리오 진단</option>
                      <option value="브랜드 & UI/UX 디자인">브랜드 & UI/UX 디자인 크리틱</option>
                      <option value="마인드케어 & 웰니스">마인드케어 & 웰니스 Solution</option>
                      <option value="기타 문의">기타 자문 및 제휴 문의</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">상담 내용 및 요청사항</label>
                  <textarea
                    rows={4}
                    placeholder="상담을 원하시는 구체적인 고민이나 사전 질문사항을 편하게 작성해 주세요."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit button & Privacy info */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>모든 문의 내역은 IndexedDB 브라우저 로컬 데이터베이스에 보관됩니다.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? '신청 처리 중...' : '상담 신청하기'}</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
