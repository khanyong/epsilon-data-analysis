import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Search,
  Filter,
  Download,
  Upload,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Calendar,
  AlertCircle,
  BarChart3,
  PieChart,
  Target,
  Building2,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  Plus,
  FileText,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  X
} from 'lucide-react';

interface GTMCustomer {
  id: string;
  business_opportunity_type: string;
  customer_name: string;
  customer_id: string;
  parent_company: string;
  business_number: string;
  headquarters: string;
  department_head: string;
  division: string;
  team: string;
  team_leader: string;
  sales_representative: string;
  revenue_2024: number;
  overseas_presence_2025: boolean;
  kt_global_data_usage_2025: boolean;
  kt_contract_period: string;
  kt_monthly_fee: number;
  other_global_data_usage: boolean;
  other_provider_name: string;
  other_contract_period: string;
  other_monthly_fee: number;
  renewal_date: string;
  usage_intl_dedicated_mpls: boolean;
  usage_sd_wan: boolean;
  usage_internet_vpn: boolean;
  customer_needs: string;
  notes: string;
  status: string;
  priority: string;
  last_contact_date: string;
  next_action_date: string;
  opportunity_value: number;
  win_probability: number;
}

interface GTMStatistics {
  total_customers: number;
  kt_customers: number;
  other_customers: number;
  opportunities_next_90days: number;
  total_kt_monthly_revenue: number;
  total_other_monthly_revenue: number;
}

const GTMDataAnalysis: React.FC = () => {
  const [customers, setCustomers] = useState<GTMCustomer[]>([]);
  const [statistics, setStatistics] = useState<GTMStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'analysis' | 'customers' | 'opportunities'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHeadquarters, setFilterHeadquarters] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState<'revenue' | 'probability' | 'renewal_date'>('revenue');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Partial<GTMCustomer> | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 고객 데이터 조회
      const { data: customersData, error: customersError } = await supabase
        .from('gtm_customers')
        .select('*')
        .order('revenue_2024', { ascending: false, nullsFirst: false });

      if (customersError) throw customersError;
      setCustomers(customersData || []);

      // 통계 데이터 조회
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_gtm_statistics');

      if (statsError) throw statsError;
      if (statsData && statsData.length > 0) {
        setStatistics(statsData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 고객 편집 모달 열기
  const handleEdit = (customer: GTMCustomer) => {
    console.log('Edit button clicked for customer:', customer);
    setEditingCustomer(customer);
    setIsNewCustomer(false);
    setShowEditModal(true);
  };

  // 새 고객 추가 모달 열기
  const handleAddNew = () => {
    setEditingCustomer({
      customer_name: '',
      customer_id: '',
      business_number: '',
      headquarters: '',
      team: '',
      sales_representative: '',
      status: 'active'
    });
    setIsNewCustomer(true);
    setShowEditModal(true);
  };

  // 고객 정보 저장
  const handleSave = async () => {
    if (!editingCustomer) return;
    
    setSaving(true);
    try {
      if (isNewCustomer) {
        // 새 고객 추가
        const { data, error } = await supabase
          .from('gtm_customers')
          .insert([editingCustomer])
          .select();
        
        if (error) throw error;
        if (data) {
          setCustomers([...customers, data[0]]);
        }
      } else {
        // 기존 고객 수정
        const { data, error } = await supabase
          .from('gtm_customers')
          .update(editingCustomer)
          .eq('id', editingCustomer.id)
          .select();
        
        if (error) throw error;
        if (data) {
          setCustomers(customers.map(c => 
            c.id === editingCustomer.id ? data[0] : c
          ));
        }
      }
      
      setShowEditModal(false);
      setEditingCustomer(null);
      
      // 통계 다시 불러오기
      const { data: statsData } = await supabase.rpc('get_gtm_statistics');
      if (statsData && statsData.length > 0) {
        setStatistics(statsData[0]);
      }
      
      alert(isNewCustomer ? '고객이 추가되었습니다.' : '수정이 완료되었습니다.');
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 고객 삭제
  const handleDelete = async (customerId: string) => {
    if (!confirm('정말로 이 고객을 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('gtm_customers')
        .delete()
        .eq('id', customerId);
      
      if (error) throw error;
      
      setCustomers(customers.filter(c => c.id !== customerId));
      alert('삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 필터링된 고객 목록
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHeadquarters = !filterHeadquarters || customer.headquarters === filterHeadquarters;
    const matchesStatus = !filterStatus || customer.status === filterStatus;
    return matchesSearch && matchesHeadquarters && matchesStatus;
  });

  // 영업 기회 분석
  const opportunities = customers.filter(c => 
    c.other_global_data_usage && 
    c.renewal_date && 
    new Date(c.renewal_date) <= new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
  );

  // 본부별 통계
  const headquartersStats = customers.reduce((acc, customer) => {
    const hq = customer.headquarters || 'Unknown';
    if (!acc[hq]) {
      acc[hq] = { 
        count: 0, 
        kt_users: 0, 
        other_users: 0, 
        revenue: 0,
        overseas: 0
      };
    }
    acc[hq].count++;
    if (customer.kt_global_data_usage_2025) acc[hq].kt_users++;
    if (customer.other_global_data_usage) acc[hq].other_users++;
    acc[hq].revenue += customer.revenue_2024 || 0;
    if (customer.overseas_presence_2025) acc[hq].overseas++;
    return acc;
  }, {} as Record<string, any>);

  // 타사 서비스 제공업체 분석
  const providerAnalysis = customers
    .filter(c => c.other_provider_name)
    .reduce((acc, customer) => {
      const provider = customer.other_provider_name;
      if (!acc[provider]) {
        acc[provider] = { count: 0, monthly_revenue: 0, customers: [] };
      }
      acc[provider].count++;
      acc[provider].monthly_revenue += customer.other_monthly_fee || 0;
      acc[provider].customers.push(customer.customer_name);
      return acc;
    }, {} as Record<string, any>);

  // 서비스 사용 패턴 분석
  const servicePatterns = {
    mpls_vpn: customers.filter(c => c.usage_intl_dedicated_mpls).length,
    sd_wan: customers.filter(c => c.usage_sd_wan).length,
    internet_vpn: customers.filter(c => c.usage_internet_vpn).length,
    multiple_services: customers.filter(c => 
      (c.usage_intl_dedicated_mpls ? 1 : 0) + 
      (c.usage_sd_wan ? 1 : 0) + 
      (c.usage_internet_vpn ? 1 : 0) > 1
    ).length
  };

  // 대시보드 렌더링
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 고객</p>
              <p className="text-2xl font-bold">{statistics?.total_customers.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">KT 서비스 사용</p>
              <p className="text-2xl font-bold">{statistics?.kt_customers.toLocaleString()}</p>
              <p className="text-xs text-gray-500">
                {statistics && ((statistics.kt_customers / statistics.total_customers) * 100).toFixed(1)}%
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">타사 서비스 사용</p>
              <p className="text-2xl font-bold">{statistics?.other_customers.toLocaleString()}</p>
              <p className="text-xs text-red-500">영업 기회</p>
            </div>
            <Target className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">90일 내 갱신</p>
              <p className="text-2xl font-bold">{statistics?.opportunities_next_90days.toLocaleString()}</p>
              <p className="text-xs text-orange-500">긴급 대응 필요</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* 월 매출 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">월 매출 현황</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">KT 월 매출</span>
                <span className="font-semibold">
                  {statistics?.total_kt_monthly_revenue.toLocaleString()}억원
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ 
                    width: `${statistics ? (statistics.total_kt_monthly_revenue / (statistics.total_kt_monthly_revenue + statistics.total_other_monthly_revenue) * 100) : 0}%` 
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">타사 월 매출</span>
                <span className="font-semibold">
                  {statistics?.total_other_monthly_revenue.toLocaleString()}억원
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ 
                    width: `${statistics ? (statistics.total_other_monthly_revenue / (statistics.total_kt_monthly_revenue + statistics.total_other_monthly_revenue) * 100) : 0}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 서비스 사용 패턴 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">서비스 사용 패턴</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">MPLS-VPN</span>
              <span className="font-semibold">{servicePatterns.mpls_vpn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">SD-WAN</span>
              <span className="font-semibold">{servicePatterns.sd_wan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Internet VPN</span>
              <span className="font-semibold">{servicePatterns.internet_vpn}</span>
            </div>
            <div className="flex justify-between text-blue-600">
              <span className="text-sm">복수 서비스 사용</span>
              <span className="font-semibold">{servicePatterns.multiple_services}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 본부별 현황 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">본부별 현황</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">본부</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">전체</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">KT</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">타사</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">해외사업</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">매출(억원)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(headquartersStats)
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, 10)
                .map(([hq, stats]) => (
                  <tr key={hq}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hq}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{stats.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-blue-600">{stats.kt_users}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-red-600">{stats.other_users}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600">{stats.overseas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{stats.revenue.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 상세 분석 렌더링
  const renderAnalysis = () => (
    <div className="space-y-6">
      {/* 타사 제공업체 분석 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">타사 서비스 제공업체 분석</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">제공업체별 고객 수</h4>
            <div className="space-y-2">
              {Object.entries(providerAnalysis)
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, 10)
                .map(([provider, data]) => (
                  <div key={provider} className="flex justify-between items-center">
                    <span className="text-sm">{provider}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{data.count}개사</span>
                      <span className="text-xs text-gray-500">
                        ({data.monthly_revenue.toFixed(1)}억원/월)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">갱신 일정</h4>
            <div className="space-y-2">
              {opportunities
                .sort((a, b) => new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime())
                .slice(0, 10)
                .map(customer => {
                  const daysUntilRenewal = Math.ceil(
                    (new Date(customer.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div key={customer.id} className="flex justify-between items-center">
                      <span className="text-sm truncate max-w-xs">{customer.customer_name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          daysUntilRenewal <= 30 ? 'text-red-600' : 
                          daysUntilRenewal <= 90 ? 'text-orange-600' : 
                          'text-gray-600'
                        }`}>
                          {daysUntilRenewal}일 후
                        </span>
                        <span className="text-xs text-gray-500">
                          ({customer.other_provider_name})
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* 해외사업 기회 분석 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">해외사업 기회 분석</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">해외사업장 보유 고객</h4>
            <div className="space-y-2">
              {customers
                .filter(c => c.overseas_presence_2025)
                .slice(0, 10)
                .map(customer => (
                  <div key={customer.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <div>
                      <span className="text-sm font-medium">{customer.customer_name}</span>
                      <span className="text-xs text-gray-500 ml-2">({customer.headquarters})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {customer.kt_global_data_usage_2025 ? (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">KT 사용중</span>
                      ) : customer.other_global_data_usage ? (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">타사 사용중</span>
                      ) : (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">신규 기회</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">서비스 전환 가능성</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">긴급 (30일 내)</span>
                  <span className="font-bold text-red-600">
                    {opportunities.filter(o => {
                      const days = Math.ceil((new Date(o.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                      return days <= 30;
                    }).length}건
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">단기 (90일 내)</span>
                  <span className="font-bold text-orange-600">
                    {opportunities.filter(o => {
                      const days = Math.ceil((new Date(o.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                      return days > 30 && days <= 90;
                    }).length}건
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">중기 (180일 내)</span>
                  <span className="font-bold text-blue-600">
                    {opportunities.filter(o => {
                      const days = Math.ceil((new Date(o.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                      return days > 90 && days <= 180;
                    }).length}건
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 고객 니즈 분석 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">고객 니즈 및 불만사항</h3>
        <div className="space-y-3">
          {customers
            .filter(c => c.customer_needs)
            .slice(0, 5)
            .map(customer => (
              <div key={customer.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium">{customer.customer_name}</span>
                  <span className="text-xs text-gray-500">{customer.other_provider_name || 'N/A'}</span>
                </div>
                <p className="text-sm text-gray-600">{customer.customer_needs}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // 영업 기회 렌더링
  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">영업 기회 목록</h3>
          <div className="flex gap-2">
            <select 
              className="px-3 py-1 border rounded-md text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="revenue">매출 순</option>
              <option value="probability">성공률 순</option>
              <option value="renewal_date">갱신일 순</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">현재 제공사</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">월 요금</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">갱신일</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">기회가치</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">성공률</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">우선순위</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">액션</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opportunities
                .sort((a, b) => {
                  switch(sortBy) {
                    case 'revenue':
                      return (b.other_monthly_fee || 0) - (a.other_monthly_fee || 0);
                    case 'probability':
                      return (b.win_probability || 0) - (a.win_probability || 0);
                    case 'renewal_date':
                      return new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime();
                    default:
                      return 0;
                  }
                })
                .map(customer => {
                  const daysUntilRenewal = Math.ceil(
                    (new Date(customer.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.customer_name}</div>
                          <div className="text-xs text-gray-500">{customer.headquarters}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.other_provider_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {customer.other_monthly_fee?.toFixed(2)}억원
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div>
                          <div>{new Date(customer.renewal_date).toLocaleDateString('ko-KR')}</div>
                          <div className={`text-xs ${
                            daysUntilRenewal <= 30 ? 'text-red-600 font-bold' : 
                            daysUntilRenewal <= 90 ? 'text-orange-600' : 
                            'text-gray-500'
                          }`}>
                            {daysUntilRenewal}일 후
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {customer.opportunity_value?.toFixed(1) || '-'}억원
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${customer.win_probability || 0}%` }}
                            />
                          </div>
                          <span className="ml-2 text-xs">{customer.win_probability || 0}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.priority === 'high' ? 'bg-red-100 text-red-800' :
                          customer.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.priority || 'normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setEditingId(customer.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 필터 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterHeadquarters, filterStatus]);

  // 고객 목록 렌더링
  const renderCustomers = () => {
    // 페이지네이션 계산
    const totalItems = filteredCustomers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">고객 관리</h3>
              <span className="text-sm text-gray-500">
                총 {totalItems.toLocaleString()}개 중 {startIndex + 1}-{Math.min(endIndex, totalItems)} 표시
              </span>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="고객명 또는 ID 검색"
                  className="pl-10 pr-4 py-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <select
                className="px-3 py-2 border rounded-md"
                value={filterHeadquarters}
                onChange={(e) => {
                  setFilterHeadquarters(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">전체 본부</option>
                {Object.keys(headquartersStats).map(hq => (
                  <option key={hq} value={hq}>{hq}</option>
                ))}
              </select>
              <select
                className="px-3 py-2 border rounded-md"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={20}>20개씩</option>
                <option value={50}>50개씩</option>
                <option value={100}>100개씩</option>
                <option value={200}>200개씩</option>
                <option value={500}>500개씩</option>
              </select>
              <button 
                onClick={handleAddNew}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                새 고객 추가
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Excel 다운로드
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">번호</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객정보</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">조직</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">서비스 현황</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">해외사업</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">매출</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">액션</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.customer_name}</div>
                      <div className="text-xs text-gray-500">{customer.customer_id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div>
                      <div>{customer.headquarters}</div>
                      <div className="text-xs text-gray-500">{customer.team}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div className="flex justify-center gap-1">
                      {customer.kt_global_data_usage_2025 && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">KT</span>
                      )}
                      {customer.other_global_data_usage && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                          {customer.other_provider_name || '타사'}
                        </span>
                      )}
                      {!customer.kt_global_data_usage_2025 && !customer.other_global_data_usage && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">미사용</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    {customer.overseas_presence_2025 ? (
                      <Globe className="h-4 w-4 text-green-600 mx-auto" />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    {customer.revenue_2024?.toLocaleString() || '-'}억원
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(customer);
                        }}
                        title="수정"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(customer.id);
                        }}
                        title="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* 페이지네이션 컨트롤 */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            전체 {totalItems.toLocaleString()}개 데이터
          </div>
          
          <div className="flex items-center gap-2">
            {/* 처음 페이지 */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border hover:bg-gray-50 text-gray-700'
              }`}
            >
              처음
            </button>
            
            {/* 이전 페이지 */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border hover:bg-gray-50 text-gray-700'
              }`}
            >
              이전
            </button>
            
            {/* 페이지 번호들 */}
            <div className="flex gap-1">
              {(() => {
                const pageNumbers = [];
                const maxPagesToShow = 10;
                let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
                let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
                
                if (endPage - startPage < maxPagesToShow - 1) {
                  startPage = Math.max(1, endPage - maxPagesToShow + 1);
                }
                
                if (startPage > 1) {
                  pageNumbers.push(
                    <button
                      key={1}
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-1 rounded bg-white border hover:bg-gray-50 text-gray-700"
                    >
                      1
                    </button>
                  );
                  if (startPage > 2) {
                    pageNumbers.push(
                      <span key="dots1" className="px-2 py-1">...</span>
                    );
                  }
                }
                
                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }
                
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pageNumbers.push(
                      <span key="dots2" className="px-2 py-1">...</span>
                    );
                  }
                  pageNumbers.push(
                    <button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 rounded bg-white border hover:bg-gray-50 text-gray-700"
                    >
                      {totalPages}
                    </button>
                  );
                }
                
                return pageNumbers;
              })()}
            </div>
            
            {/* 다음 페이지 */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border hover:bg-gray-50 text-gray-700'
              }`}
            >
              다음
            </button>
            
            {/* 마지막 페이지 */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border hover:bg-gray-50 text-gray-700'
              }`}
            >
              마지막
            </button>
            
            {/* 페이지 직접 입력 */}
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-600">페이지</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 px-2 py-1 border rounded text-center"
              />
              <span className="text-sm text-gray-600">/ {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  // 편집 모달 컴포넌트
  const renderEditModal = () => {
    if (!showEditModal || !editingCustomer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {isNewCustomer ? '새 고객 추가' : '고객 정보 수정'}
            </h2>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingCustomer(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* 기본 정보 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    고객명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.customer_name || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      customer_name: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    고객 ID
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.customer_id || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      customer_id: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    사업자번호
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.business_number || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      business_number: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    그룹사(모기업)
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.parent_company || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      parent_company: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 조직 정보 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">조직 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">본부</label>
                  <input
                    type="text"
                    value={editingCustomer.headquarters || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      headquarters: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">담당</label>
                  <input
                    type="text"
                    value={editingCustomer.department_head || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      department_head: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">팀</label>
                  <input
                    type="text"
                    value={editingCustomer.team || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      team: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">영업대표</label>
                  <input
                    type="text"
                    value={editingCustomer.sales_representative || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      sales_representative: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 서비스 정보 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    2024년 매출 (억원)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingCustomer.revenue_2024 || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      revenue_2024: parseFloat(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    해외사업장 보유 (2025)
                  </label>
                  <select
                    value={editingCustomer.overseas_presence_2025 ? 'true' : 'false'}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      overseas_presence_2025: e.target.value === 'true'
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="false">없음</option>
                    <option value="true">있음</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KT 글로벌데이터 사용 (2025)
                  </label>
                  <select
                    value={editingCustomer.kt_global_data_usage_2025 ? 'true' : 'false'}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      kt_global_data_usage_2025: e.target.value === 'true'
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="false">미사용</option>
                    <option value="true">사용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KT 월 요금 (억원)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingCustomer.kt_monthly_fee || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      kt_monthly_fee: parseFloat(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 타사 서비스 정보 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">타사 서비스 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    타사 글로벌데이터 사용
                  </label>
                  <select
                    value={editingCustomer.other_global_data_usage ? 'true' : 'false'}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      other_global_data_usage: e.target.value === 'true'
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="false">미사용</option>
                    <option value="true">사용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    타사명
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.other_provider_name || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      other_provider_name: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    타사 월 요금 (억원)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingCustomer.other_monthly_fee || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      other_monthly_fee: parseFloat(e.target.value)
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    재계약 시점
                  </label>
                  <input
                    type="date"
                    value={editingCustomer.renewal_date || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      renewal_date: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 기타 정보 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">기타 정보</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    고객 니즈/불편사항
                  </label>
                  <textarea
                    value={editingCustomer.customer_needs || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      customer_needs: e.target.value
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비고 (국가/도시 등)
                  </label>
                  <textarea
                    value={editingCustomer.notes || ''}
                    onChange={(e) => setEditingCustomer({
                      ...editingCustomer,
                      notes: e.target.value
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingCustomer(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !editingCustomer.customer_name}
              className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
                saving || !editingCustomer.customer_name
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  저장
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GTM Data Analysis</h1>
          <p className="text-gray-600 mt-2">KT 글로벌 영업 전략 데이터 분석 및 관리</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                selectedTab === 'dashboard' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedTab('dashboard')}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                대시보드
              </div>
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                selectedTab === 'analysis' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedTab('analysis')}
            >
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                상세 분석
              </div>
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                selectedTab === 'opportunities' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedTab('opportunities')}
            >
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                영업 기회
                {statistics && statistics.opportunities_next_90days > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {statistics.opportunities_next_90days}
                  </span>
                )}
              </div>
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                selectedTab === 'customers' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedTab('customers')}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                고객 관리
              </div>
            </button>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div>
          {selectedTab === 'dashboard' && renderDashboard()}
          {selectedTab === 'analysis' && renderAnalysis()}
          {selectedTab === 'opportunities' && renderOpportunities()}
          {selectedTab === 'customers' && renderCustomers()}
        </div>
      </div>
      
      {/* 편집 모달 */}
      {renderEditModal()}
    </div>
  );
};

export default GTMDataAnalysis;