export const SERVICES = [
  {
    id: 'strategy',
    name: '1:1 커리어 & 비즈니스 전략 컨설팅',
    category: 'Business & Career',
    shortDesc: '전문 이력 검토, 캐리어 로드맵 구축 및 1:1 디렉팅',
    pricePerHour: 120000,
    durationOptions: [50, 90, 120],
    features: ['이력서 & 포트폴리오 정밀 피드백', '커리어 스케일업 맞춤 전략', '1:1 멘토링 60일 팔로업'],
    badge: 'Popular',
    iconName: 'TrendingUp',
    accentColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'finance',
    name: '프라이빗 자산 & 포트폴리오 재무 진단',
    category: 'Finance & Wealth',
    shortDesc: '개인 및 기업 자산 분산 투자, 현금흐름 및 세무 리스크 진단',
    pricePerHour: 180000,
    durationOptions: [60, 120],
    features: ['자산 현황 360도 딥분석', '맞춤형 포트폴리오 리밸런싱', '세무 & 금융 리스크 가이드'],
    badge: 'VIP Only',
    iconName: 'ShieldCheck',
    accentColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'branding',
    name: '브랜드 크리에이티브 & UI/UX 디자인 크리틱',
    category: 'Design & Tech',
    shortDesc: '웹/앱 프로덕트 디자인 피드백, 브랜딩 정체성 및 UX 설계',
    pricePerHour: 150000,
    durationOptions: [60, 90, 150],
    features: ['UI/UX 인터랙션 와이어프레임 검토', '브랜드 정체성 가이드라인 조언', '전환율(CRO) 최적화 노하우'],
    badge: 'Recommended',
    iconName: 'Palette',
    accentColor: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'wellness',
    name: '마인드케어 & 프리미엄 웰니스 솔루션',
    category: 'Health & Wellness',
    shortDesc: '전문 라이프 코칭, 스트레스 관리 및 올인원 웰니스 진단',
    pricePerHour: 110000,
    durationOptions: [50, 80],
    features: ['1:1 심리 & 성향 다이내믹 분석', '맞춤형 수면 & 스트레스 케어 플랜', '데일리 루틴 리포트 제공'],
    badge: 'New',
    iconName: 'HeartPulse',
    accentColor: 'from-rose-500 to-pink-600',
  },
];

export const CONSULTANTS = [
  {
    id: 'c1',
    name: '한수현 수석 컨설턴트',
    role: '전략 & 커리어 스페셜리스트',
    experience: '경력 14년 / 글로벌 전략 컨설팅 출신',
    rating: 4.98,
    reviewsCount: 342,
    avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'c2',
    name: '김도윤 마스터',
    role: '자산 및 포트폴리오 수석 디렉터',
    experience: '경력 18년 / 공인재무설계사 (CFP)',
    rating: 4.96,
    reviewsCount: 512,
    avatarBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'c3',
    name: '아이린 박 크리에이티브 리드',
    role: '브랜드 디자인 & UX 디렉터',
    experience: '경력 11년 / 실리콘밸리 테크기업 출신',
    rating: 4.99,
    reviewsCount: 289,
    avatarBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  },
];

export const TIME_SLOTS = [
  { time: '10:00 AM', available: true },
  { time: '11:30 AM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:30 PM', available: false },
  { time: '05:00 PM', available: true },
  { time: '07:00 PM', available: true },
];

export const REVIEWS = [
  {
    id: 1,
    author: '박정우 대표',
    company: '스타트업 N사 대표',
    content: '브랜드 크리에이티브 컨설팅을 받았는데, 단 1시간 만에 제품의 핵심 가치 소구점이 완전히 정리되었습니다. 예약 과정도 깔끔해서 정말 좋았어요.',
    rating: 5,
    tag: '브랜드 디자인 컨설팅',
    date: '2026.07.18',
  },
  {
    id: 2,
    author: '최서연 님',
    company: '외국계 테크기업 PM',
    content: '커리어 이직 로드맵 상담을 진행했습니다. 수석 컨설턴트님의 현실적인 조언과 체계적인 세션 구성 덕분에 원하던 기업으로 성공적으로 이직했습니다!',
    rating: 5,
    tag: '커리어 전략 컨설팅',
    date: '2026.07.22',
  },
  {
    id: 3,
    author: '정성훈 자산가',
    company: '개인 투자자',
    content: '프라이빗 자산 진단을 받아보고 왜 전문가의 코칭이 필요한지 깨달았습니다. 현금흐름 재설계부터 포트폴리오 정리까지 완벽했습니다.',
    rating: 5,
    tag: '자산 재무 진단',
    date: '2026.07.25',
  },
];

export const FAQS = [
  {
    question: '상담 및 예약 절차는 어떻게 진행되나요?',
    answer: '원하시는 서비스 카테고리와 컨설턴트를 선택하신 후, 실시간으로 원하시는 날짜와 시간대를 지정하여 1분 만에 예약을 신청하실 수 있습니다. 신청 완료 후 브라우저 내 예약 관리 탭에서 바로 확인증을 확인하실 수 있습니다.',
  },
  {
    question: '상담은 어떤 방식으로 진행되나요 (온라인/오프라인)?',
    answer: '상담은 고화질 1:1 온라인 화상 세션(Zoom/Google Meet) 또는 AURA 프라이빗 라운지(오프라인) 중 원하시는 방식으로 자유롭게 선택 가능합니다.',
  },
  {
    question: '예약 일정을 변경하거나 취소할 수 있나요?',
    answer: '네, 상단 메뉴의 [내 예약 확인] 버튼을 누르시면 예약하신 내역을 실시간으로 확인하실 수 있으며, 상담 24시간 전까지 자유롭게 취소 및 재예약이 가능합니다.',
  },
  {
    question: '입력한 개인정보와 상담 내용은 안전한가요?',
    answer: 'AURA는 강력한 데이터 보안 정책을 준수하며, 모든 데이터는 브라우저 내부 보관 기술(IndexedDB)과 암호화 통신을 통해 안전하게 보호됩니다. 세션 종료 후 모든 기록은 엄격히 관리됩니다.',
  },
];

export const STATS = [
  { label: '누적 완료 상담 세션', value: '4,850+', icon: 'Users' },
  { label: '고객 만족도 평가', value: '99.4%', icon: 'Award' },
  { label: '검증된 분야별 전문가', value: '50 명+', icon: 'CheckCircle2' },
  { label: '재상담 희망 비율', value: '96.8%', icon: 'Sparkles' },
];
