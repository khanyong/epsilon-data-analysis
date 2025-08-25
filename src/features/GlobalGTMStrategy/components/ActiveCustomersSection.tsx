import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, Users, DollarSign, PieChart, BarChart3, Search, Filter } from 'lucide-react';
import gtmActiveData from '../../../../data/gtm/gtm_active_customers.json';

interface ActiveCustomer {
  name_kr: string;
  name_en: string;
  company_count: number;
  total_amount: number;
  total_amount_billions: number;
  avg_per_company: number;
  avg_per_company_billions: number;
}

interface ActiveCustomersData {
  categories: ActiveCustomer[];
  total: {
    company_count: number;
    total_amount: number;
    total_amount_billions: number;
  };
}

const ActiveCustomersSection: React.FC = () => {
  const [data] = useState<ActiveCustomersData>(gtmActiveData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'amount' | 'count' | 'avg'>('amount');

  // 카테고리 색상 매핑
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AX': 'bg-blue-500',
      'CP': 'bg-green-500',
      'IT': 'bg-purple-500',
      'Telco': 'bg-orange-500',
      'Gaming': 'bg-pink-500',
      'Finance': 'bg-yellow-500',
      'Logistics': 'bg-indigo-500',
      'Media': 'bg-red-500',
      'Security': 'bg-gray-500',
      'Real Estate': 'bg-teal-500',
      'Services': 'bg-cyan-500',
      'Energy': 'bg-lime-500',
      'Distribution': 'bg-amber-500',
      'Healthcare': 'bg-emerald-500',
      'Manufacturing': 'bg-slate-500',
      'Other': 'bg-stone-500'
    };
    return colors[category] || 'bg-gray-400';
  };

  // 필터링된 카테고리
  const filteredCategories = data.categories.filter(cat => {
    const matchesSearch = searchTerm === '' || 
      cat.name_kr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSelection = selectedCategories.length === 0 || 
      selectedCategories.includes(cat.name_en);
    
    return matchesSearch && matchesSelection;
  });

  // 정렬된 카테고리
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.total_amount_billions - a.total_amount_billions;
      case 'count':
        return b.company_count - a.company_count;
      case 'avg':
        return b.avg_per_company_billions - a.avg_per_company_billions;
      default:
        return 0;
    }
  });

  // 상위 5개 카테고리 (차트용)
  const topCategories = sortedCategories.slice(0, 5);

  // 통계 계산
  const stats = {
    totalCompanies: filteredCategories.reduce((sum, cat) => sum + cat.company_count, 0),
    totalAmount: filteredCategories.reduce((sum, cat) => sum + cat.total_amount_billions, 0),
    avgPerCompany: filteredCategories.length > 0 
      ? filteredCategories.reduce((sum, cat) => sum + cat.total_amount_billions, 0) / 
        filteredCategories.reduce((sum, cat) => sum + cat.company_count, 0)
      : 0,
    categoryCount: filteredCategories.length
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">활성 고객 현황</h2>
        <p className="text-blue-100">카테고리별 고객사 분포 및 매출 분석</p>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">전체 고객사</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalCompanies.toLocaleString()}</div>
          <div className="text-sm text-gray-600">개사</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">총 매출</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalAmount.toFixed(2)}</div>
          <div className="text-sm text-gray-600">조 원</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500">평균 매출</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgPerCompany.toFixed(3)}</div>
          <div className="text-sm text-gray-600">조 원/고객사</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <PieChart className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-500">카테고리</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.categoryCount}</div>
          <div className="text-sm text-gray-600">개 분야</div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="카테고리 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'amount' | 'count' | 'avg')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="amount">총 매출순</option>
              <option value="count">고객사 수순</option>
              <option value="avg">평균 매출순</option>
            </select>
          </div>
        </div>
      </div>

      {/* 카테고리별 분포 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 막대 차트 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            상위 5개 카테고리 매출
          </h3>
          <div className="space-y-3">
            {topCategories.map((cat, index) => (
              <div key={cat.name_en} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{cat.name_kr} ({cat.name_en})</span>
                  <span className="text-gray-600">{cat.total_amount_billions.toFixed(2)}조 원</span>
                </div>
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${getCategoryColor(cat.name_en)} opacity-80 transition-all duration-500`}
                    style={{ width: `${(cat.total_amount_billions / topCategories[0].total_amount_billions) * 100}%` }}
                  >
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-medium">
                      {cat.company_count}개사
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 파이 차트 (시각적 표현) */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            카테고리별 고객사 분포
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {topCategories.map((cat) => (
              <div key={cat.name_en} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(cat.name_en)}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{cat.name_kr}</div>
                  <div className="text-xs text-gray-600">
                    {cat.company_count}개사 ({((cat.company_count / stats.totalCompanies) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 기타 카테고리 요약 */}
          {sortedCategories.length > 5 && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                기타 {sortedCategories.length - 5}개 카테고리: {' '}
                {sortedCategories.slice(5).reduce((sum, cat) => sum + cat.company_count, 0)}개사
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 상세 테이블 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">카테고리별 상세 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평균 매출
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  비중
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCategories.map((cat) => (
                <tr key={cat.name_en} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getCategoryColor(cat.name_en)} mr-3`} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{cat.name_kr}</div>
                        <div className="text-xs text-gray-500">{cat.name_en}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {cat.company_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {cat.total_amount_billions.toFixed(2)}조 원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {cat.avg_per_company_billions.toFixed(3)}조 원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    <div className="flex items-center justify-end">
                      <span className="mr-2">{((cat.total_amount_billions / data.total.total_amount_billions) * 100).toFixed(1)}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`${getCategoryColor(cat.name_en)} h-2 rounded-full`}
                          style={{ width: `${(cat.total_amount_billions / data.total.total_amount_billions) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-900">
                  합계
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-sm text-gray-900">
                  {stats.totalCompanies.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-sm text-gray-900">
                  {stats.totalAmount.toFixed(2)}조 원
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-sm text-gray-900">
                  {stats.avgPerCompany.toFixed(3)}조 원
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-sm text-gray-900">
                  100%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveCustomersSection;