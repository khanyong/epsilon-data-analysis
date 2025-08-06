import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// 유틸리티 함수들
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

// 기업 데이터 타입 정의
interface Company {
  id: number;
  name: string;
  industry: string;
  entryType: string;
  entryYear: string;
  isTarget: boolean;
  salesDivision: string;
  description: string;
  region: string;
}

// 타겟 통계 타입 정의
interface TargetStats {
  total: number;
  withSalesDivision: number;
  withoutSalesDivision: number;
  targetRatio: number;
}

export function BusinessFeasibilitySectionTargetCustomers() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortField, setSortField] = useState('name'); // 정렬 필드
  const [sortDirection, setSortDirection] = useState('asc'); // 정렬 방향
  
  // 필터링 상태 추가
  const [filterType, setFilterType] = useState<'all' | 'withSalesDivision' | 'withoutSalesDivision'>('all');
  
  // 삭제 관련 상태 추가
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 수정 관련 상태 추가
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    company_name_kr: '',
    company_name_en: '',
    industry_major: '',
    industry_minor: '',
    entry_type: '',
    sales_division: '',
    local_address: '',
    phone: '',
    email: ''
  });

  // 추가 관련 상태 추가
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    company_name_kr: '',
    company_name_en: '',
    industry_major: '',
    industry_minor: '',
    entry_type: '',
    sales_division: '',
    local_address: '',
    phone: '',
    email: '',
    country: '인도',
    city: activeRegion === 'mumbai' ? '뭄바이(Mumbai)' : '첸나이(Chennai)',
    office: activeRegion === 'mumbai' ? '뭄바이' : '첸나이'
  });

  // 목표 수치 (이미지 기준) - 하드코딩
  const targetNumbers = {
    mumbai: {
      total: 68,
      withSalesDivision: 10,
      targetRatio: 0.15 // 15%
    },
    chennai: {
      total: 205,
      withSalesDivision: 174,
      targetRatio: 0.85 // 85%
    }
  };

  // 현재 Supabase 데이터 상태
  const [mumbaiCompanies, setMumbaiCompanies] = useState<Company[]>([]);
  const [chennaiCompanies, setChennaiCompanies] = useState<Company[]>([]);
  const [targetStats, setTargetStats] = useState<{mumbai: TargetStats, chennai: TargetStats}>({
    mumbai: { total: 0, withSalesDivision: 0, withoutSalesDivision: 0, targetRatio: 0 },
    chennai: { total: 0, withSalesDivision: 0, withoutSalesDivision: 0, targetRatio: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Supabase에서 기업 데이터 가져오기
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      // 뭄바이 기업 데이터 가져오기
      const { data: mumbaiData, error: mumbaiError } = await supabase
        .from('kotra')
        .select('*')
        .eq('office', '뭄바이');

      if (mumbaiError) throw mumbaiError;

      // 첸나이 기업 데이터 가져오기 (첸나이 + 첸나이무역관 포함)
      const { data: chennaiData, error: chennaiError } = await supabase
        .from('kotra')
        .select('*')
        .in('office', ['첸나이', '첸나이무역관']);

      if (chennaiError) throw chennaiError;

      // 데이터 변환 함수
      const transformCompanyData = (companies: any[], region: string): Company[] => {
        return companies.map((company, index) => ({
          id: company.id || index + 1,
          name: company.company_name_kr || '',
          industry: company.industry_major || '',
          entryType: company.entry_type || '',
          entryYear: '2024', // 기본값
          isTarget: Boolean(company.sales_division),
          salesDivision: company.sales_division || '',
          description: `${company.industry_minor || ''} ${company.entry_type || ''}`.trim(),
          region: region
        }));
      };

      // 통계 계산 함수
      const calculateStats = (companies: any[]): TargetStats => {
        const total = companies.length;
        const withSalesDivision = companies.filter(c => c.sales_division).length;
        const withoutSalesDivision = total - withSalesDivision;
        const targetRatio = total > 0 ? withSalesDivision / total : 0;

        return {
          total,
          withSalesDivision,
          withoutSalesDivision,
          targetRatio
        };
      };

      // 데이터 변환 및 설정
      const transformedMumbai = transformCompanyData(mumbaiData || [], 'mumbai');
      const transformedChennai = transformCompanyData(chennaiData || [], 'chennai');

      setMumbaiCompanies(transformedMumbai);
      setChennaiCompanies(transformedChennai);

      // 통계 계산 및 설정
      setTargetStats({
        mumbai: calculateStats(mumbaiData || []),
        chennai: calculateStats(chennaiData || [])
      });

    } catch (err) {
      console.error('기업 데이터 가져오기 오류:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchCompanies();
  }, []);

  // 정렬 함수
  const sortCompanies = (companies: Company[]) => {
    return [...companies].sort((a, b) => {
      let aValue = a[sortField as keyof Company] || '';
      let bValue = b[sortField as keyof Company] || '';
      
      // 영업조직 정렬 시 빈 문자열을 맨 뒤로
      if (sortField === 'salesDivision') {
        const aHasValue = Boolean(aValue);
        const bHasValue = Boolean(bValue);
        
        // 둘 다 값이 있거나 둘 다 없으면 알파벳 순 정렬
        if (aHasValue === bHasValue) {
          if (sortDirection === 'asc') {
            return String(aValue).localeCompare(String(bValue), 'ko');
          } else {
            return String(bValue).localeCompare(String(aValue), 'ko');
          }
        }
        
        // 값이 있는 것이 앞으로 (오름차순) 또는 뒤로 (내림차순)
        if (sortDirection === 'asc') {
          return aHasValue ? -1 : 1;
        } else {
          return aHasValue ? 1 : -1;
        }
      }
      
      // 다른 필드들은 기존 로직
      if (sortDirection === 'asc') {
        return String(aValue).localeCompare(String(bValue), 'ko');
      } else {
        return String(bValue).localeCompare(String(aValue), 'ko');
      }
    });
  };

  // 정렬 핸들러
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // 정렬 시 첫 페이지로 이동
  };

  // 정렬 아이콘 렌더링
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <span className="text-gray-400">↕</span>;
    }
    return sortDirection === 'asc' ? <span className="text-blue-600">↑</span> : <span className="text-blue-600">↓</span>;
  };

  // 현재 활성 지역의 기업 데이터
  const currentCompanies = activeRegion === 'mumbai' ? mumbaiCompanies : chennaiCompanies;
  
  // 필터링 적용
  const filteredCompanies = currentCompanies.filter(company => {
    switch (filterType) {
      case 'withSalesDivision':
        return Boolean(company.salesDivision);
      case 'withoutSalesDivision':
        return !Boolean(company.salesDivision);
      default:
        return true; // 'all' - 모든 기업 표시
    }
  });
  
  const sortedCompanies = sortCompanies(filteredCompanies);
  
  // 페이지네이션
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompaniesPage = sortedCompanies.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 삭제 함수 추가
  const handleDeleteClick = (company: Company) => {
    setCompanyToDelete(company);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete) return;

    try {
      setDeleting(true);
      
      // Supabase에서 해당 기업 삭제
      const { error } = await supabase
        .from('kotra')
        .delete()
        .eq('id', companyToDelete.id);

      if (error) {
        throw error;
      }

      // 성공적으로 삭제되면 목록 새로고침
      await fetchCompanies();
      
      // 모달 닫기
      setDeleteModalOpen(false);
      setCompanyToDelete(null);
      
      // 성공 메시지 (선택사항)
      alert('기업이 성공적으로 삭제되었습니다.');
      
    } catch (err) {
      console.error('삭제 오류:', err);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setCompanyToDelete(null);
  };

  // 수정 함수 추가
  const handleEditClick = (company: Company) => {
    setCompanyToEdit(company);
    setEditForm({
      company_name_kr: company.name,
      company_name_en: '',
      industry_major: company.industry,
      industry_minor: '',
      entry_type: company.entryType,
      sales_division: company.salesDivision,
      local_address: '',
      phone: '',
      email: ''
    });
    setEditModalOpen(true);
  };

  const handleEditConfirm = async () => {
    if (!companyToEdit) return;

    try {
      setEditing(true);
      
      // Supabase에서 해당 기업 수정
      const { error } = await supabase
        .from('kotra')
        .update({
          company_name_kr: editForm.company_name_kr,
          company_name_en: editForm.company_name_en,
          industry_major: editForm.industry_major,
          industry_minor: editForm.industry_minor,
          entry_type: editForm.entry_type,
          sales_division: editForm.sales_division,
          local_address: editForm.local_address,
          phone: editForm.phone,
          email: editForm.email
        })
        .eq('id', companyToEdit.id);

      if (error) {
        throw error;
      }

      // 성공적으로 수정되면 목록 새로고침
      await fetchCompanies();
      
      // 모달 닫기
      setEditModalOpen(false);
      setCompanyToEdit(null);
      
      // 성공 메시지
      alert('기업 정보가 성공적으로 수정되었습니다.');
      
    } catch (err) {
      console.error('수정 오류:', err);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setCompanyToEdit(null);
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 추가 함수 추가
  const handleAddClick = () => {
    setAddForm({
      company_name_kr: '',
      company_name_en: '',
      industry_major: '',
      industry_minor: '',
      entry_type: '',
      sales_division: '',
      local_address: '',
      phone: '',
      email: '',
      country: '인도',
      city: activeRegion === 'mumbai' ? '뭄바이(Mumbai)' : '첸나이(Chennai)',
      office: activeRegion === 'mumbai' ? '뭄바이' : '첸나이'
    });
    setAddModalOpen(true);
  };

  const handleAddConfirm = async () => {
    if (!addForm.company_name_kr.trim()) {
      alert('한국 기업명은 필수 입력 항목입니다.');
      return;
    }

    try {
      setAdding(true);
      
      // Supabase에 새 기업 추가
      const { error } = await supabase
        .from('kotra')
        .insert([{
          company_name_kr: addForm.company_name_kr,
          company_name_en: addForm.company_name_en,
          industry_major: addForm.industry_major,
          industry_minor: addForm.industry_minor,
          entry_type: addForm.entry_type,
          sales_division: addForm.sales_division,
          local_address: addForm.local_address,
          phone: addForm.phone,
          email: addForm.email,
          country: addForm.country,
          city: addForm.city,
          office: addForm.office
        }]);

      if (error) {
        throw error;
      }

      // 성공적으로 추가되면 목록 새로고침
      await fetchCompanies();
      
      // 모달 닫기
      setAddModalOpen(false);
      
      // 성공 메시지
      alert('새 기업이 성공적으로 추가되었습니다.');
      
    } catch (err) {
      console.error('추가 오류:', err);
      alert('기업 추가 중 오류가 발생했습니다.');
    } finally {
      setAdding(false);
    }
  };

  const handleAddCancel = () => {
    setAddModalOpen(false);
  };

  const handleAddFormChange = (field: string, value: string) => {
    setAddForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 로딩 상태 렌더링
  if (loading) {
    return (
      <section id="target-customers">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">11. 👥 마케팅 대상 기업</h2>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  // 에러 상태 렌더링
  if (error) {
    return (
      <section id="target-customers">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">11. 👥 마케팅 대상 기업</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 className="text-red-800 font-medium">데이터 로드 오류</h3>
              <p className="text-red-700 text-sm">{error}</p>
              <button 
                onClick={fetchCompanies}
                className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="target-customers">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">11. 👥 마케팅 대상 기업</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          KOTRA 자료를 기반으로 한 인도 뭄바이, 첸나이 지역 진출 한국기업 현황입니다. 
          각 지역별로 진출한 모든 한국기업의 리스트와 함께, 
          마케팅 대상으로 선정된 기업들의 정보를 포함하여 제공합니다.
          <br />
          <span className="text-sm text-blue-600">
            📊 Supabase 데이터 기준: 첸나이 {targetStats.chennai.total}개, 뭄바이 {targetStats.mumbai.total}개
          </span>
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            📊 실시간 Supabase 데이터 연동
          </div>
          <button 
            onClick={fetchCompanies}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            새로고침
          </button>
        </div>
      </div>

      {/* 지역 선택 탭 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => {
                setActiveRegion('mumbai');
                setCurrentPage(1);
                setFilterType('all');
              }}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'mumbai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏙️ 뭄바이 진출기업 ({mumbaiCompanies.length}개)
            </button>
            <button
              onClick={() => {
                setActiveRegion('chennai');
                setCurrentPage(1);
                setFilterType('all');
              }}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'chennai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏭 첸나이 진출기업 ({chennaiCompanies.length}개)
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="space-y-6">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 기업 수</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {activeRegion === 'mumbai' ? targetStats.mumbai.total : targetStats.chennai.total}개
                  </p>
                </div>
                <div className="text-blue-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">마케팅 대상</p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeRegion === 'mumbai' ? targetStats.mumbai.withSalesDivision : targetStats.chennai.withSalesDivision}개
                  </p>
                </div>
                <div className="text-green-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
          </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">마케팅 대상 비율</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPercentage(activeRegion === 'mumbai' ? targetStats.mumbai.targetRatio : targetStats.chennai.targetRatio)}
                  </p>
                </div>
                <div className="text-blue-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 필터링 버튼 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">필터링:</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setFilterType('all');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체 ({filteredCompanies.length}개)
                </button>
                <button
                  onClick={() => {
                    setFilterType('withSalesDivision');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterType === 'withSalesDivision'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  영업조직 있음 ({filteredCompanies.filter(c => Boolean(c.salesDivision)).length}개)
                </button>
                <button
                  onClick={() => {
                    setFilterType('withoutSalesDivision');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filterType === 'withoutSalesDivision'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  영업조직 없음 ({filteredCompanies.filter(c => !Boolean(c.salesDivision)).length}개)
                </button>
                <button
                  onClick={handleAddClick}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-green-600 text-white hover:bg-green-700"
                >
                  ➕ 새 기업 추가
                </button>
              </div>
            </div>
          </div>

          {/* 기업 리스트 테이블 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>기업명</span>
                        {renderSortIcon('name')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('salesDivision')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>영업조직</span>
                        {renderSortIcon('salesDivision')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('industry')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>업종</span>
                        {renderSortIcon('industry')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('entryType')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>진출형태</span>
                        {renderSortIcon('entryType')}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      마케팅 대상 여부
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      수정
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      삭제
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCompaniesPage.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {company.salesDivision ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {company.salesDivision}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            미배정
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.industry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.entryType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {company.isTarget ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            마케팅 대상
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            일반
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEditClick(company)}
                          className="text-blue-600 hover:text-blue-900 underline"
                        >
                          수정
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteClick(company)}
                          className="text-red-600 hover:text-red-900 underline"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    다음
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{startIndex + 1}</span> - <span className="font-medium">{Math.min(endIndex, sortedCompanies.length)}</span> / <span className="font-medium">{sortedCompanies.length}</span>개
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">이전</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">다음</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 삭제 모달 */}
      {deleteModalOpen && companyToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">기업 삭제</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  "{companyToDelete.name}" 기업을 정말로 삭제하시겠습니까?
                  이 작업은 되돌릴 수 없습니다.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {deleting ? '삭제 중...' : '삭제'}
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="mt-3 px-4 py-2 bg-gray-200 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {editModalOpen && companyToEdit && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">기업 정보 수정</h3>
              <div className="mt-2 px-7 py-3">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="company_name_kr" className="block text-sm font-medium text-gray-700">한국 기업명</label>
                    <input
                      type="text"
                      id="company_name_kr"
                      value={editForm.company_name_kr}
                      onChange={(e) => handleEditFormChange('company_name_kr', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="company_name_en" className="block text-sm font-medium text-gray-700">영문 기업명</label>
                    <input
                      type="text"
                      id="company_name_en"
                      value={editForm.company_name_en}
                      onChange={(e) => handleEditFormChange('company_name_en', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="industry_major" className="block text-sm font-medium text-gray-700">업종 (대분류)</label>
                    <input
                      type="text"
                      id="industry_major"
                      value={editForm.industry_major}
                      onChange={(e) => handleEditFormChange('industry_major', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="industry_minor" className="block text-sm font-medium text-gray-700">세부 업종</label>
                    <input
                      type="text"
                      id="industry_minor"
                      value={editForm.industry_minor}
                      onChange={(e) => handleEditFormChange('industry_minor', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="entry_type" className="block text-sm font-medium text-gray-700">진출형태</label>
                    <input
                      type="text"
                      id="entry_type"
                      value={editForm.entry_type}
                      onChange={(e) => handleEditFormChange('entry_type', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="sales_division" className="block text-sm font-medium text-gray-700">영업조직</label>
                    <input
                      type="text"
                      id="sales_division"
                      value={editForm.sales_division}
                      onChange={(e) => handleEditFormChange('sales_division', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="local_address" className="block text-sm font-medium text-gray-700">지명 및 주소</label>
                    <input
                      type="text"
                      id="local_address"
                      value={editForm.local_address}
                      onChange={(e) => handleEditFormChange('local_address', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">전화번호</label>
                    <input
                      type="text"
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => handleEditFormChange('phone', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                      type="email"
                      id="email"
                      value={editForm.email}
                      onChange={(e) => handleEditFormChange('email', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleEditConfirm}
                  disabled={editing}
                  className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editing ? '수정 중...' : '수정'}
                </button>
                <button
                  onClick={handleEditCancel}
                  className="mt-3 px-4 py-2 bg-gray-200 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 추가 모달 */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">새 기업 추가</h3>
              <div className="mt-2 px-7 py-3">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="add_company_name_kr" className="block text-sm font-medium text-gray-700">한국 기업명</label>
                    <input
                      type="text"
                      id="add_company_name_kr"
                      value={addForm.company_name_kr}
                      onChange={(e) => handleAddFormChange('company_name_kr', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_company_name_en" className="block text-sm font-medium text-gray-700">영문 기업명</label>
                    <input
                      type="text"
                      id="add_company_name_en"
                      value={addForm.company_name_en}
                      onChange={(e) => handleAddFormChange('company_name_en', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_industry_major" className="block text-sm font-medium text-gray-700">업종 (대분류)</label>
                    <input
                      type="text"
                      id="add_industry_major"
                      value={addForm.industry_major}
                      onChange={(e) => handleAddFormChange('industry_major', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_industry_minor" className="block text-sm font-medium text-gray-700">세부 업종</label>
                    <input
                      type="text"
                      id="add_industry_minor"
                      value={addForm.industry_minor}
                      onChange={(e) => handleAddFormChange('industry_minor', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_entry_type" className="block text-sm font-medium text-gray-700">진출형태</label>
                    <input
                      type="text"
                      id="add_entry_type"
                      value={addForm.entry_type}
                      onChange={(e) => handleAddFormChange('entry_type', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_sales_division" className="block text-sm font-medium text-gray-700">영업조직</label>
                    <input
                      type="text"
                      id="add_sales_division"
                      value={addForm.sales_division}
                      onChange={(e) => handleAddFormChange('sales_division', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_local_address" className="block text-sm font-medium text-gray-700">지명 및 주소</label>
                    <input
                      type="text"
                      id="add_local_address"
                      value={addForm.local_address}
                      onChange={(e) => handleAddFormChange('local_address', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_phone" className="block text-sm font-medium text-gray-700">전화번호</label>
                    <input
                      type="text"
                      id="add_phone"
                      value={addForm.phone}
                      onChange={(e) => handleAddFormChange('phone', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="add_email" className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                      type="email"
                      id="add_email"
                      value={addForm.email}
                      onChange={(e) => handleAddFormChange('email', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleAddConfirm}
                  disabled={adding}
                  className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {adding ? '추가 중...' : '추가'}
                </button>
                <button
                  onClick={handleAddCancel}
                  className="mt-3 px-4 py-2 bg-gray-200 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function BusinessFeasibilitySectionAppendix() {
  return (
    <section id="appendix">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">12. 📚 부록</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">📊 데이터 출처</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• 한국무역협회 (KOTRA) 인도 진출기업 현황</li>
            <li>• TeleGeography (네트워크 인프라)</li>
            <li>• IDC, Gartner (시장 조사)</li>
            <li>• 인도 통신부 (TRAI) 통계</li>
            <li>• 한국 기업 인도 진출 사례 연구</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">🔧 분석 방법론</h3>
          <ul className="space-y-2 text-green-700">
            <li>• DCF (Discounted Cash Flow) 분석</li>
            <li>• 시장 규모 추정 (TAM/SAM/SOM)</li>
            <li>• 경쟁사 벤치맹</li>
            <li>• 시나리오 분석</li>
            <li>• 리스크 평가</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 주요 가정 및 제약사항</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">주요 가정</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 매출 성장률: 8% (연간)</li>
              <li>• OPEX 증가율: 3% (연간)</li>
              <li>• 할인율 (WACC): 12%</li>
              <li>• 세율: 25%</li>
              <li>• 환율: 1 USD = 83 INR</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">제약사항</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 시장 데이터의 한정성</li>
              <li>• 경쟁사 정보의 불완전성</li>
              <li>• 규제 환경 변화 가능성</li>
              <li>• 환율 변동 리스크</li>
              <li>• 기술 변화의 불확실성</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">⚠️ 면책 조항</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>
            본 사업성 분석 보고서는 제공된 정보와 가정을 기반으로 작성되었습니다. 
            실제 결과는 시장 상황, 경쟁 환경, 규제 변화 등 다양한 요인에 따라 달라질 수 있습니다.
          </p>
          <p>
            투자 결정 시에는 본 보고서 외에도 추가적인 실사, 전문가 자문, 
            법적 검토 등을 통한 종합적인 판단이 필요합니다.
          </p>
          <p>
            본 보고서의 내용은 참고용으로만 사용되어야 하며, 
            투자 손실에 대한 책임은 투자자에게 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
} 