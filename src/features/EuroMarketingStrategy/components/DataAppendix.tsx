import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface DataTable {
  name: string;
  count: number;
  description: string;
  keyColumns: string[];
}

export function EuroMarketingStrategyDataAppendix() {
  const [dataTables, setDataTables] = useState<DataTable[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataOverview = async () => {
      try {
        // 모든 테이블의 데이터 개수 확인
        const tables: DataTable[] = [
          {
            name: 'euro_pricing_country_routes',
            count: 0,
            description: '국가별 해저케이블 라우트 데이터',
            keyColumns: ['country1', 'country2', 'region1', 'region2', 'year_2023', 'year_2030']
          },
          {
            name: 'euro_pricing_wholesale_prices',
            count: 0,
            description: '도매 가격 데이터',
            keyColumns: ['route_name', 'year_2023', 'year_2030', 'cagr_2023_30']
          },
          {
            name: 'euro_pricing_regions',
            count: 0,
            description: '지역별 집계 데이터',
            keyColumns: ['region_name', 'historical_2023', 'forecast_2030']
          },
          {
            name: 'euro_pricing_countries',
            count: 0,
            description: '국가별 대역폭 데이터',
            keyColumns: ['country_name', 'total_bandwidth_2023', 'total_bandwidth_2030']
          }
        ];

        // 각 테이블의 레코드 수 조회
        for (const table of tables) {
          const { count } = await supabase
            .from(table.name)
            .select('*', { count: 'exact', head: true });
          table.count = count || 0;
        }

        setDataTables(tables);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data overview:', error);
        setLoading(false);
      }
    };

    fetchDataOverview();
  }, []);

  const loadTableData = async (tableName: string) => {
    setSelectedTable(tableName);
    setTableData([]);
    
    try {
      const { data } = await supabase
        .from(tableName)
        .select('*')
        .limit(20);
      
      setTableData(data || []);
    } catch (error) {
      console.error(`Error loading ${tableName}:`, error);
    }
  };

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-blue-700 mb-6">13. 부록 (데이터 참조)</h2>
        <div className="bg-white p-6 rounded-lg border">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">12. 부록 (데이터 참조)</h2>
      
      {/* 데이터 소스 개요 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 데이터 소스 개요</h3>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-4">
            본 보고서의 모든 분석과 권고사항은 아래의 실제 유럽 해저케이블 시장 데이터를 기반으로 작성되었습니다. 
            총 <strong>3,000+ 레코드</strong>의 실제 시장 데이터를 분석하여 객관적이고 실증적인 전략을 제시합니다.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <p className="text-2xl font-bold text-blue-600">
                {dataTables.reduce((sum, table) => sum + table.count, 0).toLocaleString()}
              </p>
              <p className="text-blue-800 text-sm">Total Records</p>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded">
              <p className="text-2xl font-bold text-green-600">{dataTables.length}</p>
              <p className="text-green-800 text-sm">Data Tables</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded">
              <p className="text-2xl font-bold text-purple-600">2023-2030</p>
              <p className="text-purple-800 text-sm">Time Period</p>
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded">
              <p className="text-2xl font-bold text-orange-600">13</p>
              <p className="text-orange-800 text-sm">Regions</p>
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 테이블 목록 */}
      <div className="bg-white p-6 rounded-lg border mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 데이터 테이블 상세</h3>
        
        <div className="space-y-4">
          {dataTables.map((table, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{table.name}</h4>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {table.count.toLocaleString()} records
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{table.description}</p>
              
              <div className="mb-3">
                <h5 className="font-medium text-gray-700 text-sm mb-1">주요 컬럼:</h5>
                <div className="flex flex-wrap gap-2">
                  {table.keyColumns.map((column, colIndex) => (
                    <span key={colIndex} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                      {column}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => loadTableData(table.name)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                데이터 미리보기 →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 테이블 데이터 미리보기 */}
      {selectedTable && tableData.length > 0 && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔍 {selectedTable} 데이터 미리보기 (상위 20개)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(tableData[0] || {}).slice(0, 8).map((column, index) => (
                    <th key={index} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.slice(0, 10).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {Object.values(row).slice(0, 8).map((value: any, colIndex) => (
                      <td key={colIndex} className="px-4 py-2 whitespace-nowrap text-gray-900">
                        {value === null ? 'N/A' : 
                         typeof value === 'number' ? value.toLocaleString() :
                         String(value).length > 30 ? String(value).substring(0, 30) + '...' :
                         String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">
              * 표시된 것은 전체 데이터의 일부입니다. 전체 분석은 모든 레코드를 포함합니다.
            </p>
          </div>
        </div>
      )}

      {/* 데이터 출처 및 방법론 */}
      <div className="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">📚 데이터 출처 및 분석 방법론</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">🔍 데이터 출처</h4>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>• <strong>Q2 2023 Euro Pricing Data:</strong> 업계 공식 보고서</li>
              <li>• <strong>Country Routes:</strong> 2,054개 국가별 연결 라우트</li>
              <li>• <strong>Wholesale Prices:</strong> 120개 주요 라우트 가격</li>
              <li>• <strong>Regional Metrics:</strong> 13개 지역별 세부 데이터</li>
              <li>• <strong>Growth Forecasts:</strong> 2030년까지 성장 예측</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">⚙️ 분석 방법론</h4>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>• <strong>Market Sizing:</strong> 상향식(Bottom-up) 시장 규모 산정</li>
              <li>• <strong>Competitive Analysis:</strong> Porter's Five Forces 모델</li>
              <li>• <strong>CAGR Calculation:</strong> 연평균 복합 성장률 계산</li>
              <li>• <strong>Price Analysis:</strong> 가격 트렌드 및 세그멘테이션</li>
              <li>• <strong>Risk Assessment:</strong> 정량적/정성적 리스크 평가</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}