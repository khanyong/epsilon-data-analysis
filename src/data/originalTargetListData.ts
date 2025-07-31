// 기존 하드코딩된 타겟 리스트 데이터 (원본)
// 이미지에서 확인된 기존 구조 기반

export const originalMumbaiCompanies = [
  { id: 1, name: '비엔엑스 쉬핑', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2018', isTarget: false, description: '물류 및 운송서비스' },
  { id: 2, name: '이롬', industry: '도매 및 소매업', entryType: '판매법인', entryYear: '2019', isTarget: false, description: '웰니스 제품 판매' },
  { id: 3, name: '이랜드패션 인디아', industry: '제조업', entryType: '기타(트레이딩)', entryYear: '2017', isTarget: false, description: '의류 제조 및 판매' },
  { id: 4, name: '한국산업은행', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2015', isTarget: false, description: '금융 서비스' },
  { id: 5, name: '인바디', industry: '제조업', entryType: '판매법인', entryYear: '2018', isTarget: false, description: '의료기기 제조' },
  { id: 6, name: '엘지화학', industry: '제조업', entryType: '판매법인', entryYear: '2016', isTarget: false, description: '화학제품 제조' },
  { id: 7, name: '미래에셋자산운용인도', industry: '금융·보험업', entryType: '생산법인', entryYear: '2019', isTarget: false, description: '자산운용 서비스' },
  { id: 8, name: '켐트롤스 삼일', industry: '제조업', entryType: '생산법인', entryYear: '2017', isTarget: false, description: '화학제품 제조' },
  { id: 9, name: '케이앤씨(인도법인)', industry: '제조업', entryType: '생산법인', entryYear: '2018', isTarget: false, description: '기계제조' },
  { id: 10, name: '삼성전자 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '1995', isTarget: true, targetRank: 1, description: '전자제품 제조' },
  { id: 11, name: 'LG전자 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '1997', isTarget: true, targetRank: 3, description: '가전제품 제조' },
  { id: 12, name: '현대자동차 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '1998', isTarget: true, targetRank: 2, description: '자동차 제조' },
  { id: 13, name: '기아자동차 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2019', isTarget: false, description: '자동차 제조' },
  { id: 14, name: '우리은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2016', isTarget: false, description: '은행업무' },
  { id: 15, name: '신한은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2017', isTarget: false, description: '은행업무' },
  { id: 16, name: 'KB국민은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2015', isTarget: false, description: '은행업무' },
  { id: 17, name: '하나은행 뭄바이지점', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2018', isTarget: false, description: '은행업무' },
  { id: 18, name: '한국투자증권', industry: '금융 및 보험업', entryType: '연락사무소', entryYear: '2016', isTarget: false, description: '증권업무' },
  { id: 19, name: 'LG화학 인도법인', industry: '제조업', entryType: '판매법인', entryYear: '2017', isTarget: false, description: '화학제품 제조' },
  { id: 20, name: '포스코 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2005', isTarget: true, targetRank: 5, description: '철강제품 제조' },
  { id: 21, name: 'SK하이닉스 인도법인', industry: '제조업', entryType: '생산법인', entryYear: '2011', isTarget: true, targetRank: 4, description: '반도체 제조' },
  { id: 22, name: 'CJ대한통운 인도법인', industry: '운수 및 창고업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: '물류 서비스' },
  { id: 23, name: '한화시스템 인도법인', industry: '전문, 과학 및 기술 서비스업', entryType: '서비스법인', entryYear: '2022', isTarget: false, description: 'IT 솔루션' },
  { id: 24, name: '롯데인디아', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '식품 제조' },
  { id: 25, name: '두산인프라코어', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '건설장비 제조' },
  { id: 26, name: '현대중공업', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '조선 및 해양플랜트' },
  { id: 27, name: 'LS전선', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '전선 및 케이블 제조' },
  { id: 28, name: '한화케미칼', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
  { id: 29, name: 'SK이노베이션', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '화학제품 제조' },
  { id: 30, name: 'CJ제일제당', industry: '제조업', entryType: '생산법인', entryYear: '2022', isTarget: false, description: '식품 제조' },
  // ... 추가 기업들 (총 68개)
];

export const originalChennaiCompanies = [
  // 첸나이 기업들 (총 205개)
  // 기존 하드코딩된 데이터 구조
  { id: 1, name: '첸나이 기업 1', industry: '제조업', entryType: '생산법인', entryYear: '2020', isTarget: false, description: '첸나이 지역 기업' },
  { id: 2, name: '첸나이 기업 2', industry: '서비스업', entryType: '서비스법인', entryYear: '2019', isTarget: true, targetRank: 1, description: '첸나이 타겟 기업' },
  // ... 추가 기업들 (총 205개)
];

// 기존 통계 데이터
export const originalTargetStats = {
  mumbai: {
    total: 68,
    withSalesDivision: 0, // 기존에는 sales_division 정보 없음
    withoutSalesDivision: 68,
    targetRatio: 0
  },
  chennai: {
    total: 205, // 기존 하드코딩된 수
    withSalesDivision: 0, // 기존에는 sales_division 정보 없음
    withoutSalesDivision: 205,
    targetRatio: 0
  }
};

// 기존 테이블 구조 (이미지에서 확인된 구조)
export const originalTableStructure = {
  headers: [
    '순번',
    '기업명', 
    '업종',
    '진출형태',
    '진출연도',
    '타겟고객',
    '설명'
  ],
  // 영업조직 컬럼은 기존에 없었음
  hasSalesDivision: false
};

// 기존 UI 구조 정보
export const originalUIInfo = {
  regionButtons: {
    mumbai: '뭄바이 진출기업 (68개)',
    chennai: '첸나이 진출기업 (205개)'
  },
  targetCustomerInfo: '뭄바이 지역에서 타겟고객으로 선정된 기업들은 노란색 배경으로 표시됩니다.',
  dataSource: 'KOTRA 자료를 기반으로 한 인도 뭄바이, 첸나이 지역 진출 한국기업 현황'
}; 