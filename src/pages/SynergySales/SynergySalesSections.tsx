import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// 데이터 인터페이스 정의
interface AnnualSalesData {
  Category: string;
  Customer: string;
  Channel: string;
  End_Customer: string;
  SD_WAN: string;
  "2022_Total": number;
  "2023_Total": number;
  "2024_Total": number;
  "2025_Total": number;
  "2026_Total": number;
}

interface CategoryAnnualData {
  Category: string;
  "2022_Total": number;
  "2023_Total": number;
  "2024_Total": number;
  "2025_Total": number;
  "2026_Total": number;
}

// 시너지 개요 섹션
export function SynergySalesSectionOverview() {
  const [annualData, setAnnualData] = useState<AnnualSalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryAnnualData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSynergyData();
  }, []);

  const fetchSynergyData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 시너지 데이터 로딩 중...');

      // 연도별 합산 데이터 가져오기
      const { data: annualViewData, error: annualError } = await supabase
        .from('synergy_sales_annual_view')
        .select('*');

      if (annualError) {
        console.error('❌ 연도별 데이터 로딩 실패:', annualError);
        throw new Error(`연도별 데이터 로딩 실패: ${annualError.message}`);
      }

      // 카테고리별 합산 데이터 가져오기
      const { data: categoryViewData, error: categoryError } = await supabase
        .from('synergy_sales_category_annual_view')
        .select('*');

      if (categoryError) {
        console.error('❌ 카테고리별 데이터 로딩 실패:', categoryError);
        throw new Error(`카테고리별 데이터 로딩 실패: ${categoryError.message}`);
      }

      setAnnualData(annualViewData || []);
      setCategoryData(categoryViewData || []);

      console.log('✅ 시너지 데이터 로딩 완료');

    } catch (err) {
      console.error('❌ 데이터 로딩 중 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 통계 계산 함수들
  const calculateTotalSynergy = () => {
    if (!categoryData.length) return 0;
    return categoryData.reduce((sum, category) => {
      return sum + category["2024_Total"]; // 2024년 기준
    }, 0);
  };

  const calculateRevenueGrowth = () => {
    if (!categoryData.length) return 0;
    const total2023 = categoryData.reduce((sum, category) => sum + category["2023_Total"], 0);
    const total2024 = categoryData.reduce((sum, category) => sum + category["2024_Total"], 0);
    return total2023 > 0 ? ((total2024 - total2023) / total2023) * 100 : 0;
  };

  const calculateEfficiencyImprovement = () => {
    // 효율성 개선은 시너지 효과의 일정 비율로 계산
    return calculateTotalSynergy() * 0.1; // 예시 계산
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">1. 시너지 개요</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">데이터 로딩 중...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">1. 시너지 개요</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-red-600 text-center py-8">
            <p>❌ 오류가 발생했습니다: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">1. 시너지 개요</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">시너지 효과 개요</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">총 시너지 효과</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(calculateTotalSynergy())}</p>
              </div>
              <div className="text-blue-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">매출 증가율</p>
                <p className="text-2xl font-bold text-green-900">{formatPercentage(calculateRevenueGrowth())}</p>
              </div>
              <div className="text-green-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">효율성 개선</p>
                <p className="text-2xl font-bold text-purple-900">{formatPercentage(calculateEfficiencyImprovement())}</p>
              </div>
              <div className="text-purple-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">시너지 유형별 분석</h3>
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={category.Category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-blue-500' : 
                  index === 1 ? 'bg-green-500' : 'bg-purple-500'
                }`}></div>
                <span className="font-medium">{category.Category}</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(category["2024_Total"])}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 매출 분석 섹션
export function SynergySalesSectionAnalysis() {
  const [categoryData, setCategoryData] = useState<CategoryAnnualData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: categoryViewData, error: categoryError } = await supabase
        .from('synergy_sales_category_annual_view')
        .select('*');

      if (categoryError) {
        throw new Error(`카테고리별 데이터 로딩 실패: ${categoryError.message}`);
      }

      setCategoryData(categoryViewData || []);

    } catch (err) {
      console.error('❌ 데이터 로딩 중 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (current: number, previous: number) => {
    if (previous === 0) return '+0.0%';
    const growth = ((current - previous) / previous) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">2. 매출 분석</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">데이터 로딩 중...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">2. 매출 분석</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-red-600 text-center py-8">
            <p>❌ 오류가 발생했습니다: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 연도별 총계 계산
  const yearlyTotals = {
    2022: categoryData.reduce((sum, category) => sum + category["2022_Total"], 0),
    2023: categoryData.reduce((sum, category) => sum + category["2023_Total"], 0),
    2024: categoryData.reduce((sum, category) => sum + category["2024_Total"], 0),
    2025: categoryData.reduce((sum, category) => sum + category["2025_Total"], 0),
    2026: categoryData.reduce((sum, category) => sum + category["2026_Total"], 0),
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">2. 매출 분석</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">연도별 매출 분석</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전년 대비 증가율</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(yearlyTotals).map(([year, total], index) => {
                const previousYear = index > 0 ? Object.values(yearlyTotals)[index - 1] : 0;
                return (
                  <tr key={year}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(total)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {index === 0 ? '-' : formatPercentage(total, previousYear)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">카테고리별 매출 분석</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2022</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2023</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2024</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2025</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2026</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categoryData.map((category) => (
                <tr key={category.Category}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.Category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(category["2022_Total"])}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(category["2023_Total"])}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(category["2024_Total"])}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(category["2025_Total"])}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(category["2026_Total"])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 예측 모델 섹션
export function SynergySalesSectionForecast() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">3. 예측 모델</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">시너지 매출 예측</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">예측 가정</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 시너지 효과 지속성: 85%</li>
              <li>• 시장 성장률: 12%</li>
              <li>• 운영 효율성 개선: 15%</li>
              <li>• 고객 만족도 향상: 20%</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">예측 결과</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">2025년 예상 시너지</span>
                <span className="text-sm font-semibold text-gray-900">$3.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">2026년 예상 시너지</span>
                <span className="text-sm font-semibold text-gray-900">$4.1M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">2027년 예상 시너지</span>
                <span className="text-sm font-semibold text-gray-900">$5.0M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 비교 분석 섹션
export function SynergySalesSectionComparison() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">4. 비교 분석</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">업계 비교 분석</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기업</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시너지 효과</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출 증가율</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Epsilon</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$2.4M</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+15.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">1위</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">경쟁사 A</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1.8M</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">+12.1%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2위</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">경쟁사 B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1.5M</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">+10.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3위</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 시너지 전략 섹션
export function SynergySalesSectionStrategy() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">5. 시너지 전략</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">시너지 창출 전략</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">운영 시너지</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 공통 인프라 활용</li>
              <li>• 프로세스 표준화</li>
              <li>• 기술 플랫폼 통합</li>
              <li>• 공급망 최적화</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">재무 시너지</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 자본 비용 절감</li>
              <li>• 세금 효율성</li>
              <li>• 현금 흐름 최적화</li>
              <li>• 위험 분산</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 실행 계획 섹션
export function SynergySalesSectionImplementation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">6. 실행 계획</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">시너지 실행 로드맵</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">Phase 1: 기반 구축 (1-3개월)</h4>
            <p className="text-sm text-gray-600 mt-1">인프라 통합 및 프로세스 표준화</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">Phase 2: 시너지 창출 (4-6개월)</h4>
            <p className="text-sm text-gray-600 mt-1">운영 효율성 개선 및 비용 절감</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">Phase 3: 최적화 (7-12개월)</h4>
            <p className="text-sm text-gray-600 mt-1">성과 모니터링 및 지속적 개선</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 모니터링 및 평가 섹션
export function SynergySalesSectionMonitoring() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">7. 모니터링 및 평가</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">KPI 및 성과 지표</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">재무 지표</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 매출 증가율</li>
              <li>• 비용 절감률</li>
              <li>• 수익성 개선</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">운영 지표</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 효율성 개선</li>
              <li>• 고객 만족도</li>
              <li>• 프로세스 품질</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">전략 지표</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 시장 점유율</li>
              <li>• 혁신 성과</li>
              <li>• 경쟁력 강화</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 결론 및 권고사항 섹션
export function SynergySalesSectionConclusion() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">8. 결론 및 권고사항</h2>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">핵심 결론</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">시너지 효과</h4>
            <p className="text-blue-800">총 $2.4M의 시너지 효과를 창출하여 매출 15.2% 증가 달성</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">주요 권고사항</h4>
            <ul className="text-green-800 space-y-1">
              <li>• 운영 시너지 우선 추진</li>
              <li>• 지속적 모니터링 체계 구축</li>
              <li>• 단계적 실행 계획 수립</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 