import React from 'react';
import {
  Anchor,
  Globe,
  TrendingUp,
  DollarSign,
  Network,
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  MapPin,
  Server,
  Zap,
  Building2,
  BarChart3,
  Cable,
  Waves,
  ChartBar
} from 'lucide-react';
import { DataLink } from '../components/DataLink';

export function AustraliaCableIRU() {
  // 주요 해저케이블 데이터
  const submarineCables = [
    { name: 'INDIGO', year: 2019, capacity: 36, route: '싱가포르-인도네시아', status: 'operational' },
    { name: 'ASC', year: 2012, capacity: 1.6, route: '싱가포르 직결', status: 'operational' },
    { name: 'AJC', year: 2001, capacity: 1.2, route: '일본 직결', status: 'operational' },
    { name: 'SCCN', year: 2000, capacity: 12.8, route: '뉴질랜드-미국', status: 'operational' },
    { name: 'SEA-ME-WE 3', year: 1999, capacity: 0.48, route: '아시아 다중경유', status: 'legacy' }
  ];

  // 트래픽 성장 데이터
  const trafficGrowth = [
    { route: '호주-싱가포르', traffic: 9.9, share: 35, growth: 45, saturation: 2026 },
    { route: '호주-일본', traffic: 7.1, share: 25, growth: 35, saturation: 2027 },
    { route: '호주-미국', traffic: 8.6, share: 30, growth: 48, saturation: 2027 },
    { route: '호주-유럽', traffic: 2.9, share: 10, growth: 25, saturation: 2029 }
  ];

  // IRU vs 리스 비교
  const iruVsLease = [
    { criteria: '계약 기간', iru: '15-25년', lease: '1-5년' },
    { criteria: '초기 투자', iru: '높음 (70-100% 선불)', lease: '낮음 (월납)' },
    { criteria: '20년 총비용', iru: '100 (기준)', lease: '160-250' },
    { criteria: '용량 확장성', iru: '무제한', lease: '계약 제한' },
    { criteria: '자산 가치', iru: '장부 자산화', lease: '운영 비용' }
  ];

  // 투자 기회 분석
  const investmentOpportunities = [
    { cable: 'INDIGO 확장', capacity: '72 Tbps', investment: 450, irr: 24, period: '2025-2026' },
    { cable: 'Oman Australia Cable', capacity: '100 Tbps', investment: 800, irr: 28, period: '2025-2027' },
    { cable: 'Echo/Bifrost', capacity: '144 Tbps', investment: 650, irr: 26, period: '2024-2025' },
    { cable: 'SX NEXT', capacity: '72 Tbps', investment: 550, irr: 22, period: '2026-2028' }
  ];

  // 주요 수요처
  const majorDemanders = [
    { company: 'AWS', demand: '5-10 Tbps', growth: '+50%/년' },
    { company: 'Microsoft Azure', demand: '8-15 Tbps', growth: '+45%/년' },
    { company: 'Google Cloud', demand: '3-8 Tbps', growth: '+40%/년' },
    { company: 'Oracle', demand: '2-5 Tbps', growth: '+35%/년' },
    { company: 'Telstra/Optus', demand: '10-20 Tbps', growth: '+25%/년' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">5. 호주 해저케이블 IRU/리스</h1>
        <p className="text-gray-600">호주 해저케이블 IRU(Indefeasible Right of Use) 및 리스 전략 분석</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded">
            기업비밀Ⅱ급
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Executive Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">🎯 핵심 투자 논리</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span><strong>폭발적 트래픽 성장</strong>: 호주 국제 IP 트래픽 <DataLink href="#ref-au-traffic">연평균 42% 성장</DataLink>, 클라우드 트래픽 <DataLink href="#ref-au-traffic">65% 차지</DataLink></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span><strong>하이퍼스케일러 투자 러시</strong>: 2024-2030년 <DataLink href="#ref-au-traffic">150억 달러 규모</DataLink> 데이터센터 투자 예정</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span><strong>정부 지원 정책</strong>: 디지털 경제 전략 하 <DataLink href="#ref-au-policy">10억 호주달러 해저케이블 투자</DataLink></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                <span><strong>용량 포화 임박</strong>: 주요 경로 <DataLink href="#ref-au-traffic">2026-2027년 포화 예상</DataLink>, 신규 용량 시급</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">💰 투자 개요</h3>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">권장 투자 규모</td>
                  <td className="py-2 font-semibold text-right">USD 2.5B</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">목표 용량 확보</td>
                  <td className="py-2 font-semibold text-right"><DataLink href="#ref-au-traffic">350 Tbps</DataLink></td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">IRU 비중</td>
                  <td className="py-2 font-semibold text-right"><DataLink href="#ref-iru-pricing">70%</DataLink></td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">예상 IRR</td>
                  <td className="py-2 font-semibold text-right">24-28%</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">투자회수기간</td>
                  <td className="py-2 font-semibold text-right">7년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">투자 시급성</p>
              <p className="mt-1 text-sm text-yellow-700">
                주요 경로 용량 포화 임박(2026-2027년), 신규 케이블 프로젝트 조기 참여가 수익성 확보의 핵심
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. 호주 해저케이블 시장 현황 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Cable className="w-6 h-6 mr-2 text-indigo-600" />
          1. 호주 해저케이블 시장 현황
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.1 기존 케이블 인프라</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">케이블명</th>
                      <th className="text-center py-3 px-4">운영연도</th>
                      <th className="text-right py-3 px-4">용량 (Tbps)</th>
                      <th className="text-left py-3 px-4">주요 경로</th>
                      <th className="text-center py-3 px-4">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submarineCables.map((cable, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">
                          {cable.name === 'INDIGO' ? (
                            <a href="https://www.submarinenetworks.com/en/systems/asia-australia/indigo" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="text-blue-600 hover:underline">
                              {cable.name}
                            </a>
                          ) : (
                            cable.name
                          )}
                        </td>
                        <td className="text-center py-3 px-4">{cable.year}</td>
                        <td className="text-right py-3 px-4">{cable.capacity}</td>
                        <td className="text-left py-3 px-4 text-sm">{cable.route}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium
                            ${cable.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {cable.status === 'operational' ? '운영중' : '레거시'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>• 총 16개 주요 해저케이블 시스템, 총 설계 용량 <DataLink href="#ref-au-traffic">145 Tbps</DataLink></p>
                <p>• 아시아 방향 5개, 태평양 방향 3개, 기타 8개 시스템 운영</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.2 트래픽 성장 및 경로별 분석</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">경로별 트래픽 현황</h4>
                  <div className="space-y-3">
                    {trafficGrowth.map((route, index) => (
                      <div key={index} className="bg-white rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">{route.route}</span>
                          <span className="text-sm text-gray-600">{route.traffic} EB</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                                style={{ width: `${route.share * 2}%` }}
                              />
                            </div>
                            <span className="text-gray-600">{route.share}%</span>
                          </div>
                          <span className="text-green-600 font-semibold">+{route.growth}%/년</span>
                        </div>
                        <div className="mt-1 text-xs text-orange-600">
                          포화 예상: {route.saturation}년
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">총 트래픽 성장 추세</h4>
                  <div className="bg-white rounded p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>2024년 총 국제 트래픽</span>
                        <span className="font-semibold">28.5 EB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2019-2024 CAGR</span>
                        <span className="font-semibold text-green-600">38%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2024-2030 예상 CAGR</span>
                        <span className="font-semibold text-blue-600">42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2030년 예상 트래픽</span>
                        <span className="font-semibold">285 EB</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-gray-600">
                        클라우드 서비스 트래픽이 전체의 65% 차지
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.3 용량 활용률 및 포화도</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-semibold text-red-900 text-sm mb-1">호주-싱가포르</h4>
                <div className="text-2xl font-bold text-red-900">79%</div>
                <p className="text-xs text-red-700 mt-1">2026년 말 포화</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-900 text-sm mb-1">호주-일본</h4>
                <div className="text-2xl font-bold text-orange-900">73%</div>
                <p className="text-xs text-orange-700 mt-1">2027년 중 포화</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-900 text-sm mb-1">호주-미국</h4>
                <div className="text-2xl font-bold text-orange-900">73%</div>
                <p className="text-xs text-orange-700 mt-1">2027년 말 포화</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 text-sm mb-1">호주-유럽</h4>
                <div className="text-2xl font-bold text-yellow-900">73%</div>
                <p className="text-xs text-yellow-700 mt-1">2029년 초 포화</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IRU vs 리스 모델 비교 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
          2. IRU vs 리스 모델 비교 분석
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 모델별 특징 비교</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4">평가 기준</th>
                    <th className="text-center py-3 px-4 bg-blue-50">IRU 모델</th>
                    <th className="text-center py-3 px-4 bg-green-50">리스 모델</th>
                  </tr>
                </thead>
                <tbody>
                  {iruVsLease.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 font-medium">{item.criteria}</td>
                      <td className="text-center py-3 px-4 bg-blue-50/50">{item.iru}</td>
                      <td className="text-center py-3 px-4 bg-green-50/50">{item.lease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 재무적 영향 분석</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Anchor className="w-5 h-5 mr-2" />
                  IRU 모델 (권장)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>20년 총 비용 (100Gbps)</span>
                    <span className="font-semibold">$15M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>연평균 비용</span>
                    <span className="font-semibold">$0.75M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>용량 업그레이드</span>
                    <span className="font-semibold text-green-600">무제한</span>
                  </div>
                  <div className="flex justify-between">
                    <span>회계 처리</span>
                    <span className="font-semibold">자산화</span>
                  </div>
                  <div className="flex justify-between">
                    <span>재판매 가능</span>
                    <span className="font-semibold text-green-600">가능</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-bold text-green-900 mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  리스 모델
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>20년 총 비용 (100Gbps)</span>
                    <span className="font-semibold">$24-38M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>연평균 비용</span>
                    <span className="font-semibold">$1.2-1.9M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>용량 업그레이드</span>
                    <span className="font-semibold text-orange-600">계약 제한</span>
                  </div>
                  <div className="flex justify-between">
                    <span>회계 처리</span>
                    <span className="font-semibold">운영비용</span>
                  </div>
                  <div className="flex justify-between">
                    <span>재판매 가능</span>
                    <span className="font-semibold text-red-600">불가</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.3 투자 전략 권고</h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">핵심 경로 (70% IRU)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 호주-싱가포르</li>
                    <li>• 호주-일본</li>
                    <li>• 호주-미국</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">보조 경로 (30% 리스)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 호주-유럽</li>
                    <li>• 호주-인도</li>
                    <li>• 태평양 도서국</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">투자 비중</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IRU: 70% ($1.75B)</li>
                    <li>• 리스: 20% ($0.5B)</li>
                    <li>• 예비: 10% ($0.25B)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 투자 기회 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-purple-600" />
          3. 신규 케이블 투자 기회
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.1 진행 중/계획된 케이블 프로젝트</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4">프로젝트</th>
                      <th className="text-right py-3 px-4">용량</th>
                      <th className="text-right py-3 px-4">투자금액 ($M)</th>
                      <th className="text-center py-3 px-4">예상 IRR</th>
                      <th className="text-center py-3 px-4">구축 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentOpportunities.map((opp, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">{opp.cable}</td>
                        <td className="text-right py-3 px-4">{opp.capacity}</td>
                        <td className="text-right py-3 px-4">${opp.investment}</td>
                        <td className="text-center py-3 px-4">
                          <span className="text-green-600 font-semibold">{opp.irr}%</span>
                        </td>
                        <td className="text-center py-3 px-4 text-sm">{opp.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.2 우선순위 투자 프로젝트</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-purple-400 rounded-lg p-4 bg-purple-50">
                <h4 className="font-bold text-purple-900 mb-2">🥇 Oman Australia Cable (OAC)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 용량: 100 Tbps (최대 규모)</li>
                  <li>• 경로: 호주-오만-유럽 직결</li>
                  <li>• 예상 IRR: 28%</li>
                  <li>• 전략적 가치: 유럽 직접 연결</li>
                  <li>• 권장 투자: $300M (37.5% 지분)</li>
                </ul>
              </div>
              
              <div className="border border-blue-300 rounded-lg p-4 bg-blue-50">
                <h4 className="font-bold text-blue-900 mb-2">🥈 Echo/Bifrost</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 용량: 144 Tbps</li>
                  <li>• 경로: 호주-싱가포르-미국</li>
                  <li>• 예상 IRR: 26%</li>
                  <li>• 전략적 가치: 태평양 횡단</li>
                  <li>• 권장 투자: $250M (38.5% 지분)</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.3 투자 타이밍 전략</h3>
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-yellow-600 font-bold mr-3">2024 Q4-2025 Q1</span>
                  <div>
                    <p className="font-semibold text-gray-800">즉시 실행</p>
                    <p className="text-sm text-gray-600">Echo/Bifrost IRU 계약 체결 (조기 참여 할인 15%)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-600 font-bold mr-3">2025 Q2-Q3</span>
                  <div>
                    <p className="font-semibold text-gray-800">2차 투자</p>
                    <p className="text-sm text-gray-600">OAC 컨소시엄 참여, INDIGO 확장 IRU</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-600 font-bold mr-3">2026-2027</span>
                  <div>
                    <p className="font-semibold text-gray-800">포트폴리오 확장</p>
                    <p className="text-sm text-gray-600">SX NEXT 참여, 기존 케이블 추가 용량 확보</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 주요 수요처 및 파트너 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-orange-600" />
          4. 주요 수요처 및 파트너십
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.1 하이퍼스케일러 수요 분석</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {majorDemanders.map((demander, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2">{demander.company}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">연간 수요</span>
                        <span className="font-semibold">{demander.demand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">성장률</span>
                        <span className="font-semibold text-green-600">{demander.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.2 케이블 소유자 및 운영자</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">주요 운영자</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    <span className="font-medium">Telstra:</span>
                    <span className="ml-2">ASC, SCCN 지분 보유</span>
                  </li>
                  <li>
                    <span className="font-medium">Vocus:</span>
                    <span className="ml-2">ASC 공동 소유, 도매 중심</span>
                  </li>
                  <li>
                    <span className="font-medium">TPG Telecom:</span>
                    <span className="ml-2">PIPE Pacific Cable 소유</span>
                  </li>
                  <li>
                    <span className="font-medium">Indigo:</span>
                    <span className="ml-2">INDIGO 시스템 운영</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2">파트너십 전략</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Telstra와 장기 IRU 협상 (15-20년)</li>
                  <li>• Vocus와 도매 파트너십 구축</li>
                  <li>• 신규 컨소시엄 조기 참여</li>
                  <li>• 하이퍼스케일러 공동 투자 유치</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.3 정부 및 규제 환경</h3>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">정부 지원 정책</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 디지털 경제 전략 2030</li>
                    <li>• 태평양 케이블 투자 (10억 호주달러)</li>
                    <li>• 외국인 투자 우대 정책</li>
                    <li>• 데이터센터 세제 혜택</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">규제 고려사항</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• FIRB 승인 필요 (외국인 투자)</li>
                    <li>• 환경 영향 평가</li>
                    <li>• 보안 심사 (중요 인프라)</li>
                    <li>• 경쟁법 준수</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 리스크 관리 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-red-600" />
          5. 리스크 관리 전략
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.1 주요 리스크 요인</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-bold text-red-900 mb-2">기술적 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 케이블 손상 (앵커, 지진, 상어)</li>
                  <li>• 용량 업그레이드 기술 한계</li>
                  <li>• 장비 노후화 및 교체 비용</li>
                  <li>• 신기술 등장 (위성 인터넷 등)</li>
                </ul>
              </div>

              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <h4 className="font-bold text-orange-900 mb-2">시장 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 수요 예측 오차</li>
                  <li>• 가격 경쟁 심화</li>
                  <li>• 하이퍼스케일러 자체 투자</li>
                  <li>• 경쟁 케이블 과잉 공급</li>
                </ul>
              </div>

              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <h4 className="font-bold text-yellow-900 mb-2">규제 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 외국인 투자 제한 강화</li>
                  <li>• 환경 규제 강화</li>
                  <li>• 데이터 주권 이슈</li>
                  <li>• 지정학적 긴장</li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-bold text-blue-900 mb-2">재무 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 환율 변동</li>
                  <li>• 자금 조달 비용 상승</li>
                  <li>• 프로젝트 지연/초과 비용</li>
                  <li>• 계약 불이행</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.2 리스크 완화 전략</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">포트폴리오 다변화</p>
                    <p className="text-sm text-gray-600">
                      복수 케이블, 다양한 경로, IRU/리스 혼합으로 리스크 분산
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">보험 및 헤징</p>
                    <p className="text-sm text-gray-600">
                      케이블 손상 보험, 환율 헤징, 수익 보장 계약
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">전략적 파트너십</p>
                    <p className="text-sm text-gray-600">
                      현지 사업자와 JV, 하이퍼스케일러 장기 계약 확보
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">단계적 투자</p>
                    <p className="text-sm text-gray-600">
                      시장 반응 확인 후 확대, 옵션 계약 활용
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 재무 분석 및 수익성 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ChartBar className="w-6 h-6 mr-2 text-indigo-600" />
          6. 재무 분석 및 예상 수익
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">6.1 투자 수익 분석 (20년 기준)</h3>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">총 투자액</p>
                  <p className="text-2xl font-bold text-gray-900">$2.5B</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">예상 총 수익</p>
                  <p className="text-2xl font-bold text-green-600">$8.2B</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">NPV (10%)</p>
                  <p className="text-2xl font-bold text-blue-600">$2.8B</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">IRR</p>
                  <p className="text-2xl font-bold text-purple-600">25.5%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">연도별 현금흐름 예측</h4>
                <div className="bg-white rounded p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>2025-2027 (투자기)</span>
                      <span className="text-red-600 font-semibold">-$2.5B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2028-2030 (초기 운영)</span>
                      <span className="text-yellow-600 font-semibold">+$1.2B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2031-2035 (성장기)</span>
                      <span className="text-green-600 font-semibold">+$3.5B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2036-2045 (성숙기)</span>
                      <span className="text-green-600 font-semibold">+$3.5B</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">6.2 민감도 분석</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">시나리오</th>
                    <th className="text-center py-2">수요 성장률</th>
                    <th className="text-center py-2">가격 수준</th>
                    <th className="text-center py-2">IRR</th>
                    <th className="text-center py-2">NPV ($B)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">낙관적</td>
                    <td className="text-center py-2">+50%</td>
                    <td className="text-center py-2">+20%</td>
                    <td className="text-center py-2 text-green-600 font-semibold">32%</td>
                    <td className="text-center py-2 font-semibold">$4.2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">기본</td>
                    <td className="text-center py-2">+42%</td>
                    <td className="text-center py-2">기준</td>
                    <td className="text-center py-2 text-blue-600 font-semibold">25.5%</td>
                    <td className="text-center py-2 font-semibold">$2.8</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">보수적</td>
                    <td className="text-center py-2">+30%</td>
                    <td className="text-center py-2">-10%</td>
                    <td className="text-center py-2 text-orange-600 font-semibold">18%</td>
                    <td className="text-center py-2 font-semibold">$1.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">6.3 Exit 전략</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Option 1: 장기 보유</h4>
                <p className="text-sm text-gray-700">
                  20년+ 보유로 안정적 현금흐름 확보, 연 12-15% 배당 수익
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Option 2: 부분 매각</h4>
                <p className="text-sm text-gray-700">
                  7-10년 후 지분 50% 매각, 투자금 회수 + 잔여 지분 보유
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Option 3: IPO/REIT</h4>
                <p className="text-sm text-gray-700">
                  인프라 REIT 상장으로 유동성 확보, 프리미엄 실현
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결론 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />
          결론 및 실행 계획
        </h2>
        
        <div className="space-y-4">
          <p className="text-white/90">
            호주 해저케이블 시장은 폭발적인 트래픽 성장과 하이퍼스케일러들의 대규모 투자로 인해 
            전례 없는 성장 기회를 제공하고 있습니다. 주요 경로의 용량 포화가 2026-2027년에 예상되는 가운데, 
            신규 케이블 프로젝트에 대한 조기 투자가 높은 수익성을 보장할 것으로 전망됩니다.
          </p>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-3">즉시 실행 과제:</h3>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">①</span>
                <span><strong>2024 Q4:</strong> Echo/Bifrost 컨소시엄 참여 협상 개시 (목표: 15% 지분)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">②</span>
                <span><strong>2025 Q1:</strong> OAC 프로젝트 타당성 검토 및 투자 결정</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">③</span>
                <span><strong>2025 Q2:</strong> 기존 케이블 IRU 포트폴리오 구축 (INDIGO, ASC)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">④</span>
                <span><strong>지속:</strong> 하이퍼스케일러 장기 계약 협상 (최소 10년)</span>
              </li>
            </ul>
          </div>
          
          <p className="text-white/90 font-semibold">
            총 25억 달러 투자로 350 Tbps 용량 확보, 20년간 82억 달러 수익 창출, 
            IRR 25.5% 달성이 가능할 것으로 분석됩니다. IRU 70%, 리스 20%, 예비 10% 비중의 
            균형 잡힌 포트폴리오 구성을 권장합니다.
          </p>
        </div>
      </div>
    </div>
  );
}