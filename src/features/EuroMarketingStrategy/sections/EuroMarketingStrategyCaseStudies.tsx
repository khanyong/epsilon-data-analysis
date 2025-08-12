import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Case Study 섹션: 유럽 시장 성공 사례 심층 분석
export function EuroMarketingStrategySectionCaseStudies() {
  const [selectedCase, setSelectedCase] = useState<string>('orange');

  // Orange International 재무 데이터
  const orangeFinancialData = [
    { year: '2020', revenue: 2150, ebitda: 645, employees: 4200 },
    { year: '2021', revenue: 2280, ebitda: 706, employees: 4350 },
    { year: '2022', revenue: 2450, ebitda: 784, employees: 4500 },
    { year: '2023', revenue: 2620, ebitda: 865, employees: 4650 },
  ];

  // Colt Technology Services 재무 데이터
  const coltFinancialData = [
    { year: '2020', revenue: 1580, ebitda: 237, employees: 5100 },
    { year: '2021', revenue: 1690, ebitda: 287, employees: 5200 },
    { year: '2022', revenue: 1850, ebitda: 351, employees: 5400 },
    { year: '2023', revenue: 2010, ebitda: 402, employees: 5600 },
  ];

  // BSO Network 재무 데이터
  const bsoFinancialData = [
    { year: '2020', revenue: 145, ebitda: 29, employees: 320 },
    { year: '2021', revenue: 178, ebitda: 39, employees: 380 },
    { year: '2022', revenue: 225, ebitda: 54, employees: 450 },
    { year: '2023', revenue: 285, ebitda: 71, employees: 520 },
  ];

  // Eunetworks 재무 데이터
  const eunetworksFinancialData = [
    { year: '2020', revenue: 420, ebitda: 168, employees: 750 },
    { year: '2021', revenue: 465, ebitda: 195, employees: 820 },
    { year: '2022', revenue: 520, ebitda: 229, employees: 900 },
    { year: '2023', revenue: 580, ebitda: 261, employees: 980 },
  ];

  // GTT Communications 재무 데이터
  const gttFinancialData = [
    { year: '2020', revenue: 1680, ebitda: 336, employees: 3200 },
    { year: '2021', revenue: 1420, ebitda: 284, employees: 2800 },
    { year: '2022', revenue: 1250, ebitda: 275, employees: 2500 },
    { year: '2023', revenue: 1180, ebitda: 283, employees: 2400 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        12. Case Studies: 유럽 시장 성공 사례 심층 분석
      </h2>

      {/* Case Study 선택 탭 */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedCase('orange')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCase === 'orange' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Orange International
        </button>
        <button
          onClick={() => setSelectedCase('colt')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCase === 'colt' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Colt Technology
        </button>
        <button
          onClick={() => setSelectedCase('bso')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCase === 'bso' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          BSO Network
        </button>
        <button
          onClick={() => setSelectedCase('eunetworks')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCase === 'eunetworks' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Eunetworks
        </button>
        <button
          onClick={() => setSelectedCase('gtt')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCase === 'gtt' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          GTT Communications
        </button>
      </div>

      {/* Case Study 1: Orange International */}
      {selectedCase === 'orange' && (
        <div className="bg-orange-50 p-6 rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-orange-500 text-white p-3 rounded-lg mr-4">
              <span className="text-2xl font-bold">OI</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-900">
                Orange International Carriers
              </h3>
              <p className="text-sm text-gray-600">
                프랑스 기반 Tier 1 글로벌 통신사업자 | 설립: 1994년
              </p>
            </div>
          </div>

          {/* 회사 개요 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📊 2023년 핵심 지표</h4>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">매출액:</span> $2.62B (€2.43B)</li>
                <li><span className="font-medium">EBITDA:</span> $865M (33% margin)</li>
                <li><span className="font-medium">직원수:</span> 4,650명</li>
                <li><span className="font-medium">고객수:</span> 1,500+ 통신사</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🌍 사업 영역</h4>
              <ul className="text-sm space-y-1">
                <li>• International Voice (35%)</li>
                <li>• Data & IP Services (40%)</li>
                <li>• Capacity & Infrastructure (20%)</li>
                <li>• Roaming & IoT (5%)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🏢 주요 자산</h4>
              <ul className="text-sm space-y-1">
                <li>• 450,000km 해저케이블</li>
                <li>• 40개 해저케이블 컨소시엄</li>
                <li>• 35개국 POP</li>
                <li>• 24/7 NOC 센터 5개</li>
              </ul>
            </div>
          </div>

          {/* 재무 성과 차트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">매출 및 EBITDA 추이</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={orangeFinancialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}M`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#FB923C" name="매출 ($M)" strokeWidth={2} />
                  <Line type="monotone" dataKey="ebitda" stroke="#EA580C" name="EBITDA ($M)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">직원수 및 생산성</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={orangeFinancialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employees" fill="#FED7AA" name="직원수" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-2">
                직원당 매출: $563K (2023년 기준)
              </p>
            </div>
          </div>

          {/* 성공 요인 분석 */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-orange-800 mb-3">🔑 핵심 성공 요인</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">전략적 요인</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ <strong>범유럽 네트워크:</strong> 27개 EU 국가 직접 커버리지</li>
                  <li>✓ <strong>수직 통합:</strong> 인프라부터 서비스까지 End-to-End 제공</li>
                  <li>✓ <strong>파트너십 생태계:</strong> 1,500+ 글로벌 통신사와 협력</li>
                  <li>✓ <strong>브랜드 신뢰도:</strong> Orange 그룹의 글로벌 브랜드 활용</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">운영 우수성</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ <strong>규모의 경제:</strong> 대규모 트래픽으로 단위당 비용 절감</li>
                  <li>✓ <strong>자동화:</strong> AI 기반 네트워크 운영으로 OpEx 20% 절감</li>
                  <li>✓ <strong>품질 관리:</strong> 99.999% 가용성 SLA 달성</li>
                  <li>✓ <strong>고객 서비스:</strong> 다국어 24/7 지원 체계</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Epsilon에 대한 시사점 */}
          <div className="bg-orange-100 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">💡 Epsilon에 대한 시사점</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>파트너십 우선:</strong> 직접 인프라 구축보다 기존 사업자와의 협력 모델 구축</li>
              <li>• <strong>니치 차별화:</strong> Orange가 커버하지 못하는 중소 ISP 시장 공략</li>
              <li>• <strong>서비스 특화:</strong> 범용 서비스보다 특정 산업/지역 맞춤형 솔루션 제공</li>
              <li>• <strong>민첩성 활용:</strong> 대기업의 느린 의사결정 구조를 활용한 빠른 시장 대응</li>
            </ul>
          </div>
        </div>
      )}

      {/* Case Study 2: Colt Technology Services */}
      {selectedCase === 'colt' && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-lg mr-4">
              <span className="text-2xl font-bold">CT</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-900">
                Colt Technology Services
              </h3>
              <p className="text-sm text-gray-600">
                영국 기반 B2B 전문 네트워크 서비스 제공업체 | 설립: 1992년
              </p>
            </div>
          </div>

          {/* 회사 개요 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📊 2023년 핵심 지표</h4>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">매출액:</span> $2.01B (£1.58B)</li>
                <li><span className="font-medium">EBITDA:</span> $402M (20% margin)</li>
                <li><span className="font-medium">직원수:</span> 5,600명</li>
                <li><span className="font-medium">고객수:</span> 26,000+ 기업</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🎯 타겟 시장</h4>
              <ul className="text-sm space-y-1">
                <li>• Financial Services (45%)</li>
                <li>• Media & Entertainment (20%)</li>
                <li>• Professional Services (20%)</li>
                <li>• Manufacturing (15%)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🌐 네트워크 커버리지</h4>
              <ul className="text-sm space-y-1">
                <li>• 29개국 직접 서비스</li>
                <li>• 900+ 데이터센터 연결</li>
                <li>• 28,000+ 온넷 빌딩</li>
                <li>• 100Tbps+ 네트워크 용량</li>
              </ul>
            </div>
          </div>

          {/* 재무 성과 차트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">매출 및 EBITDA 추이</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={coltFinancialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}M`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3B82F6" name="매출 ($M)" strokeWidth={2} />
                  <Line type="monotone" dataKey="ebitda" stroke="#1E40AF" name="EBITDA ($M)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">서비스별 매출 구성 (2023)</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Ethernet', value: 45 },
                      { name: 'IP VPN', value: 25 },
                      { name: 'Cloud Connect', value: 20 },
                      { name: 'Voice', value: 10 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[0,1,2,3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 틈새시장 전략 */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-800 mb-3">🎯 틈새시장 성공 전략</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">시장 포지셔닝</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ <strong>금융 특화:</strong> 초저지연 네트워크로 금융권 45% 점유</li>
                  <li>✓ <strong>도시 집중:</strong> 주요 비즈니스 도시 Dense Network</li>
                  <li>✓ <strong>On-demand:</strong> 실시간 대역폭 프로비저닝</li>
                  <li>✓ <strong>MEF 3.0 인증:</strong> 업계 최초 글로벌 인증 획득</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">차별화 요소</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ <strong>Colt IQ Network:</strong> SDN 기반 지능형 네트워크</li>
                  <li>✓ <strong>API 통합:</strong> 고객 시스템과 실시간 연동</li>
                  <li>✓ <strong>Multi-cloud:</strong> 주요 CSP 직접 연결</li>
                  <li>✓ <strong>Bandwidth on Demand:</strong> 포털 통한 즉시 확장</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Epsilon에 대한 시사점 */}
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Epsilon에 대한 시사점</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>산업 특화:</strong> 특정 산업(금융, 헬스케어)에 대한 깊은 이해와 맞춤형 솔루션</li>
              <li>• <strong>기술 혁신:</strong> SDN/NFV 등 최신 기술을 활용한 서비스 차별화</li>
              <li>• <strong>고객 경험:</strong> 셀프서비스 포털과 API를 통한 고객 편의성 극대화</li>
              <li>• <strong>파트너 생태계:</strong> 클라우드 사업자와의 긴밀한 협력 관계 구축</li>
            </ul>
          </div>
        </div>
      )}

      {/* Case Study 3: BSO Network */}
      {selectedCase === 'bso' && (
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
              <span className="text-2xl font-bold">BSO</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-900">
                BSO Network Solutions
              </h3>
              <p className="text-sm text-gray-600">
                아일랜드 기반 아시아-유럽 전문 네트워크 제공업체 | 설립: 2004년
              </p>
            </div>
          </div>

          {/* 회사 개요 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📊 2023년 핵심 지표</h4>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">매출액:</span> $285M</li>
                <li><span className="font-medium">EBITDA:</span> $71M (25% margin)</li>
                <li><span className="font-medium">직원수:</span> 520명</li>
                <li><span className="font-medium">CAGR:</span> 24% (2020-2023)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🌏 지역별 매출</h4>
              <ul className="text-sm space-y-1">
                <li>• 아시아: 55%</li>
                <li>• 유럽: 30%</li>
                <li>• 중동: 10%</li>
                <li>• 기타: 5%</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🎯 핵심 고객군</h4>
              <ul className="text-sm space-y-1">
                <li>• 글로벌 은행 (40%)</li>
                <li>• 헤지펀드 (25%)</li>
                <li>• 온라인 게이밍 (20%)</li>
                <li>• 클라우드/CDN (15%)</li>
              </ul>
            </div>
          </div>

          {/* 재무 성과 차트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">급속 성장 추이</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={bsoFinancialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}M`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" name="매출 ($M)" strokeWidth={2} />
                  <Line type="monotone" dataKey="ebitda" stroke="#059669" name="EBITDA ($M)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-2">
                연평균 성장률(CAGR): 24% (업계 평균 12%의 2배)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">직원 생산성 분석</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { company: 'BSO', productivity: 548 },
                  { company: 'Colt', productivity: 359 },
                  { company: 'Orange', productivity: 563 },
                  { company: '업계평균', productivity: 420 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}K`} />
                  <Bar dataKey="productivity" fill="#86EFAC" name="직원당 매출 ($K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 틈새 성공 전략 */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-green-800 mb-3">🚀 아시아-유럽 틈새 성공 전략</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">지리적 차별화</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ 아시아 33개 도시 커버리지</li>
                  <li>✓ 유럽-아시아 최단 경로</li>
                  <li>✓ 중국 본토 직접 연결</li>
                  <li>✓ 싱가포르 허브 활용</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">서비스 특화</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ 초저지연 전용선</li>
                  <li>✓ 금융 전용 네트워크</li>
                  <li>✓ 게이밍 최적화 CDN</li>
                  <li>✓ 24시간 NOC 지원</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">성장 동력</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ M&A 전략 (5개 인수)</li>
                  <li>✓ 신규 케이블 투자</li>
                  <li>✓ 클라우드 온램프</li>
                  <li>✓ Edge 컴퓨팅 확장</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Epsilon에 대한 시사점 */}
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">💡 Epsilon에 대한 시사점</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>지역 특화:</strong> 특정 지역/루트에 대한 전문성으로 대기업과 차별화</li>
              <li>• <strong>빠른 성장:</strong> 니치 시장에서의 집중으로 업계 평균 2배 성장 달성</li>
              <li>• <strong>M&A 활용:</strong> 전략적 인수를 통한 빠른 역량 확보 및 시장 진입</li>
              <li>• <strong>고마진 서비스:</strong> 표준 서비스보다 특화 서비스로 25% EBITDA 마진 확보</li>
            </ul>
          </div>
        </div>
      )}

      {/* Case Study 4: Eunetworks */}
      {selectedCase === 'eunetworks' && (
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500 text-white p-3 rounded-lg mr-4">
              <span className="text-2xl font-bold">EU</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-900">
                Eunetworks
              </h3>
              <p className="text-sm text-gray-600">
                영국 기반 서유럽 대역폭 인프라 전문업체 | 설립: 2005년
              </p>
            </div>
          </div>

          {/* 회사 개요 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📊 2023년 핵심 지표</h4>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">매출액:</span> $580M</li>
                <li><span className="font-medium">EBITDA:</span> $261M (45% margin)</li>
                <li><span className="font-medium">직원수:</span> 980명</li>
                <li><span className="font-medium">시장가치:</span> $2.1B</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">💼 고객 구성</h4>
              <ul className="text-sm space-y-1">
                <li>• Wholesale (35%)</li>
                <li>• Finance (30%)</li>
                <li>• Content/Media (20%)</li>
                <li>• Enterprise (15%)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🏗️ 인프라 자산</h4>
              <ul className="text-sm space-y-1">
                <li>• 45,000km 파이버</li>
                <li>• 17개국 커버리지</li>
                <li>• 435개 데이터센터</li>
                <li>• 15개 메트로 네트워크</li>
              </ul>
            </div>
          </div>

          {/* 재무 성과 차트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">높은 EBITDA 마진 유지</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={eunetworksFinancialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}M`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#A855F7" name="매출 ($M)" strokeWidth={2} />
                  <Line type="monotone" dataKey="ebitda" stroke="#7C3AED" name="EBITDA ($M)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-600 mt-2">
                EBITDA 마진: 45% (업계 최고 수준)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">서비스 포트폴리오 진화</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dark Fiber</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Wavelength</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ethernet</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Internet/Cloud</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-700 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 성공 전략 */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-purple-800 mb-3">🎯 인프라 중심 성공 전략</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">자산 기반 차별화</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ <strong>독점적 루트:</strong> 대도시 간 직접 파이버 소유</li>
                  <li>✓ <strong>Deep Metro:</strong> 도시 내 촘촘한 네트워크</li>
                  <li>✓ <strong>Long-haul:</strong> 주요 비즈니스 회랑 연결</li>
                  <li>✓ <strong>DC 연결성:</strong> 435개 데이터센터 온넷</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">운영 효율성</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ <strong>자동화:</strong> 80% 서비스 자동 프로비저닝</li>
                  <li>✓ <strong>높은 가동률:</strong> 85% 파이버 활용률</li>
                  <li>✓ <strong>규모의 경제:</strong> 대규모 인프라 활용</li>
                  <li>✓ <strong>장기 계약:</strong> 평균 3-5년 계약 기간</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Epsilon에 대한 시사점 */}
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">💡 Epsilon에 대한 시사점</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>자산 경량화:</strong> 모든 인프라를 소유하지 않고 전략적 파트너십 활용</li>
              <li>• <strong>고마진 집중:</strong> Dark Fiber, Wavelength 등 고마진 서비스 우선</li>
              <li>• <strong>도시 집중:</strong> 주요 비즈니스 도시에 리소스 집중 투자</li>
              <li>• <strong>장기 계약:</strong> 안정적 수익을 위한 3년 이상 계약 체결 추진</li>
            </ul>
          </div>
        </div>
      )}

      {/* Case Study 5: GTT Communications (실패 사례) */}
      {selectedCase === 'gtt' && (
        <div className="bg-red-50 p-6 rounded-lg mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 text-white p-3 rounded-lg mr-4">
              <span className="text-2xl font-bold">GTT</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-900">
                GTT Communications (실패 사례 분석)
              </h3>
              <p className="text-sm text-gray-600">
                미국 기반 글로벌 Tier 1 네트워크 제공업체 | 설립: 2005년 | 파산: 2021년
              </p>
            </div>
          </div>

          {/* 회사 개요 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📊 파산 직전 지표 (2020)</h4>
              <ul className="text-sm space-y-1">
                <li><span className="font-medium">매출액:</span> $1.68B</li>
                <li><span className="font-medium">부채:</span> $3.2B</li>
                <li><span className="font-medium">EBITDA:</span> $336M (20% margin)</li>
                <li><span className="font-medium">주가 하락:</span> -95% (2018-2021)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">⚠️ 실패 원인</h4>
              <ul className="text-sm space-y-1">
                <li>• 과도한 M&A (11개 인수)</li>
                <li>• 높은 부채 비율 (190%)</li>
                <li>• 통합 실패</li>
                <li>• 고객 이탈 가속</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📉 몰락 과정</h4>
              <ul className="text-sm space-y-1">
                <li>• 2018: 정점 ($2.3B 매출)</li>
                <li>• 2019: 수익성 악화</li>
                <li>• 2020: 고객 대량 이탈</li>
                <li>• 2021: Chapter 11 파산</li>
              </ul>
            </div>
          </div>

          {/* 실패 분석 차트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">매출 및 직원수 감소</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={gttFinancialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#DC2626" name="매출 ($M)" strokeWidth={2} />
                  <Line type="monotone" dataKey="employees" stroke="#991B1B" name="직원수" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-red-600 mt-2 font-medium">
                ⚠️ 3년간 매출 30% 감소, 직원 25% 감축
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">부채 증가 추이</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>2018년 부채</span>
                    <span className="font-medium text-red-600">$2.1B</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-400 h-3 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>2019년 부채</span>
                    <span className="font-medium text-red-600">$2.7B</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>2020년 부채</span>
                    <span className="font-medium text-red-700">$3.2B</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-3 font-medium">
                  매출 대비 부채 비율: 190% (위험 수준)
                </p>
              </div>
            </div>
          </div>

          {/* 실패 요인 상세 분석 */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-red-800 mb-3">🔴 핵심 실패 요인 분석</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">전략적 실패</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>❌ <strong>무분별한 M&A:</strong> 3년간 11개 기업 $2.9B 인수</li>
                  <li>❌ <strong>통합 실패:</strong> 인수 기업 시스템/문화 통합 실패</li>
                  <li>❌ <strong>포커스 상실:</strong> 너무 많은 시장 동시 진출</li>
                  <li>❌ <strong>차별화 부재:</strong> Tier 1과 경쟁에서 우위 상실</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">운영적 실패</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>❌ <strong>서비스 품질:</strong> 잦은 장애로 고객 신뢰 상실</li>
                  <li>❌ <strong>고객 서비스:</strong> 통합 후 지원 체계 붕괴</li>
                  <li>❌ <strong>비용 관리:</strong> 중복 인프라로 OpEx 급증</li>
                  <li>❌ <strong>인력 이탈:</strong> 핵심 인재 대량 이직</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Epsilon에 대한 교훈 */}
          <div className="bg-red-100 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">⚠️ Epsilon이 피해야 할 실수</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>신중한 M&A:</strong> 무리한 인수보다 유기적 성장과 전략적 파트너십 우선</li>
              <li>• <strong>부채 관리:</strong> 매출 대비 부채 비율 50% 이하 유지, 안정적 현금흐름 확보</li>
              <li>• <strong>점진적 확장:</strong> 한 시장에서 성공 후 다음 시장 진출, 동시 다발 진출 지양</li>
              <li>• <strong>품질 우선:</strong> 성장보다 서비스 품질과 고객 만족도를 최우선 가치로 설정</li>
              <li>• <strong>통합 역량:</strong> M&A 시 기술/문화 통합 계획 사전 수립 및 전담팀 운영</li>
            </ul>
          </div>
        </div>
      )}

      {/* 종합 시사점 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📊 Case Study 종합 분석 및 전략적 시사점
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 성공 패턴 */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">✅ 공통 성공 패턴</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">1.</span>
                <div>
                  <strong>명확한 포지셔닝:</strong>
                  <span className="block text-xs text-gray-600">특정 시장/서비스에 집중하여 전문성 구축</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">2.</span>
                <div>
                  <strong>차별화된 가치:</strong>
                  <span className="block text-xs text-gray-600">가격이 아닌 서비스 품질과 특화 기능으로 경쟁</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">3.</span>
                <div>
                  <strong>효율적 운영:</strong>
                  <span className="block text-xs text-gray-600">자동화와 프로세스 최적화로 높은 EBITDA 마진 확보</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">4.</span>
                <div>
                  <strong>전략적 파트너십:</strong>
                  <span className="block text-xs text-gray-600">자체 구축보다 협력을 통한 빠른 시장 진입</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 실패 요인 */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-3">❌ 주요 실패 요인</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">1.</span>
                <div>
                  <strong>과도한 부채:</strong>
                  <span className="block text-xs text-gray-600">무리한 M&A 자금 조달로 재무 건전성 악화</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">2.</span>
                <div>
                  <strong>통합 실패:</strong>
                  <span className="block text-xs text-gray-600">인수 기업의 시스템과 문화 통합 미흡</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">3.</span>
                <div>
                  <strong>포커스 상실:</strong>
                  <span className="block text-xs text-gray-600">너무 많은 시장과 서비스 동시 추진</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">4.</span>
                <div>
                  <strong>품질 저하:</strong>
                  <span className="block text-xs text-gray-600">빠른 성장 추구로 서비스 품질 관리 소홀</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Epsilon 전략 제언 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-3">🎯 Epsilon을 위한 전략 제언</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded">
              <h5 className="font-medium text-blue-800 mb-2 text-sm">단기 전략 (0-1년)</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• BSO 모델: 특정 루트 전문화</li>
                <li>• Colt 방식: 산업별 특화 서비스</li>
                <li>• 파트너십 중심 진입</li>
                <li>• 부채 비율 30% 이하 유지</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded">
              <h5 className="font-medium text-blue-800 mb-2 text-sm">중기 전략 (1-3년)</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Eunetworks: 고마진 서비스 확대</li>
                <li>• 선택적 소규모 M&A</li>
                <li>• 자동화 투자로 OpEx 절감</li>
                <li>• EBITDA 마진 25% 달성</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded">
              <h5 className="font-medium text-blue-800 mb-2 text-sm">장기 전략 (3-5년)</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Orange 수준 파트너 네트워크</li>
                <li>• 유럽 5개국 주요 도시 커버</li>
                <li>• 플랫폼 기반 서비스 확대</li>
                <li>• 시장 점유율 1% 확보</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}