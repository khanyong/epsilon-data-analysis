import React from 'react';

export function FactbookSectionCompany() {
  return (
    <section id="company" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">1. 회사 개요 <span className="text-xs text-gray-500">(강성욱)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>회사 이력 (Milestone)</li>
        <li>조직도 (최신버전)</li>
        <li>주요 서비스</li>
        <li>주요 고객군</li>
        <li>사무실 location 정보</li>
        <li>라이선스 (백광현)</li>
      </ul>
    </section>
  );
}

export function FactbookSectionOwnership() {
  return (
    <section id="ownership" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">2. 지배구조 및 주주 정보 <span className="text-xs text-gray-500">(강성욱)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>인수 후 주주 내역 정리</li>
        <li>KT 및 대사인 주주별 잔존 반동사항 (일자 등)</li>
        <li>최신 지배구조</li>
        <li>주주명부 및 이사회 구성 및 이사회 내 위원회 운영 현황</li>
        <li>주요 주주간계약 내용 요약 (예: Drag-along, Tag-along 등)</li>
        <li>Post Closing 조건 정리(양수/종료, 관련 체리포드 포함)</li>
      </ul>
    </section>
  );
}

export function FactbookSectionFinance() {
  return (
    <section id="finance" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">3. 재무 정보</h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>PS (외부감사), BS (재무상태표), CF (현금흐름표)</li>
        <li>연도별 비교 및 주요 수치 요약 포함</li>
      </ul>
    </section>
  );
}

export function FactbookSectionValuation() {
  return (
    <section id="valuation" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">4. 손실평가 <span className="text-xs text-gray-500">(강성욱)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>연도별 손실평가 결과 정리</li>
        <li>회계법인 감사 의견 및 이슈 여부</li>
        <li>연도별 최종버전 링크 달기</li>
      </ul>
    </section>
  );
}

export function FactbookSectionInstrument() {
  return (
    <section id="instrument" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">5. 증자과제 분석 <span className="text-xs text-gray-500">(강성욱)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>각 증자과제별 목적 및 기대효과</li>
        <li>필요한 재원 및 자금조달 계획</li>
      </ul>
    </section>
  );
}

export function FactbookSectionExit() {
  return (
    <section id="exit" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">6. Exit Plan 및 IPO 관련 정보 <span className="text-xs text-gray-500">(강성욱, 안수연)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>방송 팀장님 제안 시나리오 정리</li>
        <li>특별 Drag-along 행사 사례 조사</li>
        <li>IPO 요건 (싱가포르/홍콩/한국 비교)</li>
        <li>2025년 IPO 주요 사례 요약</li>
      </ul>
    </section>
  );
}

export function FactbookSectionMarket() {
  return (
    <section id="market" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">7. 시장 정보</h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>시장 동향 및 주요 이슈</li>
      </ul>
    </section>
  );
}

export function FactbookSectionGlobal() {
  return (
    <section id="global" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">8. 글로벌 데이터 시장 <span className="text-xs text-gray-500">(유광용, 남길우, 백광현)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>전세계 밸류체인 (대형 Carrier/중소 Carrier, OTT, DC 등)</li>
        <li>지역별 기반 사업 구조 및 서비스 네트워크</li>
        <li>주요 도시(런던/싱가포르/뉴욕/홍콩 등) 트렌드</li>
        <li>KT 진출 현황</li>
        <li>Epsilon 관점 (특히 싱가포르)</li>
      </ul>
      <h4 className="text-lg font-semibold text-blue-600 mt-4 mb-1">A. 글로벌 데이터센터 코로케이션 시장 <span className="text-xs text-gray-500">(백광현)</span></h4>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>지역별 경쟁 현황 (싱가포르, 런던, 홍콩, 뉴욕)</li>
        <li>Tier1~Tier4 기준 정리</li>
      </ul>
      <h4 className="text-lg font-semibold text-blue-600 mt-4 mb-1">B. 벤치마킹 사례 <span className="text-xs text-gray-500">(남길우, 백광현)</span></h4>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>EU Networks</li>
        <li>NTT</li>
        <li>Equinix</li>
        <li>Megaport</li>
        <li>SG.GS</li>
        <li>업체 비교표 (수익모델, CapEx, 고객군 등)</li>
      </ul>
    </section>
  );
}

export function FactbookSectionNY() {
  return (
    <section id="ny" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">9. 뉴욕 법인 정보 <span className="text-xs text-gray-500">(안수연)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>재무 및 시설 현황 요약</li>
        <li>법인 이력 정리 (설립/재개자/지)</li>
        <li>주요 계약 조건 (Cushman 계약 등)</li>
        <li>시장 임대 트렌드</li>
        <li>임차인 리스트</li>
        <li>Landlord 정보 및 계약조건</li>
        <li>중장기 비교 (Gap)</li>
      </ul>
    </section>
  );
}

export function FactbookSectionVem() {
  return (
    <section id="vem" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">10. VEM 법인 추진 현황 <span className="text-xs text-gray-500">(김강민)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>추진 배경 및 목적</li>
        <li>통합 범위 및 통합 효과</li>
        <li>주요 일정</li>
        <li>비용 최적화 전략</li>
      </ul>
    </section>
  );
}

export function FactbookSectionFbo() {
  return (
    <section id="fbo" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">11. FBO 관련 <span className="text-xs text-gray-500">(남길우)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>신청자격</li>
        <li>프로세스</li>
        <li>선결과제</li>
        <li>주요 효과</li>
      </ul>
    </section>
  );
}

export function FactbookSectionInfra() {
  return (
    <section id="infra" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">12. Epsilon 인프라 현황 <span className="text-xs text-gray-500">(김강민)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>백본 현황</li>
        <li>지역별 코로케이션 현황 (상면/전력 등)</li>
        <li>Pop 위치 및 향후 확장 계획</li>
        <li>해저케이블 기반 대용량 파이프라인 개발 현황</li>
      </ul>
    </section>
  );
}

export function FactbookSectionKt() {
  return (
    <section id="kt" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">13. KT 시너지 사업 효과 <span className="text-xs text-gray-500">(백운조)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>KT 입장에서의 수주 및 매출 효과</li>
        <li>Epsilon 시너지 매출 기대</li>
        <li>해저케이블 기반 대용량 파이프라인 개발 현황</li>
      </ul>
    </section>
  );
}

export function FactbookSectionGrowth() {
  return (
    <section id="growth" className="mb-8">
      <h3 className="text-xl font-bold text-blue-700 mb-2">14. Epsilon 성장 및 TF 조직 이력 <span className="text-xs text-gray-500">(남길우)</span></h3>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>연도별 당시 TF 구성 및 주요 요약</li>
        <li>2023~2025년 연도별 TF 조직 변화 및 업무 포커스</li>
      </ul>
    </section>
  );
}