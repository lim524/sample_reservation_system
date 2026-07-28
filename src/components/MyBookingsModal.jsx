import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Trash2, Database, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { getAllAppointments, deleteAppointment, getAllConsultations, deleteConsultation } from '../services/dbService';

export default function MyBookingsModal({ isOpen, onClose, showToast, onDataChanged }) {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'consultations'
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const apts = await getAllAppointments();
      const cns = await getAllConsultations();
      setAppointments(apts);
      setConsultations(cns);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('정말로 이 예약을 취소/삭제하시겠습니까? (IndexedDB에서 제거됩니다)')) return;
    const ok = await deleteAppointment(id);
    if (ok) {
      showToast('예약이 IndexedDB에서 삭제되었습니다.', 'info');
      loadData();
      if (onDataChanged) onDataChanged();
    }
  };

  const handleDeleteConsultation = async (id) => {
    if (!window.confirm('정말로 이 상담 문의 내역을 삭제하시겠습니까?')) return;
    const ok = await deleteConsultation(id);
    if (ok) {
      showToast('상담 문의가 IndexedDB에서 삭제되었습니다.', 'info');
      loadData();
      if (onDataChanged) onDataChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6 my-8 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                내 예약 & 상담 관리
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                  IndexedDB
                </span>
              </h3>
              <p className="text-xs text-slate-400">브라우저 로컬 데이터베이스에 저장된 내역입니다.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
              title="새로고침"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2 shrink-0">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'appointments'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>예약 내역 ({appointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'consultations'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>간단 상담 문의 ({consultations.length})</span>
          </button>
        </div>

        {/* List Content */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          {activeTab === 'appointments' && (
            appointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm space-y-2">
                <Calendar className="w-10 h-10 mx-auto opacity-30" />
                <p>저장된 예약 내역이 없습니다.</p>
                <p className="text-xs text-slate-600">메인 화면에서 실시간 예약을 진행해보세요!</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 relative group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400">{apt.id}</span>
                      <h4 className="font-bold text-white text-base mt-0.5">{apt.serviceName}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      CONFIRMED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500 block">신청자</span>
                      <span className="font-medium text-white">{apt.customerName} ({apt.phone})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">일시</span>
                      <span className="font-medium text-white">{apt.date} / {apt.time}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">컨설턴트 / 비용</span>
                      <span className="font-medium text-indigo-300">{apt.consultantName || '지정'} ({apt.price?.toLocaleString()}원)</span>
                    </div>
                  </div>

                  {apt.notes && (
                    <p className="text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                      <strong>요청사항:</strong> {apt.notes}
                    </p>
                  )}

                  <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                    <span>저장시각: {new Date(apt.createdAt).toLocaleString('ko-KR')}</span>
                    <button
                      onClick={() => handleDeleteAppointment(apt.id)}
                      className="px-3 py-1 rounded-lg border border-rose-500/30 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>예약 취소/삭제</span>
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === 'consultations' && (
            consultations.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm space-y-2">
                <MessageSquare className="w-10 h-10 mx-auto opacity-30" />
                <p>저장된 상담 문의 내역이 없습니다.</p>
              </div>
            ) : (
              consultations.map((cns) => (
                <div key={cns.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-purple-400">{cns.id}</span>
                      <h4 className="font-bold text-white text-sm mt-0.5">분야: {cns.category}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      PENDING
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl space-y-1">
                    <p><strong className="text-white">신청자:</strong> {cns.customerName} ({cns.phone}) / {cns.email || '이메일 없음'}</p>
                    {cns.message && <p className="text-slate-300 mt-1"><strong>내용:</strong> {cns.message}</p>}
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                    <span>저장시각: {new Date(cns.createdAt).toLocaleString('ko-KR')}</span>
                    <button
                      onClick={() => handleDeleteConsultation(cns.id)}
                      className="px-3 py-1 rounded-lg border border-rose-500/30 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>내역 삭제</span>
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>

      </div>
    </div>
  );
}
