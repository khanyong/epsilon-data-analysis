import React from 'react';
import { Globe, TrendingUp, DollarSign, MapPin, Shield, AlertTriangle, CheckCircle, Anchor, Building2 } from 'lucide-react';
import { DataLink } from '../components/DataLink';

export function SingaporeEuropeIRU() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">싱가포르-유럽 관련 IRU</h1>
        <p className="text-gray-600">마르세유 집중 전략, 런던 비중 축소</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded">
            기업비밀Ⅱ급
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Executive Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">🎯 핵심 결론 (BLUF)</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span><strong>마르세유 허브 전략 집중</strong>: <DataLink href="#ref-sg-eu-cables">세계 10대 인터넷 허브</DataLink>이자 '동양의 문' 역할로 아시아-유럽 최적 연결점</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span><strong>런던 비중 축소 타당성</strong>: Brexit 후 지정학적 불확실성 및 지중해 우회 경로의 지연시간 증가</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span><strong>IRU 공동투자 권고</strong>: <DataLink href="#ref-sg-eu-cables">USD 50M 투자</DataLink>로 25년간 안정적 아시아-유럽 연결성 확보</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                <span><strong>예상 ROI 14~16%</strong>: <DataLink href="#ref-sg-eu-demand">장기 안정 수익 창출</DataLink> 및 전략적 자산 가치 확보</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">📊 투자 개요</h3>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">투자 규모</td>
                  <td className="py-2 font-semibold text-right">USD 50M (총 100M의 50% 지분)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">파트너십</td>
                  <td className="py-2 font-semibold text-right">KT와 50:50 공동투자 구조</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">IRU 기간</td>
                  <td className="py-2 font-semibold text-right">25년 (2025~2050)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">예상 ROI</td>
                  <td className="py-2 font-semibold text-right">14~16% (25년 기준)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">투자회수기간</td>
                  <td className="py-2 font-semibold text-right">6~7년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1. 사업 개요 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-indigo-600" />
          1. 사업 개요
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 프로젝트 명: Singapore-Marseille IRU (Indefeasible Right of Use)</h3>
            <ul className="text-gray-700 mb-4 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>프로젝트 개요</strong>: 싱가포르-마르세유 해저케이블의 IRU(영속사용권) 확보</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>목적</strong>: 아시아-유럽 간 직접적이고 안정적인 데이터 전송 경로 확보</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>일정</strong>: 2025년 1분기 완공 예정인 대용량 해저케이블</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>사용 기간</strong>: 장기 사용권 획득으로 25년간 독점적 이용 가능</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 기술적 사양</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">사양</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">총 길이</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">19,200km</td>
                    <td className="border border-gray-300 px-4 py-2">13개국 15개 도시 연결</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">전송 용량</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">100+ Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">1초간 100테라바이트 이상</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">광섬유 페어</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">24개</td>
                    <td className="border border-gray-300 px-4 py-2">최신 고밀도 설계</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">경유 지점</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">말레이시아, 인도, 이집트</td>
                    <td className="border border-gray-300 px-4 py-2">최단 경로 최적화</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">서비스 개시</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">2025년 Q1</td>
                    <td className="border border-gray-300 px-4 py-2">상용 서비스 시작</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 컨소시엄 구성</h3>
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-900 mb-2">주요 참여사 (11개사)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Singtel (싱가포르)</strong>: 컨소시엄 리더</li>
                <li>• <strong>Bharti Airtel (인도)</strong>: 인도 구간 담당</li>
                <li>• <strong>Orange (프랑스)</strong>: 유럽 구간 담당</li>
                <li>• <strong>Telecom Egypt (이집트)</strong>: 중동 구간 담당</li>
                <li>• <strong>Telekom Malaysia (말레이시아)</strong>: 동남아 구간 담당</li>
                <li>• <strong>기타 6개사</strong>: 방글라데시, 인도네시아 등</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 마르세유 허브의 전략적 가치 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Anchor className="w-6 h-6 mr-2 text-blue-600" />
          2. 마르세유 허브의 전략적 가치
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 지리적 우위성</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">유럽 최대 지중해 항만</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>규모</strong>: 프랑스 최대, 지중해 2위, 유럽 8위</li>
                  <li>• <strong>위치</strong>: 프랑스 남부 프로방스알프코트다쥐르 지역</li>
                  <li>• <strong>특징</strong>: 지중해와 직접 면한 천연 항만</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">동서양 연결의 관문</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>역사적 역할</strong>: 17세기부터 '동양의 문(Porte de l'Orient)' 역할</li>
                  <li>• <strong>교류 중심</strong>: 남유럽, 중동, 북아프리카, 아시아와의 문화적·경제적 교류 중심</li>
                  <li>• <strong>현재 위상</strong>: 세계 10대 인터넷 네트워크 허브 중 하나</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">최적 경로 구현</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>경로</strong>: 아시아-지중해-유럽 최단 경로</li>
                  <li>• <strong>거리 단축</strong>: 수에즈 운하 경유로 항해 거리 40% 단축</li>
                  <li>• <strong>지연시간</strong>: 케이프 경로 대비 지연시간 30% 단축</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 기존 해저케이블 집적 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">주요 연결 케이블</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>SEA-ME-WE 3/4/5</strong>: 동남아-중동-서유럽 연결</li>
                  <li>• <strong>FLAG Europe-Asia (FEA)</strong>: 아시아-유럽 고속 연결</li>
                  <li>• <strong>AAE-1</strong>: 아시아-아프리카-유럽 환형 케이블</li>
                  <li>• <strong>PEACE</strong>: 파키스탄-동아프리카-유럽 케이블</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">네트워크 효과</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 다수 케이블 집적으로 <strong>백업 경로</strong> 다양화</li>
                  <li>• <strong>트래픽 허빙</strong> 효과로 경제성 향상</li>
                  <li>• <strong>지연시간 최적화</strong> 및 <strong>네트워크 복원력</strong> 강화</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.3 디지털 인프라 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">데이터센터 클러스터</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Interxion, Equinix 등 주요 IDC 운영</li>
                  <li>• Tier III/IV 급 고가용성 데이터센터</li>
                  <li>• 금융, 미디어, 게임 산업 특화</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">인터넷 교환점 (IXP)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• France-IX Marseille: 프랑스 2위 규모</li>
                  <li>• 100+ ISP 및 CDN 연결</li>
                  <li>• 평균 트래픽: 200+ Gbps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 런던 대비 마르세유의 우위성 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-green-600" />
          3. 런던 대비 마르세유의 우위성
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.1 지정학적 리스크 비교</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">런던의 불확실성</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Brexit 후유증</strong>: EU와의 관계 불안정</li>
                  <li>• <strong>데이터 주권 이슈</strong>: GDPR 적용 복잡성 증가</li>
                  <li>• <strong>금융 허브 지위</strong>: 프랑크푸르트, 파리로 이전 가속화</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">마르세유의 안정성</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>EU 회원국</strong>: 안정적인 법적 환경</li>
                  <li>• <strong>프랑스 정부 지원</strong>: 디지털 주권 정책과 연계</li>
                  <li>• <strong>지중해 전략</strong>: 아프리카, 중동과의 연결성 강화</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.2 기술적 성능 비교</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">마르세유 경로</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">런던 경로</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">마르세유 우위</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">총 거리</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">19,200km</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">23,000km+</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">17% 단축</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">지연시간</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">240ms</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">290ms</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">20% 개선</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">경유 지점</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">5개국</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">8개국+</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">단순화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">해저 비율</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">85%</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">70%</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">안정성 향상</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.3 경제적 효율성</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">건설비 절감</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 총 거리 단축으로 케이블 비용 15% 절감</li>
                  <li>• 중계기 개수 감소로 유지보수비 20% 절감</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">운영비 최적화</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 프랑스 전력비 독일, 영국 대비 10% 저렴</li>
                  <li>• 숙련 기술인력 확보 용이</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. IRU 투자 구조 및 재무 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
          4. IRU 투자 구조 및 재무 분석
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.1 IRU (Indefeasible Right of Use) 개념</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">정의 및 특징</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>영속사용권</strong>: 25년 이상의 장기 사용권</li>
                  <li>• <strong>물리적 자산</strong>: 광섬유에 대한 배타적 권리</li>
                  <li>• <strong>기술 자유도</strong>: 원하는 시점에 원하는 기술로 업그레이드 가능</li>
                  <li>• <strong>재판매 가능</strong>: 타 사업자에게 재판매 또는 임대 가능</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Lit Capacity와의 차이</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Lit Capacity</strong>: 활성화된 서비스, 기술 종속성</li>
                  <li>• <strong>IRU</strong>: 물리적 자산, 기술 독립성</li>
                  <li>• <strong>경제성</strong>: IRU는 장기적으로 더 유리한 비용 구조</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.2 투자 규모 산정</h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">기준 정보</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 싱가포르-마르세유 거리: 19,200km</li>
                <li>• 요구 광섬유 페어: 8~12개</li>
                <li>• km당 IRU 단가: USD 4,000~6,000 (장거리 케이블 기준)</li>
              </ul>
              
              <h4 className="font-semibold text-gray-800 mb-2 mt-4">비용 계산</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 기본 IRU 비용: 19,200km × USD 5,000 = USD 96M</li>
                <li>• 아시아-유럽 주요 경로 프리미엄: +25%</li>
                <li>• <strong>총 예상 비용: USD 100~120M</strong></li>
                <li>• <strong>50% 지분 기준: USD 50~60M</strong></li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.3 공동투자 구조 제안</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">KT 파트너십 근거</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 국제 해저케이블 운영 경험 (7개 시스템 운영)</li>
                  <li>• 아시아-태평양 지역 강력한 네트워크</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">지분 구조</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>당사</strong>: 50% (USD 50M)</li>
                  <li>• <strong>KT</strong>: 50% (USD 50M)</li>
                  <li>• <strong>의사결정</strong>: 합의제 운영</li>
                  <li>• <strong>수익 배분</strong>: 지분율 비례</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.4 수익성 분석</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">매출 구조 (연간)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• IRU 재판매: USD 12~15M (70%)</li>
                  <li>• Transit 서비스: USD 4~6M (25%)</li>
                  <li>• 부가 서비스: USD 1~2M (5%)</li>
                  <li className="font-semibold pt-2 border-t">• 총 연간 매출: USD 17~23M</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">비용 구조</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 운영비 (O&M): USD 3~4M (매출의 20%)</li>
                  <li>• 감가상각: USD 2M (투자비/25년)</li>
                  <li className="font-semibold pt-2 border-t">• 총 연간 비용: USD 5~6M</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">수익성 지표</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 연간 순이익: USD 12~17M</li>
                  <li>• ROI: 14~16% (25년 평균)</li>
                  <li>• 투자회수기간: 6~7년</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 시장 환경 및 수요 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-purple-600" />
          5. 시장 환경 및 수요 분석
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.1 아시아-유럽 트래픽 증가 추세</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">현재 트래픽 현황</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 2024년 기준: 약 1,200 Tbps</li>
                  <li>• 연평균 증가율: 15~20%</li>
                  <li>• 주요 동인: 클라우드, 스트리밍, AI/ML</li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">향후 수요 전망</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 2030년 예상: 3,000+ Tbps</li>
                  <li>• 성장 동력: 디지털 전환, 원격근무, IoT</li>
                  <li>• 신흥 시장: 메타버스, 자율주행, 스마트시티</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.2 기존 케이블 시스템 현황</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">현재 운영 중인 케이블</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>SEA-ME-WE 5</strong>: 24 Tbps, 노후화 진행</li>
                  <li>• <strong>AAE-1</strong>: 40 Tbps, 아프리카 경유로 지연시간 증가</li>
                  <li>• <strong>PEACE</strong>: 60 Tbps, 최근 개통으로 경쟁 요소</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">경쟁 우위 요소</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>최신 기술</strong>: 100+ Tbps 고용량</li>
                  <li>• <strong>최적 경로</strong>: 지연시간 최소화</li>
                  <li>• <strong>안정성</strong>: 프랑스 정부 지원 인프라</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 리스크 분석 및 대응방안 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          6. 리스크 분석 및 대응방안
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">6.1 기술적 리스크</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">리스크 요인</th>
                    <th className="border border-gray-300 px-3 py-2">발생확률</th>
                    <th className="border border-gray-300 px-3 py-2">영향도</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">대응방안</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">케이블 물리적 손상</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">중간</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">높음</td>
                    <td className="border border-gray-300 px-3 py-2">다중 경로 확보, 보험 가입</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">기술 표준 변화</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">낮음</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">중간</td>
                    <td className="border border-gray-300 px-3 py-2">업그레이드 가능한 IRU 계약</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">장비 호환성 문제</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">낮음</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">중간</td>
                    <td className="border border-gray-300 px-3 py-2">표준 준수 장비 사용</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">6.2 사업적 리스크</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">리스크 요인</th>
                    <th className="border border-gray-300 px-3 py-2">발생확률</th>
                    <th className="border border-gray-300 px-3 py-2">영향도</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">대응방안</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">수요 예측 오류</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">중간</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">높음</td>
                    <td className="border border-gray-300 px-3 py-2">다양한 고객 포트폴리오</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">경쟁 케이블 공급 과잉</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">높음</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">중간</td>
                    <td className="border border-gray-300 px-3 py-2">차별화된 서비스</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 결론 및 제언 */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />
          7. 결론 및 제언
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3">7.1 핵심 요약</h3>
            <ul className="text-sm opacity-90 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>마르세유의 역사</strong>: 17세기부터 '동양의 문(Porte de l'Orient)' 역할 수행</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>현재 위상</strong>: 세계 10대 인터넷 네트워크 허브로 성장</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>기술적 우위</strong>: 지중해 최단 경로로 런던 대비 20% 빠른 지연시간, 17% 단축된 거리</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Brexit 영향</strong>: 런던의 지정학적 불확실성 증가</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>마르세유 장점</strong>: EU 회원국, 프랑스 정부의 디지털 주권 정책 지원</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>결론</strong>: 안정적이고 경제적인 아시아-유럽 연결점으로 부상</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">7.2 투자 권고사항</h3>
            <ol className="text-sm space-y-2 opacity-90">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span><strong>즉시 투자 검토</strong>: 2025년 1분기 완공 전 IRU 확보 필수</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span><strong>KT 공동투자</strong>: 50:50 구조로 리스크 분산 및 시너지 창출</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span><strong>단계적 확장</strong>: 성과 검증 후 추가 경로 IRU 확보 검토</span>
              </li>
            </ol>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="font-bold mb-3">7.3 향후 과제</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">KT와 MOU 체결</h4>
                <ul className="text-xs opacity-90 space-y-1">
                  <li>• 공동투자 구조 협의</li>
                  <li>• 운영 방안 수립</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">컨소시엄 참여</h4>
                <ul className="text-xs opacity-90 space-y-1">
                  <li>• Singtel과 협상</li>
                  <li>• 주요 참여사 접촉</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">운영 체계 구축</h4>
                <ul className="text-xs opacity-90 space-y-1">
                  <li>• IRU 관리 체계</li>
                  <li>• 재판매 전략 수립</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 참고자료 */}
      <div className="bg-gray-100 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-gray-900 mb-4">참고자료</h3>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. [NNA] 싱가포르-프랑스 해저 광케이블 부설 개시 | 아주경제 (2022.02.22)</li>
          <li>2. 해저케이블망과 데이터 안보 | 아산정책연구원 - <a href="https://www.asaninst.org/contents/해저케이블망과-데이터-안보/" className="text-blue-600 hover:underline">https://www.asaninst.org/contents/해저케이블망과-데이터-안보/</a></li>
          <li>3. 마르세유 - 위키백과 - <a href="https://ko.wikipedia.org/wiki/마르세유" className="text-blue-600 hover:underline">https://ko.wikipedia.org/wiki/마르세유</a> (2025.05.16)</li>
          <li>4. TeleGeography Submarine Cable Map - <a href="https://www.submarinecablemap.com" className="text-blue-600 hover:underline">https://www.submarinecablemap.com</a></li>
          <li>5. Singtel Official Press Release - Singapore-France Submarine Cable Project</li>
          <li>6. Orange France Infrastructure Investment Report</li>
        </ol>
      </div>

      {/* 8. 유럽의 주요 DC 현황 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-indigo-600" />
          8. 유럽의 주요 DC 현황
        </h2>
        
        {/* 핵심 인사이트 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">📊 핵심 인사이트</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>지역 집중도</strong>: 유럽 전체 DC 용량 3,640MW 중 영국(1,030MW)과 독일(800MW)이 50% 차지, FLAP-D(Frankfurt, London, Amsterdam, Paris, Dublin) 5개 도시가 전체 용량의 65%를 점유하는 극심한 편중 현상</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>마르세유의 특수성</strong>: 용량은 85MW로 작지만 지중해 해저케이블 허브로서 아시아-유럽 연결의 전략적 요충지 역할, 싱가포르-유럽 IRU 투자의 핵심 거점</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>하이퍼스케일러 주도</strong>: AWS, Azure, Google Cloud가 유럽 전역에 1,750MW 이상 투자, 특히 아일랜드 더블린은 하이퍼스케일러 집중으로 320MW 규모 성장</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>IX 연결성</strong>: DE-CIX Frankfurt(12Tbps), AMS-IX(10Tbps) 등 세계 최대 인터넷 익스체인지 보유로 글로벌 트래픽 허브 역할</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>신흥 시장 부상</strong>: 북유럽(스톡홀름, 오슬로) 친환경 에너지 기반 연 15-20% 고성장, 2025년까지 용량 2배 증가 예상</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>시장 성숙도 양극화</strong>: FLAP-D 성숙 시장은 전력 제약과 높은 임대료로 성장률 8-10% 둔화, Edge DC로 전환 중이며 신흥 시장과의 격차 확대</span>
            </li>
          </ul>
          
          {/* Edge DC 상세 설명 박스 */}
          <div className="bg-white/70 rounded-lg p-4 mt-4 border border-blue-200">
            <h4 className="font-bold text-gray-800 mb-3 text-sm">💡 Edge DC(엣지 데이터센터)란?</h4>
            <p className="text-xs text-gray-700 mb-3">
              <strong>전통적인 대규모 중앙집중식 DC</strong> → <strong>소규모 분산형 Edge DC</strong>로의 전환
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="bg-gray-50 rounded p-2">
                <h5 className="font-semibold text-xs text-gray-800 mb-1">주요 특징</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>위치</strong>: 최종 사용자와 가까운 도시 외곽, 통신 기지국, 기업 사내 등</li>
                  <li>• <strong>규모</strong>: 1-5MW 소규모 (기존 대형 DC는 50-100MW+)</li>
                  <li>• <strong>목적</strong>: 낮은 지연시간(latency) 요구 서비스 제공</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded p-2">
                <h5 className="font-semibold text-xs text-gray-800 mb-1">전환 이유</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li><strong>1. 물리적 제약</strong></li>
                  <li className="ml-2">- 도심 내 대규모 부지 확보 불가능</li>
                  <li className="ml-2">- 전력 공급 한계 (런던, 암스테르담은 신규 DC 전력 제한)</li>
                  <li className="ml-2">- 냉각수 부족, 환경 규제 강화</li>
                  <li><strong>2. 비용 문제</strong></li>
                  <li className="ml-2">- 임대료가 너무 비싸짐 (런던 £150/sq ft)</li>
                  <li className="ml-2">- 전력 비용 상승, 운영비 증가</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded p-2">
                <h5 className="font-semibold text-xs text-gray-800 mb-1">실제 사례</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>런던</strong>: 도심 대형 DC 대신 M25 순환도로 주변 소규모 Edge DC 구축</li>
                  <li>• <strong>프랑크푸르트</strong>: 도시 외곽 산업단지에 Edge DC 네트워크 구축</li>
                  <li>• <strong>암스테르담</strong>: 2019년부터 신규 대형 DC 건설 모라토리엄, Edge DC만 허용</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded p-2">
              <h5 className="font-semibold text-xs text-blue-800 mb-1">새로운 수요</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• 5G, IoT, 자율주행 → 초저지연(1-5ms) 필요</li>
                <li>• 실시간 AI/ML 처리</li>
                <li>• 스트리밍, 게임 등 엣지 컴퓨팅 수요</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.1 주요 데이터센터 허브 도시</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">지역</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">도시</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">총 용량 (MW)</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">DC 개수</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">주요 사업자</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>영국</td>
                    <td className="border border-gray-300 px-4 py-2">런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">850</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">90+</td>
                    <td className="border border-gray-300 px-4 py-2">Equinix, Digital Realty, Telehouse</td>
                    <td className="border border-gray-300 px-4 py-2">유럽 최대 DC 허브, 금융 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">슬라우</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">180</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">25+</td>
                    <td className="border border-gray-300 px-4 py-2">Equinix, ARK Data Centres</td>
                    <td className="border border-gray-300 px-4 py-2">런던 서부 위성 허브</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>영국 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">1,030</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">115+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>독일</td>
                    <td className="border border-gray-300 px-4 py-2">프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">650</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">60+</td>
                    <td className="border border-gray-300 px-4 py-2">Interxion, e-shelter, Equinix</td>
                    <td className="border border-gray-300 px-4 py-2">DE-CIX 위치, 유럽 2위 허브</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">베를린</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">150</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">20+</td>
                    <td className="border border-gray-300 px-4 py-2">NTT, Digital Realty</td>
                    <td className="border border-gray-300 px-4 py-2">동유럽 연결점</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>독일 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">800</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">80+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>네덜란드</td>
                    <td className="border border-gray-300 px-4 py-2">암스테르담</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">450</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">50+</td>
                    <td className="border border-gray-300 px-4 py-2">Equinix, Interxion, Digital Realty</td>
                    <td className="border border-gray-300 px-4 py-2">AMS-IX, 콘텐츠 배포 중심</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">스키폴</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">120</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15+</td>
                    <td className="border border-gray-300 px-4 py-2">Maincubes, Digital Realty</td>
                    <td className="border border-gray-300 px-4 py-2">암스테르담 위성 지역</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>네덜란드 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">570</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">65+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>프랑스</td>
                    <td className="border border-gray-300 px-4 py-2">파리</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">380</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">40+</td>
                    <td className="border border-gray-300 px-4 py-2">Equinix, Interxion, OVHcloud</td>
                    <td className="border border-gray-300 px-4 py-2">서유럽 허브, 클라우드 중심</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">마르세유</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">85</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">10+</td>
                    <td className="border border-gray-300 px-4 py-2">Interxion, Jaguar Network</td>
                    <td className="border border-gray-300 px-4 py-2">지중해 케이블 허브</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>프랑스 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">465</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">50+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">아일랜드</td>
                    <td className="border border-gray-300 px-4 py-2">더블린</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">320</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">35+</td>
                    <td className="border border-gray-300 px-4 py-2">AWS, Google, Microsoft</td>
                    <td className="border border-gray-300 px-4 py-2">하이퍼스케일러 집중</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">스웨덴</td>
                    <td className="border border-gray-300 px-4 py-2">스톡홀름</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">180</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">20+</td>
                    <td className="border border-gray-300 px-4 py-2">Facebook, AWS, Interxion</td>
                    <td className="border border-gray-300 px-4 py-2">북유럽 허브, 친환경 에너지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">스위스</td>
                    <td className="border border-gray-300 px-4 py-2">취리히</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">120</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15+</td>
                    <td className="border border-gray-300 px-4 py-2">Green, Equinix, Safe Host</td>
                    <td className="border border-gray-300 px-4 py-2">금융 데이터 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">스페인</td>
                    <td className="border border-gray-300 px-4 py-2">마드리드</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">150</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">20+</td>
                    <td className="border border-gray-300 px-4 py-2">Equinix, Interxion, Global Switch</td>
                    <td className="border border-gray-300 px-4 py-2">남유럽 허브</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">이탈리아</td>
                    <td className="border border-gray-300 px-4 py-2">밀라노</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">110</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15+</td>
                    <td className="border border-gray-300 px-4 py-2">STACK EMEA, Equinix</td>
                    <td className="border border-gray-300 px-4 py-2">이탈리아 최대 DC 시장</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">벨기에</td>
                    <td className="border border-gray-300 px-4 py-2">브뤼셀</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">95</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12+</td>
                    <td className="border border-gray-300 px-4 py-2">LCL, Proximus</td>
                    <td className="border border-gray-300 px-4 py-2">EU 기관 집중</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}>총계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">3,640 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">460+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}>유럽 전체 DC 용량의 약 75%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.2 하이퍼스케일 데이터센터 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">AWS 유럽 리전</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>eu-west-1</strong> (아일랜드): 3개 AZ, 450MW+</li>
                  <li><strong>eu-west-2</strong> (런던): 3개 AZ, 300MW+</li>
                  <li><strong>eu-west-3</strong> (파리): 3개 AZ, 250MW+</li>
                  <li><strong>eu-central-1</strong> (프랑크푸르트): 3개 AZ, 400MW+</li>
                  <li><strong>eu-north-1</strong> (스톡홀름): 3개 AZ, 200MW+</li>
                  <li><strong>eu-south-1</strong> (밀라노): 3개 AZ, 150MW+</li>
                  <li><strong>eu-south-2</strong> (스페인): 3개 AZ, 계획 중</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Microsoft Azure 유럽 리전</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>West Europe</strong> (네덜란드): 3개 존, 350MW+</li>
                  <li><strong>North Europe</strong> (아일랜드): 3개 존, 300MW+</li>
                  <li><strong>UK South</strong> (런던): 3개 존, 250MW+</li>
                  <li><strong>Germany West Central</strong> (프랑크푸르트): 3개 존, 300MW+</li>
                  <li><strong>France Central</strong> (파리): 3개 존, 200MW+</li>
                  <li><strong>Switzerland North</strong> (취리히): 3개 존, 150MW+</li>
                  <li><strong>Norway East</strong> (오슬로): 3개 존, 180MW+</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3">Google Cloud 유럽 리전</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>europe-west1</strong> (벨기에): 3개 존, 280MW+</li>
                  <li><strong>europe-west2</strong> (런던): 3개 존, 250MW+</li>
                  <li><strong>europe-west3</strong> (프랑크푸르트): 3개 존, 300MW+</li>
                  <li><strong>europe-west4</strong> (네덜란드): 3개 존, 320MW+</li>
                  <li><strong>europe-north1</strong> (핀란드): 3개 존, 200MW+</li>
                  <li><strong>europe-west6</strong> (취리히): 3개 존, 150MW+</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">Meta (Facebook) 데이터센터</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Luleå</strong> (스웨덴): 120MW, 3개 건물</li>
                  <li><strong>Odense</strong> (덴마크): 100MW, 2개 건물</li>
                  <li><strong>Clonee</strong> (아일랜드): 90MW, 2개 건물</li>
                  <li><strong>Papillion</strong> (네브래스카): 계획 중</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.3 주요 코로케이션 사업자</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">사업자</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">유럽 DC 수</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">총 용량 (MW)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">주요 위치</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Equinix</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">65</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">450</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 프랑크푸르트, 암스테르담, 파리</td>
                    <td className="border border-gray-300 px-4 py-2">세계 최대 코로케이션 사업자</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Digital Realty/Interxion</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">55</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">380</td>
                    <td className="border border-gray-300 px-4 py-2">11개국 13개 도시</td>
                    <td className="border border-gray-300 px-4 py-2">유럽 최대 캐리어 중립 DC</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">NTT Communications</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">30</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">200</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 프랑크푸르트, 비엔나</td>
                    <td className="border border-gray-300 px-4 py-2">아시아-유럽 연결 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Global Switch</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">280</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 암스테르담, 파리, 프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2">대규모 캠퍼스형 DC</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Telehouse</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 파리, 프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2">KDDI 자회사, 아시아 연결</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.4 지역별 특징 및 전망</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">FLAP-D 시장 (성숙 시장)</h4>
                <p className="text-xs text-gray-600 mb-2">Frankfurt, London, Amsterdam, Paris, Dublin</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 유럽 DC 용량의 65% 차지</li>
                  <li>• 연평균 성장률: 8-10%</li>
                  <li>• 특징: 높은 임대료, 전력 제약, 규제 강화</li>
                  <li>• 전망: Edge DC로 확장 중</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">신흥 시장</h4>
                <p className="text-xs text-gray-600 mb-2">스톡홀름, 오슬로, 바르샤바, 부다페스트</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 연평균 성장률: 15-20%</li>
                  <li>• 장점: 저렴한 전력, 친환경 에너지</li>
                  <li>• 특징: 하이퍼스케일러 신규 투자 집중</li>
                  <li>• 전망: 2025년까지 용량 2배 증가 예상</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.5 주요 인터넷 익스체인지 (IX)</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">IX 명칭</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">위치</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">피크 트래픽</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">연결 회원</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">DE-CIX Frankfurt</td>
                    <td className="border border-gray-300 px-3 py-2">프랑크푸르트</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">12 Tbps</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">1,100+</td>
                    <td className="border border-gray-300 px-3 py-2">세계 최대 IX</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold">AMS-IX</td>
                    <td className="border border-gray-300 px-3 py-2">암스테르담</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">10 Tbps</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">900+</td>
                    <td className="border border-gray-300 px-3 py-2">유럽 2위 IX</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">LINX</td>
                    <td className="border border-gray-300 px-3 py-2">런던</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">5 Tbps</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">950+</td>
                    <td className="border border-gray-300 px-3 py-2">가장 오래된 IX (1994)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-semibold">France-IX</td>
                    <td className="border border-gray-300 px-3 py-2">파리, 마르세유</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">2.5 Tbps</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">500+</td>
                    <td className="border border-gray-300 px-3 py-2">프랑스 최대 IX</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">MIX Milan</td>
                    <td className="border border-gray-300 px-3 py-2">밀라노</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">1.5 Tbps</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">300+</td>
                    <td className="border border-gray-300 px-3 py-2">남유럽 최대 IX</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 1: 기술 용어 해설 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 1: 기술 용어 해설</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 핵심 기술 용어</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">IRU (Indefeasible Right of Use)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>정의</strong>: 해저케이블 광섬유에 대한 장기 사용권 (통상 15~25년)</li>
                  <li>• <strong>특징</strong>: 물리적 자산에 대한 배타적 권리, 기술 독립성</li>
                  <li>• <strong>장점</strong>: 완전한 통제권, 재판매 가능, 장기적 비용 효율성</li>
                  <li>• <strong>회계처리</strong>: 무형자산으로 계상, 사용기간 동안 상각</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Lit Capacity vs Dark Fiber</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Lit Capacity</strong>: 활성화된 용량, 즉시 사용 가능, 운영자가 관리</li>
                  <li>• <strong>Dark Fiber</strong>: 비활성 광섬유, 직접 장비 설치 필요, 완전한 통제</li>
                  <li>• <strong>비교</strong>: IRU는 Dark Fiber에 가까운 권리, 물리적 자산 성격</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">지중해-홍해 경로 (Mediterranean-Red Sea Route)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>정의</strong>: 아시아에서 수에즈 운하를 거쳐 지중해로 이어지는 해상 경로</li>
                  <li>• <strong>특징</strong>: 케이프 경로 대비 40% 거리 단축, 20~30% 지연시간 감소</li>
                  <li>• <strong>리스크</strong>: 중동 지역 정치적 불안정, 해적 및 테러 위협</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 지역 약어 및 기관</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">SEA-ME-WE</p>
                <p className="text-sm text-gray-600">South East Asia - Middle East - Western Europe</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">AAE-1</p>
                <p className="text-sm text-gray-600">Asia Africa Europe-1</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">FLAG</p>
                <p className="text-sm text-gray-600">Fiberoptic Link Around the Globe</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">PEACE</p>
                <p className="text-sm text-gray-600">Pakistan & East Africa Connecting Europe</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">France-IX</p>
                <p className="text-sm text-gray-600">France Internet Exchange</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">ARCEP</p>
                <p className="text-sm text-gray-600">Autorité de régulation des communications électroniques</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 2: 마르세유 vs 런던 상세 비교 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 2: 마르세유 vs 런던 상세 비교</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 기술적 성능 비교</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">성능 지표</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">마르세유 경로</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">런던 경로</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">차이</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">총 거리</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">19,200km</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">23,000km+</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">-17%</td>
                    <td className="border border-gray-300 px-4 py-2">지중해 최단 경로</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">지연시간 (RTT)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">240ms</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">290ms</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-green-600">-20%</td>
                    <td className="border border-gray-300 px-4 py-2">금융거래 유리</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 경제성 비교</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">건설 및 운영비</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>케이블 건설비</strong>: 마르세유가 런던 대비 15% 저렴</li>
                  <li>• <strong>중계기 비용</strong>: 거리 단축으로 20% 절감</li>
                  <li>• <strong>전력비</strong>: 프랑스가 영국 대비 10% 저렴</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">데이터센터 비용</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>임대료</strong>: 마르세유가 런던 대비 30% 저렴</li>
                  <li>• <strong>인건비</strong>: 프랑스가 영국 대비 15% 저렴</li>
                  <li>• <strong>전체 DC 비용</strong>: 마르세유가 런던 대비 30% 절감</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 지정학적 안정성 비교</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">마르세유 (프랑스)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• EU 회원국: 안정적인 법적 환경</li>
                  <li>• NATO 회원국: 서방 동맹국으로서 안보 협력</li>
                  <li>• 디지털 주권 정책: 정부 차원의 인프라 투자 지원</li>
                  <li>• GDPR 완전 준수: 데이터 보호 규정 원활한 적용</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">런던 (영국)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Brexit 후유증: EU와의 관계 불확실성 지속</li>
                  <li>• 금융 허브 지위 약화: 프랑크푸르트, 파리로 이전 가속화</li>
                  <li>• 스코틀랜드 독립 이슈: 내부 정치적 불안정 요소</li>
                  <li>• 데이터 적정성 결정: EU-영국 간 데이터 이전 복잡성</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 3: 재무 모델링 상세 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 3: 재무 모델링 상세</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 매출 구조 분석 (25년 기준)</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">IRU 재판매 수익 (70%)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 대상 고객: 중소 통신사, 기업 고객</li>
                  <li>• 재판매 단가: 원가의 150~200%</li>
                  <li>• 연간 매출: USD 12~15M</li>
                  <li>• 성장률: 연 3~5% (인플레이션 연동)</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Transit 서비스 수익 (25%)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 서비스 유형: IP Transit, Ethernet Transit</li>
                  <li>• 조건: 트래픽 연 8% 증가, 경쟁 심화</li>
                  <li>• 연간 매출: USD 15M (10년 후)</li>
                  <li>• 연간 순이익 예상: USD 12M</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 컨소시엄 참여사 분석</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Orange (프랑스)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 강점: 유럽 최대 통신사 중 하나, 프랑스 정부 지원</li>
                  <li>• 약점: 아시아 시장 경험 부족</li>
                  <li>• 전략: 아프리카-유럽 연결성 강화</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Bharti Airtel (인도)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 강점: 인도 최대 통신사, 빠른 성장</li>
                  <li>• 약점: 국제 경험 제한적</li>
                  <li>• 전략: 남아시아-중동 허브 구축</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Telecom Egypt</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 강점: 수에즈 운하 지역 독점적 위치</li>
                  <li>• 약점: 단일 국가 의존성</li>
                  <li>• 전략: 중동-아프리카-유럽 중계 허브</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 하이퍼스케일러 투자 동향</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 rounded-lg p-3">
                <h4 className="font-semibold text-indigo-800 mb-2">Google</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 프로젝트: Grace Hopper (미국-영국), Equiano (아프리카-유럽)</li>
                  <li>• 투자 규모: 연간 USD 2~3 Billion</li>
                  <li>• 전략: 클라우드 리전 연결성 최적화</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2">Microsoft</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 프로젝트: MAREA (미국-스페인), AMITIÉ (영국-프랑스)</li>
                  <li>• 특징: Azure 서비스 최적화</li>
                  <li>• 협력사: Facebook과 공동 투자 다수</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2">Amazon</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 전략: AWS 리전 간 연결성 강화</li>
                  <li>• 특징: 기존 케이블 IRU 확보 선호</li>
                  <li>• 투자 패턴: 안정적이고 검증된 경로 중심</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-3">
                <h4 className="font-semibold text-purple-800 mb-2">Meta (Facebook)</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 프로젝트: 2Africa, MAREA</li>
                  <li>• 투자 규모: USD 1B+ (연간)</li>
                  <li>• 전략: 소셜미디어 트래픽 최적화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 4: 법적 및 규제 환경 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 4: 법적 및 규제 환경</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 국제 해저케이블 규제</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">유엔해양법협약 (UNCLOS)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 제79조: 대륙붕에서의 해저케이블 부설권</li>
                  <li>• 제112조: 공해상 케이블 부설의 자유</li>
                  <li>• 제113조: 케이블 손상에 대한 형사 처벌</li>
                  <li>• 제114조: 케이블 소유자의 배상 책임</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">국제전기통신연합 (ITU) 규정</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 기술 표준: ITU-T G.652/G.655 광섬유 표준</li>
                  <li>• 주파수 할당: WDM 시스템 주파수 그리드</li>
                  <li>• 보안 요구사항: 암호화 및 물리적 보안</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 주요국 규제 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">유럽 (EU)</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">프랑스</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 관할 기관: ARCEP (전자통신우편규제청)</li>
                    <li>• 주요 규제: Code des postes et des communications électroniques</li>
                    <li>• EU 규정: GDPR, NIS Directive 완전 준수</li>
                    <li>• 디지털 주권: France Relance 정책 하 인프라 투자 지원</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">아시아</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">말레이시아</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 관할 기관: Malaysian Communications and Multimedia Commission (MCMC)</li>
                      <li>• 주요 규제: Communications and Multimedia Act 1998</li>
                      <li>• 외국인 투자: 49% 제한, 부미푸트라 정책 고려</li>
                      <li>• 데이터 현지화: 특정 데이터 유형 현지 저장 의무</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-800 mb-2">인도</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 관할 기관: Department of Telecommunications (DoT)</li>
                      <li>• 주요 규제: Indian Telegraph Act, IT Act 2000</li>
                      <li>• 외국인 투자: 49% 제한 (보안 심사 필요)</li>
                      <li>• 데이터 현지화: 강화되는 추세</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">이집트</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 관할 기관: National Telecom Regulatory Authority (NTRA)</li>
                      <li>• 특징: 수에즈 운하 지역 케이블 허브</li>
                      <li>• 외국인 투자: 정부 승인 필요</li>
                      <li>• 보안 요구사항: 군사 기관 사전 협의</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 데이터 보호 및 사이버 보안</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">GDPR (일반 데이터 보호 규정)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 적용 범위: EU 내 모든 데이터 처리</li>
                  <li>• 주요 요구사항: 동의, 삭제권, 이동권</li>
                  <li>• 벌금: 연간 매출의 4% 또는 €20M 중 높은 금액</li>
                  <li>• 영향: 마르세유 경로는 GDPR 완전 준수</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">사이버 보안 요구사항</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 암호화: AES-256 이상 권장</li>
                  <li>• 물리적 보안: ISO 27001 인증 필요</li>
                  <li>• 침입 탐지: 24/7 모니터링 체계</li>
                  <li>• 사고 대응: CERT 협력 체계 구축</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 5: 투자 실행 로드맵 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 5: 투자 실행 로드맵</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 2025년 실행 계획</h3>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              <div className="relative flex items-start mb-6">
                <div className="absolute left-8 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                <div className="ml-16">
                  <h4 className="font-semibold text-gray-800 mb-2">Q1 2025: 실사 및 협상</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 기술 실사: 케이블 사양, 경로, 용량 검증</li>
                    <li>• 재무 실사: 비용 구조, 수익성 분석</li>
                    <li>• 법률 검토: 계약 조건, 규제 준수 확인</li>
                    <li>• KT와 파트너십 협상</li>
                  </ul>
                </div>
              </div>

              <div className="relative flex items-start mb-6">
                <div className="absolute left-8 w-4 h-4 bg-green-600 rounded-full -translate-x-1/2"></div>
                <div className="ml-16">
                  <h4 className="font-semibold text-gray-800 mb-2">Q2 2025: 투자 결정 및 계약</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 투자위원회 승인</li>
                    <li>• IRU 계약 체결</li>
                    <li>• 초기 자금 납입 (30%)</li>
                    <li>• 운영 준비 착수</li>
                  </ul>
                </div>
              </div>

              <div className="relative flex items-start mb-6">
                <div className="absolute left-8 w-4 h-4 bg-purple-600 rounded-full -translate-x-1/2"></div>
                <div className="ml-16">
                  <h4 className="font-semibold text-gray-800 mb-2">Q3 2025: 인프라 구축</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 네트워크 장비 조달</li>
                    <li>• NOC 구축 및 인력 채용</li>
                    <li>• 고객 Pre-sale 시작</li>
                    <li>• 테스트베드 구축</li>
                  </ul>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="absolute left-8 w-4 h-4 bg-orange-600 rounded-full -translate-x-1/2"></div>
                <div className="ml-16">
                  <h4 className="font-semibold text-gray-800 mb-2">Q4 2025: 서비스 개시</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 상업 서비스 시작</li>
                    <li>• 초기 고객 온보딩</li>
                    <li>• 24/7 운영 체제 가동</li>
                    <li>• 성능 모니터링 및 최적화</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 핵심 성공 요인</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">기술적 요인</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 최신 DWDM 기술 적용</li>
                  <li>• 99.9% 이상 가용성 확보</li>
                  <li>• 실시간 모니터링 시스템</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">사업적 요인</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 조기 고객 확보 (Pre-sale)</li>
                  <li>• 차별화된 SLA 제공</li>
                  <li>• 유연한 가격 정책</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">운영적 요인</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 24/7 NOC 운영</li>
                  <li>• 신속한 장애 대응</li>
                  <li>• 지속적인 성능 최적화</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 위험 관리 체계</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">기술적 위험 관리</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 다중 경로 백업 확보</li>
                  <li>• 정기적인 성능 모니터링</li>
                  <li>• 예방적 유지보수</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">사업적 위험 관리</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 다양한 고객 포트폴리오</li>
                  <li>• 유연한 계약 조건</li>
                  <li>• 시장 변화 대응 전략</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">재무적 위험 관리</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 환율 헤징 전략</li>
                  <li>• 보험 가입 (해저케이블 전용)</li>
                  <li>• 비상 자금 확보</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 페이지 하단 정보 */}
      <div className="text-center mt-12 pt-8 border-t border-gray-300">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-red-600">기업비밀Ⅱ급</span> | 3 / 3
        </p>
        <p className="text-xs text-gray-500 mt-2">
          본 보고서는 기업비밀Ⅱ급으로 분류되며, 관련 정보의 외부 유출을 금지합니다.
        </p>
      </div>
    </div>
  );
}