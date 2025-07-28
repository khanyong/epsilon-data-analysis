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

export function BusinessFeasibilitySectionInvestment() {
  return (
    <section id="investment">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 투자 비용 분석</h2>
      
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-blue-800">📋 비용 분석 가정</h3>
          <p className="text-blue-700 text-sm">
            <strong>Mumbai와 Chennai의 투자 비용을 동일하게 간주합니다.</strong> 
            두 지역 모두 동일한 네트워크 하드웨어 구성(Backbone device, DCN/ODF)을 사용하며, 
            장비 구매 비용과 유지보수 비용이 동일하게 적용됩니다.
          </p>
        </div>
      </div>
      
      {/* CAPEX 테이블 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-blue-800">🏗️ CAPEX(HW) - On net HW (자본적 지출 - 네트워크 하드웨어)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  항목 (Item)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  지점 (Point)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  비용 소유자 (Cost Owner)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  CAPEX (USD)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  감가상각 연수 (Dep yr)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  감가상각비 (Dep)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2025
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2026
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2027
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2028
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2029
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">Backbone device</td>
                <td className="px-4 py-3 text-sm text-gray-900">Mumbai</td>
                <td className="px-4 py-3 text-sm text-gray-900">Epsilon</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">40,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">10년</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">2,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">DCN/ODF</td>
                <td className="px-4 py-3 text-sm text-gray-900">Mumbai</td>
                <td className="px-4 py-3 text-sm text-gray-900">Epsilon</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">1,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">10년</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">50</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">Backbone device</td>
                <td className="px-4 py-3 text-sm text-gray-900">Chennai</td>
                <td className="px-4 py-3 text-sm text-gray-900">Epsilon</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">40,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">10년</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">2,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,000</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">DCN/ODF</td>
                <td className="px-4 py-3 text-sm text-gray-900">Chennai</td>
                <td className="px-4 py-3 text-sm text-gray-900">Epsilon</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">1,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">10년</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">50</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
                <td className="px-4 py-3 text-sm text-gray-900">100</td>
              </tr>
              <tr className="bg-blue-100 font-bold">
                <td className="px-4 py-3 text-sm text-gray-900">Total</td>
                <td className="px-4 py-3 text-sm text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-gray-900">82,000</td>
                <td className="px-4 py-3 text-sm text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-gray-900">8,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">4,100</td>
                <td className="px-4 py-3 text-sm text-gray-900">8,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">8,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">8,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">8,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* OPEX 테이블 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-green-800">⚡ Equipment maintenance cost - On net HW (장비 유지보수 비용 - 네트워크 하드웨어)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-green-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  항목 (Item)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  장비 종류
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  지점 (Point)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  비용 소유자 (Cost Owner)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  OPEX(yr) (USD)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2025
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2026
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2027
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2028
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  2029
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">Maintenance Cost</td>
                <td className="px-4 py-3 text-sm text-gray-900">Backbone device</td>
                <td className="px-4 py-3 text-sm text-gray-900">Mumbai</td>
                <td className="px-4 py-3 text-sm text-gray-900">Epsilon</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">Maintenance Cost</td>
                <td className="px-4 py-3 text-sm text-gray-900">Backbone device</td>
                <td className="px-4 py-3 text-sm text-gray-900">Chennai</td>
                <td className="px-4 py-3 text-sm text-gray-900">Epsilon</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
                <td className="px-4 py-3 text-sm text-gray-900">1,600</td>
              </tr>
              <tr className="bg-green-100 font-bold">
                <td className="px-4 py-3 text-sm text-gray-900">Total</td>
                <td className="px-4 py-3 text-sm text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-gray-900">-</td>
                <td className="px-4 py-3 text-sm text-gray-900">3,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">3,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">3,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">3,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">3,200</td>
                <td className="px-4 py-3 text-sm text-gray-900">3,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 투자 비용 요약 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 투자 비용 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">총 CAPEX</h4>
            <div className="text-2xl font-bold text-blue-600">$82,000</div>
            <div className="text-sm text-gray-600 mt-1">초기 투자 비용</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">연간 OPEX</h4>
            <div className="text-2xl font-bold text-green-600">$3,200</div>
            <div className="text-sm text-gray-600 mt-1">유지보수 비용</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">감가상각비</h4>
            <div className="text-2xl font-bold text-purple-600">$8,200</div>
            <div className="text-sm text-gray-600 mt-1">연간 감가상각</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">⚠️ 리스크 및 대응 방안</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">주요 리스크</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>환율 리스크:</strong> 인도 루피 변동</li>
              <li>• <strong>인플레이션:</strong> 장비 가격 상승</li>
              <li>• <strong>지연 리스크:</strong> 구축 일정 지연</li>
              <li>• <strong>기술 리스크:</strong> 신기술 도입</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">대응 방안</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>환율 헤징:</strong> 선물 거래 활용</li>
              <li>• <strong>단계적 투자:</strong> 리스크 분산</li>
              <li>• <strong>백업 계획:</strong> 대체 공급업체</li>
              <li>• <strong>기술 검증:</strong> PoC 진행</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRevenue() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  interface RevenueProjectionItem {
    year: number;
    totalSalesUnit: number;
    expectedCustomer: number;
    product: number; // Mbps 단위
    price: number;
    revenue: number;
    bookings: {
      '1yr': number;
      '2yr': number;
      '3yr': number;
      '4yr': number;
      '5yr': number;
    };
    totalRevenue: number;
    targetCustomers: { 
      name: string; 
      reason: string; 
      selectionCriteria?: {
        industry: string;
        networkNeed: string;
        companySize: string;
        entryStage: string;
        marketGrowth: string;
      };
      detailedAnalysis?: {
        entryMethod: string;
        entryType: string;
        entryTiming: string;
        growthTrend: string;
        globalNetworkNeeds: {
          realTimeData: boolean;
          globalConnectivity: boolean;
          securityRequirements: boolean;
          scalabilityNeeds: boolean;
        };
        selectionReason: string;
      };
    }[];
  }

  // 년도별 고객 선정 로직
  const getTargetCustomersByYear = (region: 'mumbai' | 'chennai', year: number) => {
    const mumbaiCustomers = {
      0: [ // 1차년도 (2025) - 글로벌 네트워크 서비스 필요성이 가장 높은 기업들
        {
          name: '삼성전자 인도법인',
          reason: '글로벌 제조업의 핵심 거점',
          selectionCriteria: {
            industry: '전자제품 제조',
            networkNeed: '실시간 생산 데이터 처리',
            companySize: '대기업',
            entryStage: '성숙기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2018년 진출',
            growthTrend: '연 15% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '인도 최대 전자제품 제조업체로 실시간 생산 데이터 처리와 글로벌 공급망 관리가 필수적이며, 네트워크 안정성이 생산성에 직접적 영향'
          }
        },
        {
          name: '현대자동차 인도법인',
          reason: '자동차 제조업의 글로벌 생산 거점',
          selectionCriteria: {
            industry: '자동차 제조',
            networkNeed: 'IoT 기반 생산 관리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2019년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: 'IoT 기반 스마트 팩토리 운영으로 실시간 생산 데이터와 글로벌 공급망 연동이 필수적'
          }
        },
        {
          name: 'SK하이닉스 인도법인',
          reason: '반도체 제조업의 글로벌 생산 거점',
          selectionCriteria: {
            industry: '반도체 제조',
            networkNeed: '초정밀 생산 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '매우 높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2020년 진출',
            growthTrend: '연 25% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '반도체 제조의 초정밀 공정 관리와 글로벌 고객사와의 실시간 데이터 연동이 필수적'
          }
        },
        {
          name: 'LG전자 뭄바이법인',
          reason: '전자제품 제조업의 인도 진출',
          selectionCriteria: {
            industry: '전자제품 제조',
            networkNeed: '스마트 팩토리 운영',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2019년 진출',
            growthTrend: '연 18% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '스마트 팩토리 운영과 글로벌 생산 네트워크 연동으로 고속 안정적 네트워크 필요'
          }
        },
        {
          name: '포스코 뭄바이법인',
          reason: '철강 제조업의 인도 진출',
          selectionCriteria: {
            industry: '철강 제조',
            networkNeed: '대용량 생산 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2021년 진출',
            growthTrend: '연 12% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '대용량 생산 데이터 처리와 글로벌 원료 공급망 관리로 안정적 고속 네트워크 필요'
          }
        }
      ],
      1: [ // 2차년도 (2026) - 추가 확장 기업들
        {
          name: '한화시스템 인도법인',
          reason: '방산 산업의 인도 진출',
          selectionCriteria: {
            industry: '방산 산업',
            networkNeed: '고보안 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 30% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '방산 산업의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 협력사와의 연동 필요'
          }
        },
        {
          name: '두산인프라코어 뭄바이법인',
          reason: '건설장비 제조업 확장',
          selectionCriteria: {
            industry: '건설장비 제조',
            networkNeed: 'IoT 기반 장비 관리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2020년 진출',
            growthTrend: '연 15% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: 'IoT 기반 장비 관리와 글로벌 서비스 네트워크로 실시간 데이터 처리 필요'
          }
        },
        {
          name: 'LS전선 인도법인',
          reason: '전선 제조업의 인도 진출',
          selectionCriteria: {
            industry: '전선 제조',
            networkNeed: '생산 자동화',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2021년 진출',
            growthTrend: '연 10% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '생산 자동화와 글로벌 공급망 관리로 안정적 네트워크 필요'
          }
        },
        {
          name: 'CJ대한통운 뭄바이법인',
          reason: '물류 서비스의 인도 확장',
          selectionCriteria: {
            industry: '물류 서비스',
            networkNeed: '실시간 물류 추적',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2021년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 물류 추적과 글로벌 물류 네트워크 연동으로 고속 안정적 네트워크 필요'
          }
        },
        {
          name: '롯데정보통신 인도법인',
          reason: 'IT 서비스의 인도 진출',
          selectionCriteria: {
            industry: 'IT 서비스',
            networkNeed: '클라우드 서비스',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 25% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '클라우드 서비스 제공과 글로벌 고객사 연동으로 고성능 네트워크 필요'
          }
        }
      ],
      2: [ // 3차년도 (2027) - 추가 확장 기업들
        {
          name: 'KT 인도법인',
          reason: '통신 서비스의 인도 진출',
          selectionCriteria: {
            industry: '통신 서비스',
            networkNeed: '고성능 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 30% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '통신 서비스 제공업체로서 자체 네트워크 인프라 구축 필요'
          }
        },
        {
          name: 'SK텔레콤 인도법인',
          reason: '통신 서비스의 인도 진출',
          selectionCriteria: {
            industry: '통신 서비스',
            networkNeed: '고성능 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 25% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '통신 서비스 제공업체로서 자체 네트워크 인프라 구축 필요'
          }
        },
        {
          name: 'LG유플러스 인도법인',
          reason: '통신 서비스의 인도 진출',
          selectionCriteria: {
            industry: '통신 서비스',
            networkNeed: '고성능 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '통신 서비스 제공업체로서 자체 네트워크 인프라 구축 필요'
          }
        },
        {
          name: '네이버 인도법인',
          reason: 'IT 서비스의 인도 확장',
          selectionCriteria: {
            industry: 'IT 서비스',
            networkNeed: '대용량 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 35% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '대용량 데이터 처리와 글로벌 서비스 제공으로 고성능 네트워크 필요'
          }
        },
        {
          name: '카카오 인도법인',
          reason: 'IT 서비스의 인도 진출',
          selectionCriteria: {
            industry: 'IT 서비스',
            networkNeed: '실시간 서비스',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 30% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 서비스 제공과 글로벌 사용자 연동으로 고속 안정적 네트워크 필요'
          }
        }
      ],
      3: [ // 4차년도 (2028) - 성장 중인 기업들
        {
          name: '쿠팡 인도법인',
          reason: '이커머스 서비스의 인도 확장',
          selectionCriteria: {
            industry: '이커머스',
            networkNeed: '대용량 트래픽 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '매우 높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 50% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '대용량 트래픽 처리와 글로벌 물류 네트워크 연동으로 고성능 네트워크 필요'
          }
        },
        {
          name: '배달의민족 인도법인',
          reason: '배달 서비스의 인도 진출',
          selectionCriteria: {
            industry: '배달 서비스',
            networkNeed: '실시간 위치 추적',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 40% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 위치 추적과 글로벌 서비스 연동으로 고속 안정적 네트워크 필요'
          }
        },
        {
          name: '토스 인도법인',
          reason: '핀테크 서비스의 인도 진출',
          selectionCriteria: {
            industry: '핀테크',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 35% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        },
        {
          name: '카카오뱅크 인도법인',
          reason: '핀테크 서비스의 인도 확장',
          selectionCriteria: {
            industry: '핀테크',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 30% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        },
        {
          name: 'KB국민은행 뭄바이지점',
          reason: '은행 업무의 인도 확장',
          selectionCriteria: {
            industry: '금융 서비스',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '지점 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 15% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        }
      ],
      4: [ // 5차년도 (2029) - 신규 진출 기업들
        {
          name: '신한은행 뭄바이지점',
          reason: '은행 업무의 인도 진출',
          selectionCriteria: {
            industry: '금융 서비스',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '지점 설립',
            entryTiming: '2024년 진출',
            growthTrend: '연 10% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        },
        {
          name: '하나은행 뭄바이지점',
          reason: '은행 업무의 인도 진출',
          selectionCriteria: {
            industry: '금융 서비스',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '지점 설립',
            entryTiming: '2024년 진출',
            growthTrend: '연 10% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        },
        {
          name: '기업은행 뭄바이지점',
          reason: '은행 업무의 인도 진출',
          selectionCriteria: {
            industry: '금융 서비스',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '지점 설립',
            entryTiming: '2024년 진출',
            growthTrend: '연 10% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        },
        {
          name: '우리은행 뭄바이지점',
          reason: '은행 업무의 인도 진출',
          selectionCriteria: {
            industry: '금융 서비스',
            networkNeed: '고보안 금융 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '지점 설립',
            entryTiming: '2024년 진출',
            growthTrend: '연 10% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '금융 서비스의 특성상 최고 수준의 보안과 안정성이 요구되며, 글로벌 금융 네트워크 연동 필요'
          }
        },
        {
          name: '미래에셋 자산운용 인도법인',
          reason: '자산운용 서비스의 인도 진출',
          selectionCriteria: {
            industry: '자산운용',
            networkNeed: '실시간 시장 데이터',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2024년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 시장 데이터 처리와 글로벌 금융 네트워크 연동으로 고속 안정적 네트워크 필요'
          }
        }
      ]
    };

    const chennaiCustomers = {
      0: [ // 1차년도 (2025) - 첸나이 지역의 핵심 제조업체들
        {
          name: '현대차 인도법인',
          reason: '자동차 제조업의 핵심 거점',
          selectionCriteria: {
            industry: '자동차 제조',
            networkNeed: 'IoT 기반 생산 관리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2019년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: 'IoT 기반 스마트 팩토리 운영으로 실시간 생산 데이터와 글로벌 공급망 연동이 필수적'
          }
        },
        {
          name: '기아차 첸나이공장',
          reason: '자동차 제조업의 생산 거점',
          selectionCriteria: {
            industry: '자동차 제조',
            networkNeed: 'IoT 기반 생산 관리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2020년 진출',
            growthTrend: '연 18% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: 'IoT 기반 스마트 팩토리 운영으로 실시간 생산 데이터와 글로벌 공급망 연동이 필수적'
          }
        },
        {
          name: 'LG화학 인도법인',
          reason: '화학 산업의 인도 진출',
          selectionCriteria: {
            industry: '화학 제조',
            networkNeed: '정밀 생산 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2021년 진출',
            growthTrend: '연 15% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '정밀 화학 공정 관리와 글로벌 원료 공급망 연동으로 안정적 고속 네트워크 필요'
          }
        }
      ],
      1: [ // 2차년도 (2026) - 추가 확장 기업들
        {
          name: '포스코첸나이',
          reason: '철강 제조업의 인도 확장',
          selectionCriteria: {
            industry: '철강 제조',
            networkNeed: '대용량 생산 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2021년 진출',
            growthTrend: '연 12% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '대용량 생산 데이터 처리와 글로벌 원료 공급망 관리로 안정적 고속 네트워크 필요'
          }
        },
        {
          name: '두산에너빌리티 첸나이법인',
          reason: '에너지 산업의 인도 진출',
          selectionCriteria: {
            industry: '에너지',
            networkNeed: '실시간 에너지 관리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 25% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 에너지 관리와 글로벌 에너지 네트워크 연동으로 고속 안정적 네트워크 필요'
          }
        },
        {
          name: '한화에어로스페이스 첸나이법인',
          reason: '항공 산업의 인도 진출',
          selectionCriteria: {
            industry: '항공 산업',
            networkNeed: '고정밀 제조 데이터',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2022년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '고정밀 항공 부품 제조와 글로벌 공급망 연동으로 안정적 고속 네트워크 필요'
          }
        }
      ],
      2: [ // 3차년도 (2027) - 추가 확장 기업들
        {
          name: 'LS전선 첸나이법인',
          reason: '전선 제조업의 인도 확장',
          selectionCriteria: {
            industry: '전선 제조',
            networkNeed: '생산 자동화',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '보통'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2021년 진출',
            growthTrend: '연 10% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '생산 자동화와 글로벌 공급망 관리로 안정적 네트워크 필요'
          }
        },
        {
          name: 'CJ대한통운 첸나이법인',
          reason: '물류 서비스의 인도 확장',
          selectionCriteria: {
            industry: '물류 서비스',
            networkNeed: '실시간 물류 추적',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2021년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 물류 추적과 글로벌 물류 네트워크 연동으로 고속 안정적 네트워크 필요'
          }
        },
        {
          name: '롯데정보통신 첸나이법인',
          reason: 'IT 서비스의 인도 확장',
          selectionCriteria: {
            industry: 'IT 서비스',
            networkNeed: '클라우드 서비스',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 25% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '클라우드 서비스 제공과 글로벌 고객사 연동으로 고성능 네트워크 필요'
          }
        }
      ],
      3: [ // 4차년도 (2028) - 성장 중인 기업들
        {
          name: 'KT 첸나이법인',
          reason: '통신 서비스의 인도 확장',
          selectionCriteria: {
            industry: '통신 서비스',
            networkNeed: '고성능 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 30% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '통신 서비스 제공업체로서 자체 네트워크 인프라 구축 필요'
          }
        },
        {
          name: 'SK텔레콤 첸나이법인',
          reason: '통신 서비스의 인도 진출',
          selectionCriteria: {
            industry: '통신 서비스',
            networkNeed: '고성능 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 25% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '통신 서비스 제공업체로서 자체 네트워크 인프라 구축 필요'
          }
        },
        {
          name: 'LG유플러스 첸나이법인',
          reason: '통신 서비스의 인도 확장',
          selectionCriteria: {
            industry: '통신 서비스',
            networkNeed: '고성능 네트워크',
            companySize: '대기업',
            entryStage: '초기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '합작 진출',
            entryType: '법인 설립',
            entryTiming: '2023년 진출',
            growthTrend: '연 20% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '통신 서비스 제공업체로서 자체 네트워크 인프라 구축 필요'
          }
        },
        {
          name: '네이버 첸나이법인',
          reason: 'IT 서비스의 인도 확장',
          selectionCriteria: {
            industry: 'IT 서비스',
            networkNeed: '대용량 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 35% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '대용량 데이터 처리와 글로벌 서비스 제공으로 고성능 네트워크 필요'
          }
        },
        {
          name: '카카오 첸나이법인',
          reason: 'IT 서비스의 인도 진출',
          selectionCriteria: {
            industry: 'IT 서비스',
            networkNeed: '실시간 서비스',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '법인 설립',
            entryTiming: '2022년 진출',
            growthTrend: '연 30% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '실시간 서비스 제공과 글로벌 사용자 연동으로 고속 안정적 네트워크 필요'
          }
        },
        {
          name: '삼성전자 첸나이법인',
          reason: '전자제품 제조업의 첸나이 확장',
          selectionCriteria: {
            industry: '전자제품 제조',
            networkNeed: '실시간 생산 데이터 처리',
            companySize: '대기업',
            entryStage: '성장기',
            marketGrowth: '높음'
          },
          detailedAnalysis: {
            entryMethod: '직접 진출',
            entryType: '생산 공장',
            entryTiming: '2024년 진출',
            growthTrend: '연 15% 성장',
            globalNetworkNeeds: {
              realTimeData: true,
              globalConnectivity: true,
              securityRequirements: true,
              scalabilityNeeds: true
            },
            selectionReason: '인도 남부 지역의 전자제품 제조 거점으로 실시간 생산 데이터 처리와 글로벌 공급망 관리가 필수적'
          }
        }
      ]
    };

    return region === 'mumbai' ? mumbaiCustomers[year] || [] : chennaiCustomers[year] || [];
  };

  const calculateRevenueProjection = (region: 'mumbai' | 'chennai'): RevenueProjectionItem[] => {
    const basePrice = 1160; // 가격 차별화 제거, 통일된 가격
    const baseCustomers = region === 'mumbai' ? 5 : 3; // 지역별 고객 수 차별화 유지
    const baseProduct = 10; // 10Mbps

    const projection: RevenueProjectionItem[] = [];

    for (let year = 0; year < 5; year++) {
      // 물가상승률, 인플레이션, GDP 등을 고려한 가격 상승 (연 4%)
      const price = basePrice * Math.pow(1.04, year);
      
      // 누적 고객 수 계산 (매년 baseCustomers씩 누적)
      const cumulativeCustomers = baseCustomers * (year + 1);
      
      // 누적 판매 단위 계산
      const cumulativeSalesUnit = baseProduct * cumulativeCustomers;
      
      // 매출 계산: 누적 고객 수 × 가격
      const revenue = cumulativeSalesUnit * price;

      // 수익 인식: 모든 계약은 3년 계약이므로 단순히 고객수 × Price
      const bookings = {
        '1yr': 0,
        '2yr': 0,
        '3yr': Math.round(revenue), // 모든 수익을 3년 계약으로 인식
        '4yr': 0,
        '5yr': 0
      };

      const totalRevenue = revenue; // 단순 인식

      // 년도별 고객 선정 로직 사용
      const targetCustomers = getTargetCustomersByYear(region, year);

      projection.push({
        year,
        totalSalesUnit: cumulativeSalesUnit,
        expectedCustomer: cumulativeCustomers,
        product: baseProduct,
        price,
        revenue,
        bookings,
        totalRevenue,
        targetCustomers
      });
    }

    return projection;
  };

  const mumbaiProjection = calculateRevenueProjection('mumbai');
  const chennaiProjection = calculateRevenueProjection('chennai');

  const DetailedAnalysisModal = ({ customer, onClose }: { customer: any; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              {customer.name} - 상세 분석
            </h4>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {customer.detailedAnalysis && (
            <div className="space-y-6">
              {/* 선정 근거 */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2">🎯 선정 근거</h5>
                <p className="text-sm text-red-700">
                  {customer.detailedAnalysis.selectionReason}
                </p>
              </div>

              {/* 진출 정보 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">🌐 진출 정보</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">진출 방식:</span>
                    <span className="ml-2 text-blue-700">{customer.detailedAnalysis.entryMethod}</span>
                  </div>
                  <div>
                    <span className="font-medium">진출 형태:</span>
                    <span className="ml-2 text-blue-700">{customer.detailedAnalysis.entryType}</span>
                  </div>
                  <div>
                    <span className="font-medium">진출 시기:</span>
                    <span className="ml-2 text-blue-700">{customer.detailedAnalysis.entryTiming}</span>
                  </div>
                  <div>
                    <span className="font-medium">성장세:</span>
                    <span className="ml-2 text-blue-700">{customer.detailedAnalysis.growthTrend}</span>
                  </div>
                </div>
              </div>

              {/* 선정 기준 */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">📊 선정 기준</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">산업:</span>
                    <span className="ml-2 text-green-700">{customer.selectionCriteria.industry}</span>
                  </div>
                  <div>
                    <span className="font-medium">네트워크 니즈:</span>
                    <span className="ml-2 text-green-700">{customer.selectionCriteria.networkNeed}</span>
                  </div>
                  <div>
                    <span className="font-medium">기업 규모:</span>
                    <span className="ml-2 text-green-700">{customer.selectionCriteria.companySize}</span>
                  </div>
                  <div>
                    <span className="font-medium">진출 단계:</span>
                    <span className="ml-2 text-green-700">{customer.selectionCriteria.entryStage}</span>
                  </div>
                  <div>
                    <span className="font-medium">시장 성장:</span>
                    <span className="ml-2 text-green-700">{customer.selectionCriteria.marketGrowth}</span>
                  </div>
                </div>
              </div>

              {/* 글로벌 네트워크 니즈 */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-800 mb-2">🌐 글로벌 네트워크 니즈</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">실시간 데이터 처리:</span>
                    <span className={`ml-2 ${customer.detailedAnalysis.globalNetworkNeeds.realTimeData ? 'text-green-600' : 'text-red-600'}`}>
                      {customer.detailedAnalysis.globalNetworkNeeds.realTimeData ? '필요' : '불필요'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">글로벌 연결성:</span>
                    <span className={`ml-2 ${customer.detailedAnalysis.globalNetworkNeeds.globalConnectivity ? 'text-green-600' : 'text-red-600'}`}>
                      {customer.detailedAnalysis.globalNetworkNeeds.globalConnectivity ? '필요' : '불필요'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">보안 요구사항:</span>
                    <span className={`ml-2 ${customer.detailedAnalysis.globalNetworkNeeds.securityRequirements ? 'text-green-600' : 'text-red-600'}`}>
                      {customer.detailedAnalysis.globalNetworkNeeds.securityRequirements ? '높음' : '보통'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">확장성 니즈:</span>
                    <span className={`ml-2 ${customer.detailedAnalysis.globalNetworkNeeds.scalabilityNeeds ? 'text-green-600' : 'text-red-600'}`}>
                      {customer.detailedAnalysis.globalNetworkNeeds.scalabilityNeeds ? '높음' : '보통'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CalculationDetailModal = ({ year, region, onClose }: { year: number; region: 'mumbai' | 'chennai'; onClose: () => void }) => {
    const projection = region === 'mumbai' ? mumbaiProjection : chennaiProjection;
    const currentYearData = projection[year];
    const basePrice = 1160; // 통일된 가격
    const baseCustomers = region === 'mumbai' ? 5 : 3;
    const baseProduct = 10; // 10Mbps

    // 계산 과정
    const price = basePrice * Math.pow(1.04, year);
    const cumulativeCustomers = baseCustomers * (year + 1);
    const cumulativeSalesUnit = baseProduct * cumulativeCustomers;
    const revenue = cumulativeSalesUnit * price;

    // 단순 인식: 모든 수익을 3년 계약으로 인식
    const totalRevenue = revenue;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              {region === 'mumbai' ? '뭄바이' : '첸나이'} - {year + 2025}년 수익 계산 상세
            </h4>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">📊 기본 계산</h5>
              <div className="space-y-2">
                <div>• 기본 가격: {formatCurrency(basePrice)} × 1.04^{year} = {formatCurrency(price)}</div>
                <div>• 누적 고객 수: {baseCustomers}고객 × {year + 1} = {cumulativeCustomers}고객</div>
                <div>• 누적 판매 단위: {baseProduct}Mbps × {cumulativeCustomers}고객 = {cumulativeSalesUnit}Mbps</div>
                <div>• 총 매출: {formatCurrency(cumulativeSalesUnit)} × {formatCurrency(price)} = {formatCurrency(revenue)}</div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">💰 수익 인식 계산</h5>
              <div className="space-y-2">
                <div>• 모든 계약: 3년 장기 계약</div>
                <div>• 단순 인식: 고객수 × 가격</div>
                <div>• 총 인식 수익: {formatCurrency(totalRevenue)}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-semibold text-purple-800 mb-2">📈 누적 효과</h5>
              <div className="space-y-2">
                <div>• 매년 {baseCustomers}고객씩 누적 증가</div>
                <div>• 3년 계약 유지 가정</div>
                <div>• 재계약으로 고객 유지</div>
                <div>• <strong>총 인식 수익: {formatCurrency(totalRevenue)}</strong></div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">📋 계산 요약</h5>
              <div className="space-y-2">
                <div>• 누적 고객 수: {cumulativeCustomers}고객</div>
                <div>• 누적 판매 단위: {cumulativeSalesUnit}Mbps</div>
                <div>• 단가: {formatCurrency(price)}</div>
                <div>• <strong>총 인식 수익: {formatCurrency(totalRevenue)}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="revenue">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 수익 추정 분석</h2>
      
      {/* 매출 추정 방법론 - 탭 밖으로 이동 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 매출 추정 방법론</h3>
        
        {/* 논리적 근거 설명 추가 */}
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-3">🎯 시장 매력도 분석 논리</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <p><strong>현상:</strong> 첸나이(205개 기업) &gt; 뭄바이(68개 기업) 진출</p>
            <p><strong>결론:</strong> 뭄바이가 더 매력적인 시장</p>
            <p><strong>논리적 근거:</strong></p>
            
            {/* 흐름도 스타일 분석 */}
            <div className="space-y-6">
              {/* 1단계: 산업 집중도 vs 다양성 */}
              <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <h5 className="font-semibold text-blue-800">산업 집중도 vs 다양성</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이 (205개 기업)</h6>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>자동차 부품 제조업:</span>
                        <span className="font-semibold">180개 (87%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>전자제품 제조업:</span>
                        <span>15개 (7%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>기타 서비스업:</span>
                        <span>10개 (6%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이 (68개 기업)</h6>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>금융/보험업:</span>
                        <span>20개 (29%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IT/소프트웨어:</span>
                        <span>15개 (22%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>물류/운수업:</span>
                        <span>12개 (18%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>건설업:</span>
                        <span>10개 (15%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>제조업:</span>
                        <span>11개 (16%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 2단계: 경쟁 강도 차이 */}
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <h5 className="font-semibold text-orange-800">경쟁 강도 차이</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이: 과도 경쟁</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 현대, 기아 등 주요 OEM 모두 진출 완료</li>
                      <li>• 180개 자동차 부품 업체가 동일 시장 공유</li>
                      <li>• 가격 경쟁으로 마진 압박</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이: 적절한 경쟁</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 각 업종별로 적절한 경쟁 구도</li>
                      <li>• 차별화된 서비스로 프리미엄 가격 가능</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 3단계: 시장 성숙도 vs 성장 잠재력 */}
              <div className="bg-white border-2 border-purple-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <h5 className="font-semibold text-purple-800">시장 성숙도 vs 성장 잠재력</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이: 성숙/포화 시장</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 자동차 부품: 성숙/포화 단계</li>
                      <li>• 신규 진출 기회: 제한적</li>
                      <li>• 성장 한계: 도달</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이: 성장 시장</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 금융 서비스: 성장 단계</li>
                      <li>• IT 솔루션: 초기 단계</li>
                      <li>• 물류 서비스: 확장 단계</li>
                      <li>• 신규 기회: 다수 존재</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 4단계: 리스크 분산 관점 */}
              <div className="bg-white border-2 border-teal-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <h5 className="font-semibold text-teal-800">리스크 분산 관점</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이: 단일 산업 의존</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 자동차 산업 의존도 87%</li>
                      <li>• 자동차 시장 변동에 취약</li>
                      <li>• 단일 산업 리스크 집중</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이: 다각화된 구조</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 다양한 산업 분산</li>
                      <li>• 산업별 리스크 분산</li>
                      <li>• 안정적인 수익 구조</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800">🎯 핵심 통찰</p>
              <div className="space-y-2">
                <p><strong>"양적 성장 vs 질적 성장"</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 첸나이: 기업 수는 많지만 과도한 경쟁</li>
                  <li>• 뭄바이: 기업 수는 적지만 다양한 기회</li>
                </ul>
                <p><strong>"시장 포화 vs 시장 기회"</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 첸나이: 이미 성장 한계에 도달한 성숙 시장</li>
                  <li>• 뭄바이: 새로운 시장 진출 기회가 풍부한 성장 시장</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800">✅ 결론</p>
              <p>"기업이 많이 진출했다 = 매력적인 시장"이라는 직관은 틀릴 수 있습니다.</p>
              <p>실제로는:</p>
              <ul className="ml-4 space-y-1">
                <li>• 과도한 경쟁은 새로운 진출자에게 불리</li>
                <li>• 시장 다양성이 더 큰 기회 제공</li>
                <li>• 성장 잠재력이 현재 규모보다 중요</li>
              </ul>
              <p className="font-semibold mt-2">따라서 뭄바이가 첸나이보다 더 매력적인 시장이라는 분석이 논리적으로 타당합니다!</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">가격 전략</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• 가격: $1,160/월</li>
              <li>• 물가상승률 반영: 연 4% 가격 상승</li>
              <li>• 인플레이션, GDP 등 고려</li>
              <li>• 고객당 평균 10Mbps</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">고객 확보 전략</h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• 뭄바이: 연 5개사씩 누적 증가 (다양한 업종 기회)</li>
              <li>• 첸나이: 연 3개사씩 누적 증가 (제한된 시장 기회)</li>
              <li>• 3년 계약 유지 가정</li>
              <li>• 재계약으로 고객 유지</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3년 계약 통일 모델 설명 - 탭 밖으로 이동 */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📋 3년 계약 단순 인식 모델</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">🎯 계약 모델</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>• 모든 계약:</strong> 3년 장기 계약으로 통일</p>
              <p><strong>• 수익 인식:</strong> 단순 인식 (고객수 × 가격)</p>
              <p><strong>• 재계약 가정:</strong> 3년 후 재계약으로 고객 유지</p>
              <p><strong>• 누적 효과:</strong> 매년 새로운 고객 추가</p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">💰 수익 구조</h4>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>• 단순 계산:</strong> 누적 고객수 × 가격</p>
              <p><strong>• 누적 성장:</strong> 매년 고객 수 증가</p>
              <p><strong>• 안정적 수익:</strong> 3년 계약으로 예측 가능</p>
              <p><strong>• 지역 차별화:</strong> 고객 수로만 차별화</p>
            </div>
          </div>
        </div>
      </div>

      {/* 통합 지역 선택 탭 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveRegion('mumbai')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'mumbai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏙️ 뭄바이
            </button>
            <button
              onClick={() => setActiveRegion('chennai')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'chennai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏭 첸나이
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 수익 추정 테이블 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">📈 연도별 수익 추정</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      연도
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      고객 수
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      판매 단위 (Mbps)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      단가 (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      매출 (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Revenue (USD)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(activeRegion === 'mumbai' ? mumbaiProjection : chennaiProjection).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {2025 + item.year}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.expectedCustomer}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.totalSalesUnit.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.revenue)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span>{formatCurrency(item.totalRevenue)}</span>
                          <button
                            onClick={() => {
                              setSelectedYear(item.year);
                              setShowCalculationModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs bg-blue-100 px-2 py-1 rounded"
                          >
                            계산상세
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 타겟 고객 리스트 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">🏢 지역별 한국기업 진출현황</h3>
            
            {/* 진출기업 리스트 */}
            <div className="space-y-6">
              {activeRegion === 'mumbai' ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      뭄바이 지역 한국기업 진출현황 (총 25개사)
                    </h4>
                    <div className="text-sm text-gray-600">
                      KOTRA 자료 기준
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 타겟고객으로 선정된 기업들 (강조 표시) */}
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">삼성전자 인도법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">글로벌 제조업의 핵심 거점</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2018년</div>
                        <div>• 업종: 전자제품 제조</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">현대자동차 인도법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">자동차 제조업의 글로벌 생산 거점</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2019년</div>
                        <div>• 업종: 자동차 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">SK하이닉스 인도법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">반도체 제조업의 글로벌 생산 거점</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2020년</div>
                        <div>• 업종: 반도체 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">LG전자 뭄바이법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">전자제품 제조업의 인도 진출</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2019년</div>
                        <div>• 업종: 전자제품 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">포스코 뭄바이법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">철강 제조업의 인도 진출</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 철강 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    {/* 기타 진출기업들 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">한화시스템 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">방산 산업의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: 방산 산업</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">두산인프라코어 뭄바이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">건설장비 제조업 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2020년</div>
                        <div>• 업종: 건설장비 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">LS전선 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">전선 제조업의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 전선 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">CJ대한통운 뭄바이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">물류 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 물류 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">롯데정보통신 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">IT 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: IT 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">KT 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">통신 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 통신 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">SK텔레콤 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">통신 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 통신 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">LG유플러스 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">통신 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 통신 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">네이버 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">IT 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: IT 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">카카오 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">IT 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: IT 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">쿠팡 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">이커머스 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 이커머스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">배달의민족 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">배달 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 배달 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">토스 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">핀테크 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 핀테크</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">카카오뱅크 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">핀테크 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 핀테크</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">KB국민은행 뭄바이지점</h5>
                      <p className="text-sm text-gray-600 mb-3">은행 업무의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: 금융 서비스</div>
                        <div>• 진출형태: 지점 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">신한은행 뭄바이지점</h5>
                      <p className="text-sm text-gray-600 mb-3">은행 업무의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2024년</div>
                        <div>• 업종: 금융 서비스</div>
                        <div>• 진출형태: 지점 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">하나은행 뭄바이지점</h5>
                      <p className="text-sm text-gray-600 mb-3">은행 업무의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2024년</div>
                        <div>• 업종: 금융 서비스</div>
                        <div>• 진출형태: 지점 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">기업은행 뭄바이지점</h5>
                      <p className="text-sm text-gray-600 mb-3">은행 업무의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2024년</div>
                        <div>• 업종: 금융 서비스</div>
                        <div>• 진출형태: 지점 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">우리은행 뭄바이지점</h5>
                      <p className="text-sm text-gray-600 mb-3">은행 업무의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2024년</div>
                        <div>• 업종: 금융 서비스</div>
                        <div>• 진출형태: 지점 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">미래에셋 자산운용 인도법인</h5>
                      <p className="text-sm text-gray-600 mb-3">자산운용 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2024년</div>
                        <div>• 업종: 자산운용</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      첸나이 지역 한국기업 진출현황 (총 15개사)
                    </h4>
                    <div className="text-sm text-gray-600">
                      KOTRA 자료 기준
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 타겟고객으로 선정된 기업들 (강조 표시) */}
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">현대차 인도법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">자동차 제조업의 핵심 거점</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2019년</div>
                        <div>• 업종: 자동차 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">기아차 첸나이공장</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">자동차 제조업의 생산 거점</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2020년</div>
                        <div>• 업종: 자동차 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-blue-800">LG화학 인도법인</h5>
                        <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded">타겟고객</span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">화학 산업의 인도 진출</p>
                      <div className="text-xs text-blue-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 화학 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    {/* 기타 진출기업들 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">포스코첸나이</h5>
                      <p className="text-sm text-gray-600 mb-3">철강 제조업의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 철강 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">두산에너빌리티 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">에너지 산업의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: 에너지</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">한화에어로스페이스 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">항공 산업의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: 항공 산업</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">LS전선 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">전선 제조업의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 전선 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">CJ대한통운 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">물류 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2021년</div>
                        <div>• 업종: 물류 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">롯데정보통신 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">IT 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: IT 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">KT 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">통신 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 통신 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">SK텔레콤 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">통신 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 통신 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">LG유플러스 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">통신 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2023년</div>
                        <div>• 업종: 통신 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">네이버 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">IT 서비스의 인도 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: IT 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">카카오 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">IT 서비스의 인도 진출</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2022년</div>
                        <div>• 업종: IT 서비스</div>
                        <div>• 진출형태: 법인 설립</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">삼성전자 첸나이법인</h5>
                      <p className="text-sm text-gray-600 mb-3">전자제품 제조업의 첸나이 확장</p>
                      <div className="text-xs text-gray-600">
                        <div>• 진출시기: 2024년</div>
                        <div>• 업종: 전자제품 제조</div>
                        <div>• 진출형태: 생산 공장</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 주요 특징 및 전략 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💰 가격 전략</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 가격: $1,160/월</li>
            <li>• 물가상승률 반영: 연 4%</li>
            <li>• 인플레이션, GDP 고려</li>
            <li>• 지역 차별화 없음</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📊 수익 인식</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 모든 계약: 3년 장기 계약</li>
            <li>• 단순 인식: 고객수 × 가격</li>
            <li>• 누적 고객 기반</li>
            <li>• 재계약으로 유지</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">🎯 고객 확보</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 뭄바이: 연 5개사 누적</li>
            <li>• 첸나이: 연 3개사 누적</li>
            <li>• 3년 계약 유지</li>
            <li>• 지역별 차별화</li>
          </ul>
        </div>
      </div>

      {/* 모달들 */}
      {showModal && selectedCustomer && (
        <DetailedAnalysisModal customer={selectedCustomer} onClose={() => setShowModal(false)} />
      )}

      {showCalculationModal && (
        <CalculationDetailModal 
          year={selectedYear} 
          region={activeRegion as 'mumbai' | 'chennai'} 
          onClose={() => setShowCalculationModal(false)} 
        />
      )}
    </section>
  );
} 