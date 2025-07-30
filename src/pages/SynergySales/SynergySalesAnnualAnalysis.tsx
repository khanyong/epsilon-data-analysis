import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

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

export function SynergySalesAnnualAnalysis() {
  const [annualData, setAnnualData] = useState<AnnualSalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryAnnualData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('detail');
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [cacheExpiry] = useState(5 * 60 * 1000); // 5분 캐시

  useEffect(() => {
    fetchAnnualData();
  }, []);

  const fetchAnnualData = async () => {
    try {
      // 캐시 확인
      const now = Date.now();
      if (annualData.length > 0 && (now - lastFetchTime) < cacheExpiry) {
        console.log('✅ 캐시된 데이터 사용');
        return;
      }

      setLoading(true);
      setError(null);

      console.log('🔄 연도별 합산 데이터 로딩 중...');

      // 성능 최적화: 데이터베이스 뷰 사용 시도
      const { data: viewData, error: viewError } = await supabase
        .from('synergy_sales_annual_view')
        .select('*');

      if (!viewError && viewData) {
        console.log('✅ 데이터베이스 뷰 사용');
        setAnnualData(viewData);
        const calculatedCategoryData = calculateCategorySums(viewData);
        setCategoryData(calculatedCategoryData);
        setLastFetchTime(now);
        return;
      }

      // 뷰가 없으면 RPC 함수 시도
      const { data: detailData, error: detailError } = await supabase
        .rpc('get_annual_sales_summary');

      if (detailError) {
        console.error('❌ 상세 데이터 로딩 실패:', detailError);
        // RPC 함수가 없으면 직접 쿼리 실행
        const { data: rawData, error: fetchError } = await supabase
          .from('synergy_sales')
          .select('*');

        if (fetchError) {
          throw new Error(`데이터 로딩 실패: ${fetchError.message}`);
        }

        if (!rawData || rawData.length === 0) {
          throw new Error('synergy_sales 테이블에 데이터가 없습니다.');
        }

        // 클라이언트에서 연도별 합산 계산
        const calculatedData = calculateAnnualSums(rawData);
        setAnnualData(calculatedData);

        // 카테고리별 합산 계산
        const calculatedCategoryData = calculateCategorySums(calculatedData);
        setCategoryData(calculatedCategoryData);
      } else {
        setAnnualData(detailData);
        // 카테고리별 합산 계산
        const calculatedCategoryData = calculateCategorySums(detailData);
        setCategoryData(calculatedCategoryData);
      }

      setLastFetchTime(now);
      console.log('✅ 연도별 합산 데이터 로딩 완료');

    } catch (err) {
      console.error('❌ 분석 중 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAnnualSums = (rawData: any[]): AnnualSalesData[] => {
    return rawData.map(row => ({
      Category: row.Category || '',
      Customer: row.Customer || '',
      Channel: row.Channel || '',
      End_Customer: row.End_Customer || '',
      SD_WAN: row.SD_WAN || '',
      "2022_Total": calculateYearSum(row, '22'),
      "2023_Total": calculateYearSum(row, '23'),
      "2024_Total": calculateYearSum(row, '24'),
      "2025_Total": calculateYearSum(row, '25'),
      "2026_Total": calculateYearSum(row, '26'),
    }));
  };

  const calculateYearSum = (row: any, yearPrefix: string): number => {
    let sum = 0;
    const yearValues: { [key: string]: any } = {};
    
    for (let month = 1; month <= 12; month++) {
      const columnName = `${yearPrefix}-${month.toString().padStart(2, '0')}`;
      const value = row[columnName];
      yearValues[columnName] = value;
      
      // 안전한 숫자 변환
      if (value !== null && value !== undefined && value !== '') {
        const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
        if (!isNaN(numValue)) {
          sum += numValue;
        }
      }
    }
    
    // 디버깅 로그 (첫 번째 행만)
    if (row.Category === 'Epsilon Off-net 소싱' && row.Customer === 'Epsilon') {
      console.log(`🔍 ${yearPrefix}년 계산 디버깅:`, {
        category: row.Category,
        customer: row.Customer,
        yearValues,
        sum
      });
    }
    
    return sum;
  };

  const calculateCategorySums = (data: AnnualSalesData[]): CategoryAnnualData[] => {
    const categoryMap = new Map<string, CategoryAnnualData>();

    data.forEach(row => {
      const category = row.Category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          Category: category,
          "2022_Total": 0,
          "2023_Total": 0,
          "2024_Total": 0,
          "2025_Total": 0,
          "2026_Total": 0,
        });
      }

      const current = categoryMap.get(category)!;
      current["2022_Total"] += row["2022_Total"];
      current["2023_Total"] += row["2023_Total"];
      current["2024_Total"] += row["2024_Total"];
      current["2025_Total"] += row["2025_Total"];
      current["2026_Total"] += row["2026_Total"];
    });

    return Array.from(categoryMap.values()).sort((a, b) => a.Category.localeCompare(b.Category));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">연도별 합산 데이터를 로딩 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ 오류 발생</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchAnnualData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          시너지 매출 연도별 합산 분석
        </h1>
        <p className="text-gray-600">
          synergy_sales 테이블의 월별 데이터를 연도별로 합산한 분석
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('detail')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'detail'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            상세 데이터
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'category'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            카테고리별 합계
          </button>
        </nav>
      </div>

      {/* 콘텐츠 */}
      {activeTab === 'detail' && (
        <DetailTab data={annualData} formatCurrency={formatCurrency} />
      )}
      {activeTab === 'category' && (
        <CategoryTab data={categoryData} formatCurrency={formatCurrency} />
      )}
    </div>
  );
}

function DetailTab({ data, formatCurrency }: { data: AnnualSalesData[]; formatCurrency: (amount: number) => string }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">상세 연도별 합산 데이터</h2>
            <p className="text-sm text-gray-600 mt-1">
              각 행의 월별 데이터를 연도별로 합산한 결과 (총 {data.length}개 레코드)
            </p>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Unit: USD
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                채널
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                최종고객
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SD-WAN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2022년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2023년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2024년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2025년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2026년 합계
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.Category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.Customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.Channel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.End_Customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.SD_WAN}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2022_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2023_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2024_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2025_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2026_Total"])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryTab({ data, formatCurrency }: { data: CategoryAnnualData[]; formatCurrency: (amount: number) => string }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">카테고리별 연도 합계</h2>
            <p className="text-sm text-gray-600 mt-1">
              카테고리별로 연도 합계를 집계한 결과
            </p>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Unit: USD
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2022년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2023년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2024년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2025년 합계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                2026년 합계
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.Category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2022_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2023_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2024_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2025_Total"])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(row["2026_Total"])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 