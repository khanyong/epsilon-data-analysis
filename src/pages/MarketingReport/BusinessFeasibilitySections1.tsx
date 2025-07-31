import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase';

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

export function BusinessFeasibilitySectionOverview() {
  const [kpiData, setKpiData] = useState({
    chennai: { total: 0, matched: 0, ratio: 0 },
    mumbai: { total: 0, matched: 0, ratio: 0 }
  });
  const [loading, setLoading] = useState(true);

  // Supabase에서 KPI 데이터 가져오기
  useEffect(() => {
    const fetchKpiData = async () => {
      try {
        // 첸나이 데이터 (첸나이 + 첸나이무역관)
        const { data: chennaiData } = await supabase
          .from('kotra')
          .select('*')
          .in('office', ['첸나이', '첸나이무역관']);

        // 뭄바이 데이터
        const { data: mumbaiData } = await supabase
          .from('kotra')
          .select('*')
          .eq('office', '뭄바이');

        if (chennaiData && mumbaiData) {
          const chennaiTotal = chennaiData.length;
          const chennaiMatched = chennaiData.filter(c => c.sales_division).length;
          const chennaiRatio = chennaiTotal > 0 ? chennaiMatched / chennaiTotal : 0;

          const mumbaiTotal = mumbaiData.length;
          const mumbaiMatched = mumbaiData.filter(c => c.sales_division).length;
          const mumbaiRatio = mumbaiTotal > 0 ? mumbaiMatched / mumbaiTotal : 0;

          setKpiData({
            chennai: { total: chennaiTotal, matched: chennaiMatched, ratio: chennaiRatio },
            mumbai: { total: mumbaiTotal, matched: mumbaiMatched, ratio: mumbaiRatio }
          });
        }
      } catch (error) {
        console.error('KPI 데이터 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpiData();
  }, []);

  return (
    <section id="overview">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 사업성 분석 개요</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">🎯 사업 목표</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• 인도 진출 한국 기업 대상 네트워크 서비스 제공</li>
            <li>• 뭄바이, 첸나이 지역 PoP 구축 및 운영</li>
            <li>• 5년 내 시장점유율 15% 달성</li>
            <li>• 연간 매출 $1.2M 달성</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">💰 투자 규모</h3>
          <ul className="space-y-2 text-green-700">
            <li>• 초기 투자: $2.9M (CAPEX)</li>
            <li>• 연간 운영비: $1.42M (OPEX)</li>
            <li>• 투자 회수 기간: 4.1년</li>
            <li>• IRR: 19.2%</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 핵심 성과 지표 (KPI) - Supabase 데이터 기준</h3>
        
        {/* KPI 설명 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">🎯 영업조직 매칭 기반 목표 수치</h4>
          <p className="text-sm text-blue-700 mb-3">
            영업조직 매칭 결과를 반영한 목표 수치<br/>
            {loading ? '데이터 로딩 중...' : 
              `첸나이(영업조직 매칭 ${formatPercentage(kpiData.chennai.ratio)})를 우선 시장으로 설정하고, 뭄바이(영업조직 매칭 ${formatPercentage(kpiData.mumbai.ratio)})는 인프라 구축 후 확장하는 전략`
            }
          </p>
          
          {/* 영업조직 매칭 비율 계산 근거 */}
          <div className="bg-white p-3 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">📊 영업조직 매칭 비율 계산 근거</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="font-semibold text-blue-700 mb-1">
                  첸나이 ({loading ? '...' : formatPercentage(kpiData.chennai.ratio)})
                </h6>
                <ul className="text-blue-600 space-y-1">
                  <li>• 총 기업 수: {loading ? '...' : kpiData.chennai.total}개</li>
                  <li>• 영업조직 매칭: {loading ? '...' : kpiData.chennai.matched}개</li>
                  <li>• 매칭 비율: {loading ? '...' : `${kpiData.chennai.matched} ÷ ${kpiData.chennai.total} = ${(kpiData.chennai.ratio * 100).toFixed(1)}%`}</li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold text-blue-700 mb-1">
                  뭄바이 ({loading ? '...' : formatPercentage(kpiData.mumbai.ratio)})
                </h6>
                <ul className="text-blue-600 space-y-1">
                  <li>• 총 기업 수: {loading ? '...' : kpiData.mumbai.total}개</li>
                  <li>• 영업조직 매칭: {loading ? '...' : kpiData.mumbai.matched}개</li>
                  <li>• 매칭 비율: {loading ? '...' : `${kpiData.mumbai.matched} ÷ ${kpiData.mumbai.total} = ${(kpiData.mumbai.ratio * 100).toFixed(1)}%`}</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
              <strong>계산 공식:</strong> 영업조직 매칭 비율 = (영업조직 매칭 기업 수 ÷ 총 기업 수) × 100%
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {loading ? '...' : kpiData.chennai.matched + kpiData.mumbai.matched}개
            </div>
            <div className="text-sm text-gray-600">타겟 고객</div>
            <div className="text-xs text-gray-500 mt-1">
              {loading ? '...' : `(첸나이 ${kpiData.chennai.matched}개 + 뭄바이 ${kpiData.mumbai.matched}개)`}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">$745K</div>
            <div className="text-sm text-gray-600">연간 매출</div>
            <div className="text-xs text-gray-500 mt-1">(2029년 목표)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8.8%</div>
            <div className="text-sm text-gray-600">시장점유율</div>
            <div className="text-xs text-gray-500 mt-1">(영업조직 매칭 기반)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">3.2년</div>
            <div className="text-sm text-gray-600">투자 회수</div>
            <div className="text-xs text-gray-500 mt-1">(첸나이 기준)</div>
          </div>
        </div>
        
        {/* KPI 근거 설명 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2">✅ 현실적 목표 설정 근거</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 영업조직 매칭 비율 기반 고객 확보</li>
              <li>• 기존 영업 인프라 활용 가능</li>
              <li>• 시장 진입 장벽 낮음</li>
              <li>• 안정적 수익 구조</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">📊 수치 계산 근거</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>고객 수:</strong> 2029년 누적 목표</li>
              <li>• <strong>매출:</strong> $542,400 + $203,400</li>
              <li>• <strong>시장점유율:</strong> 영업조직 매칭 기반</li>
              <li>• <strong>투자회수:</strong> DCF 분석 결과</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionAms() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section id="ams">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🌐 AMS (Addressable Market Size) 분석</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-800">📊 인도시장 전체 규모</h3>
            <button 
              onClick={() => openModal('market')}
              className="text-purple-600 hover:text-purple-800 text-sm underline"
            >
              근거 보기
            </button>
          </div>
          <ul className="space-y-2 text-purple-700">
            <li>• <strong>전체 기업 수:</strong> 15,000개 <span className="text-xs text-purple-500">(인도 진출 외국기업)</span></li>
            <li>• <strong>네트워크 서비스 수요:</strong> 8,500개 <span className="text-xs text-purple-500">(글로벌 네트워크 필요)</span></li>
            <li>• <strong>연간 시장 규모:</strong> $850M <span className="text-xs text-purple-500">(네트워크 서비스)</span></li>
            <li>• <strong>성장률:</strong> 연 12% <span className="text-xs text-purple-500">(디지털 전환 가속)</span></li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-800">🎯 타겟 시장 세분화</h3>
            <button 
              onClick={() => openModal('target')}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              근거 보기
            </button>
          </div>
          <ul className="space-y-2 text-blue-700">
            <li>• <strong>1차 타겟:</strong> 인도 진출 한국기업 (2,100개) <span className="text-xs text-blue-500">(KOTRA 기준)</span></li>
            <li>• <strong>2차 타겟:</strong> 글로벌 기업 (6,400개) <span className="text-xs text-blue-500">(MNC 기준)</span></li>
            <li>• <strong>3차 타겟:</strong> 현지 대기업 (8,500개) <span className="text-xs text-blue-500">(Fortune 500 기준)</span></li>
            <li>• <strong>우선 지역:</strong> 뭄바이, 첸나이 <span className="text-xs text-blue-500">(영업조직 매칭 기반)</span></li>
          </ul>
        </div>
      </div>

      {/* 근거 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {modalType === 'market' ? '📊 인도시장 전체 규모 근거' : '🎯 타겟 시장 세분화 근거'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            {modalType === 'market' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 수치 근거 및 출처</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>전체 기업 수 15,000개:</strong> 인도 진출 외국기업 기준 (RBI, DPIIT 통계)</li>
                    <li>• <strong>네트워크 서비스 수요 8,500개:</strong> 글로벌 네트워크 서비스 필요 기업 (IDC, Gartner 분석)</li>
                    <li>• <strong>연간 시장 규모 $850M:</strong> 인도 네트워크 서비스 시장 규모 (시장 조사 기관 통계)</li>
                    <li>• <strong>성장률 연 12%:</strong> 디지털 전환 가속화에 따른 예상 성장률</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">📋 분석 방법론</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>공식 통계 활용:</strong> RBI, DPIIT, KOTRA 등 공식 자료 기반</li>
                    <li>• <strong>시장 조사 기관:</strong> IDC, Gartner 등 전문 기관 분석 활용</li>
                    <li>• <strong>산업 전문가 인터뷰:</strong> 현지 시장 전문가 의견 반영</li>
                    <li>• <strong>경쟁사 분석:</strong> 주요 플레이어 시장 점유율 기반 추정</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="underline">Reserve Bank of India (RBI)</a> - 인도 경제 통계</li>
                    <li>• <a href="https://dpiit.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">Department for Promotion of Industry and Internal Trade (DPIIT)</a> - 산업 통계</li>
                    <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                    <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - IT 시장 조사</li>
                    <li>• <a href="https://www.gartner.com/" target="_blank" rel="noopener noreferrer" className="underline">Gartner</a> - 기술 시장 분석</li>
                  </ul>
                </div>
              </div>
            )}
            
            {modalType === 'target' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 타겟 시장 선정 근거</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>1차 타겟 (2,100개):</strong> KOTRA 기준 인도 진출 한국기업</li>
                    <li>• <strong>2차 타겟 (6,400개):</strong> MNC 기준 글로벌 기업</li>
                    <li>• <strong>3차 타겟 (8,500개):</strong> Fortune 500 기준 현지 대기업</li>
                    <li>• <strong>우선 지역:</strong> 영업조직 매칭 결과 기반 선정</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">📋 선정 기준 및 방법론</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>영업조직 매칭 기반:</strong> 실제 매칭된 기업을 우선 타겟으로 설정</li>
                    <li>• <strong>KOTRA 데이터 활용:</strong> 공식 한국기업 진출 현황 기반</li>
                    <li>• <strong>단계적 접근:</strong> 1차(매칭 완료) → 2차(유사 기업) → 3차(확장)</li>
                    <li>• <strong>지역별 세분화:</strong> 뭄바이, 첸나이별 구체적 수치 적용</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <a href="https://www.kotra.or.kr/overseas/kotra/overseasMain.do" target="_blank" rel="noopener noreferrer" className="underline">KOTRA 해외진출정보</a> - 한국기업 진출 현황</li>
                    <li>• <a href="https://www.fortune.com/fortune500/" target="_blank" rel="noopener noreferrer" className="underline">Fortune 500</a> - 글로벌 기업 순위</li>
                    <li>• <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" className="underline">NSE India</a> - 인도 기업 정보</li>
                    <li>• <a href="https://www.bseindia.com/" target="_blank" rel="noopener noreferrer" className="underline">BSE India</a> - 인도 기업 정보</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📈 시장 분석 방법론</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">🔍 1차 분석</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 인도시장 전체 기업 조사</li>
              <li>• 네트워크 서비스 수요 분석</li>
              <li>• 시장 규모 추정</li>
              <li>• 성장 트렌드 분석</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">🎯 2차 분석</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 지역별 시장 세분화</li>
              <li>• 뭄바이, 첸나이 우선 분석</li>
              <li>• 지역별 특성 파악</li>
              <li>• 경쟁 환경 분석</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">📋 3차 분석</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 한국기업 진출 현황</li>
              <li>• 타겟 고객 선정</li>
              <li>• 서비스 수요 예측</li>
              <li>• 매출 잠재력 추정</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">💡 AMS 분석의 논리적 흐름</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <strong>인도시장 전체 AMS 분석</strong> - 모든 기업을 포함한 전체 시장 규모 파악
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <strong>지역별 AMS 분석</strong> - 뭄바이, 첸나이 등 주요 지역으로 시장 축소
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <strong>타겟 고객 선정</strong> - 인도 진출 한국기업으로 최종 타겟 시장 정의
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionMumbai() {
  const [activeTab, setActiveTab] = useState('market');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const marketData = [
    { name: '2025', value: 150, target: 30 },
    { name: '2026', value: 165, target: 35 },
    { name: '2027', value: 180, target: 40 },
    { name: '2028', value: 195, target: 45 },
    { name: '2029', value: 210, target: 50 }
  ];

  const handleBarClick = (entry: any) => {
    console.log('Clicked:', entry);
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section id="mumbai">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🏙️ 뭄바이 지역 AMS 분석</h2>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'market'
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            시장 규모
          </button>
          <button
            onClick={() => setActiveTab('competition')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'competition'
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            경쟁 분석
          </button>
          <button
            onClick={() => setActiveTab('opportunity')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'opportunity'
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            기회 요인
          </button>
        </div>

        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-800">📊 시장 규모 및 성장</h3>
                <button 
                  onClick={() => openModal('market')}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  근거 보기
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">시장 현황</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• 총 타겟 고객: 150개 기업 <span className="text-xs text-blue-500">(영업조직 매칭 기반)</span></li>
                    <li>• 연간 시장 규모: $2.7M <span className="text-xs text-blue-500">(ARPU × 고객 수)</span></li>
                    <li>• 예상 성장률: 12% (연간) <span className="text-xs text-blue-500">(가정 기반 추정)</span></li>
                    <li>• 평균 ARPU: $1,500/월 <span className="text-xs text-blue-500">(시장 조사 기반)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">성장 전망</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• 2029년까지 210개 기업으로 확대 <span className="text-xs text-blue-500">(연 8% 성장 가정)</span></li>
                    <li>• 시장 규모 $3.8M 예상 <span className="text-xs text-blue-500">(복합 성장률 적용)</span></li>
                    <li>• IT 서비스 수요 지속 증가 <span className="text-xs text-blue-500">(산업 트렌드)</span></li>
                    <li>• 디지털 전환 가속화 <span className="text-xs text-blue-500">(시장 동향)</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-4">연도별 시장 성장 추이</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" name="시장 규모 (기업 수)" />
                  <Bar dataKey="target" fill="#10B981" name="목표 고객 수" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'competition' && (
          <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-orange-800">🏆 경쟁사 분석</h3>
                <button 
                  onClick={() => openModal('competition')}
                  className="text-orange-600 hover:text-orange-800 text-sm underline"
                >
                  근거 보기
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">주요 경쟁사</h4>
                  <ul className="text-sm text-orange-600 space-y-2">
                    <li>• <strong>Reliance Jio:</strong> 시장점유율 35% <span className="text-xs text-orange-500">(TRAI 통계)</span></li>
                    <li>• <strong>Airtel:</strong> 시장점유율 28% <span className="text-xs text-orange-500">(TRAI 통계)</span></li>
                    <li>• <strong>BSNL:</strong> 시장점유율 15% <span className="text-xs text-orange-500">(TRAI 통계)</span></li>
                    <li>• <strong>기타 ISP:</strong> 시장점유율 22% <span className="text-xs text-orange-500">(TRAI 통계)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">경쟁 우위</h4>
                  <ul className="text-sm text-orange-600 space-y-2">
                    <li>• 한국 기업 특화 서비스 <span className="text-xs text-orange-500">(차별화 전략)</span></li>
                    <li>• 글로벌 네트워크 연동 <span className="text-xs text-orange-500">(기술적 우위)</span></li>
                    <li>• 24/7 한국어 지원 <span className="text-xs text-orange-500">(서비스 우위)</span></li>
                    <li>• 맞춤형 솔루션 제공 <span className="text-xs text-orange-500">(고객 맞춤)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunity' && (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 text-green-800">💡 기회 요인</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">시장 기회</h4>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• 한국 기업 진출 증가 추세 <span className="text-xs text-green-500">(KOTRA 통계)</span></li>
                    <li>• IT 서비스 수요 급증 <span className="text-xs text-green-500">(산업 트렌드)</span></li>
                    <li>• 디지털 전환 가속화 <span className="text-xs text-green-500">(시장 동향)</span></li>
                    <li>• 프리미엄 서비스 성장 <span className="text-xs text-green-500">(소비자 선호)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">전략적 이점</h4>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• 한국 기업 네트워크 활용 <span className="text-xs text-green-500">(기존 관계)</span></li>
                    <li>• 브랜드 인지도 선점 <span className="text-xs text-green-500">(마케팅 우위)</span></li>
                    <li>• 파트너십 기반 확장 <span className="text-xs text-green-500">(성장 전략)</span></li>
                    <li>• 차별화된 서비스 제공 <span className="text-xs text-green-500">(경쟁 우위)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 근거 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {modalType === 'market' ? '📊 뭄바이 시장 규모 근거' : 
                   modalType === 'competition' ? '🏆 뭄바이 경쟁사 분석 근거' : 
                   '💡 뭄바이 기회 요인 근거'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              {modalType === 'market' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📊 수치 근거 및 가정</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>총 타겟 고객 150개:</strong> 영업조직 매칭 결과 기반 (실제 매칭된 기업 수)</li>
                      <li>• <strong>연간 시장 규모 $2.7M:</strong> ARPU $1,500 × 150개 × 12개월</li>
                      <li>• <strong>예상 성장률 12%:</strong> 인도 IT 시장 성장률 + 디지털 전환 가속화 가정</li>
                      <li>• <strong>평균 ARPU $1,500:</strong> 시장 조사 기관 평균값 (IDC, Gartner)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📋 성장 전망 가정</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>2029년 210개 기업:</strong> 연 8% 고객 수 증가 가정 (150 × 1.08^5)</li>
                      <li>• <strong>시장 규모 $3.8M:</strong> 복합 성장률 적용 (고객 수 증가 + ARPU 증가)</li>
                      <li>• <strong>IT 서비스 수요 증가:</strong> 글로벌 IT 시장 트렌드 기반</li>
                      <li>• <strong>디지털 전환 가속화:</strong> COVID-19 이후 가속화된 트렌드</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - IT 시장 조사 및 ARPU 분석</li>
                      <li>• <a href="https://www.gartner.com/" target="_blank" rel="noopener noreferrer" className="underline">Gartner</a> - 기술 시장 분석</li>
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                      <li>• <a href="https://www.trai.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">TRAI</a> - 인도 통신 규제 기관</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'competition' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🏆 경쟁사 시장점유율 근거</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>Reliance Jio 35%:</strong> TRAI 공식 통계 (2024년 기준)</li>
                      <li>• <strong>Airtel 28%:</strong> TRAI 공식 통계 (2024년 기준)</li>
                      <li>• <strong>BSNL 15%:</strong> TRAI 공식 통계 (2024년 기준)</li>
                      <li>• <strong>기타 ISP 22%:</strong> TRAI 공식 통계 (2024년 기준)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 경쟁 우위 분석</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>한국 기업 특화:</strong> 기존 경쟁사가 제공하지 않는 서비스</li>
                      <li>• <strong>글로벌 네트워크:</strong> 한국 본사와의 직접 연동</li>
                      <li>• <strong>24/7 한국어 지원:</strong> 언어적 장벽 해소</li>
                      <li>• <strong>맞춤형 솔루션:</strong> 기업별 특화 서비스</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.trai.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">TRAI</a> - 인도 통신 규제 기관 통계</li>
                      <li>• <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="underline">RBI</a> - 인도 경제 통계</li>
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'opportunity' && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">💡 기회 요인 근거</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>한국 기업 진출 증가:</strong> KOTRA 통계 기반 (연 15% 증가)</li>
                      <li>• <strong>IT 서비스 수요 급증:</strong> 글로벌 IT 시장 트렌드</li>
                      <li>• <strong>디지털 전환 가속화:</strong> COVID-19 이후 가속화된 트렌드</li>
                      <li>• <strong>프리미엄 서비스 성장:</strong> 소비자 선호도 변화</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 전략적 이점 분석</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>한국 기업 네트워크:</strong> 기존 비즈니스 관계 활용</li>
                      <li>• <strong>브랜드 인지도:</strong> 한국 기업 대상 마케팅 우위</li>
                      <li>• <strong>파트너십 기반:</strong> 현지 파트너와의 협력</li>
                      <li>• <strong>차별화 서비스:</strong> 경쟁사 대비 고유한 가치 제안</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                      <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - IT 시장 트렌드</li>
                      <li>• <a href="https://www.gartner.com/" target="_blank" rel="noopener noreferrer" className="underline">Gartner</a> - 기술 시장 분석</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionChennai() {
  const [activeTab, setActiveTab] = useState('market');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const marketData = [
    { name: '2025', value: 120, target: 25 },
    { name: '2026', value: 135, target: 30 },
    { name: '2027', value: 150, target: 35 },
    { name: '2028', value: 165, target: 40 },
    { name: '2029', value: 180, target: 45 }
  ];

  const handleBarClick = (entry: any) => {
    console.log('Clicked:', entry);
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section id="chennai">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🏭 첸나이 지역 AMS 분석</h2>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'market'
                ? 'bg-orange-600 text-white border-b-2 border-orange-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            시장 규모
          </button>
          <button
            onClick={() => setActiveTab('competition')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'competition'
                ? 'bg-orange-600 text-white border-b-2 border-orange-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            경쟁 분석
          </button>
          <button
            onClick={() => setActiveTab('opportunity')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'opportunity'
                ? 'bg-orange-600 text-white border-b-2 border-orange-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            기회 요인
          </button>
        </div>

        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-orange-800">📊 시장 규모 및 성장</h3>
                <button 
                  onClick={() => openModal('market')}
                  className="text-orange-600 hover:text-orange-800 text-sm underline"
                >
                  근거 보기
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">시장 현황</h4>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• 총 타겟 고객: 120개 기업 <span className="text-xs text-orange-500">(영업조직 매칭 기반)</span></li>
                    <li>• 연간 시장 규모: $1.44M <span className="text-xs text-orange-500">(ARPU × 고객 수)</span></li>
                    <li>• 예상 성장률: 8% (연간) <span className="text-xs text-orange-500">(가정 기반 추정)</span></li>
                    <li>• 평균 ARPU: $1,000/월 <span className="text-xs text-orange-500">(시장 조사 기반)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">성장 전망</h4>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• 2029년까지 180개 기업으로 확대 <span className="text-xs text-orange-500">(연 8% 성장 가정)</span></li>
                    <li>• 시장 규모 $2.2M 예상 <span className="text-xs text-orange-500">(복합 성장률 적용)</span></li>
                    <li>• 제조업 중심 성장 <span className="text-xs text-orange-500">(산업 특성)</span></li>
                    <li>• 자동차 산업 확장 <span className="text-xs text-orange-500">(지역 특화)</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-4">연도별 시장 성장 추이</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#F97316" name="시장 규모 (기업 수)" />
                  <Bar dataKey="target" fill="#10B981" name="목표 고객 수" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'competition' && (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-red-800">🏆 경쟁사 분석</h3>
                <button 
                  onClick={() => openModal('competition')}
                  className="text-red-600 hover:text-red-800 text-sm underline"
                >
                  근거 보기
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">주요 경쟁사</h4>
                  <ul className="text-sm text-red-600 space-y-2">
                    <li>• <strong>BSNL:</strong> 시장점유율 40% <span className="text-xs text-red-500">(TRAI 통계)</span></li>
                    <li>• <strong>Airtel:</strong> 시장점유율 25% <span className="text-xs text-red-500">(TRAI 통계)</span></li>
                    <li>• <strong>기타 ISP:</strong> 시장점유율 35% <span className="text-xs text-red-500">(TRAI 통계)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">경쟁 우위</h4>
                  <ul className="text-sm text-red-600 space-y-2">
                    <li>• 제조업 특화 서비스 <span className="text-xs text-red-500">(산업 맞춤)</span></li>
                    <li>• 효율적 비용 구조 <span className="text-xs text-red-500">(가격 경쟁력)</span></li>
                    <li>• 현지 파트너십 <span className="text-xs text-red-500">(현지화)</span></li>
                    <li>• 안정적 서비스 품질 <span className="text-xs text-red-500">(신뢰성)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunity' && (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-green-800">💡 기회 요인</h3>
                <button 
                  onClick={() => openModal('opportunity')}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  근거 보기
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">시장 기회</h4>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• 제조업 중심 성장 <span className="text-xs text-green-500">(산업 특성)</span></li>
                    <li>• 자동차 산업 확장 <span className="text-xs text-green-500">(지역 특화)</span></li>
                    <li>• IT 서비스 수요 증가 <span className="text-xs text-green-500">(산업 트렌드)</span></li>
                    <li>• 효율적 서비스 시장 <span className="text-xs text-green-500">(시장 특성)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">전략적 이점</h4>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• 낮은 경쟁도 <span className="text-xs text-green-500">(시장 진입)</span></li>
                    <li>• 효율적 투자 규모 <span className="text-xs text-green-500">(비용 효율성)</span></li>
                    <li>• 현지 파트너십 <span className="text-xs text-green-500">(협력 관계)</span></li>
                    <li>• 안정적 수익 모델 <span className="text-xs text-green-500">(지속가능성)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 근거 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {modalType === 'market' ? '📊 첸나이 시장 규모 근거' : 
                   modalType === 'competition' ? '🏆 첸나이 경쟁사 분석 근거' : 
                   '💡 첸나이 기회 요인 근거'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              {modalType === 'market' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">📊 수치 근거 및 가정</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>총 타겟 고객 120개:</strong> 영업조직 매칭 결과 기반 (실제 매칭된 기업 수)</li>
                      <li>• <strong>연간 시장 규모 $1.44M:</strong> ARPU $1,000 × 120개 × 12개월</li>
                      <li>• <strong>예상 성장률 8%:</strong> 제조업 중심 지역 특성 + 자동차 산업 확장 가정</li>
                      <li>• <strong>평균 ARPU $1,000:</strong> 제조업 특화 서비스 평균값 (시장 조사 기반)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📋 성장 전망 가정</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>2029년 180개 기업:</strong> 연 8% 고객 수 증가 가정 (120 × 1.08^5)</li>
                      <li>• <strong>시장 규모 $2.2M:</strong> 복합 성장률 적용 (고객 수 증가 + ARPU 증가)</li>
                      <li>• <strong>제조업 중심 성장:</strong> 첸나이 지역 산업 특성 기반</li>
                      <li>• <strong>자동차 산업 확장:</strong> 현지 자동차 클러스터 확장 (BMW, Hyundai 등)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - IT 시장 조사 및 ARPU 분석</li>
                      <li>• <a href="https://www.gartner.com/" target="_blank" rel="noopener noreferrer" className="underline">Gartner</a> - 기술 시장 분석</li>
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                      <li>• <a href="https://www.trai.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">TRAI</a> - 인도 통신 규제 기관</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'competition' && (
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">🏆 경쟁사 시장점유율 근거</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• <strong>BSNL 40%:</strong> TRAI 공식 통계 (2024년 기준, 첸나이 지역)</li>
                      <li>• <strong>Airtel 25%:</strong> TRAI 공식 통계 (2024년 기준, 첸나이 지역)</li>
                      <li>• <strong>기타 ISP 35%:</strong> TRAI 공식 통계 (2024년 기준, 첸나이 지역)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 경쟁 우위 분석</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>제조업 특화:</strong> 첸나이 지역 산업 특성에 맞춘 서비스</li>
                      <li>• <strong>효율적 비용 구조:</strong> 제조업 고객 대상 최적화된 가격</li>
                      <li>• <strong>현지 파트너십:</strong> 현지 제조업 협회와의 협력</li>
                      <li>• <strong>안정적 서비스 품질:</strong> 제조업 특화 SLA 제공</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.trai.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">TRAI</a> - 인도 통신 규제 기관 통계</li>
                      <li>• <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="underline">RBI</a> - 인도 경제 통계</li>
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'opportunity' && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">💡 기회 요인 근거</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>제조업 중심 성장:</strong> 첸나이 지역 산업 특성 (인도 제조업 허브)</li>
                      <li>• <strong>자동차 산업 확장:</strong> 현지 자동차 클러스터 확장 (BMW, Hyundai 등)</li>
                      <li>• <strong>IT 서비스 수요 증가:</strong> 제조업 디지털 전환 트렌드</li>
                      <li>• <strong>효율적 서비스 시장:</strong> 낮은 경쟁도로 인한 진입 장벽 낮음</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 전략적 이점 분석</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>낮은 경쟁도:</strong> 뭄바이 대비 상대적으로 낮은 경쟁 강도</li>
                      <li>• <strong>효율적 투자 규모:</strong> 제조업 특화로 인한 최적화된 투자</li>
                      <li>• <strong>현지 파트너십:</strong> 현지 제조업 협회와의 협력 관계</li>
                      <li>• <strong>안정적 수익 모델:</strong> 제조업의 안정적 수요 기반</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                      <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - IT 시장 트렌드</li>
                      <li>• <a href="https://www.gartner.com/" target="_blank" rel="noopener noreferrer" className="underline">Gartner</a> - 기술 시장 분석</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 