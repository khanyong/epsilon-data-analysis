import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Search,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Database,
  Building2,
  DollarSign,
  Calendar,
  Globe,
} from 'lucide-react';

// UI Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-3 ${className}`}>{children}</div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'md',
  disabled = false,
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors flex items-center gap-2';
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    outline: 'border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50'
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  value, 
  onChange, 
  placeholder = '', 
  type = 'text',
  className = '',
  disabled = false
}: { 
  value: string | number | undefined; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}) => (
  <input
    type={type}
    value={value || ''}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${className}`}
  />
);

const Select = ({ 
  value, 
  onChange, 
  children,
  className = '',
  disabled = false
}: { 
  value: string | undefined; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => (
  <select
    value={value || ''}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${className}`}
  >
    {children}
  </select>
);

const Tabs = ({ children, defaultValue }: { children: React.ReactNode; defaultValue: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === TabsList || child.type === TabsContent) {
        return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
      }
    }
    return child;
  });
  
  return <div>{childrenWithProps}</div>;
};

const TabsList = ({ children, className = '', activeTab, setActiveTab }: { 
  children: React.ReactNode; 
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === TabsTrigger) {
      return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
    }
    return child;
  });
  
  return (
    <div className={`flex gap-2 border-b mb-4 ${className}`}>
      {childrenWithProps}
    </div>
  );
};

const TabsTrigger = ({ 
  value, 
  children, 
  activeTab, 
  setActiveTab 
}: { 
  value: string; 
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}) => (
  <button
    onClick={() => setActiveTab?.(value)}
    className={`flex-1 px-4 py-2 font-medium transition-colors border-b-2 ${
      activeTab === value 
        ? 'border-blue-600 text-blue-600 bg-blue-50' 
        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const TabsContent = ({ 
  value, 
  children, 
  activeTab 
}: { 
  value: string; 
  children: React.ReactNode;
  activeTab?: string;
}) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};

const GTMDataManagement: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [salesRevenues, setSalesRevenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [editingSales, setEditingSales] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState<any>({});
  const [newSales, setNewSales] = useState<any>({});
  const [newRevenue, setNewRevenue] = useState<any>({});
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [showNewSalesForm, setShowNewSalesForm] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [serviceRevenues, setServiceRevenues] = useState<any[]>([]);
  const [editingRevenue, setEditingRevenue] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [customerPage, setCustomerPage] = useState(1);
  const [salesPage, setSalesPage] = useState(1);
  const itemsPerPage = 50;

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch customers
      const { data: customersData, error: customersError } = await supabase
        .from('gtm_customers')
        .select('*')
        .order('customer_name');
      
      if (customersError) throw customersError;
      setCustomers(customersData || []);

      // Fetch sales master data
      const { data: salesData, error: salesError } = await supabase
        .from('gtm_sales_master')
        .select('*')
        .order('customer_name');
      
      if (salesError) throw salesError;
      setSales(salesData || []);

      // Fetch sales revenues data
      const { data: revenuesData, error: revenuesError } = await supabase
        .from('gtm_sales_revenues')
        .select('*')
        .order('revenue_month', { ascending: false });
      
      if (revenuesError) throw revenuesError;
      setSalesRevenues(revenuesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      showMessage('error', '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Customer CRUD operations
  const saveCustomer = async (customer: any) => {
    try {
      if (customer.id) {
        // Update existing
        const { error } = await supabase
          .from('gtm_customers')
          .update(customer)
          .eq('id', customer.id);
        
        if (error) throw error;
        showMessage('success', '고객 정보가 업데이트되었습니다.');
      } else {
        // Create new
        const { error } = await supabase
          .from('gtm_customers')
          .insert(customer);
        
        if (error) throw error;
        showMessage('success', '새 고객이 추가되었습니다.');
      }
      
      setEditingCustomer(null);
      setShowNewCustomerForm(false);
      setNewCustomer({});
      fetchData();
    } catch (error: any) {
      console.error('Error saving customer:', error);
      showMessage('error', `저장 실패: ${error.message}`);
    }
  };

  const deleteCustomer = async (id: number) => {
    if (!confirm('정말로 이 고객 정보를 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('gtm_customers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      showMessage('success', '고객 정보가 삭제되었습니다.');
      fetchData();
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      showMessage('error', `삭제 실패: ${error.message}`);
    }
  };

  // Sales CRUD operations
  const saveSales = async (sale: any) => {
    try {
      if (sale.service_id) {
        // Update existing
        const { error } = await supabase
          .from('gtm_sales_master')
          .update(sale)
          .eq('service_id', sale.service_id);
        
        if (error) throw error;
        showMessage('success', '서비스 정보가 업데이트되었습니다.');
      } else {
        // Create new
        const { error } = await supabase
          .from('gtm_sales_master')
          .insert(sale);
        
        if (error) throw error;
        showMessage('success', '새 서비스가 추가되었습니다.');
      }
      
      setEditingSales(null);
      setShowNewSalesForm(false);
      setNewSales({});
      fetchData();
    } catch (error: any) {
      console.error('Error saving sales:', error);
      showMessage('error', `저장 실패: ${error.message}`);
    }
  };

  // Revenue CRUD operations
  const openRevenueModal = async (service_id: string) => {
    setSelectedServiceId(service_id);
    setShowRevenueModal(true);
    
    // Fetch revenue history for this service
    const { data, error } = await supabase
      .from('gtm_sales_revenues')
      .select('*')
      .eq('service_id', service_id)
      .order('revenue_month', { ascending: false });
    
    if (!error && data) {
      setServiceRevenues(data);
    } else {
      setServiceRevenues([]);
    }
  };

  const saveRevenue = async (revenue: any) => {
    try {
      // Check if revenue exists for this service_id and revenue_month
      const { data: existing } = await supabase
        .from('gtm_sales_revenues')
        .select('*')
        .eq('service_id', revenue.service_id)
        .eq('revenue_month', revenue.revenue_month)
        .single();

      if (existing) {
        // Update existing revenue
        const { error } = await supabase
          .from('gtm_sales_revenues')
          .update({ revenue_amount: revenue.revenue_amount })
          .eq('service_id', revenue.service_id)
          .eq('revenue_month', revenue.revenue_month);
        
        if (error) throw error;
        showMessage('success', '매출액이 업데이트되었습니다.');
      } else {
        // Create new revenue record
        const { error } = await supabase
          .from('gtm_sales_revenues')
          .insert(revenue);
        
        if (error) throw error;
        showMessage('success', '새 매출 정보가 추가되었습니다.');
      }
      
      // Refresh revenue history
      const { data: revenuesData } = await supabase
        .from('gtm_sales_revenues')
        .select('*')
        .eq('service_id', revenue.service_id)
        .order('revenue_month', { ascending: false });
      
      if (revenuesData) {
        setServiceRevenues(revenuesData);
      }
      
      setNewRevenue({});
      setEditingRevenue(null);
      fetchData();
    } catch (error: any) {
      console.error('Error saving revenue:', error);
      showMessage('error', `저장 실패: ${error.message}`);
    }
  };

  const deleteRevenue = async (service_id: string, revenue_month: string) => {
    if (!confirm('정말로 이 매출 기록을 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('gtm_sales_revenues')
        .delete()
        .eq('service_id', service_id)
        .eq('revenue_month', revenue_month);
      
      if (error) throw error;
      showMessage('success', '매출 기록이 삭제되었습니다.');
      
      // Refresh revenue history
      const { data: revenuesData } = await supabase
        .from('gtm_sales_revenues')
        .select('*')
        .eq('service_id', service_id)
        .order('revenue_month', { ascending: false });
      
      if (revenuesData) {
        setServiceRevenues(revenuesData);
      }
      fetchData();
    } catch (error: any) {
      console.error('Error deleting revenue:', error);
      showMessage('error', `삭제 실패: ${error.message}`);
    }
  };

  const deleteSales = async (service_id: string) => {
    if (!confirm('정말로 이 매출 정보를 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('gtm_sales_master')
        .delete()
        .eq('service_id', service_id);
      
      if (error) throw error;
      showMessage('success', '매출 정보가 삭제되었습니다.');
      fetchData();
    } catch (error: any) {
      console.error('Error deleting sales:', error);
      showMessage('error', `삭제 실패: ${error.message}`);
    }
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(c => 
    c.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.customer_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.headquarters?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSales = sales.filter(s => 
    s.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.service_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.service_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">GTM 데이터 관리</h1>
          <p className="text-gray-600 mt-2">GTM 고객 및 매출 데이터 추가/수정/삭제</p>
        </div>
        <Button onClick={fetchData} variant="outline">
          <Database className="h-4 w-4" />
          새로고침
        </Button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          {message.text}
        </div>
      )}

      {/* Search Bar */}
      <Card>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="고객명, ID, 본부 등으로 검색..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="customers">
        <TabsList className="w-full">
          <TabsTrigger value="customers">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span>GTM Customers (법인 총 고객) - {filteredCustomers.length}개</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="sales">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>GTM Sales (글로벌 데이터 활성화 고객) - {filteredSales.length}개</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>GTM 고객 데이터</CardTitle>
                  <CardDescription>전체 KT 법인 고객 정보 관리</CardDescription>
                </div>
                <Button onClick={() => setShowNewCustomerForm(true)}>
                  <Plus className="h-4 w-4" />
                  새 고객 추가
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* New Customer Form */}
              {showNewCustomerForm && (
                <div className="mb-6 p-4 border-2 border-blue-300 rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-4">새 고객 추가</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">고객 ID*</label>
                      <Input
                        value={newCustomer.customer_id || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, customer_id: e.target.value})}
                        placeholder="고객 ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">고객명*</label>
                      <Input
                        value={newCustomer.customer_name || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, customer_name: e.target.value})}
                        placeholder="고객명"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">본부</label>
                      <Input
                        value={newCustomer.headquarters || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, headquarters: e.target.value})}
                        placeholder="본부"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">팀</label>
                      <Input
                        value={newCustomer.team || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, team: e.target.value})}
                        placeholder="팀"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">해외사업장 보유</label>
                      <Select
                        value={newCustomer.overseas_presence_2025?.toString() || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, overseas_presence_2025: e.target.value === 'true'})}
                      >
                        <option value="">선택</option>
                        <option value="true">있음</option>
                        <option value="false">없음</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">KT 글로벌 서비스 사용</label>
                      <Select
                        value={newCustomer.kt_global_data_usage_2025?.toString() || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, kt_global_data_usage_2025: e.target.value === 'true'})}
                      >
                        <option value="">선택</option>
                        <option value="true">사용</option>
                        <option value="false">미사용</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">타사 서비스 사용</label>
                      <Select
                        value={newCustomer.other_global_data_usage?.toString() || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, other_global_data_usage: e.target.value === 'true'})}
                      >
                        <option value="">선택</option>
                        <option value="true">사용</option>
                        <option value="false">미사용</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">타사 제공업체</label>
                      <Input
                        value={newCustomer.other_provider_name || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, other_provider_name: e.target.value})}
                        placeholder="타사명"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">타사 월요금</label>
                      <Input
                        type="number"
                        value={newCustomer.other_monthly_fee || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, other_monthly_fee: parseFloat(e.target.value)})}
                        placeholder="월요금"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">갱신일</label>
                      <Input
                        type="date"
                        value={newCustomer.renewal_date || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, renewal_date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">연간 매출액 (억원)</label>
                      <Input
                        type="number"
                        value={newCustomer.annual_revenue || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, annual_revenue: parseFloat(e.target.value)})}
                        placeholder="예: 1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">매출 기준년도</label>
                      <Input
                        type="number"
                        value={newCustomer.revenue_year || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, revenue_year: parseInt(e.target.value)})}
                        placeholder="예: 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">기업 규모</label>
                      <Select
                        value={(() => {
                          const rev = newCustomer.annual_revenue;
                          if (!rev) return '';
                          if (rev >= 5000) return '대기업';
                          if (rev >= 400) return '중견기업';
                          return '중소기업';
                        })()}
                        disabled
                        className="bg-gray-100"
                      >
                        <option value="">매출 입력 시 자동 분류</option>
                        <option value="대기업">대기업 (5000억↑)</option>
                        <option value="중견기업">중견기업 (400~5000억)</option>
                        <option value="중소기업">중소기업 (~400억)</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">산업 분류</label>
                      <Select
                        value={newCustomer.industry_category || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, industry_category: e.target.value})}
                      >
                        <option value="">선택</option>
                        <option value="제조업">제조업</option>
                        <option value="서비스업">서비스업</option>
                        <option value="금융업">금융업</option>
                        <option value="IT/SW">IT/SW</option>
                        <option value="유통업">유통업</option>
                        <option value="건설업">건설업</option>
                        <option value="통신업">통신업</option>
                        <option value="의료/제약">의료/제약</option>
                        <option value="교육">교육</option>
                        <option value="공공기관">공공기관</option>
                        <option value="기타">기타</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">사업 유형</label>
                      <Select
                        value={newCustomer.business_type || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, business_type: e.target.value})}
                      >
                        <option value="">선택</option>
                        <option value="B2B">B2B</option>
                        <option value="B2C">B2C</option>
                        <option value="B2G">B2G</option>
                        <option value="B2B2C">B2B2C</option>
                        <option value="기타">기타</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">직원 수</label>
                      <Input
                        type="number"
                        value={newCustomer.employee_count || ''}
                        onChange={(e) => setNewCustomer({...newCustomer, employee_count: parseInt(e.target.value)})}
                        placeholder="예: 1000"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => {
                      setShowNewCustomerForm(false);
                      setNewCustomer({});
                    }}>
                      <X className="h-4 w-4" />
                      취소
                    </Button>
                    <Button onClick={() => saveCustomer(newCustomer)}>
                      <Save className="h-4 w-4" />
                      저장
                    </Button>
                  </div>
                </div>
              )}

              {/* Customers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">고객 ID</th>
                      <th className="text-left p-3">고객명</th>
                      <th className="text-center p-3">산업</th>
                      <th className="text-center p-3">기업규모</th>
                      <th className="text-right p-3">연매출(억)</th>
                      <th className="text-left p-3">본부</th>
                      <th className="text-left p-3">팀</th>
                      <th className="text-center p-3">해외사업장</th>
                      <th className="text-center p-3">KT글로벌</th>
                      <th className="text-center p-3">타사서비스</th>
                      <th className="text-left p-3">타사명</th>
                      <th className="text-right p-3">월요금</th>
                      <th className="text-center p-3">갱신일</th>
                      <th className="text-center p-3">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.slice((customerPage - 1) * itemsPerPage, customerPage * itemsPerPage).map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        {editingCustomer?.id === customer.id ? (
                          <>
                            <td className="p-2">
                              <Input
                                value={editingCustomer.customer_id || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, customer_id: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                value={editingCustomer.customer_name || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, customer_name: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Select
                                value={editingCustomer.industry_category || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, industry_category: e.target.value})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="제조업">제조업</option>
                                <option value="서비스업">서비스업</option>
                                <option value="금융업">금융업</option>
                                <option value="IT/SW">IT/SW</option>
                                <option value="유통업">유통업</option>
                                <option value="건설업">건설업</option>
                                <option value="통신업">통신업</option>
                                <option value="의료/제약">의료/제약</option>
                                <option value="교육">교육</option>
                                <option value="공공기관">공공기관</option>
                                <option value="기타">기타</option>
                              </Select>
                            </td>
                            <td className="p-2 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                (() => {
                                  const rev = editingCustomer.annual_revenue;
                                  if (!rev) return 'bg-gray-100 text-gray-600';
                                  if (rev >= 5000) return 'bg-purple-100 text-purple-700';
                                  if (rev >= 400) return 'bg-blue-100 text-blue-700';
                                  return 'bg-green-100 text-green-700';
                                })()
                              }`}>
                                {(() => {
                                  const rev = editingCustomer.annual_revenue;
                                  if (!rev) return '-';
                                  if (rev >= 5000) return '대기업';
                                  if (rev >= 400) return '중견기업';
                                  return '중소기업';
                                })()}
                              </span>
                            </td>
                            <td className="p-2">
                              <Input
                                type="number"
                                value={editingCustomer.annual_revenue || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, annual_revenue: parseFloat(e.target.value)})}
                                className="text-sm text-right"
                                placeholder="억원"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                value={editingCustomer.headquarters || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, headquarters: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                value={editingCustomer.team || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, team: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <Select
                                value={editingCustomer.overseas_presence_2025?.toString() || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, overseas_presence_2025: e.target.value === 'true'})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="true">O</option>
                                <option value="false">X</option>
                              </Select>
                            </td>
                            <td className="p-2 text-center">
                              <Select
                                value={editingCustomer.kt_global_data_usage_2025?.toString() || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, kt_global_data_usage_2025: e.target.value === 'true'})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="true">O</option>
                                <option value="false">X</option>
                              </Select>
                            </td>
                            <td className="p-2 text-center">
                              <Select
                                value={editingCustomer.other_global_data_usage?.toString() || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, other_global_data_usage: e.target.value === 'true'})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="true">O</option>
                                <option value="false">X</option>
                              </Select>
                            </td>
                            <td className="p-2">
                              <Input
                                value={editingCustomer.other_provider_name || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, other_provider_name: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="number"
                                value={editingCustomer.other_monthly_fee || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, other_monthly_fee: parseFloat(e.target.value)})}
                                className="text-sm text-right"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="date"
                                value={editingCustomer.renewal_date || ''}
                                onChange={(e) => setEditingCustomer({...editingCustomer, renewal_date: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <div className="flex justify-center gap-1">
                                <Button size="sm" onClick={() => saveCustomer(editingCustomer)}>
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingCustomer(null)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-3 font-medium">{customer.customer_id}</td>
                            <td className="p-3">{customer.customer_name}</td>
                            <td className="p-3 text-center">
                              {customer.industry_category ? (
                                <span className="px-2 py-1 rounded-md text-xs bg-slate-100 text-slate-700">
                                  {customer.industry_category}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                (() => {
                                  const rev = customer.annual_revenue;
                                  if (!rev) return 'bg-gray-100 text-gray-600';
                                  if (rev >= 5000) return 'bg-purple-100 text-purple-700';
                                  if (rev >= 400) return 'bg-blue-100 text-blue-700';
                                  return 'bg-green-100 text-green-700';
                                })()
                              }`}>
                                {(() => {
                                  const rev = customer.annual_revenue;
                                  if (!rev) return '-';
                                  if (rev >= 5000) return '대기업';
                                  if (rev >= 400) return '중견기업';
                                  return '중소기업';
                                })()}
                              </span>
                            </td>
                            <td className="p-3 text-right font-medium">
                              {customer.annual_revenue ? 
                                `${customer.annual_revenue.toLocaleString()}억` : 
                                '-'
                              }
                              {customer.revenue_year && customer.annual_revenue ? 
                                <span className="text-xs text-gray-500 ml-1">({customer.revenue_year})</span> : 
                                null
                              }
                            </td>
                            <td className="p-3">{customer.headquarters}</td>
                            <td className="p-3">{customer.team}</td>
                            <td className="p-3 text-center">
                              {customer.overseas_presence_2025 ? 
                                <span className="text-green-600 font-bold">O</span> : 
                                <span className="text-gray-400">X</span>
                              }
                            </td>
                            <td className="p-3 text-center">
                              {customer.kt_global_data_usage_2025 ? 
                                <span className="text-blue-600 font-bold">O</span> : 
                                <span className="text-gray-400">X</span>
                              }
                            </td>
                            <td className="p-3 text-center">
                              {customer.other_global_data_usage ? 
                                <span className="text-orange-600 font-bold">O</span> : 
                                <span className="text-gray-400">X</span>
                              }
                            </td>
                            <td className="p-3">{customer.other_provider_name}</td>
                            <td className="p-3 text-right">
                              {customer.other_monthly_fee ? 
                                `${(customer.other_monthly_fee / 10000).toFixed(0)}만원` : 
                                '-'
                              }
                            </td>
                            <td className="p-3 text-center">
                              {customer.renewal_date ? 
                                new Date(customer.renewal_date).toLocaleDateString('ko-KR') : 
                                '-'
                              }
                            </td>
                            <td className="p-3">
                              <div className="flex justify-center gap-1">
                                <Button size="sm" variant="outline" onClick={() => setEditingCustomer(customer)}>
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteCustomer(customer.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  전체 {filteredCustomers.length}개 중 {Math.min((customerPage - 1) * itemsPerPage + 1, filteredCustomers.length)}-{Math.min(customerPage * itemsPerPage, filteredCustomers.length)}개 표시
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={customerPage === 1}
                    onClick={() => setCustomerPage(prev => Math.max(1, prev - 1))}
                  >
                    이전
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    페이지 {customerPage} / {Math.ceil(filteredCustomers.length / itemsPerPage)}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={customerPage === Math.ceil(filteredCustomers.length / itemsPerPage)}
                    onClick={() => setCustomerPage(prev => Math.min(Math.ceil(filteredCustomers.length / itemsPerPage), prev + 1))}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>GTM 매출 데이터</CardTitle>
                  <CardDescription>글로벌 서비스 매출 정보 관리</CardDescription>
                </div>
                <Button onClick={() => setShowNewSalesForm(true)}>
                  <Plus className="h-4 w-4" />
                  새 매출 추가
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* New Sales Form */}
              {showNewSalesForm && (
                <div className="mb-6 p-4 border-2 border-blue-300 rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-4">새 매출 정보 추가</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">서비스 ID*</label>
                      <Input
                        value={newSales.service_id || ''}
                        onChange={(e) => setNewSales({...newSales, service_id: e.target.value})}
                        placeholder="서비스 ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">고객명*</label>
                      <Input
                        value={newSales.customer_name || ''}
                        onChange={(e) => setNewSales({...newSales, customer_name: e.target.value})}
                        placeholder="고객명"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">고객군</label>
                      <Select
                        value={newSales.customer_group || ''}
                        onChange={(e) => setNewSales({...newSales, customer_group: e.target.value})}
                      >
                        <option value="">선택</option>
                        <option value="대기업">대기업</option>
                        <option value="중견기업">중견기업</option>
                        <option value="중소기업">중소기업</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">서비스 유형</label>
                      <Select
                        value={newSales.service_type || ''}
                        onChange={(e) => setNewSales({...newSales, service_type: e.target.value})}
                      >
                        <option value="">선택</option>
                        <option value="MPLS">MPLS</option>
                        <option value="SD-WAN">SD-WAN</option>
                        <option value="Internet VPN">Internet VPN</option>
                        <option value="전용회선">전용회선</option>
                        <option value="Cloud Direct">Cloud Direct</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">대역폭</label>
                      <Input
                        value={newSales.capacity || ''}
                        onChange={(e) => setNewSales({...newSales, capacity: e.target.value})}
                        placeholder="예: 100M"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">개통일</label>
                      <Input
                        type="date"
                        value={newSales.service_start_date || ''}
                        onChange={(e) => setNewSales({...newSales, service_start_date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">계약 종료일</label>
                      <Input
                        type="date"
                        value={newSales.contract_end_date || ''}
                        onChange={(e) => setNewSales({...newSales, contract_end_date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">상태</label>
                      <Select
                        value={newSales.status || ''}
                        onChange={(e) => setNewSales({...newSales, status: e.target.value})}
                      >
                        <option value="">선택</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Terminated">Terminated</option>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => {
                      setShowNewSalesForm(false);
                      setNewSales({});
                    }}>
                      <X className="h-4 w-4" />
                      취소
                    </Button>
                    <Button onClick={() => saveSales(newSales)}>
                      <Save className="h-4 w-4" />
                      저장
                    </Button>
                  </div>
                </div>
              )}

              {/* Sales Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">서비스 ID</th>
                      <th className="text-left p-3">고객명</th>
                      <th className="text-left p-3">고객군</th>
                      <th className="text-left p-3">서비스 유형</th>
                      <th className="text-center p-3">대역폭</th>
                      <th className="text-center p-3">개통일</th>
                      <th className="text-center p-3">계약종료일</th>
                      <th className="text-center p-3">상태</th>
                      <th className="text-right p-3">최근 월매출</th>
                      <th className="text-center p-3">매출관리</th>
                      <th className="text-center p-3">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.slice((salesPage - 1) * itemsPerPage, salesPage * itemsPerPage).map((sale) => (
                      <tr key={sale.service_id} className="border-b hover:bg-gray-50">
                        {editingSales?.service_id === sale.service_id ? (
                          <>
                            <td className="p-2">
                              <Input
                                value={editingSales.service_id || ''}
                                disabled
                                className="text-sm bg-gray-100"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                value={editingSales.customer_name || ''}
                                onChange={(e) => setEditingSales({...editingSales, customer_name: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Select
                                value={editingSales.customer_group || ''}
                                onChange={(e) => setEditingSales({...editingSales, customer_group: e.target.value})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="대기업">대기업</option>
                                <option value="중견기업">중견기업</option>
                                <option value="중소기업">중소기업</option>
                              </Select>
                            </td>
                            <td className="p-2">
                              <Select
                                value={editingSales.service_type || ''}
                                onChange={(e) => setEditingSales({...editingSales, service_type: e.target.value})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="MPLS">MPLS</option>
                                <option value="SD-WAN">SD-WAN</option>
                                <option value="Internet VPN">Internet VPN</option>
                                <option value="전용회선">전용회선</option>
                                <option value="Cloud Direct">Cloud Direct</option>
                              </Select>
                            </td>
                            <td className="p-2">
                              <Input
                                value={editingSales.capacity || ''}
                                onChange={(e) => setEditingSales({...editingSales, capacity: e.target.value})}
                                className="text-sm text-center"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="date"
                                value={editingSales.service_start_date || ''}
                                onChange={(e) => setEditingSales({...editingSales, service_start_date: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                type="date"
                                value={editingSales.contract_end_date || ''}
                                onChange={(e) => setEditingSales({...editingSales, contract_end_date: e.target.value})}
                                className="text-sm"
                              />
                            </td>
                            <td className="p-2">
                              <Select
                                value={editingSales.status || ''}
                                onChange={(e) => setEditingSales({...editingSales, status: e.target.value})}
                                className="text-sm"
                              >
                                <option value="">-</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Terminated">Terminated</option>
                              </Select>
                            </td>
                            <td className="p-2 text-right">-</td>
                            <td className="p-2">-</td>
                            <td className="p-2">
                              <div className="flex justify-center gap-1">
                                <Button size="sm" onClick={() => saveSales(editingSales)}>
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingSales(null)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-3 font-medium">{sale.service_id}</td>
                            <td className="p-3">{sale.customer_name}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                sale.customer_group === '대기업' ? 'bg-purple-100 text-purple-700' :
                                sale.customer_group === '중견기업' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {sale.customer_group}
                              </span>
                            </td>
                            <td className="p-3">{sale.service_type}</td>
                            <td className="p-3 text-center">{sale.capacity}</td>
                            <td className="p-3 text-center">
                              {sale.service_start_date ? 
                                new Date(sale.service_start_date).toLocaleDateString('ko-KR') : 
                                '-'
                              }
                            </td>
                            <td className="p-3 text-center">
                              {sale.contract_end_date ? 
                                new Date(sale.contract_end_date).toLocaleDateString('ko-KR') : 
                                '-'
                              }
                            </td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                sale.status === 'Active' ? 'bg-green-100 text-green-700' :
                                sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {sale.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {(() => {
                                const recentRevenue = salesRevenues
                                  .filter(r => r.service_id === sale.service_id)
                                  .sort((a, b) => b.revenue_month.localeCompare(a.revenue_month))[0];
                                return recentRevenue ? 
                                  `₩${recentRevenue.revenue_amount?.toLocaleString()}` : 
                                  '-';
                              })()}
                            </td>
                            <td className="p-3">
                              <div className="flex justify-center">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => openRevenueModal(sale.service_id)}
                                >
                                  매출관리
                                </Button>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex justify-center gap-1">
                                <Button size="sm" variant="outline" onClick={() => setEditingSales(sale)}>
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteSales(sale.service_id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  전체 {filteredSales.length}개 중 {Math.min((salesPage - 1) * itemsPerPage + 1, filteredSales.length)}-{Math.min(salesPage * itemsPerPage, filteredSales.length)}개 표시
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={salesPage === 1}
                    onClick={() => setSalesPage(prev => Math.max(1, prev - 1))}
                  >
                    이전
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    페이지 {salesPage} / {Math.ceil(filteredSales.length / itemsPerPage)}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={salesPage === Math.ceil(filteredSales.length / itemsPerPage)}
                    onClick={() => setSalesPage(prev => Math.min(Math.ceil(filteredSales.length / itemsPerPage), prev + 1))}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Revenue Management Modal */}
      {showRevenueModal && selectedServiceId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">매출 이력 관리 - 서비스 ID: {selectedServiceId}</h2>
              <Button variant="outline" onClick={() => {
                setShowRevenueModal(false);
                setSelectedServiceId(null);
                setServiceRevenues([]);
                setNewRevenue({});
                setEditingRevenue(null);
              }}>
                <X className="h-4 w-4" />
                닫기
              </Button>
            </div>

            {/* Add New Revenue Form */}
            <div className="mb-6 p-4 border rounded-lg bg-blue-50">
              <h3 className="font-semibold mb-3">새 매출 추가</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">월 코드 (YYMM)*</label>
                  <Input
                    placeholder="예: 2501"
                    value={newRevenue.revenue_month || ''}
                    onChange={(e) => setNewRevenue({...newRevenue, revenue_month: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">매출액 (원)*</label>
                  <Input
                    type="number"
                    placeholder="예: 1000000"
                    value={newRevenue.revenue_amount || ''}
                    onChange={(e) => setNewRevenue({...newRevenue, revenue_amount: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button onClick={() => {
                  if (newRevenue.revenue_month && newRevenue.revenue_amount) {
                    saveRevenue({
                      service_id: selectedServiceId,
                      revenue_month: newRevenue.revenue_month,
                      revenue_amount: newRevenue.revenue_amount
                    });
                  } else {
                    showMessage('error', '모든 필수 항목을 입력해주세요.');
                  }
                }}>
                  <Plus className="h-4 w-4" />
                  추가
                </Button>
              </div>
            </div>

            {/* Revenue History Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3">월 코드</th>
                    <th className="text-left p-3">년도</th>
                    <th className="text-left p-3">월</th>
                    <th className="text-right p-3">매출액</th>
                    <th className="text-center p-3">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRevenues.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-6 text-gray-500">
                        등록된 매출 이력이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    serviceRevenues.map((revenue) => (
                      <tr key={revenue.revenue_month} className="border-b hover:bg-gray-50">
                        {editingRevenue?.revenue_month === revenue.revenue_month ? (
                          <>
                            <td className="p-2">{revenue.revenue_month}</td>
                            <td className="p-2">20{revenue.revenue_month.substring(0, 2)}년</td>
                            <td className="p-2">{parseInt(revenue.revenue_month.substring(2, 4))}월</td>
                            <td className="p-2">
                              <Input
                                type="number"
                                value={editingRevenue.revenue_amount || ''}
                                onChange={(e) => setEditingRevenue({...editingRevenue, revenue_amount: parseFloat(e.target.value)})}
                                className="text-sm text-right"
                              />
                            </td>
                            <td className="p-2">
                              <div className="flex justify-center gap-1">
                                <Button size="sm" onClick={() => saveRevenue({
                                  service_id: selectedServiceId,
                                  revenue_month: editingRevenue.revenue_month,
                                  revenue_amount: editingRevenue.revenue_amount
                                })}>
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingRevenue(null)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-3 font-medium">{revenue.revenue_month}</td>
                            <td className="p-3">20{revenue.revenue_month.substring(0, 2)}년</td>
                            <td className="p-3">{parseInt(revenue.revenue_month.substring(2, 4))}월</td>
                            <td className="p-3 text-right font-medium">
                              ₩{revenue.revenue_amount?.toLocaleString()}
                            </td>
                            <td className="p-3">
                              <div className="flex justify-center gap-1">
                                <Button size="sm" variant="outline" onClick={() => setEditingRevenue(revenue)}>
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteRevenue(selectedServiceId, revenue.revenue_month)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Summary Statistics */}
            {serviceRevenues.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">총 매출액:</span>
                    <p className="font-bold text-lg">
                      ₩{serviceRevenues.reduce((sum, r) => sum + (r.revenue_amount || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">평균 월매출:</span>
                    <p className="font-bold text-lg">
                      ₩{Math.round(serviceRevenues.reduce((sum, r) => sum + (r.revenue_amount || 0), 0) / serviceRevenues.length).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">기록된 개월 수:</span>
                    <p className="font-bold text-lg">{serviceRevenues.length}개월</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GTMDataManagement;