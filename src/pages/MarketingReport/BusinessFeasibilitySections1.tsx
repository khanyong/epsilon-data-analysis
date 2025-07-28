import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 핵심 성과 지표 (KPI) - 5년 내 목표 수치</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">210개</div>
            <div className="text-sm text-gray-600">타겟 고객</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">$1.2M</div>
            <div className="text-sm text-gray-600">연간 매출</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">15%</div>
            <div className="text-sm text-gray-600">시장점유율</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4.1년</div>
            <div className="text-sm text-gray-600">투자 회수</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionAms() {
  return (
    <section id="ams">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🌐 AMS (Addressable Market Size) 분석</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-purple-800">📊 인도시장 전체 규모</h3>
          <ul className="space-y-2 text-purple-700">
            <li>• <strong>전체 기업 수:</strong> 15,000개</li>
            <li>• <strong>네트워크 서비스 수요:</strong> 8,500개</li>
            <li>• <strong>연간 시장 규모:</strong> $850M</li>
            <li>• <strong>성장률:</strong> 연 12%</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">🎯 타겟 시장 세분화</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• <strong>1차 타겟:</strong> 인도 진출 한국기업 (2,100개)</li>
            <li>• <strong>2차 타겟:</strong> 글로벌 기업 (6,400개)</li>
            <li>• <strong>3차 타겟:</strong> 현지 대기업 (8,500개)</li>
            <li>• <strong>우선 지역:</strong> 뭄바이, 첸나이</li>
          </ul>
        </div>
      </div>

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
              <h3 className="text-lg font-bold mb-4 text-blue-800">📊 시장 규모 및 성장</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">시장 현황</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• 총 타겟 고객: 150개 기업</li>
                    <li>• 연간 시장 규모: $2.7M</li>
                    <li>• 예상 성장률: 12% (연간)</li>
                    <li>• 평균 ARPU: $1,500/월</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">성장 전망</h4>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• 2029년까지 210개 기업으로 확대</li>
                    <li>• 시장 규모 $3.8M 예상</li>
                    <li>• IT 서비스 수요 지속 증가</li>
                    <li>• 디지털 전환 가속화</li>
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
              <h3 className="text-lg font-bold mb-4 text-orange-800">🏆 경쟁사 분석</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">주요 경쟁사</h4>
                  <ul className="text-sm text-orange-600 space-y-2">
                    <li>• <strong>Reliance Jio:</strong> 시장점유율 35%</li>
                    <li>• <strong>Airtel:</strong> 시장점유율 28%</li>
                    <li>• <strong>BSNL:</strong> 시장점유율 15%</li>
                    <li>• <strong>기타 ISP:</strong> 시장점유율 22%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">경쟁 우위</h4>
                  <ul className="text-sm text-orange-600 space-y-2">
                    <li>• 한국 기업 특화 서비스</li>
                    <li>• 글로벌 네트워크 연동</li>
                    <li>• 24/7 한국어 지원</li>
                    <li>• 맞춤형 솔루션 제공</li>
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
                    <li>• 한국 기업 진출 증가 추세</li>
                    <li>• IT 서비스 수요 급증</li>
                    <li>• 디지털 전환 가속화</li>
                    <li>• 프리미엄 서비스 시장 성장</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">전략적 이점</h4>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• 한국 기업 네트워크 활용</li>
                    <li>• 브랜드 인지도 선점</li>
                    <li>• 파트너십 기반 확장</li>
                    <li>• 차별화된 서비스 제공</li>
                  </ul>
                </div>
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
              <h3 className="text-lg font-bold mb-4 text-orange-800">📊 시장 규모 및 성장</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">시장 현황</h4>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• 총 타겟 고객: 120개 기업</li>
                    <li>• 연간 시장 규모: $1.44M</li>
                    <li>• 예상 성장률: 8% (연간)</li>
                    <li>• 평균 ARPU: $1,000/월</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">성장 전망</h4>
                  <ul className="text-sm text-orange-600 space-y-1">
                    <li>• 2029년까지 180개 기업으로 확대</li>
                    <li>• 시장 규모 $2.2M 예상</li>
                    <li>• 제조업 중심 성장</li>
                    <li>• 자동차 산업 확장</li>
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
              <h3 className="text-lg font-bold mb-4 text-red-800">🏆 경쟁사 분석</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">주요 경쟁사</h4>
                  <ul className="text-sm text-red-600 space-y-2">
                    <li>• <strong>BSNL:</strong> 시장점유율 40%</li>
                    <li>• <strong>Airtel:</strong> 시장점유율 25%</li>
                    <li>• <strong>기타 ISP:</strong> 시장점유율 35%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">경쟁 우위</h4>
                  <ul className="text-sm text-red-600 space-y-2">
                    <li>• 제조업 특화 서비스</li>
                    <li>• 효율적 비용 구조</li>
                    <li>• 현지 파트너십</li>
                    <li>• 안정적 서비스 품질</li>
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
                    <li>• 제조업 중심 성장</li>
                    <li>• 자동차 산업 확장</li>
                    <li>• IT 서비스 수요 증가</li>
                    <li>• 효율적 서비스 시장</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">전략적 이점</h4>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• 낮은 경쟁도</li>
                    <li>• 효율적 투자 규모</li>
                    <li>• 현지 파트너십</li>
                    <li>• 안정적 수익 모델</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 