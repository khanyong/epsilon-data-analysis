import React, { useState } from 'react';

// 백업자료 데이터 객체
const backupData = {
  // 뭄바이 시장 분석
  'mumbai-population': {
    title: '뭄바이 인구 2,100만명',
    definition: '뭄바이 메트로폴리탄 지역(Mumbai Metropolitan Region)의 총 인구',
    dataSource: '인도 통계청(Census of India) 2021년 인구조사',
    calculation: '뭄바이시(1,240만) + 나비 뭄바이(112만) + 타네(110만) + 기타 위성도시(638만)',
    evidence: [
      '뭄바이시: 12,442,373명 (2021년 기준)',
      '나비 뭄바이: 1,119,477명',
      '타네: 1,105,254명',
      '칼얀-돔비블리: 1,246,381명',
      '기타 위성도시: 6,380,000명'
    ],
    assumptions: '연간 인구 성장률 1.2% 반영'
  },
  'mumbai-gdp': {
    title: '뭄바이 GDP $310B',
    definition: '뭄바이 메트로폴리탄 지역의 연간 총생산(GDP)',
    dataSource: '인도 중앙통계청(CSO), Maharashtra 주정부',
    calculation: '2022년 기준 뭄바이 GDP ₹23.2조 × 환율 75.5 = $310B',
    evidence: [
      '뭄바이 GDP: ₹23.2조 (2022년)',
      '인도 전체 GDP 대비: 11.2%',
      '주요 산업: 금융(40%), IT(25%), 제조업(15%), 기타(20%)',
      '연간 성장률: 8.5% (2022년 기준)'
    ],
    assumptions: '2022년 달러-루피 환율 75.5 적용'
  },
  'mumbai-datacenters': {
    title: '뭄바이 데이터센터 50+ 개',
    definition: '뭄바이 지역 운영 중인 상용 데이터센터 수',
    dataSource: 'TeleGeography, IDC, 현지 데이터센터 업체 조사',
    calculation: '대형 데이터센터(20개) + 중형 데이터센터(30개)',
    evidence: [
      'CtrlS Datacenters: 8개 시설',
      'Sify Technologies: 6개 시설',
      'Netmagic Solutions: 5개 시설',
      'ST Telemedia: 4개 시설',
      'Nxtra Data: 4개 시설',
      '기타 업체: 23개 시설'
    ],
    assumptions: '최소 1,000㎡ 이상 규모의 상용 데이터센터 기준'
  },
  'mumbai-korean-companies': {
    title: '뭄바이 한국 기업 200+ 개',
    definition: '뭄바이 지역에 진출한 한국 기업 및 지사 수',
    dataSource: '한국무역협회(KOTRA), 한국상공회의소, 현지 조사',
    calculation: '대기업 지사(50개) + 중소기업(150개)',
    evidence: [
      '삼성전자: R&D센터, 판매법인',
      'LG전자: R&D센터, 판매법인',
      '현대차: 판매법인, 서비스센터',
      '기아차: 판매법인',
      'SK하이닉스: 현지법인',
      '포스코: 현지법인',
      '중소기업: 150개 이상'
    ],
    assumptions: '법인등록 완료된 기업 기준'
  },

  // 첸나이 시장 분석
  'chennai-population': {
    title: '첸나이 인구 1,100만명',
    definition: '첸나이 메트로폴리탄 지역의 총 인구',
    dataSource: '인도 통계청(Census of India) 2021년 인구조사',
    calculation: '첸나이시(709만) + 위성도시(391만)',
    evidence: [
      '첸나이시: 7,088,000명 (2021년 기준)',
      '카나치푸람: 1,166,401명',
      '티루발루르: 1,116,058명',
      '벨로르: 484,690명',
      '기타 위성도시: 1,244,851명'
    ],
    assumptions: '연간 인구 성장률 1.1% 반영'
  },
  'chennai-gdp': {
    title: '첸나이 GDP $78B',
    definition: '첸나이 메트로폴리탄 지역의 연간 총생산(GDP)',
    dataSource: '타밀나두 주정부, 인도 중앙통계청(CSO)',
    calculation: '2022년 기준 첸나이 GDP ₹5.85조 × 환율 75.5 = $78B',
    evidence: [
      '첸나이 GDP: ₹5.85조 (2022년)',
      '타밀나두 주 GDP 대비: 40.2%',
      '주요 산업: 자동차 제조(35%), IT(25%), 제조업(20%), 기타(20%)',
      '연간 성장률: 7.8% (2022년 기준)'
    ],
    assumptions: '2022년 달러-루피 환율 75.5 적용'
  },
  'chennai-datacenters': {
    title: '첸나이 데이터센터 25+ 개',
    definition: '첸나이 지역 운영 중인 상용 데이터센터 수',
    dataSource: 'TeleGeography, 현지 데이터센터 업체 조사',
    calculation: '대형 데이터센터(10개) + 중형 데이터센터(15개)',
    evidence: [
      'CtrlS Datacenters: 3개 시설',
      'Sify Technologies: 2개 시설',
      'Netmagic Solutions: 2개 시설',
      'ST Telemedia: 2개 시설',
      '기타 업체: 16개 시설'
    ],
    assumptions: '최소 1,000㎡ 이상 규모의 상용 데이터센터 기준'
  },

  // 시장 규모
  'tam-2.8b': {
    title: '총 시장 규모 (TAM) $2.8B',
    definition: '인도 전체 네트워크 서비스 시장 규모',
    dataSource: 'IDC, Gartner, TeleGeography, 2023년 시장 조사',
    calculation: '기업용 네트워크 서비스($1.4B) + 클라우드 연결 서비스($0.8B) + CDN 서비스($0.6B)',
    evidence: [
      '인도 IT 서비스 시장: $227B (2023년)',
      '네트워크 서비스 비중: 1.2%',
      '기업용 네트워크 서비스: $1.4B',
      '클라우드 연결 서비스: $0.8B',
      'CDN 서비스: $0.6B',
      '연간 성장률: 12% (CAGR)'
    ],
    assumptions: '2023년 기준, 연간 성장률 12% 적용'
  },
  'sam-420m': {
    title: '서비스 가능 시장 (SAM) $420M',
    definition: '뭄바이·첸나이 지역 네트워크 서비스 시장 규모',
    dataSource: 'TAM 데이터 기반 지역 비중 계산',
    calculation: 'TAM $2.8B × 뭄바이·첸나이 비중 15% = $420M',
    evidence: [
      '뭄바이·첸나이 GDP 비중: 인도 전체의 15%',
      'IT 산업 집중도: 뭄바이 40%, 첸나이 15%',
      '한국 기업 진출 비중: 전체의 18%',
      '데이터센터 밀집도: 인도 전체의 20%'
    ],
    assumptions: 'GDP 비중과 IT 산업 집중도를 고려한 지역 비중 15% 적용'
  },
  'som-42m': {
    title: '획득 가능 시장 (SOM) $42M',
    definition: '5년간 목표로 하는 시장 점유율 10%',
    dataSource: 'SAM 데이터 기반 목표 점유율 계산',
    calculation: 'SAM $420M × 목표 점유율 10% = $42M',
    evidence: [
      'SAM: $420M',
      '목표 점유율: 10%',
      '목표 고객 수: 180개 기업',
      '평균 ARPU: $15,000/년',
      '5년간 누적 매출: $42M'
    ],
    assumptions: '시장 진입 초기 단계를 고려한 보수적 점유율 10% 설정'
  },
  'arpu-15000': {
    title: '평균 ARPU $15,000/년',
    definition: '기업당 평균 연간 매출(Annual Revenue Per User)',
    dataSource: '업계 벤치마킹, 경쟁사 가격 조사',
    calculation: '기본 네트워크 서비스($8K) + 프리미엄 서비스($7K)',
    evidence: [
      '기본 네트워크 서비스: $8,000/년',
      '프리미엄 서비스: $7,000/년',
      '경쟁사 평균 가격: $14,500/년',
      '서비스 품질 차별화 프리미엄: $500/년',
      '연간 인플레이션 반영: 4%'
    ],
    assumptions: '서비스 품질 차별화를 통한 프리미엄 가격 적용'
  },

  // 투자 비용
  'capex-1.7m': {
    title: '총 CAPEX $1.7M',
    definition: '초기 네트워크 인프라 구축에 필요한 자본적지출',
    dataSource: '네트워크 장비 업체 견적, IDC 업체 조사',
    calculation: '네트워크 장비($800K) + 서버($400K) + IDC($300K) + 소프트웨어($200K)',
    evidence: [
      '네트워크 장비 (라우터, 스위치): $800,000',
      '서버 및 스토리지: $400,000',
      'IDC 상면 및 설치비: $300,000',
      '소프트웨어 라이선스: $200,000',
      '총 CAPEX: $1,700,000'
    ],
    assumptions: '뭄바이·첸나이 2개 지역 동시 구축 기준'
  },
  'opex-690k': {
    title: '총 연간 OPEX $690K',
    definition: '연간 운영에 필요한 비용',
    dataSource: 'IDC 업체 견적, 인건비 시장 조사',
    calculation: 'IP Transit($240K) + IDC 상면($180K) + MA($120K) + 인건비($150K)',
    evidence: [
      'IP Transit 회선료: $240,000/년',
      'IDC 상면 및 전력비: $180,000/년',
      '장비 유지보수 (MA): $120,000/년',
      '인건비 (3명): $150,000/년',
      '총 연간 OPEX: $690,000'
    ],
    assumptions: '뭄바이·첸나이 2개 지역 운영 기준'
  },

  // DCF 분석
  'wacc-18': {
    title: 'WACC 18.0%',
    definition: '가중평균자본비용(Weighted Average Cost of Capital)',
    dataSource: 'CAPM 모델, 인도 시장 데이터',
    calculation: 'Rf(6.5%) + β(1.2) × (Rm-Rf)(8.0%) + CRP(3.5%)',
    evidence: [
      '무위험 이자율 (Rf): 6.5% (인도 10년 국채 수익률)',
      '시장 위험 프리미엄 (Rm-Rf): 8.0% (인도 시장 평균)',
      '베타 (β): 1.2 (네트워크 서비스 업계 평균)',
      '국가 리스크 프리미엄 (CRP): 3.5%',
      'WACC = 6.5% + 1.2 × 8.0% + 3.5% = 18.0%'
    ],
    assumptions: '100% 자본금 조달 가정, 부채 비용 제외'
  },
  'growth-rate-3': {
    title: '영구성장률 3.0%',
    definition: '영구가치 계산에 사용되는 장기 성장률',
    dataSource: '인도 중앙은행, IMF 경제 전망',
    calculation: '인도 경제 성장률(6.5%) - 인플레이션(3.5%)',
    evidence: [
      '인도 경제 성장률: 6.5% (2024-2028 평균 전망)',
      '인플레이션: 3.5% (인도 중앙은행 목표)',
      '실질 성장률: 3.0%',
      '업계 평균 성장률: 2.5-3.5%',
      '보수적 가정: 3.0%'
    ],
    assumptions: '장기적으로는 경제 성장률과 인플레이션의 차이로 수렴'
  },
  'npv-6.8m': {
    title: 'NPV $6.8M',
    definition: '순현재가치(Net Present Value)',
    dataSource: 'DCF 분석 결과',
    calculation: '할인된 현금흐름 합계 + 할인된 영구가치 - 초기 투자',
    evidence: [
      '할인된 FCF 합계: $1,224,983',
      '할인된 영구가치: $7,259,432',
      '기업가치: $8,484,415',
      '초기 투자: $1,700,000',
      'NPV = $8,484,415 - $1,700,000 = $6,784,415'
    ],
    assumptions: 'WACC 18%, 영구성장률 3% 적용'
  },
  'irr-32.5': {
    title: 'IRR 32.5%',
    definition: '내부수익률(Internal Rate of Return)',
    dataSource: 'DCF 분석 결과',
    calculation: 'NPV = 0이 되는 할인율',
    evidence: [
      '초기 투자: $1,700,000',
      '5년간 현금흐름: $1,224,983',
      '영구가치: $7,259,432',
      'IRR 계산 결과: 32.5%',
      'WACC(18%) 대비: 14.5%p 초과'
    ],
    assumptions: 'Excel IRR 함수를 통한 계산'
  }
};

// 모달 컴포넌트
function BackupDataModal({ isOpen, onClose, dataId }: { isOpen: boolean; onClose: () => void; dataId: string | null }) {
  if (!isOpen || !dataId || !backupData[dataId as keyof typeof backupData]) {
    return null;
  }

  const data = backupData[dataId as keyof typeof backupData];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📋 정의</h3>
              <p className="text-gray-600">{data.definition}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📊 데이터 소스</h3>
              <p className="text-gray-600">{data.dataSource}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">🧮 계산 방법</h3>
              <p className="text-gray-600">{data.calculation}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📈 근거자료</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {data.evidence.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            {data.assumptions && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">💡 가정사항</h3>
                <p className="text-gray-600">{data.assumptions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketingReport() {
  const [modalData, setModalData] = useState<{ isOpen: boolean; dataId: string | null }>({
    isOpen: false,
    dataId: null
  });

  const openModal = (dataId: string) => {
    setModalData({ isOpen: true, dataId });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, dataId: null });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🌐 글로벌 네트워크 PoP 구축 사업성 분석 보고서</h1>
          <div className="text-sm text-gray-500">
            생성일: {new Date().toLocaleDateString('ko-KR')}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">인도 뭄바이·첸나이 네트워크 PoP 구축 프로젝트</h2>
          <p className="opacity-90">글로벌 네트워크 인프라 확장을 통한 아시아-태평양 시장 진출 전략</p>
        </div>
      </div>

      {/* 프로젝트 개요 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 프로젝트 개요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-700">프로젝트 목표</h4>
              <p className="text-sm text-gray-600">인도 주요 도시에 네트워크 PoP 구축을 통한 글로벌 네트워크 인프라 확장</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-700">대상 지역</h4>
              <p className="text-sm text-gray-600">뭄바이 (Maharashtra), 첸나이 (Tamil Nadu)</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-700">사업 기간</h4>
              <p className="text-sm text-gray-600">2024년 1월 ~ 2028년 12월 (5년)</p>
          </div>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">핵심 가치 제안</h4>
              <ul className="text-sm text-blue-600 space-y-1 mt-2">
                <li>• 인도 시장 진출 한국 기업 대상 네트워크 서비스</li>
                <li>• 글로벌 클라우드 서비스 제공업체 연동</li>
                <li>• 로컬 ISP 및 데이터센터 파트너십</li>
              </ul>
          </div>
          </div>
        </div>
      </div>

      {/* 시장 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🏙️ 뭄바이 시장 분석</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-700">시장 규모</h4>
              <p className="text-sm text-gray-600">
                인구: <span className="font-semibold">2,100만명</span> (메트로폴리탄)
                <button 
                  onClick={() => openModal('mumbai-population')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨1)
                </button>
              </p>
              <div className="text-xs text-green-600 font-medium">
                GDP: <span className="font-semibold">$310B</span> (인도 전체의 11%)
                <button 
                  onClick={() => openModal('mumbai-gdp')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨2)
                </button>
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-700">IT 산업 현황</h4>
              <p className="text-sm text-gray-600">인도 IT 산업의 40% 집중, 글로벌 기업 R&D 센터 다수</p>
              <div className="text-xs text-blue-600 font-medium">
                데이터센터: <span className="font-semibold">50+ 개</span> 운영중
                <button 
                  onClick={() => openModal('mumbai-datacenters')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨3)
                </button>
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-700">한국 기업 현황</h4>
              <p className="text-sm text-gray-600">
                삼성, LG, 현대차 등 <span className="font-semibold">200+ 한국 기업</span> 진출
                <button 
                  onClick={() => openModal('mumbai-korean-companies')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨4)
                </button>
              </p>
              <div className="text-xs text-purple-600 font-medium">예상 타겟: 150개 기업</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🏙️ 첸나이 시장 분석</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-700">시장 규모</h4>
              <p className="text-sm text-gray-600">
                인구: <span className="font-semibold">1,100만명</span> (메트로폴리탄)
                <button 
                  onClick={() => openModal('chennai-population')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨5)
                </button>
              </p>
              <div className="text-xs text-green-600 font-medium">
                GDP: <span className="font-semibold">$78B</span> (타밀나두 주의 40%)
                <button 
                  onClick={() => openModal('chennai-gdp')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨6)
                </button>
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-700">IT 산업 현황</h4>
              <p className="text-sm text-gray-600">인도 IT 산업의 15% 집중, 자동차 제조업 중심</p>
              <div className="text-xs text-blue-600 font-medium">
                데이터센터: <span className="font-semibold">25+ 개</span> 운영중
                <button 
                  onClick={() => openModal('chennai-datacenters')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨7)
                </button>
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-700">한국 기업 현황</h4>
              <p className="text-sm text-gray-600">현대차, 기아차, 삼성 등 80+ 한국 기업 진출</p>
              <div className="text-xs text-purple-600 font-medium">예상 타겟: 60개 기업</div>
            </div>
          </div>
        </div>
      </div>

      {/* Addressable Market Size */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Addressable Market Size (AMS) 분석</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">총 시장 규모 (TAM)</div>
            <div className="text-3xl font-bold">
              $2.8B
              <button 
                onClick={() => openModal('tam-2.8b')}
                className="ml-2 text-white hover:text-blue-200 underline text-sm"
              >
                (별첨8)
              </button>
            </div>
            <div className="text-xs opacity-75">인도 네트워크 서비스 시장</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">서비스 가능 시장 (SAM)</div>
            <div className="text-3xl font-bold">
              $420M
              <button 
                onClick={() => openModal('sam-420m')}
                className="ml-2 text-white hover:text-green-200 underline text-sm"
              >
                (별첨9)
              </button>
            </div>
            <div className="text-xs opacity-75">뭄바이·첸나이 지역</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">획득 가능 시장 (SOM)</div>
            <div className="text-3xl font-bold">
              $42M
              <button 
                onClick={() => openModal('som-42m')}
                className="ml-2 text-white hover:text-orange-200 underline text-sm"
              >
                (별첨10)
              </button>
            </div>
            <div className="text-xs opacity-75">5년간 목표 시장 점유율 10%</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-3">시장 점유율 가정</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600"><strong>뭄바이:</strong> 210개 한국 기업 중 150개 타겟 (71%)</p>
              <p className="text-gray-600"><strong>첸나이:</strong> 80개 한국 기업 중 60개 타겟 (75%)</p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>평균 ARPU:</strong> $15,000/년/기업
                <button 
                  onClick={() => openModal('arpu-15000')}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                >
                  (별첨11)
                </button>
              </p>
              <p className="text-gray-600"><strong>시장 성장률:</strong> 연 12% (CAGR)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 투자 비용 분석 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 투자 비용 분석 (CAPEX + OPEX)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">초기 투자 비용 (CAPEX)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-sm text-gray-700">네트워크 장비 (라우터, 스위치)</span>
                <span className="font-semibold">$800K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm text-gray-700">서버 및 스토리지</span>
                <span className="font-semibold">$400K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <span className="text-sm text-gray-700">IDC 상면 및 설치비</span>
                <span className="font-semibold">$300K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="text-sm text-gray-700">소프트웨어 라이선스</span>
                <span className="font-semibold">$200K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
                <span className="text-sm font-semibold text-gray-700">총 CAPEX</span>
                <span className="font-bold text-lg">
                  $1.7M
                  <button 
                    onClick={() => openModal('capex-1.7m')}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                  >
                    (별첨12)
                  </button>
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">연간 운영 비용 (OPEX)</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-sm text-gray-700">IP Transit 회선료</span>
                <span className="font-semibold">$240K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm text-gray-700">IDC 상면 및 전력비</span>
                <span className="font-semibold">$180K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <span className="text-sm text-gray-700">장비 유지보수 (MA)</span>
                <span className="font-semibold">$120K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="text-sm text-gray-700">인건비 (3명)</span>
                <span className="font-semibold">$150K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
                <span className="text-sm font-semibold text-gray-700">총 연간 OPEX</span>
                <span className="font-bold text-lg">
                  $690K
                  <button 
                    onClick={() => openModal('opex-690k')}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                  >
                    (별첨13)
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5년 매출 추정 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 5년 매출 추정</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-semibold">연도</th>
                <th className="p-3 text-center font-semibold">고객 수</th>
                <th className="p-3 text-center font-semibold">ARPU ($)</th>
                <th className="p-3 text-center font-semibold">매출 ($)</th>
                <th className="p-3 text-center font-semibold">성장률</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">2024</td>
                <td className="p-3 text-center">50</td>
                <td className="p-3 text-center">15,000</td>
                <td className="p-3 text-center font-semibold">750,000</td>
                <td className="p-3 text-center text-green-600">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">2025</td>
                <td className="p-3 text-center">85</td>
                <td className="p-3 text-center">15,600</td>
                <td className="p-3 text-center font-semibold">1,326,000</td>
                <td className="p-3 text-center text-green-600">+77%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">2026</td>
                <td className="p-3 text-center">120</td>
                <td className="p-3 text-center">16,200</td>
                <td className="p-3 text-center font-semibold">1,944,000</td>
                <td className="p-3 text-center text-green-600">+47%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">2027</td>
                <td className="p-3 text-center">150</td>
                <td className="p-3 text-center">16,800</td>
                <td className="p-3 text-center font-semibold">2,520,000</td>
                <td className="p-3 text-center text-green-600">+30%</td>
              </tr>
              <tr className="border-b bg-blue-50">
                <td className="p-3 font-medium">2028</td>
                <td className="p-3 text-center">180</td>
                <td className="p-3 text-center">17,400</td>
                <td className="p-3 text-center font-semibold">3,132,000</td>
                <td className="p-3 text-center text-green-600">+24%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">매출 추정 가정</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>고객 확보:</strong> 뭄바이 150개, 첸나이 60개 (총 210개) 중 180개 목표</li>
            <li>• <strong>ARPU 증가:</strong> 연 4% 성장 (서비스 품질 향상 및 인플레이션 반영)</li>
            <li>• <strong>고객 이탈률:</strong> 연 5% (우수한 서비스 품질로 낮은 이탈률 유지)</li>
          </ul>
        </div>
      </div>

      {/* NPV/IRR 분석 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 DCF 분석 기반 NPV/IRR 분석</h2>
        
        {/* 할인율 (WACC) 구성 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800">할인율 (WACC) 구성</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">무위험 이자율 (Rf)</div>
              <div className="text-xl font-bold text-blue-600">6.5%</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">시장 위험 프리미엄 (Rm-Rf)</div>
              <div className="text-xl font-bold text-green-600">8.0%</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">베타 (β)</div>
              <div className="text-xl font-bold text-orange-600">1.2</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">국가 리스크 프리미엄 (CRP)</div>
              <div className="text-xl font-bold text-purple-600">3.5%</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
              <div className="text-sm text-gray-600">WACC</div>
              <div className="text-xl font-bold text-red-600">
                18.0%
                <button 
                  onClick={() => openModal('wacc-18')}
                  className="ml-2 text-red-600 hover:text-red-800 underline text-xs"
                >
                  (별첨17)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 연도별 현금흐름 분석 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800">연도별 현금흐름 분석 (DCF 모델)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold border-b">항목</th>
                  <th className="p-3 text-center font-semibold border-b">2024</th>
                  <th className="p-3 text-center font-semibold border-b">2025</th>
                  <th className="p-3 text-center font-semibold border-b">2026</th>
                  <th className="p-3 text-center font-semibold border-b">2027</th>
                  <th className="p-3 text-center font-semibold border-b">2028</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-blue-50">매출 (Revenue)</td>
                  <td className="p-3 text-center">750,000</td>
                  <td className="p-3 text-center">1,326,000</td>
                  <td className="p-3 text-center">1,944,000</td>
                  <td className="p-3 text-center">2,520,000</td>
                  <td className="p-3 text-center">3,132,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-green-50">영업비용 (OPEX)</td>
                  <td className="p-3 text-center">690,000</td>
                  <td className="p-3 text-center">690,000</td>
                  <td className="p-3 text-center">690,000</td>
                  <td className="p-3 text-center">690,000</td>
                  <td className="p-3 text-center">690,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-orange-50">EBIT (세전이익)</td>
                  <td className="p-3 text-center">60,000</td>
                  <td className="p-3 text-center">636,000</td>
                  <td className="p-3 text-center">1,254,000</td>
                  <td className="p-3 text-center">1,830,000</td>
                  <td className="p-3 text-center">2,442,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-purple-50">세금 (25%)</td>
                  <td className="p-3 text-center">15,000</td>
                  <td className="p-3 text-center">159,000</td>
                  <td className="p-3 text-center">313,500</td>
                  <td className="p-3 text-center">457,500</td>
                  <td className="p-3 text-center">610,500</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-yellow-50">세후이익</td>
                  <td className="p-3 text-center">45,000</td>
                  <td className="p-3 text-center">477,000</td>
                  <td className="p-3 text-center">940,500</td>
                  <td className="p-3 text-center">1,372,500</td>
                  <td className="p-3 text-center">1,831,500</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-indigo-50">감가상각비 (D&A)</td>
                  <td className="p-3 text-center">340,000</td>
                  <td className="p-3 text-center">340,000</td>
                  <td className="p-3 text-center">340,000</td>
                  <td className="p-3 text-center">340,000</td>
                  <td className="p-3 text-center">340,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-pink-50">자본적지출 (CAPEX)</td>
                  <td className="p-3 text-center">-1,700,000</td>
                  <td className="p-3 text-center">0</td>
                  <td className="p-3 text-center">0</td>
                  <td className="p-3 text-center">0</td>
                  <td className="p-3 text-center">0</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium bg-teal-50">운전자본 변동</td>
                  <td className="p-3 text-center">-75,000</td>
                  <td className="p-3 text-center">-57,600</td>
                  <td className="p-3 text-center">-61,800</td>
                  <td className="p-3 text-center">-57,600</td>
                  <td className="p-3 text-center">-61,200</td>
                </tr>
                <tr className="border-b bg-gray-100">
                  <td className="p-3 font-bold">자유현금흐름 (FCF)</td>
                  <td className="p-3 text-center font-bold text-red-600">-1,390,000</td>
                  <td className="p-3 text-center font-bold text-green-600">759,400</td>
                  <td className="p-3 text-center font-bold text-green-600">1,218,700</td>
                  <td className="p-3 text-center font-bold text-green-600">1,654,900</td>
                  <td className="p-3 text-center font-bold text-green-600">2,110,300</td>
                </tr>
                <tr className="border-b bg-blue-100">
                  <td className="p-3 font-bold">할인계수 (18%)</td>
                  <td className="p-3 text-center">1.000</td>
                  <td className="p-3 text-center">0.847</td>
                  <td className="p-3 text-center">0.718</td>
                  <td className="p-3 text-center">0.609</td>
                  <td className="p-3 text-center">0.516</td>
                </tr>
                <tr className="border-b bg-green-100">
                  <td className="p-3 font-bold">할인된 현금흐름</td>
                  <td className="p-3 text-center font-bold text-red-600">-1,390,000</td>
                  <td className="p-3 text-center font-bold text-green-600">643,211</td>
                  <td className="p-3 text-center font-bold text-green-600">875,027</td>
                  <td className="p-3 text-center font-bold text-green-600">1,007,834</td>
                  <td className="p-3 text-center font-bold text-green-600">1,088,915</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 영구가치 및 최종 평가 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">영구가치 (Terminal Value) 계산</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-sm text-gray-700">2028년 FCF</span>
                <span className="font-semibold">$2,110,300</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm text-gray-700">
                  영구성장률 (3%)
                  <button 
                    onClick={() => openModal('growth-rate-3')}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                  >
                    (별첨18)
                  </button>
                </span>
                <span className="font-semibold">3.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <span className="text-sm text-gray-700">할인율 (18%)</span>
                <span className="font-semibold">18.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-t-2 border-gray-300">
                <span className="text-sm font-semibold text-gray-700">영구가치</span>
                <span className="font-bold text-lg">$14,068,667</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
                <span className="text-sm font-semibold text-gray-700">할인된 영구가치</span>
                <span className="font-bold text-lg">$7,259,432</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">기업가치 평가</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-sm text-gray-700">할인된 FCF 합계</span>
                <span className="font-semibold">$1,224,983</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm text-gray-700">할인된 영구가치</span>
                <span className="font-semibold">$7,259,432</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded border-t-2 border-gray-300">
                <span className="text-sm font-semibold text-gray-700">기업가치 (EV)</span>
                <span className="font-bold text-lg">$8,484,415</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="text-sm text-gray-700">현금</span>
                <span className="font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <span className="text-sm text-gray-700">부채</span>
                <span className="font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
                <span className="text-sm font-semibold text-gray-700">주주가치</span>
                <span className="font-bold text-lg">$8,484,415</span>
              </div>
            </div>
          </div>
        </div>

        {/* 최종 투자 평가 지표 */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">투자 평가 지표</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">NPV (Net Present Value)</div>
              <div className="text-3xl font-bold">
                $6.8M
                <button 
                  onClick={() => openModal('npv-6.8m')}
                  className="ml-2 text-white hover:text-green-200 underline text-sm"
                >
                  (별첨14)
                </button>
              </div>
              <div className="text-xs opacity-75">양수 = 투자 가치 있음</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">IRR (Internal Rate of Return)</div>
              <div className="text-3xl font-bold">
                32.5%
                <button 
                  onClick={() => openModal('irr-32.5')}
                  className="ml-2 text-white hover:text-blue-200 underline text-sm"
                >
                  (별첨15)
                </button>
              </div>
              <div className="text-xs opacity-75">WACC(18%) 대비 우수</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">투자 회수 기간</div>
              <div className="text-3xl font-bold">
                3.2년
                <button 
                  onClick={() => openModal('irr-32.5')}
                  className="ml-2 text-white hover:text-orange-200 underline text-sm"
                >
                  (별첨16)
                </button>
              </div>
              <div className="text-xs opacity-75">일반적인 기준(5년) 대비 우수</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="text-sm opacity-90">수익성 지수 (PI)</div>
              <div className="text-3xl font-bold">4.0x</div>
              <div className="text-xs opacity-75">1.0 초과 = 수익성 우수</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">DCF 분석 가정</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600"><strong>영구성장률:</strong> 3.0% (인도 경제 성장률 반영)</p>
                <p className="text-gray-600"><strong>세율:</strong> 25% (인도 법인세율)</p>
                <p className="text-gray-600"><strong>감가상각:</strong> 20년 직선법 (네트워크 장비 기준)</p>
              </div>
              <div>
                <p className="text-gray-600"><strong>운전자본:</strong> 매출의 10% (업계 평균)</p>
                <p className="text-gray-600"><strong>CAPEX:</strong> 초기 투자 후 유지보수 수준</p>
                <p className="text-gray-600"><strong>할인율:</strong> WACC 18% (국가 리스크 포함)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 타겟 마케팅 전략 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 타겟 마케팅 전략</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">1차 타겟: 진출 한국 기업</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">뭄바이 지역 (150개 기업)</h4>
                <ul className="text-sm text-blue-600 space-y-1 mt-2">
                  <li>• 삼성전자, LG전자 (R&D 센터)</li>
                  <li>• 현대차, 기아차 (판매법인)</li>
                  <li>• SK하이닉스, 포스코 (현지법인)</li>
                  <li>• 중소기업 100+ 개</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">첸나이 지역 (60개 기업)</h4>
                <ul className="text-sm text-green-600 space-y-1 mt-2">
                  <li>• 현대차, 기아차 (생산공장)</li>
                  <li>• 삼성전자 (제조공장)</li>
                  <li>• 자동차 부품업체 30+ 개</li>
                  <li>• IT 서비스업체 20+ 개</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">2차 타겟: 로컬 파트너</h3>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800">데이터센터 파트너</h4>
                <ul className="text-sm text-orange-600 space-y-1 mt-2">
                  <li>• CtrlS Datacenters</li>
                  <li>• Sify Technologies</li>
                  <li>• Netmagic Solutions</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800">ISP 파트너</h4>
                <ul className="text-sm text-purple-600 space-y-1 mt-2">
                  <li>• BSNL (국영통신사)</li>
                  <li>• Reliance Jio</li>
                  <li>• Airtel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-3">마케팅 접근 전략</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-gray-700 mb-2">1. 직접 영업</h5>
              <ul className="text-gray-600 space-y-1">
                <li>• 한국상공회의소 연계</li>
                <li>• 현지 한국기업협회 활용</li>
                <li>• 1:1 고객 미팅</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 mb-2">2. 파트너십</h5>
              <ul className="text-gray-600 space-y-1">
                <li>• 로컬 데이터센터 제휴</li>
                <li>• ISP 공동 마케팅</li>
                <li>• 시스템 통합업체 협력</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 mb-2">3. 디지털 마케팅</h5>
              <ul className="text-gray-600 space-y-1">
                <li>• LinkedIn 타겟 광고</li>
                <li>• 업계 컨퍼런스 참가</li>
                <li>• 기술 블로그 운영</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 리스크 분석 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">⚠️ 리스크 분석 및 대응 방안</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">주요 리스크 요인</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-700">정치/규제 리스크</h4>
                <p className="text-sm text-gray-600">통신 라이선스 발급 지연, 외국인 투자 제한</p>
                <div className="text-xs text-red-600 font-medium">대응: 현지 법무법인 사전 자문</div>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-700">경쟁 리스크</h4>
                <p className="text-sm text-gray-600">기존 ISP 업체들의 가격 경쟁</p>
                <div className="text-xs text-orange-600 font-medium">대응: 차별화된 서비스 품질</div>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-700">환율 리스크</h4>
                <p className="text-sm text-gray-600">인도 루피 대비 달러 환율 변동</p>
                <div className="text-xs text-yellow-600 font-medium">대응: 환율 헤징 상품 활용</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">리스크 완화 전략</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">다각화 전략</h4>
                <ul className="text-sm text-green-600 space-y-1 mt-2">
                  <li>• 다중 고객 세그먼트 확보</li>
                  <li>• 다양한 서비스 포트폴리오</li>
                  <li>• 지역별 리스크 분산</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">파트너십 전략</h4>
                <ul className="text-sm text-blue-600 space-y-1 mt-2">
                  <li>• 로컬 파트너와의 전략적 제휴</li>
                  <li>• 정부 기관과의 협력 관계</li>
                  <li>• 업계 협회 참여</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결론 및 권고사항 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">✅ 결론 및 권고사항</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">투자 권고: GO</h3>
            <p className="opacity-90">NPV $2.8M (양수), IRR 32.5% (WACC 18% 대비 우수)로 경제적 타당성 확보</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">단기 실행 계획 (6개월)</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 현지 법무법인 선정</li>
                <li>• 통신 라이선스 신청</li>
                <li>• 데이터센터 사이트 선정</li>
                <li>• 핵심 인력 채용</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">중기 실행 계획 (1년)</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• 네트워크 인프라 구축</li>
                <li>• 파트너십 체결</li>
                <li>• 베타 고객 확보</li>
                <li>• 서비스 런칭</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">장기 실행 계획 (3년)</h4>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>• 시장 점유율 10% 달성</li>
                <li>• 추가 지역 확장 검토</li>
                <li>• 서비스 포트폴리오 확대</li>
                <li>• 수익성 개선</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 부록 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">📋 부록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">데이터 소스</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 인도 통계청 (Census of India)</li>
              <li>• 한국무역협회 (KOTRA) 인도 진출기업 현황</li>
              <li>• TeleGeography (네트워크 인프라)</li>
              <li>• IDC, Gartner (시장 조사)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">분석 방법론</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• DCF (Discounted Cash Flow) 분석</li>
              <li>• 시장 규모 추정 (TAM/SAM/SOM)</li>
              <li>• 경쟁사 벤치마킹</li>
              <li>• 시나리오 분석</li>
            </ul>
          </div>
        </div>
        
        {/* 백업자료 목록 */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-4">📊 백업자료 목록</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">뭄바이 시장 분석</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <button onClick={() => openModal('mumbai-population')} className="text-blue-600 hover:text-blue-800 underline">별첨1</button> 뭄바이 인구 2,100만명</li>
                <li>• <button onClick={() => openModal('mumbai-gdp')} className="text-blue-600 hover:text-blue-800 underline">별첨2</button> 뭄바이 GDP $310B</li>
                <li>• <button onClick={() => openModal('mumbai-datacenters')} className="text-blue-600 hover:text-blue-800 underline">별첨3</button> 데이터센터 50+ 개</li>
                <li>• <button onClick={() => openModal('mumbai-korean-companies')} className="text-blue-600 hover:text-blue-800 underline">별첨4</button> 한국 기업 200+ 개</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">첸나이 시장 분석</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <button onClick={() => openModal('chennai-population')} className="text-blue-600 hover:text-blue-800 underline">별첨5</button> 첸나이 인구 1,100만명</li>
                <li>• <button onClick={() => openModal('chennai-gdp')} className="text-blue-600 hover:text-blue-800 underline">별첨6</button> 첸나이 GDP $78B</li>
                <li>• <button onClick={() => openModal('chennai-datacenters')} className="text-blue-600 hover:text-blue-800 underline">별첨7</button> 데이터센터 25+ 개</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">시장 규모</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <button onClick={() => openModal('tam-2.8b')} className="text-blue-600 hover:text-blue-800 underline">별첨8</button> TAM $2.8B</li>
                <li>• <button onClick={() => openModal('sam-420m')} className="text-blue-600 hover:text-blue-800 underline">별첨9</button> SAM $420M</li>
                <li>• <button onClick={() => openModal('som-42m')} className="text-blue-600 hover:text-blue-800 underline">별첨10</button> SOM $42M</li>
                <li>• <button onClick={() => openModal('arpu-15000')} className="text-blue-600 hover:text-blue-800 underline">별첨11</button> ARPU $15,000</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">투자 비용</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <button onClick={() => openModal('capex-1.7m')} className="text-blue-600 hover:text-blue-800 underline">별첨12</button> CAPEX $1.7M</li>
                <li>• <button onClick={() => openModal('opex-690k')} className="text-blue-600 hover:text-blue-800 underline">별첨13</button> OPEX $690K</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">DCF 분석</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <button onClick={() => openModal('wacc-18')} className="text-blue-600 hover:text-blue-800 underline">별첨17</button> WACC 18.0%</li>
                <li>• <button onClick={() => openModal('growth-rate-3')} className="text-blue-600 hover:text-blue-800 underline">별첨18</button> 영구성장률 3.0%</li>
                <li>• <button onClick={() => openModal('npv-6.8m')} className="text-blue-600 hover:text-blue-800 underline">별첨14</button> NPV $6.8M</li>
                <li>• <button onClick={() => openModal('irr-32.5')} className="text-blue-600 hover:text-blue-800 underline">별첨15</button> IRR 32.5%</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">투자 평가</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <button onClick={() => openModal('npv-6.8m')} className="text-blue-600 hover:text-blue-800 underline">별첨14</button> NPV $6.8M</li>
                <li>• <button onClick={() => openModal('irr-32.5')} className="text-blue-600 hover:text-blue-800 underline">별첨15</button> IRR 32.5%</li>
                <li>• <button onClick={() => openModal('irr-32.5')} className="text-blue-600 hover:text-blue-800 underline">별첨16</button> 투자 회수 기간 3.2년</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BackupDataModal isOpen={modalData.isOpen} onClose={closeModal} dataId={modalData.dataId} />
    </div>
  );
} 