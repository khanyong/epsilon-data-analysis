import React from 'react';
import { 
  Network, 
  Globe, 
  Server, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Zap,
  Users,
  Building2,
  Cpu,
  Cloud,
  Database,
  ChartBar
} from 'lucide-react';
import { DataLink } from '../components/DataLink';

export function SEAPoPExpansion() {
  // 시장 성장 데이터
  const marketGrowthData = [
    { country: '인도네시아', traffic2024: 8.2, traffic2030: 28.5, growth: 23, share: 35 },
    { country: '태국', traffic2024: 4.8, traffic2030: 16.2, growth: 22, share: 20 },
    { country: '베트남', traffic2024: 3.2, traffic2030: 12.8, growth: 26, share: 15 },
    { country: '필리핀', traffic2024: 2.5, traffic2030: 9.8, growth: 25, share: 12 },
    { country: '말레이시아', traffic2024: 2.1, traffic2030: 7.2, growth: 21, share: 10 },
    { country: '기타', traffic2024: 1.8, traffic2030: 5.5, growth: 20, share: 8 }
  ];

  // 투자 단계별 계획
  const investmentPhases = [
    {
      phase: '1단계',
      period: '2025-2026',
      investment: 8,
      cities: ['자카르타', '방콕', '호치민시', '마닐라'],
      pops: 12,
      target: '시장 점유율 15%'
    },
    {
      phase: '2단계',
      period: '2027-2028',
      investment: 12,
      cities: ['수라바야', '치앙마이', '하노이', '세부', '쿠알라룸푸르'],
      pops: 20,
      target: '시장 점유율 25%'
    },
    {
      phase: '3단계',
      period: '2029-2030',
      investment: 15,
      cities: ['메단', '다낭', '다바오', '페낭', '양곤'],
      pops: 18,
      target: '시장 점유율 35%'
    }
  ];

  // 주요 경쟁사 현황
  const competitors = [
    { name: 'AWS', currentPops: 8, plannedPops: 18, investment: 25 },
    { name: 'Google Cloud', currentPops: 6, plannedPops: 14, investment: 20 },
    { name: 'Microsoft Azure', currentPops: 7, plannedPops: 15, investment: 20 },
    { name: 'Alibaba Cloud', currentPops: 9, plannedPops: 20, investment: 18 },
    { name: 'Singtel', currentPops: 15, plannedPops: 25, investment: 12 }
  ];

  // PoP 구축 비용 분석
  const costBreakdown = [
    { category: '네트워크 장비', amount: 8.5, percentage: 24 },
    { category: '서버 인프라', amount: 7.2, percentage: 21 },
    { category: '부동산/임대', amount: 6.8, percentage: 19 },
    { category: '전력/냉각 시스템', amount: 5.5, percentage: 16 },
    { category: '해저케이블 연결', amount: 4.5, percentage: 13 },
    { category: '운영/유지보수', amount: 2.5, percentage: 7 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">3. 동남아 PoP 확대 구축</h1>
        <p className="text-gray-600">동남아시아 PoP(Points of Presence) 네트워크 확장 전략</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded">
            기업비밀Ⅱ급
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
          Executive Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">🎯 핵심 투자 논리</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">1.</span>
                <span><strong>폭발적 트래픽 성장</strong>: 동남아 IP 트래픽 <DataLink href="#ref-ip-traffic">연평균 35% 성장</DataLink>, 2030년까지 3.5배 증가 예상</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">2.</span>
                <span><strong>하이퍼스케일러 투자 러시</strong>: 2024-2030년 글로벌 클라우드 업체 <DataLink href="#ref-cloud-investment">180억 달러 투자 계획</DataLink></span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">3.</span>
                <span><strong>에지 컴퓨팅 수요 급증</strong>: 5G 확산과 IoT 도입으로 초저지연 서비스 필수화</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">4.</span>
                <span><strong>높은 투자 수익률</strong>: <DataLink href="#ref-pop-cost">IRR 28%</DataLink>, 6.5년 투자회수 기간 예상</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">💰 투자 개요</h3>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">총 투자 규모</td>
                  <td className="py-2 font-semibold text-right">USD 3.5B</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">구축 PoP 수</td>
                  <td className="py-2 font-semibold text-right">50개</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">대상 국가</td>
                  <td className="py-2 font-semibold text-right">6개국</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">목표 시장점유율</td>
                  <td className="py-2 font-semibold text-right">35%</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">예상 IRR</td>
                  <td className="py-2 font-semibold text-right">28%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">핵심 성공 요인</p>
              <p className="mt-1 text-sm text-yellow-700">
                현지 파트너십 확보, 규제 컴플라이언스 준수, 차별화된 서비스 제공이 성공의 필수 조건
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. 지역별 시장 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-indigo-600" />
          1. 지역별 시장 분석 및 기회
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.1 국가별 트래픽 성장 전망</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">국가</th>
                      <th className="text-right py-3 px-4">2024년 (EB)</th>
                      <th className="text-right py-3 px-4">2030년 (EB)</th>
                      <th className="text-right py-3 px-4">CAGR (%)</th>
                      <th className="text-right py-3 px-4">시장 점유율 (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketGrowthData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">{item.country}</td>
                        <td className="text-right py-3 px-4">{item.traffic2024}</td>
                        <td className="text-right py-3 px-4">{item.traffic2030}</td>
                        <td className="text-right py-3 px-4">
                          <span className="text-green-600 font-semibold">+{item.growth}%</span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${item.share * 2}%` }}
                              />
                            </div>
                            <span className="text-sm">{item.share}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.2 주요 국가별 투자 우선순위</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-bold text-red-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  인도네시아 (최우선)
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 2.7억 인구, 17,000개 섬</li>
                  <li>• 자카르타: 전체 트래픽 <DataLink href="#ref-ip-traffic">45% 집중</DataLink></li>
                  <li>• 수라바야, 메단 등 2차 도시 기회</li>
                  <li>• 데이터 현지화 규제 준수 필수</li>
                </ul>
              </div>
              
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <h4 className="font-bold text-orange-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  태국 (높음)
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 메콩 지역 게이트웨이</li>
                  <li>• 방콕: 트래픽 <DataLink href="#ref-ip-traffic">60% 집중</DataLink></li>
                  <li>• 디지털 경제 촉진법 혜택</li>
                  <li>• 높은 브로드밴드 보급률</li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  베트남 (높음)
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 제조업 허브로 급부상</li>
                  <li>• B2B 트래픽 폭발적 증가</li>
                  <li>• 호치민, 하노이 중심</li>
                  <li>• 중국 대체 생산기지</li>
                </ul>
              </div>

              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-bold text-green-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  필리핀 (중간)
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 7,000개 섬 연결성 과제</li>
                  <li>• 마닐라 75% 트래픽 집중</li>
                  <li>• 높은 모바일 의존도</li>
                  <li>• BPO 산업 수요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PoP 기술 아키텍처 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Cpu className="w-6 h-6 mr-2 text-blue-600" />
          2. PoP 기술 아키텍처 및 요구사항
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 차세대 PoP 설계 원칙</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Activity className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-bold text-gray-800">확장성</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 모듈형 설계</li>
                  <li>• SDN 기반 관리</li>
                  <li>• 클라우드 네이티브</li>
                  <li>• 자동 스케일링</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-bold text-gray-800">복원력</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 다중 경로 연결</li>
                  <li>• 자동 장애 복구</li>
                  <li>• 지리적 분산</li>
                  <li>• N+1 이중화</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  <h4 className="font-bold text-gray-800">성능</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 초저지연 구현</li>
                  <li>• 100Gbps+ 백본</li>
                  <li>• 지능형 캐싱</li>
                  <li>• 에지 컴퓨팅</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 표준 PoP 구성 요소</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">네트워크 장비</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">코어 라우터</td>
                        <td className="py-2 text-right">Cisco ASR 9000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">에지 라우터</td>
                        <td className="py-2 text-right">Arista 7000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">스위치</td>
                        <td className="py-2 text-right">100GbE 지원</td>
                      </tr>
                      <tr>
                        <td className="py-2">방화벽</td>
                        <td className="py-2 text-right">Palo Alto PA-5450</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3">서버 인프라</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">컴퓨팅</td>
                        <td className="py-2 text-right">400+ 서버</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">스토리지</td>
                        <td className="py-2 text-right">5PB NVMe SSD</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">GPU</td>
                        <td className="py-2 text-right">NVIDIA A100</td>
                      </tr>
                      <tr>
                        <td className="py-2">메모리</td>
                        <td className="py-2 text-right">100TB+ RAM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.3 연결성 요구사항</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">국제 연결</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 최소 4개 해저케이블</li>
                  <li>• Tier-1: 10Tbps</li>
                  <li>• Tier-2: 1Tbps</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">국내 백본</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 다중 경로 연결</li>
                  <li>• 지연시간 &lt;5ms</li>
                  <li>• 99.999% 가용성</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">로컬 액세스</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 광섬유 우선</li>
                  <li>• 마이크로파 백업</li>
                  <li>• 위성 비상용</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 경쟁사 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Users className="w-6 h-6 mr-2 text-orange-600" />
          3. 주요 경쟁사 분석
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.1 글로벌 클라우드 제공업체 현황</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">업체</th>
                      <th className="text-right py-3 px-4">현재 PoP</th>
                      <th className="text-right py-3 px-4">계획 PoP</th>
                      <th className="text-right py-3 px-4">투자 규모 (B$)</th>
                      <th className="text-left py-3 px-4">전략</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">{comp.name}</td>
                        <td className="text-right py-3 px-4">{comp.currentPops}</td>
                        <td className="text-right py-3 px-4">
                          <span className="text-green-600 font-semibold">{comp.plannedPops}</span>
                        </td>
                        <td className="text-right py-3 px-4">${comp.investment}</td>
                        <td className="text-left py-3 px-4 text-sm text-gray-600">
                          {comp.name === 'AWS' && '하이퍼스케일 중심'}
                          {comp.name === 'Google Cloud' && '에지 네트워크 확장'}
                          {comp.name === 'Microsoft Azure' && '엔터프라이즈 포커스'}
                          {comp.name === 'Alibaba Cloud' && '중국-동남아 연계'}
                          {comp.name === 'Singtel' && '통신-클라우드 융합'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.2 경쟁 우위 확보 전략</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">차별화 포인트</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 한국-동남아 전용 고속 연결</li>
                  <li>• 맞춤형 엣지 컴퓨팅 서비스</li>
                  <li>• 현지 파트너십 기반 시장 침투</li>
                  <li>• 경쟁력 있는 가격 정책</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2">협력 기회</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 현지 통신사와 합작 투자</li>
                  <li>• 콘텐츠 제공업체 파트너십</li>
                  <li>• 정부 디지털화 프로젝트 참여</li>
                  <li>• 중소 클라우드 업체 연합</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 투자 계획 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
          4. 투자 계획 및 우선순위
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.1 단계별 투자 로드맵 (2025-2030)</h3>
            <div className="space-y-4">
              {investmentPhases.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                        ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-green-500'}`}>
                        {phase.phase.split('')[0]}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold text-gray-800">{phase.phase} ({phase.period})</h4>
                        <p className="text-sm text-gray-600">{phase.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">${phase.investment}B</p>
                      <p className="text-sm text-gray-600">{phase.pops} PoPs</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">대상 도시:</span> {phase.cities.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.2 투자 비용 구성</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-3">
                {costBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 text-sm font-medium text-gray-700">{item.category}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${item.percentage * 3}px` }}
                        >
                          <span className="text-xs text-white font-medium">{item.percentage}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm font-semibold">${item.amount}B</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">총 투자액</span>
                  <span className="text-xl font-bold text-gray-900">$35.0B</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.3 투자 수익률 분석</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">NPV (10% 할인율)</p>
                <p className="text-2xl font-bold text-blue-900">$4.2B</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">IRR</p>
                <p className="text-2xl font-bold text-green-900">28%</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">투자회수기간</p>
                <p className="text-2xl font-bold text-purple-900">6.5년</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">목표 EBITDA 마진</p>
                <p className="text-2xl font-bold text-orange-900">42%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 파트너십 전략 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-purple-600" />
          5. 파트너십 전략
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.1 투자 모델 옵션</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-2 border-green-400 rounded-lg p-4 bg-green-50">
                <h4 className="font-bold text-green-900 mb-2">합작 투자 (JV)</h4>
                <p className="text-sm text-gray-700 mb-2">현지 통신사와 50:50 파트너십</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ 규제 리스크 최소화</li>
                  <li>✓ 빠른 시장 진입</li>
                  <li>✓ 현지 전문성 활용</li>
                  <li>✗ 통제권 제한</li>
                </ul>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">자체 투자</h4>
                <p className="text-sm text-gray-700 mb-2">100% 직접 소유 및 운영</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ 완전한 통제권</li>
                  <li>✓ 높은 수익률</li>
                  <li>✗ 높은 초기 투자</li>
                  <li>✗ 규제 리스크</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">임대 모델</h4>
                <p className="text-sm text-gray-700 mb-2">기존 시설 임대 및 업그레이드</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ 낮은 초기 투자</li>
                  <li>✓ 빠른 구축</li>
                  <li>✗ 제한된 맞춤화</li>
                  <li>✗ 장기 비용 증가</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.2 주요 파트너 후보</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">국가</th>
                    <th className="text-left py-2">파트너 후보</th>
                    <th className="text-left py-2">강점</th>
                    <th className="text-left py-2">협력 모델</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">인도네시아</td>
                    <td className="py-2">Telkomsel, XL Axiata</td>
                    <td className="py-2">최대 가입자 기반</td>
                    <td className="py-2">JV (60:40)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">태국</td>
                    <td className="py-2">AIS, True</td>
                    <td className="py-2">5G 인프라</td>
                    <td className="py-2">JV (50:50)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">베트남</td>
                    <td className="py-2">Viettel, VNPT</td>
                    <td className="py-2">정부 지원</td>
                    <td className="py-2">JV (49:51)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">필리핀</td>
                    <td className="py-2">PLDT, Globe</td>
                    <td className="py-2">섬 연결성</td>
                    <td className="py-2">임대 + 협력</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">말레이시아</td>
                    <td className="py-2">TM, Maxis</td>
                    <td className="py-2">MSC 정책</td>
                    <td className="py-2">자체 투자</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 규제 및 컴플라이언스 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-red-600" />
          6. 규제 및 컴플라이언스
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">6.1 국가별 주요 규제 사항</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 bg-red-50 p-4">
                <h4 className="font-bold text-red-900 mb-1">인도네시아</h4>
                <p className="text-sm text-gray-700">
                  <strong>데이터 현지화 법 (PP71/2019):</strong> 공공 서비스 데이터는 반드시 인도네시아 내 저장. 
                  금융, 의료 데이터 포함. 위반 시 서비스 차단 가능.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                <h4 className="font-bold text-orange-900 mb-1">태국</h4>
                <p className="text-sm text-gray-700">
                  <strong>개인정보보호법 (PDPA):</strong> EU GDPR과 유사한 수준의 규제. 
                  데이터 처리자 등록 의무, 위반 시 최대 500만 바트 벌금.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <h4 className="font-bold text-yellow-900 mb-1">베트남</h4>
                <p className="text-sm text-gray-700">
                  <strong>사이버보안법:</strong> 베트남 사용자 데이터 12개월 이상 현지 보관 의무. 
                  정부 요청 시 데이터 제공 의무.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">6.2 컴플라이언스 전략</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">사전 대응</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 현지 법률 자문단 구성</li>
                  <li>• 정기적 규제 모니터링</li>
                  <li>• 정부 기관과 사전 협의</li>
                  <li>• 컴플라이언스 자동화 시스템</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2">리스크 완화</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 데이터 분류 체계 구축</li>
                  <li>• 하이브리드 클라우드 아키텍처</li>
                  <li>• 국제 인증 획득 (ISO, SOC)</li>
                  <li>• 보험 및 배상 체계 마련</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 리스크 관리 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
          7. 리스크 관리 전략
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">7.1 주요 리스크 매트릭스</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">리스크 유형</th>
                    <th className="text-center py-2">발생 확률</th>
                    <th className="text-center py-2">영향도</th>
                    <th className="text-left py-2">대응 방안</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">경쟁 심화</td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">높음</span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">중간</span>
                    </td>
                    <td className="text-gray-600">차별화 서비스, 가격 경쟁력</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">규제 변화</td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">중간</span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">높음</span>
                    </td>
                    <td className="text-gray-600">현지 파트너십, 법률 자문</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">자연재해</td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">낮음</span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">높음</span>
                    </td>
                    <td className="text-gray-600">지리적 분산, 보험 가입</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">기술 변화</td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">중간</span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">중간</span>
                    </td>
                    <td className="text-gray-600">모듈형 설계, 지속적 업그레이드</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">환율 변동</td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">중간</span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">낮음</span>
                    </td>
                    <td className="text-gray-600">헤징 전략, 현지 통화 수익</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">7.2 비상 계획 (Contingency Plan)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">시나리오 1: 규제 강화</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 현지 데이터센터 비중 확대</li>
                  <li>• 합작 투자 비율 조정</li>
                  <li>• 대체 시장 진출 가속화</li>
                </ul>
              </div>
              <div className="border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-800 mb-2">시나리오 2: 경제 침체</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 투자 규모 단계적 축소</li>
                  <li>• 수익성 높은 지역 집중</li>
                  <li>• 운영 효율성 극대화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. 예상 성과 및 KPI */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ChartBar className="w-6 h-6 mr-2 text-indigo-600" />
          8. 예상 성과 및 KPI
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.1 연도별 예상 매출 (단위: 억 달러)</h3>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">2025</p>
                  <p className="text-2xl font-bold text-indigo-900">$2</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">2026</p>
                  <p className="text-2xl font-bold text-indigo-900">$5</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">2027</p>
                  <p className="text-2xl font-bold text-indigo-900">$8</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">2028</p>
                  <p className="text-2xl font-bold text-indigo-900">$12</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">2029</p>
                  <p className="text-2xl font-bold text-indigo-900">$16</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">2030</p>
                  <p className="text-2xl font-bold text-indigo-900">$22</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.2 핵심 성과 지표 (KPI)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-3">운영 지표</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>PoP 가동률</span>
                    <span className="font-semibold">&gt;95%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>네트워크 가용성</span>
                    <span className="font-semibold">99.99%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>평균 지연시간</span>
                    <span className="font-semibold">&lt;5ms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-3">재무 지표</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>EBITDA 마진</span>
                    <span className="font-semibold">42%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>ROI</span>
                    <span className="font-semibold">28%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>ARPU 성장률</span>
                    <span className="font-semibold">15%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-3">시장 지표</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between">
                    <span>시장 점유율</span>
                    <span className="font-semibold">35%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>고객 만족도</span>
                    <span className="font-semibold">&gt;90%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>고객 이탈률</span>
                    <span className="font-semibold">&lt;5%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결론 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />
          결론 및 권고사항
        </h2>
        
        <div className="space-y-4">
          <p className="text-white/90">
            동남아시아 PoP 확대 구축은 단순한 인프라 투자를 넘어, 급성장하는 디지털 경제의 핵심 허브로 
            자리매김할 수 있는 전략적 기회입니다. 연평균 35%의 트래픽 성장과 180억 달러 규모의 
            하이퍼스케일러 투자가 예상되는 이 시장에서 선제적 포지셔닝이 필수적입니다.
          </p>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-3">핵심 권고사항:</h3>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">①</span>
                <span><strong>즉시 실행:</strong> 인도네시아, 태국 중심으로 1단계 투자 착수 (2025년 상반기)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">②</span>
                <span><strong>파트너십 우선:</strong> 현지 통신사와 합작 투자로 규제 리스크 최소화</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">③</span>
                <span><strong>차별화 전략:</strong> 한국-동남아 전용 고속 연결 및 맞춤형 엣지 서비스</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">④</span>
                <span><strong>단계적 확장:</strong> 수익성 검증 후 Tier-2, Tier-3 도시로 확대</span>
              </li>
            </ul>
          </div>
          
          <p className="text-white/90 font-semibold">
            35억 달러 투자로 2030년까지 50개 PoP 구축, 시장 점유율 35% 달성, 
            연 매출 220억 달러 실현이 가능할 것으로 전망됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}