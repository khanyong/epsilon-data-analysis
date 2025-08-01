import React, { useState, useEffect } from 'react';
import { fetchCogsByRegion, updateCogsByRegion, resetCogsToDefault, CogsByRegion } from '../services/cogsService';

interface CogsEditorProps {
  onDataChange?: (data: CogsByRegion) => void;
}

export function CogsEditor({ onDataChange }: CogsEditorProps) {
  const [cogsData, setCogsData] = useState<CogsByRegion>({
    mumbai: [20820, 43440, 67740, 93840, 122040],
    chennai: [55520, 111040, 166560, 222080, 277600]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 데이터 로드
  useEffect(() => {
    loadCogsData();
  }, []);

  const loadCogsData = async () => {
    try {
      setLoading(true);
      const data = await fetchCogsByRegion();
      setCogsData(data);
      onDataChange?.(data);
    } catch (error) {
      console.error('COGS 데이터 로드 실패:', error);
      // 데이터베이스 연결 실패 시에도 기본값 사용
      const defaultData = {
        mumbai: [20820, 43440, 67740, 93840, 122040],
        chennai: [55520, 111040, 166560, 222080, 277600]
      };
      setCogsData(defaultData);
      onDataChange?.(defaultData);
      setMessage({ type: 'error', text: '데이터베이스 연결 실패. 기본값을 사용합니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 값 변경 핸들러
  const handleValueChange = (region: 'mumbai' | 'chennai', yearIndex: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setCogsData(prev => ({
      ...prev,
      [region]: prev[region].map((val, index) => 
        index === yearIndex ? numValue : val
      )
    }));
  };

  // 저장
  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      // Mumbai 데이터 저장
      await updateCogsByRegion('mumbai', cogsData.mumbai);
      
      // Chennai 데이터 저장
      await updateCogsByRegion('chennai', cogsData.chennai);

      setMessage({ type: 'success', text: 'COGS 데이터가 성공적으로 저장되었습니다.' });
      onDataChange?.(cogsData);
    } catch (error) {
      console.error('COGS 데이터 저장 실패:', error);
      setMessage({ type: 'error', text: '데이터 저장에 실패했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  // 기본값으로 리셋
  const handleReset = async () => {
    try {
      setSaving(true);
      setMessage(null);

      await resetCogsToDefault();
      await loadCogsData();

      setMessage({ type: 'success', text: 'COGS 데이터가 기본값으로 초기화되었습니다.' });
    } catch (error) {
      console.error('COGS 데이터 리셋 실패:', error);
      setMessage({ type: 'error', text: '데이터 초기화에 실패했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">COGS 데이터 로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">💰 COGS (Cost of Goods Sold) 설정</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            disabled={saving}
            className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            기본값으로 리셋
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mumbai COGS */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-4">🏙️ Mumbai COGS</h4>
          <div className="space-y-3">
            {cogsData.mumbai.map((value, index) => (
              <div key={index} className="flex items-center space-x-3">
                <label className="w-16 text-sm font-medium text-gray-700">
                  {2025 + index}년:
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleValueChange('mumbai', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1000"
                />
                <span className="text-sm text-gray-500 w-20">
                  {formatCurrency(value)}원
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chennai COGS */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-4">🏢 Chennai COGS</h4>
          <div className="space-y-3">
            {cogsData.chennai.map((value, index) => (
              <div key={index} className="flex items-center space-x-3">
                <label className="w-16 text-sm font-medium text-gray-700">
                  {2025 + index}년:
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleValueChange('chennai', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  step="1000"
                />
                <span className="text-sm text-gray-500 w-20">
                  {formatCurrency(value)}원
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COGS 결과 테이블 */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4">📊 COGS 결과 테이블</h4>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                  연도
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">
                  Mumbai COGS
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">
                  Chennai COGS
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">
                  차이 (Chennai - Mumbai)
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">
                  비율 (Chennai/Mumbai)
                </th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((index) => {
                const year = 2025 + index;
                const mumbaiCogs = cogsData.mumbai[index];
                const chennaiCogs = cogsData.chennai[index];
                const difference = chennaiCogs - mumbaiCogs;
                const ratio = mumbaiCogs > 0 ? (chennaiCogs / mumbaiCogs).toFixed(2) : 'N/A';
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                      {year}년
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 border-b border-gray-200">
                      {formatCurrency(mumbaiCogs)}원
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 border-b border-gray-200">
                      {formatCurrency(chennaiCogs)}원
                    </td>
                    <td className={`px-4 py-3 text-sm text-center border-b border-gray-200 ${
                      difference > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {difference > 0 ? '+' : ''}{formatCurrency(difference)}원
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900 border-b border-gray-200">
                      {ratio !== 'N/A' ? `${ratio}x` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
              {/* 합계 행 */}
              <tr className="bg-blue-50 font-bold">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b border-gray-300">
                  <strong>5년 합계</strong>
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 border-b border-gray-300">
                  <strong>{formatCurrency(cogsData.mumbai.reduce((sum, val) => sum + val, 0))}원</strong>
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 border-b border-gray-300">
                  <strong>{formatCurrency(cogsData.chennai.reduce((sum, val) => sum + val, 0))}원</strong>
                </td>
                <td className={`px-4 py-3 text-sm text-center border-b border-gray-300 ${
                  cogsData.chennai.reduce((sum, val) => sum + val, 0) > cogsData.mumbai.reduce((sum, val) => sum + val, 0) 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  <strong>
                    {cogsData.chennai.reduce((sum, val) => sum + val, 0) > cogsData.mumbai.reduce((sum, val) => sum + val, 0) ? '+' : ''}
                    {formatCurrency(cogsData.chennai.reduce((sum, val) => sum + val, 0) - cogsData.mumbai.reduce((sum, val) => sum + val, 0))}원
                  </strong>
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-900 border-b border-gray-300">
                  <strong>
                    {(cogsData.chennai.reduce((sum, val) => sum + val, 0) / cogsData.mumbai.reduce((sum, val) => sum + val, 0)).toFixed(2)}x
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 요약 정보 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-semibold text-gray-800 mb-2">📊 COGS 요약</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-600">Mumbai 총 COGS:</span>
            <span className="ml-2">{formatCurrency(cogsData.mumbai.reduce((sum, val) => sum + val, 0))}원</span>
          </div>
          <div>
            <span className="font-medium text-green-600">Chennai 총 COGS:</span>
            <span className="ml-2">{formatCurrency(cogsData.chennai.reduce((sum, val) => sum + val, 0))}원</span>
          </div>
        </div>
      </div>

      {/* 추가 분석 정보 */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h6 className="font-semibold text-blue-800 mb-2">📈 연평균 성장률</h6>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-blue-600">Mumbai:</span>
              <span className="ml-2">
                {((Math.pow(cogsData.mumbai[4] / cogsData.mumbai[0], 1/4) - 1) * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-green-600">Chennai:</span>
              <span className="ml-2">
                {((Math.pow(cogsData.chennai[4] / cogsData.chennai[0], 1/4) - 1) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h6 className="font-semibold text-green-800 mb-2">💰 연평균 COGS</h6>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-blue-600">Mumbai:</span>
              <span className="ml-2">
                {formatCurrency(cogsData.mumbai.reduce((sum, val) => sum + val, 0) / 5)}원
              </span>
            </div>
            <div>
              <span className="text-green-600">Chennai:</span>
              <span className="ml-2">
                {formatCurrency(cogsData.chennai.reduce((sum, val) => sum + val, 0) / 5)}원
              </span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h6 className="font-semibold text-purple-800 mb-2">⚖️ 비용 효율성</h6>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-purple-600">Chennai/Mumbai 비율:</span>
              <span className="ml-2">
                {(cogsData.chennai.reduce((sum, val) => sum + val, 0) / cogsData.mumbai.reduce((sum, val) => sum + val, 0)).toFixed(2)}x
              </span>
            </div>
            <div>
              <span className="text-purple-600">절약 가능 금액:</span>
              <span className="ml-2 text-green-600">
                {formatCurrency(cogsData.chennai.reduce((sum, val) => sum + val, 0) - cogsData.mumbai.reduce((sum, val) => sum + val, 0))}원
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
        <p className="text-sm text-yellow-800">
          💡 <strong>COGS (Cost of Goods Sold)</strong>는 서비스 제공에 직접적으로 발생하는 비용입니다. 
          네트워크 인프라 유지보수, 고객 지원, 기술 운영 등의 비용이 포함됩니다.
        </p>
      </div>
    </div>
  );
} 