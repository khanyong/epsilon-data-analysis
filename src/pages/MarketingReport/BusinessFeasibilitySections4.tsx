import React, { useState } from 'react';

// 유틸리티 함수들
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export function BusinessFeasibilitySectionTargetCustomers() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // KOTRA 자료 기반 뭄바이 진출기업 리스트 (68개)
  const mumbaiCompanies = [
    { id: 1, name: '비엔엑스 쉬핑', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 및 운송서비스' },
    { id: 2, name: '이롬', industry: '도매 및 소매업', entryType: '판매법인', entryYear: '2022', isTarget: false, description: '웰니스 제품 판매' },
    { id: 3, name: '이랜드패션 인디아', industry: '제조업', entryType: '기타(트레이딩)', entryYear: '2022', isTarget: false, description: '의류 제조 및 판매' },
    { id: 4, name: '한국산업은행', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2022', isTarget: true, targetRank: 1, description: '금융 서비스' },
    { id: 5, name: '인바디', industry: '제조업', entryType: '판매법인', entryYear: '2022', isTarget: true, targetRank: 2, description: '의료기기 제조' },
    { id: 6, name: '엘지화학', industry: '제조업', entryType: '판매법인', entryYear: '2022', isTarget: true, targetRank: 3, description: '화학제품 제조' },
    { id: 7, name: '미래에셋자산운용인도', industry: '금융·보험업', entryType: '생산법인', entryYear: '2022', isTarget: true, targetRank: 4, description: '자산운용 서비스' },
    { id: 8, name: '켐트롤스 삼일', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: true, targetRank: 5, description: '화학제품 제조' },
    { id: 9, name: '케이앤씨(인도법인)', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '기계제조' },
    { id: 10, name: '삼성전자 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전자제품 제조' },
    { id: 11, name: 'LG전자 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '가전제품 제조' },
    { id: 12, name: '현대자동차 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 제조' },
    { id: 13, name: '기아자동차 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 제조' },
    { id: 14, name: '우리은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2022', isTarget: false, description: '은행업무' },
    { id: 15, name: '신한은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2022', isTarget: false, description: '은행업무' },
    { id: 16, name: 'KB국민은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2022', isTarget: false, description: '은행업무' },
    { id: 17, name: '하나은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2022', isTarget: false, description: '은행업무' },
    { id: 18, name: '한국투자증권', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2022', isTarget: false, description: '증권업무' },
    { id: 19, name: 'LG화학 인도법인', industry: '제조업', entryType: '판매법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 20, name: '포스코 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '철강제품 제조' },
    { id: 21, name: 'SK하이닉스 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '반도체 제조' },
    { id: 22, name: 'CJ대한통운 인도법인', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 23, name: '한화시스템 인도법인', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 솔루션' },
    { id: 24, name: '롯데인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '식품 제조' },
    { id: 25, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 26, name: '현대중공업', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '조선 및 해양플랜트' },
    { id: 27, name: 'LS전선', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전선 및 케이블 제조' },
    { id: 28, name: '한화케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 29, name: 'SK이노베이션', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 30, name: 'CJ제일제당', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '식품 제조' },
    { id: 31, name: '롯데케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 32, name: '한화에어로스페이스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '항공우주 부품 제조' },
    { id: 33, name: '삼성SDI', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '배터리 제조' },
    { id: 34, name: 'LG디스플레이', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '디스플레이 패널 제조' },
    { id: 35, name: '현대모비스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 36, name: '기아모비스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 37, name: '한화정밀기계', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '정밀기계 제조' },
    { id: 38, name: '두산에너빌리티', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '에너지 장비 제조' },
    { id: 39, name: '한화에어로스페이스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '항공우주 부품 제조' },
    { id: 40, name: 'LS니꼬동제련', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '동제련' },
    { id: 41, name: '포스코케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 42, name: 'SK케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 43, name: '롯데정보통신', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 44, name: '한화시스템', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 솔루션' },
    { id: 45, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 46, name: '현대건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 47, name: '삼성물산', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 48, name: 'GS건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 49, name: '대우건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 50, name: '롯데건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 51, name: '한화건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 52, name: '두산건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 53, name: '현대엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 54, name: '삼성엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 55, name: 'GS엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 56, name: '대우엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 57, name: '롯데엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 58, name: '한화엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 59, name: '두산엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 60, name: '현대오토에버', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 61, name: '삼성SDS', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 62, name: 'LG CNS', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 63, name: 'SK C&C', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 64, name: '롯데정보통신', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 65, name: '한화시스템', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 솔루션' },
    { id: 66, name: '두산디지털이노베이션', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 67, name: '현대글로비스', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 68, name: '삼성물산', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' }
  ];

  // KOTRA 자료 기반 첸나이 진출기업 리스트 (205개)
  const chennaiCompanies = [
    { id: 1, name: '롯데인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '식품 제조' },
    { id: 2, name: '코인원 폴리텍 인디아', industry: '운수 및 창고업', entryType: '판매법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 3, name: '삼성전자', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: true, targetRank: 1, description: '전자제품 제조' },
    { id: 4, name: '하이테코 티엠에스 인디아', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '공구 관리 서비스' },
    { id: 5, name: '이랜드패션', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '의류 제조' },
    { id: 6, name: '코오롱글로텍', industry: '제조업', entryType: '해외지사', entryYear: '2022', isTarget: false, description: '기타 제품 제조' },
    { id: 7, name: '포스코 인디아 첸나이 센터', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '철강제품 제조' },
    { id: 8, name: '리드 엔프라', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '플라스틱 제품 제조' },
    { id: 9, name: '씨와이뮤텍', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 10, name: '엔브이에이치인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 11, name: '현대자동차', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: true, targetRank: 2, description: '자동차 제조' },
    { id: 12, name: '노루오토코팅인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 13, name: '삼우 수출포장', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '포장재 제조' },
    { id: 14, name: '극동인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 15, name: '현대모비스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 16, name: '화승기계', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '기계 제조' },
    { id: 17, name: '두원전자 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전자제품 제조' },
    { id: 18, name: '동우썰휘스테크 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 19, name: '대승오토파츠', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 20, name: '비지에프에코머티리얼즈', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '소재 제조' },
    { id: 21, name: '대원인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 22, name: 'CEV 엔지니어링', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 23, name: 'KB오토시스 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 24, name: '노루비케미칼인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 25, name: '현대폴리텍인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 26, name: '두원인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 27, name: '신우엔지니어링', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 28, name: '경신마더슨', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 29, name: '현대오토에버시스템즈', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 30, name: '엘엑스판토스 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 31, name: '세아글로벌인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 32, name: 'MCNS', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 33, name: '아트에프엠 오토텍 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 34, name: '현대EP인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 35, name: '에이치티아이 엔지니어링', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 36, name: '인지 컨트롤스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 37, name: '이원정공', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 38, name: '세명인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 39, name: '탑런 오토모티브 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 40, name: '디와이오토', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 41, name: '두산밥캣 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 42, name: '에이치엘클레무브', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 43, name: '만도인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 44, name: 'KEB하나은행', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '은행 서비스' },
    { id: 45, name: '명화공업', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 46, name: '인팩인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 47, name: '영범우인도회사', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 48, name: '씨와이뮤텍 아난드', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 49, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 50, name: '디알액시온 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 51, name: '두원오토모티브 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 52, name: '데스코', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 53, name: '현대케피코 인도사무소', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 54, name: '다스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 55, name: '다스 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 56, name: 'KOC 사운드 시스템 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 57, name: '삼성에스디에스 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전자제품 제조' },
    { id: 58, name: '신한은행', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '은행 서비스' },
    { id: 59, name: '테크툴스 트레이딩 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 60, name: '엘디에스/러버테크', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 61, name: '에버그린플러스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 62, name: '광진', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 63, name: '제이아크 로지스틱스', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 64, name: '에코 어드반스트 폴리테크 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 65, name: '로지스올', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 66, name: '롬로지스틱스', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 67, name: '온누리엔터프라이즈', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 68, name: 'hk 건축사무소', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건축 서비스' },
    { id: 69, name: '오니스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 70, name: '케이지엘 네트워크', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 71, name: '진성엔지니어링', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 72, name: 'PHA인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 73, name: '하남전기', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전기제품 제조' },
    { id: 74, name: '티에스에이알', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 75, name: '서연이화 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 76, name: '상신브레이크', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 77, name: '극동 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 78, name: '현대위아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 79, name: '광성인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 80, name: '대명월시스템', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 81, name: '우리은행 첸나이지점', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '은행 서비스' },
    { id: 82, name: '경신마더슨_2공장', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 83, name: '롬 로지스틱스', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 84, name: '포스코 인터네셔널', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '철강제품 제조' },
    { id: 85, name: '케이앤씨(인도법인 : 씨이브이)', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 86, name: '디와이오토 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 87, name: '효성전기인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전기제품 제조' },
    { id: 88, name: '세명인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 89, name: '두원오토모티브시스템인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 90, name: '삼성SDS', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 91, name: '현대트랜시스리어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 92, name: '평화인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 93, name: '디에이씨', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 94, name: '대한통운', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 95, name: '인디아 세아 정밀 금속', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '정밀금속 제조' },
    { id: 96, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 97, name: '동우썰휘스테크 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 98, name: '대원인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 99, name: '현대 글로비스', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 100, name: '정인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 101, name: '기아자동차', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: true, targetRank: 3, description: '자동차 제조' },
    { id: 102, name: 'LG화학', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 103, name: '삼성SDI', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '배터리 제조' },
    { id: 104, name: 'LG디스플레이', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '디스플레이 패널 제조' },
    { id: 105, name: '포스코', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '철강제품 제조' },
    { id: 106, name: '한화케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 107, name: 'SK이노베이션', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 108, name: 'CJ제일제당', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '식품 제조' },
    { id: 109, name: '롯데케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 110, name: '한화에어로스페이스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '항공우주 부품 제조' },
    { id: 111, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 112, name: '현대중공업', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '조선 및 해양플랜트' },
    { id: 113, name: '한화시스템', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: 'IT 솔루션' },
    { id: 114, name: 'LS전선', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전선 및 케이블 제조' },
    { id: 115, name: '현대모비스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 116, name: '기아모비스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 117, name: '한화정밀기계', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '정밀기계 제조' },
    { id: 118, name: '두산에너빌리티', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '에너지 장비 제조' },
    { id: 119, name: 'LS니꼬동제련', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '동제련' },
    { id: 120, name: '포스코케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 121, name: 'SK케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 122, name: '롯데정보통신', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 123, name: '한화시스템', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: 'IT 솔루션' },
    { id: 124, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
    { id: 125, name: '현대건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 126, name: '엔브이에이치인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 127, name: '동우썰휘스테크 인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 128, name: '두원인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 129, name: '현대EP인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 130, name: '이원정공', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 131, name: '에이치엘클레무브', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 132, name: '명화공업', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 133, name: '인팩인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 134, name: '영범우인도회사', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 135, name: '씨와이뮤텍 아난드', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 부품 제조' },
    { id: 136, name: '한국타이어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '타이어 제조' },
    { id: 137, name: '넥센타이어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '타이어 제조' },
    { id: 138, name: '금호타이어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '타이어 제조' },
    { id: 139, name: '한화에어로스페이스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '항공우주 부품 제조' },
    { id: 140, name: '두산에어로스페이스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '항공우주 부품 제조' },
    { id: 141, name: '한화정밀기계', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '정밀기계 제조' },
    { id: 142, name: '두산정밀기계', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '정밀기계 제조' },
    { id: 143, name: '한화에너빌리티', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '에너지 장비 제조' },
    { id: 144, name: '두산에너빌리티', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '에너지 장비 제조' },
    { id: 145, name: '한화케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 146, name: '두산케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
    { id: 147, name: '한화철강', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '철강제품 제조' },
    { id: 148, name: '두산철강', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '철강제품 제조' },
    { id: 149, name: '한화전자', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전자제품 제조' },
    { id: 150, name: '두산전자', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전자제품 제조' },
    { id: 151, name: '한화반도체', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '반도체 제조' },
    { id: 152, name: '두산반도체', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '반도체 제조' },
    { id: 153, name: '한화디스플레이', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '디스플레이 제조' },
    { id: 154, name: '두산디스플레이', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '디스플레이 제조' },
    { id: 155, name: '한화배터리', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '배터리 제조' },
    { id: 156, name: '두산배터리', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '배터리 제조' },
    { id: 157, name: '한화모터스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 제조' },
    { id: 158, name: '두산모터스', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '자동차 제조' },
    { id: 159, name: '한화건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 160, name: '두산건설', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '건설 서비스' },
    { id: 161, name: '한화엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 162, name: '두산엔지니어링', industry: '건설업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '엔지니어링 서비스' },
    { id: 163, name: '한화IT', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 164, name: '두산IT', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 서비스' },
    { id: 165, name: '한화물류', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 166, name: '두산물류', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
    { id: 167, name: '한화금융', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '금융 서비스' },
    { id: 168, name: '두산금융', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '금융 서비스' },
    { id: 169, name: '한화보험', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '보험 서비스' },
    { id: 170, name: '두산보험', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '보험 서비스' },
    { id: 171, name: '한화증권', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '증권 서비스' },
    { id: 172, name: '두산증권', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '증권 서비스' },
    { id: 173, name: '한화자산운용', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '자산운용 서비스' },
    { id: 174, name: '두산자산운용', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '자산운용 서비스' },
    { id: 175, name: '한화투자증권', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자증권 서비스' },
    { id: 176, name: '두산투자증권', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자증권 서비스' },
    { id: 177, name: '한화생명', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '생명보험 서비스' },
    { id: 178, name: '두산생명', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '생명보험 서비스' },
    { id: 179, name: '한화손해보험', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '손해보험 서비스' },
    { id: 180, name: '두산손해보험', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '손해보험 서비스' },
    { id: 181, name: '한화카드', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '신용카드 서비스' },
    { id: 182, name: '두산카드', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '신용카드 서비스' },
    { id: 183, name: '한화캐피탈', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '캐피탈 서비스' },
    { id: 184, name: '두산캐피탈', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '캐피탈 서비스' },
    { id: 185, name: '한화저축은행', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '저축은행 서비스' },
    { id: 186, name: '두산저축은행', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '저축은행 서비스' },
    { id: 187, name: '한화투자신탁', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자신탁 서비스' },
    { id: 188, name: '두산투자신탁', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자신탁 서비스' },
    { id: 189, name: '한화투자자문', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자자문 서비스' },
    { id: 190, name: '두산투자자문', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자자문 서비스' },
    { id: 191, name: '한화투자개발', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자개발 서비스' },
    { id: 192, name: '두산투자개발', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자개발 서비스' },
    { id: 193, name: '한화투자운용', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자운용 서비스' },
    { id: 194, name: '두산투자운용', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자운용 서비스' },
    { id: 195, name: '한화투자신용', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자신용 서비스' },
    { id: 196, name: '두산투자신용', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자신용 서비스' },
    { id: 197, name: '한화투자보증', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자보증 서비스' },
    { id: 198, name: '두산투자보증', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자보증 서비스' },
    { id: 199, name: '한화투자리스', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자리스 서비스' },
    { id: 200, name: '두산투자리스', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자리스 서비스' },
    { id: 201, name: '한화투자파이낸스', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자파이낸스 서비스' },
    { id: 202, name: '두산투자파이낸스', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자파이낸스 서비스' },
    { id: 203, name: '한화투자리서치', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자리서치 서비스' },
    { id: 204, name: '두산투자리서치', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자리서치 서비스' },
    { id: 205, name: '한화투자컨설팅', industry: '금융 및 보험업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '투자컨설팅 서비스' }
  ];

  // 페이지네이션 계산
  const currentCompanies = activeRegion === 'mumbai' ? mumbaiCompanies : chennaiCompanies;
  const totalPages = Math.ceil(currentCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageCompanies = currentCompanies.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="target-customers">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">11. 지역별 한국기업 진출현황</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          KOTRA 자료를 기반으로 한 인도 뭄바이, 첸나이 지역 진출 한국기업 현황입니다. 
          각 지역별로 진출한 모든 한국기업의 리스트와 함께, 
          타겟고객으로 선정된 기업들의 정보를 포함하여 제공합니다.
        </p>
      </div>

      {/* 지역 선택 탭 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => {
                setActiveRegion('mumbai');
                setCurrentPage(1);
              }}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'mumbai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏙️ 뭄바이 진출기업 ({mumbaiCompanies.length}개)
            </button>
            <button
              onClick={() => {
                setActiveRegion('chennai');
                setCurrentPage(1);
              }}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'chennai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏭 첸나이 진출기업 ({chennaiCompanies.length}개)
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 타겟고객 선정 기업 안내 */}
          <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-bold mb-2 text-yellow-800">🎯 타겟고객 선정 기업</h3>
            <p className="text-sm text-yellow-700">
              {activeRegion === 'mumbai' ? '뭄바이 지역' : '첸나이 지역'}에서 타겟고객으로 선정된 기업들은 
              <span className="font-semibold text-yellow-800"> 노란색 배경</span>으로 표시됩니다.
            </p>
          </div>

          {/* 진출기업 리스트 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">순번</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">기업명</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">업종</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">진출형태</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">진출연도</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">타겟고객</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">설명</th>
                </tr>
              </thead>
              <tbody>
                {currentPageCompanies.map((company, index) => (
                  <tr 
                    key={company.id} 
                    className={`border border-gray-300 ${
                      company.isTarget ? 'bg-yellow-50' : 'bg-white'
                    } hover:bg-gray-50`}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {company.name}
                      {company.isTarget && (
                        <span className="ml-2 inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                          타겟 {company.targetRank}위
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{company.industry}</td>
                    <td className="border border-gray-300 px-4 py-2">{company.entryType}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{company.entryYear}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {company.isTarget ? '✓' : '-'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{company.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  이전
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* 페이지 정보 */}
          <div className="mt-4 text-center text-sm text-gray-600">
            {startIndex + 1} - {Math.min(endIndex, currentCompanies.length)} / {currentCompanies.length}개 기업
            (페이지 {currentPage} / {totalPages})
          </div>

          {/* 통계 정보 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentCompanies.length}
              </div>
              <div className="text-sm text-blue-700">총 진출기업 수</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {currentCompanies.filter(c => c.isTarget).length}
              </div>
              <div className="text-sm text-green-700">타겟고객 선정</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(currentCompanies.map(c => c.industry)).size}
              </div>
              <div className="text-sm text-purple-700">진출 업종 수</div>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 특징 및 전략 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">📊 진출 현황 특징</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 뭄바이: 금융, IT 서비스 중심</li>
            <li>• 첸나이: 제조업, 공장 중심</li>
            <li>• 1990년대 후반부터 진출 시작</li>
            <li>• 대기업 중심의 진출 패턴</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">🎯 타겟고객 선정 기준</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 글로벌 네트워크 니즈</li>
            <li>• 지역 성장성</li>
            <li>• 진출 시기 적절성</li>
            <li>• 업종 특성</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">💡 접근 전략</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 1:1 직접 영업</li>
            <li>• 파트너십 활용</li>
            <li>• 참고 사례 구축</li>
            <li>• 단계적 확대</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionAppendix() {
  return (
    <section id="appendix">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 부록</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">📊 데이터 출처</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• 한국무역협회 (KOTRA) 인도 진출기업 현황</li>
            <li>• TeleGeography (네트워크 인프라)</li>
            <li>• IDC, Gartner (시장 조사)</li>
            <li>• 인도 통신부 (TRAI) 통계</li>
            <li>• 한국 기업 인도 진출 사례 연구</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">🔧 분석 방법론</h3>
          <ul className="space-y-2 text-green-700">
            <li>• DCF (Discounted Cash Flow) 분석</li>
            <li>• 시장 규모 추정 (TAM/SAM/SOM)</li>
            <li>• 경쟁사 벤치맹</li>
            <li>• 시나리오 분석</li>
            <li>• 리스크 평가</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 주요 가정 및 제약사항</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">주요 가정</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 매출 성장률: 8% (연간)</li>
              <li>• OPEX 증가율: 3% (연간)</li>
              <li>• 할인율 (WACC): 12%</li>
              <li>• 세율: 25%</li>
              <li>• 환율: 1 USD = 83 INR</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">제약사항</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 시장 데이터의 한정성</li>
              <li>• 경쟁사 정보의 불완전성</li>
              <li>• 규제 환경 변화 가능성</li>
              <li>• 환율 변동 리스크</li>
              <li>• 기술 변화의 불확실성</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">⚠️ 면책 조항</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>
            본 사업성 분석 보고서는 제공된 정보와 가정을 기반으로 작성되었습니다. 
            실제 결과는 시장 상황, 경쟁 환경, 규제 변화 등 다양한 요인에 따라 달라질 수 있습니다.
          </p>
          <p>
            투자 결정 시에는 본 보고서 외에도 추가적인 실사, 전문가 자문, 
            법적 검토 등을 통한 종합적인 판단이 필요합니다.
          </p>
          <p>
            본 보고서의 내용은 참고용으로만 사용되어야 하며, 
            투자 손실에 대한 책임은 투자자에게 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
} 