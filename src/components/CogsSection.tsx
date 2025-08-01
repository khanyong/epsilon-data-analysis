import React, { useState, useEffect } from 'react';
import { CogsByRegion } from '../services/cogsService';
import { getGlobalRevenueParams, resetCogsSectionData } from '../pages/MarketingReport/BusinessFeasibilitySections2-2';

interface CogsSectionProps {
  region: 'mumbai' | 'chennai';
}

// COGS 데이터 구조 정의
interface CogsItem {
  id: string;
  category: string;
  subCategory: string;
  point: string;
  costOwner: string;
  supplier: string;
  term: { value: number; unit: string };
  capacity: { value: number; unit: string };
  quantity: number;
  nrc: number; // Non-Recurring Cost
  mrc: number; // Monthly Recurring Cost
  arc: number; // Annual Recurring Cost
  yearlyCosts: number[]; // 2025-2029
  note: string;
}

interface CogsData {
  onNetBackbone: CogsItem[];
  localLoopKtVpn: CogsItem[];
}

// ASSUMPTION 데이터 구조 정의
interface CogsAssumption {
  capacityToLease: { value: number; unit: string };
  circuitDiscountPercent: number;
  colocationGrowthPercent: number;
  targetRfsMonths: number;
  churnPercent: number;
}

export function CogsSection({ region }: CogsSectionProps) {
  const [cogsAssumption, setCogsAssumption] = useState<CogsAssumption>({
    capacityToLease: { value: 350, unit: 'Mbps' },
    circuitDiscountPercent: 5,
    colocationGrowthPercent: 5.8,
    targetRfsMonths: 12,
    churnPercent: 0
  });

  const [cogsData, setCogsData] = useState<CogsData>({
    onNetBackbone: [
      {
        id: 'backbone-1',
        category: 'Implement on-net',
        subCategory: 'Backbone',
        point: region === 'mumbai' ? 'Mumbai~SG' : 'Chennai~SG',
        costOwner: 'Epsilon',
        supplier: 'Sify',
        term: { value: 3, unit: 'yr' },
        capacity: { value: 1, unit: 'G' },
        quantity: 1,
        nrc: 0,
        mrc: 2500,
        arc: 30000,
        yearlyCosts: [3750, 57000, 71250, 85500, 99750],
        note: 'Starting with 250M, lease on demand as long as KT BB allows.'
      },
      {
        id: 'fiber-1',
        category: 'Implement on-net',
        subCategory: 'Fiber XC',
        point: region === 'mumbai' ? 'Mumbai' : 'Chennai',
        costOwner: 'Epsilon',
        supplier: '',
        term: { value: 0, unit: '' },
        capacity: { value: 0, unit: '-' },
        quantity: 1,
        nrc: 150,
        mrc: 150,
        arc: 1800,
        yearlyCosts: [150, 1800, 1800, 3065, 1543],
        note: 'required'
      },
      {
        id: 'colocation-1',
        category: 'Implement on-net',
        subCategory: 'Colocation',
        point: region === 'mumbai' ? 'Mumbai' : 'Chennai',
        costOwner: 'Epsilon',
        supplier: 'Digital Realty',
        term: { value: 3, unit: 'yr' },
        capacity: { value: 0, unit: '' },
        quantity: 1,
        nrc: 0,
        mrc: 1350,
        arc: 16200,
        yearlyCosts: [1350, 16200, 16200, 27582, 13889],
        note: 'required'
      },
      {
        id: 'support-1',
        category: 'Implement on-net',
        subCategory: 'Support (HW)',
        point: '',
        costOwner: 'Epsilon',
        supplier: '',
        term: { value: 0, unit: '' },
        capacity: { value: 0, unit: '' },
        quantity: 1,
        nrc: 0,
        mrc: 167,
        arc: 2004,
        yearlyCosts: [167, 2004, 2004, 3412, 1718],
        note: 'required'
      }
    ],
    localLoopKtVpn: [
      {
        id: 'kt-vpn-1',
        category: 'Local Loop',
        subCategory: 'KT VPN',
        point: region === 'mumbai' ? 'Mumbai' : 'Chennai',
        costOwner: 'Epsilon',
        supplier: 'CMI',
        term: { value: 0, unit: '' },
        capacity: { value: 1, unit: 'G' },
        quantity: 1,
        nrc: 0,
        mrc: 3400,
        arc: 40800,
        yearlyCosts: [1700, 40800, 39780, 38760, 38760],
        note: 'Apr. 27 to renew for 3yr term - 50% of cost decrease applied for FY27, full cost decrease applied for FY28~29'
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // COGS 데이터 리셋 이벤트 감지
  useEffect(() => {
    const handleCogsReset = (event: CustomEvent) => {
      if (event.detail.region === region) {
        // CogsSection 내부 상태를 기본값으로 되돌리기
        setCogsAssumption({
          capacityToLease: { value: 350, unit: 'Mbps' },
          circuitDiscountPercent: 5,
          colocationGrowthPercent: 5.8,
          targetRfsMonths: 12,
          churnPercent: 0
        });

        // COGS 데이터를 기본값으로 되돌리기
        setCogsData({
          onNetBackbone: [
            {
              id: 'backbone-1',
              category: 'Implement on-net',
              subCategory: 'Backbone',
              point: region === 'mumbai' ? 'Mumbai~SG' : 'Chennai~SG',
              costOwner: 'Epsilon',
              supplier: 'Sify',
              term: { value: 3, unit: 'yr' },
              capacity: { value: 1, unit: 'G' },
              quantity: 1,
              nrc: 0,
              mrc: 2500,
              arc: 30000,
              yearlyCosts: [3750, 57000, 71250, 85500, 99750],
              note: 'Starting with 250M, lease on demand as long as KT BB allows.'
            },
            {
              id: 'fiber-1',
              category: 'Implement on-net',
              subCategory: 'Fiber XC',
              point: region === 'mumbai' ? 'Mumbai' : 'Chennai',
              costOwner: 'Epsilon',
              supplier: '',
              term: { value: 0, unit: '' },
              capacity: { value: 0, unit: '-' },
              quantity: 1,
              nrc: 150,
              mrc: 150,
              arc: 1800,
              yearlyCosts: [150, 1800, 1800, 3065, 1543],
              note: 'required'
            },
            {
              id: 'colocation-1',
              category: 'Implement on-net',
              subCategory: 'Colocation',
              point: region === 'mumbai' ? 'Mumbai' : 'Chennai',
              costOwner: 'Epsilon',
              supplier: 'Digital Realty',
              term: { value: 3, unit: 'yr' },
              capacity: { value: 0, unit: '' },
              quantity: 1,
              nrc: 0,
              mrc: 1350,
              arc: 16200,
              yearlyCosts: [1350, 16200, 16200, 27582, 13889],
              note: 'required'
            },
            {
              id: 'support-1',
              category: 'Implement on-net',
              subCategory: 'Support (HW)',
              point: '',
              costOwner: 'Epsilon',
              supplier: '',
              term: { value: 0, unit: '' },
              capacity: { value: 0, unit: '' },
              quantity: 1,
              nrc: 0,
              mrc: 167,
              arc: 2004,
              yearlyCosts: [167, 2004, 2004, 3412, 1718],
              note: 'required'
            }
          ],
          localLoopKtVpn: [
            {
              id: 'kt-vpn-1',
              category: 'Local Loop',
              subCategory: 'KT VPN',
              point: region === 'mumbai' ? 'Mumbai' : 'Chennai',
              costOwner: 'Epsilon',
              supplier: 'CMI',
              term: { value: 0, unit: '' },
              capacity: { value: 1, unit: 'G' },
              quantity: 1,
              nrc: 0,
              mrc: 3400,
              arc: 40800,
              yearlyCosts: [1700, 40800, 39780, 38760, 38760],
              note: 'Apr. 27 to renew for 3yr term - 50% of cost decrease applied for FY27, full cost decrease applied for FY28~29'
            }
          ]
        });
      }
    };

    window.addEventListener('cogsDataReset', handleCogsReset as EventListener);
    
    return () => {
      window.removeEventListener('cogsDataReset', handleCogsReset as EventListener);
    };
  }, [region]);

  // 연도별 판매단위 계산
  const calculateSalesUnits = () => {
    const revenueParams = getGlobalRevenueParams(region);
    const salesUnits: number[] = [];
    
    for (let year = 0; year < 5; year++) {
      const customerCount = revenueParams.customersByYear[year];
      const salesUnit = customerCount * revenueParams.mbpsPerCustomer;
      salesUnits.push(salesUnit);
    }
    
    return salesUnits;
  };

  // COGS 연도별 비용 계산
  const calculateYearlyCosts = (mrc: number, itemId: string) => {
    const salesUnits = calculateSalesUnits();
    const yearlyCosts: number[] = [];
    
    // 1yr apply % revenue 계산: (Target RFS - 11) / 12
    const oneYearApplyPercentRevenue = (cogsAssumption.targetRfsMonths - 11) / 12;
    
    // Fiber XC 항목 찾기
    const fiberXcItem = cogsData.onNetBackbone.find(item => item.id === 'fiber-1');
    const fiberXcQty = fiberXcItem ? fiberXcItem.quantity : 1;
    
    // Colocation 항목 찾기
    const colocationItem = cogsData.onNetBackbone.find(item => item.id === 'colocation-1');
    const colocationQty = colocationItem ? colocationItem.quantity : 1;
    
    // Support (HW) 항목 찾기
    const supportItem = cogsData.onNetBackbone.find(item => item.id === 'support-1');
    const supportQty = supportItem ? supportItem.quantity : 1;
    
    salesUnits.forEach((salesUnit, yearIndex) => {
      let cost: number = 0; // 기본값 설정
      
      if (itemId === 'fiber-1') {
        if (yearIndex === 0) {
          // Fiber XC 2025년: MRC × 12 × 1yr apply % revenue × QTY
          cost = mrc * 12 * oneYearApplyPercentRevenue * fiberXcQty;
        } else if (yearIndex === 3) {
          // Fiber XC 2028년: MRC × 12 - 2025년 COGS + MRC × 12 × (1-Circuit discount %)^3 × (1-1yr apply % revenue)
          const year2025Cost = mrc * 12 * oneYearApplyPercentRevenue * fiberXcQty;
          const circuitDiscountFactor = Math.pow(1 - cogsAssumption.circuitDiscountPercent / 100, 3);
          cost = (mrc * 12) - year2025Cost + (mrc * 12) * circuitDiscountFactor * (1 - oneYearApplyPercentRevenue);
        } else if (yearIndex === 4) {
          // Fiber XC 2029년: MRC × 12 × (1 - Circuit discount %)^3
          const circuitDiscountFactor = Math.pow(1 - cogsAssumption.circuitDiscountPercent / 100, 3);
          cost = mrc * 12 * circuitDiscountFactor;
        } else {
          // Fiber XC 2026년, 2027년: MRC × 12
          cost = mrc * 12;
        }
      } else if (itemId === 'colocation-1') {
        if (yearIndex === 0) {
          // Colocation 2025년: MRC × 12 × 1yr apply % revenue × QTY
          const colocationItem = cogsData.onNetBackbone.find(item => item.id === 'colocation-1');
          const colocationQty = colocationItem ? colocationItem.quantity : 1;
          cost = mrc * 12 * oneYearApplyPercentRevenue * colocationQty;
        } else if (yearIndex === 3) {
          // Colocation 2028년: MRC × 12 - 2025년 COGS + MRC × 12 × (1-Circuit discount %)^3 × (1-1yr apply % revenue)
          const year2025Cost = mrc * 12 * oneYearApplyPercentRevenue * colocationQty;
          const circuitDiscountFactor = Math.pow(1 - cogsAssumption.circuitDiscountPercent / 100, 3);
          cost = (mrc * 12) - year2025Cost + (mrc * 12) * circuitDiscountFactor * (1 - oneYearApplyPercentRevenue);
        } else if (yearIndex === 4) {
          // Colocation 2029년: MRC × 12 × (1 - Circuit discount %)^3
          const circuitDiscountFactor = Math.pow(1 - cogsAssumption.circuitDiscountPercent / 100, 3);
          cost = mrc * 12 * circuitDiscountFactor;
        } else {
          // Colocation 2026년, 2027년: MRC × 12
          cost = mrc * 12;
        }
      } else if (itemId === 'support-1') {
        if (yearIndex === 0) {
          // Support (HW) 2025년: MRC × 12 × 1yr apply % revenue × Support QTY
          cost = mrc * 12 * oneYearApplyPercentRevenue * supportQty;
        } else if (yearIndex === 3) {
          // Support (HW) 2028년: MRC × 12 - 2025년 COGS + MRC × 12 × (1-Circuit discount %)^3 × (1-1yr apply % revenue)
          const year2025Cost = mrc * 12 * oneYearApplyPercentRevenue * supportQty;
          const circuitDiscountFactor = Math.pow(1 - cogsAssumption.circuitDiscountPercent / 100, 3);
          cost = (mrc * 12) - year2025Cost + (mrc * 12) * circuitDiscountFactor * (1 - oneYearApplyPercentRevenue);
        } else if (yearIndex === 4) {
          // Support (HW) 2029년: MRC × 12 × (1 - Circuit discount %)^3
          const circuitDiscountFactor = Math.pow(1 - cogsAssumption.circuitDiscountPercent / 100, 3);
          cost = mrc * 12 * circuitDiscountFactor;
        } else {
          // Support (HW) 2026년, 2027년: MRC × 12
          cost = mrc * 12;
        }
      } else if (itemId === 'kt-vpn-1') {
        if (yearIndex === 0) {
          // KT VPN 2025년: MRC × 12 × 1yr apply % revenue
          cost = mrc * 12 * oneYearApplyPercentRevenue;
        } else if (yearIndex === 1) {
          // KT VPN 2026년: MRC × 12
          cost = mrc * 12;
        } else if (yearIndex === 2) {
          // KT VPN 2027년: MRC × 12 × (1 - (CircuitDiscount % / 2))
          cost = mrc * 12 * (1 - (cogsAssumption.circuitDiscountPercent / 100 / 2));
        } else if (yearIndex === 3) {
          // KT VPN 2028년: MRC × 12 × (1 - circuit discount %)
          cost = mrc * 12 * (1 - cogsAssumption.circuitDiscountPercent / 100);
        } else if (yearIndex === 4) {
          // KT VPN 2029년: MRC × 12 × (1 - circuit discount %)
          cost = mrc * 12 * (1 - cogsAssumption.circuitDiscountPercent / 100);
        }
      } else if (itemId === 'backbone-1') {
        if (yearIndex === 0) {
          // 2025년: (MRC × 12) × (1yr apply % revenue) × (판매단위 + 100) ÷ 100
          cost = (mrc * 12) * (oneYearApplyPercentRevenue) * (salesUnit + 100) / 100;
        } else if (yearIndex === 1 || yearIndex === 2 || yearIndex === 3 || yearIndex === 4) {
          // 2026년, 2027년, 2028년, 2029년: MRC × 12 × (판매단위 + 100)/100 × (1 - CircuitDiscount %)
          cost = mrc * 12 * (salesUnit + 100) / 100 * (1 - cogsAssumption.circuitDiscountPercent / 100);
        }
      } else if (yearIndex === 0) {
        // 2025년 (기타 항목): (MRC × 12) × (1yr apply % revenue) × (판매단위 + 100) ÷ 100
        cost = (mrc * 12) * (oneYearApplyPercentRevenue) * (salesUnit + 100) / 100;
      } else {
        // 2026년부터 (기타 항목): MRC × 12
        cost = mrc * 12;
      }
      
      yearlyCosts.push(cost);
    });
    
    return yearlyCosts;
  };

  // COGS 데이터 업데이트 (MRC 변경 시 연도별 비용 자동 계산)
  const updateCogsYearlyCosts = () => {
    setCogsData(prev => {
      const updated = { ...prev };
      
      Object.keys(updated).forEach(section => {
        updated[section as keyof CogsData] = updated[section as keyof CogsData].map(item => ({
          ...item,
          yearlyCosts: calculateYearlyCosts(item.mrc, item.id)
        }));
      });
      
      // 전역 COGS 데이터도 자동으로 업데이트
      const totalYearlyCosts = [0, 0, 0, 0, 0];
      Object.values(updated).forEach(section => {
        section.forEach(item => {
          item.yearlyCosts.forEach((cost, index) => {
            totalYearlyCosts[index] += cost;
          });
        });
      });
      
      // 전역 상태 업데이트
      import('../pages/MarketingReport/BusinessFeasibilitySections2-2').then(({ updateGlobalCogsData }) => {
        updateGlobalCogsData(region, totalYearlyCosts);
      });
      
      return updated;
    });
  };

  // MRC 변경 시 연도별 비용 자동 업데이트
  useEffect(() => {
    updateCogsYearlyCosts();
  }, [cogsAssumption.targetRfsMonths, cogsAssumption.circuitDiscountPercent]);

  // ASSUMPTION 값 변경 핸들러
  const handleAssumptionChange = (field: keyof CogsAssumption, value: any) => {
    setCogsAssumption(prev => ({
      ...prev,
      [field]: value
    }));
    // Assumption 변경 시 COGS 비용 재계산
    setTimeout(() => updateCogsYearlyCosts(), 0);
  };

  // ASSUMPTION 숫자 값 변경 핸들러
  const handleAssumptionNumericChange = (field: keyof CogsAssumption, value: number) => {
    if (field === 'capacityToLease') {
      setCogsAssumption(prev => ({
        ...prev,
        capacityToLease: { ...prev.capacityToLease, value }
      }));
    } else {
      setCogsAssumption(prev => ({
        ...prev,
        [field]: value
      }));
    }
    // Assumption 변경 시 COGS 비용 재계산
    setTimeout(() => updateCogsYearlyCosts(), 0);
  };

  // COGS 값 변경 핸들러
  const handleCogsValueChange = (section: keyof CogsData, itemId: string, field: keyof CogsItem, value: any) => {
    setCogsData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId 
          ? { ...item, [field]: value }
          : item
      )
    }));
  };

  // COGS 숫자 값 변경 핸들러 (term, capacity용)
  const handleCogsNumericChange = (section: keyof CogsData, itemId: string, field: 'term' | 'capacity', value: number) => {
    setCogsData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId 
          ? { ...item, [field]: { ...item[field], value } }
          : item
      )
    }));
  };

  // MRC 변경 핸들러 (연도별 비용 자동 계산)
  const handleMrcChange = (section: keyof CogsData, itemId: string, value: number) => {
    setCogsData(prev => {
      const updated = {
        ...prev,
        [section]: prev[section].map(item => 
          item.id === itemId 
            ? { 
                ...item, 
                mrc: value
              }
            : item
        )
      };
      
      return updated;
    });
    
    // MRC 변경 후 모든 항목의 연도별 비용 재계산
    setTimeout(() => updateCogsYearlyCosts(), 0);
  };

  // 연도별 비용 변경 핸들러
  const handleYearlyCostChange = (section: keyof CogsData, itemId: string, yearIndex: number, value: number) => {
    setCogsData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              yearlyCosts: item.yearlyCosts.map((cost, index) => 
                index === yearIndex ? value : cost
              )
            }
          : item
      )
    }));
  };

  // 저장 핸들러
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      // COGS 데이터를 기존 형식으로 변환
      const totalYearlyCosts = [0, 0, 0, 0, 0];
      
      Object.values(cogsData).forEach(section => {
        section.forEach(item => {
          item.yearlyCosts.forEach((cost, index) => {
            totalYearlyCosts[index] += cost;
          });
        });
      });

      // 전역 COGS 데이터 업데이트 (Supabase 호출 제거)
      import('../pages/MarketingReport/BusinessFeasibilitySections2-2').then(({ updateGlobalCogsData }) => {
        updateGlobalCogsData(region, totalYearlyCosts);
      });
      
      setMessage('✅ COGS 데이터가 성공적으로 실행되었습니다.');
    } catch (error) {
      console.error('COGS 실행 실패:', error);
      setMessage('❌ COGS 데이터 실행에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 리셋 핸들러
  const handleReset = async () => {
    try {
      // 전역 COGS 데이터를 기본값으로 리셋
      resetCogsSectionData(region);
      setMessage('✅ COGS 데이터가 기본값으로 리셋되었습니다.');
    } catch (error) {
      console.error('COGS 리셋 실패:', error);
      setMessage('❌ COGS 데이터 리셋에 실패했습니다.');
    }
  };

  // 총계 계산
  const calculateTotals = (section: keyof CogsData) => {
    const totals = {
      nrc: 0,
      mrc: 0,
      arc: 0,
      yearlyCosts: [0, 0, 0, 0, 0]
    };

    cogsData[section].forEach(item => {
      totals.nrc += item.nrc;
      totals.mrc += item.mrc;
      totals.arc += item.arc;
      item.yearlyCosts.forEach((cost, index) => {
        totals.yearlyCosts[index] += cost;
      });
    });

    return totals;
  };

  // 전체 총계 계산
  const calculateGrandTotal = () => {
    const grandTotal = [0, 0, 0, 0, 0];
    Object.keys(cogsData).forEach(section => {
      const totals = calculateTotals(section as keyof CogsData);
      totals.yearlyCosts.forEach((cost, index) => {
        grandTotal[index] += cost;
      });
    });
    return grandTotal;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ASSUMPTION 테이블 렌더링
  const renderAssumptionTable = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">📋 COGS ASSUMPTION - {region === 'mumbai' ? '뭄바이' : '첸나이'}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setCogsAssumption({
                  capacityToLease: { value: 350, unit: 'Mbps' },
                  circuitDiscountPercent: 5,
                  colocationGrowthPercent: 5.8,
                  targetRfsMonths: 12,
                  churnPercent: 0
                });
                setMessage('✅ COGS ASSUMPTION이 기본값으로 리셋되었습니다.');
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
            >
              기본값으로 리셋
            </button>
            <button
              onClick={() => {
                // Assumption 변경사항을 전역에 반영하는 로직
                setTimeout(() => updateCogsYearlyCosts(), 0);
                setMessage('✅ COGS ASSUMPTION이 실행되었습니다.');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
            >
              실행
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Parameter</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">Capacity to lease</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={cogsAssumption.capacityToLease.value}
                      onChange={(e) => handleAssumptionNumericChange('capacityToLease', Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                      min="0"
                    />
                    <span className="ml-2 text-gray-500 text-xs">{cogsAssumption.capacityToLease.unit}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 border-b text-xs">Protected circuit btw Hanoi and Hongkong Equinix SG1</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">Circuit Discount %</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <input
                    type="number"
                    value={cogsAssumption.circuitDiscountPercent}
                    onChange={(e) => handleAssumptionChange('circuitDiscountPercent', Number(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 border-b text-xs">Circuit discount percentage</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">Colocation growth %</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <input
                    type="number"
                    value={cogsAssumption.colocationGrowthPercent}
                    onChange={(e) => handleAssumptionChange('colocationGrowthPercent', Number(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 border-b text-xs">23'24 power increase</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">Target RFS(mm)</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <input
                    type="number"
                    value={cogsAssumption.targetRfsMonths}
                    onChange={(e) => handleAssumptionChange('targetRfsMonths', Number(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    min="1"
                    max="60"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 border-b text-xs">Target Ready for Service in months</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">1yr apply % revenue</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <div className="text-sm text-gray-600">
                    {(((cogsAssumption.targetRfsMonths - 11) / 12) * 100).toFixed(1)}% (계산값)
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 border-b text-xs">(Target RFS - 11) / 12</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">Churn %</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <input
                    type="number"
                    value={cogsAssumption.churnPercent}
                    onChange={(e) => handleAssumptionChange('churnPercent', Number(e.target.value))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 border-b text-xs">Customer churn percentage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCogsInputTable = (section: keyof CogsData, title: string, items: CogsItem[]) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">{title} - 입력</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Term</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Capacity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">MRC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <div className="font-medium">{item.category}</div>
                    <div className="text-xs text-gray-500">{item.subCategory}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.term.value}
                        onChange={(e) => handleCogsNumericChange(section, item.id, 'term', Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                        min="0"
                      />
                      <span className="ml-1 text-gray-500 text-xs">{item.term.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.capacity.value}
                        onChange={(e) => handleCogsNumericChange(section, item.id, 'capacity', Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                        min="0"
                      />
                      <span className="ml-1 text-gray-500 text-xs">{item.capacity.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleCogsValueChange(section, item.id, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <input
                      type="number"
                      value={item.mrc}
                      onChange={(e) => handleMrcChange(section, item.id, Number(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCogsResultTable = (section: keyof CogsData, title: string, items: CogsItem[]) => {
    const totals = calculateTotals(section);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">{title} - 결과</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Point</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cost Owner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">2025</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">2026</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">2027</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">2028</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">2029</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <div className="font-medium">{item.category}</div>
                    <div className="text-xs text-gray-500">{item.subCategory}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{item.point}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{item.costOwner}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{item.supplier}</td>
                  {item.yearlyCosts.map((cost, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-gray-900 border-b">
                      {formatCurrency(cost)}
                    </td>
                  ))}
                </tr>
              ))}
              {/* 총계 행 */}
              <tr className="font-semibold bg-blue-50">
                <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={4}>총계</td>
                {totals.yearlyCosts.map((cost, index) => (
                  <td key={index} className="px-4 py-3 text-sm text-gray-900 border-b font-medium">
                    {formatCurrency(cost)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 통합된 메시지 영역 */}
      {message && (
        <div className={`p-4 rounded-lg border ${
          message.includes('✅') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <div className="flex items-center">
            <span className="text-lg mr-2">
              {message.includes('✅') ? '✅' : '❌'}
            </span>
            <span className="font-medium">{message}</span>
          </div>
        </div>
      )}

      {/* ASSUMPTION 섹션 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
        {renderAssumptionTable()}
      </div>

      {/* COGS 입력 섹션 */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">💰 COGS (Cost of Goods Sold) 입력 - {region === 'mumbai' ? '뭄바이' : '첸나이'}</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              기본값으로 리셋
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? '실행 중...' : '실행'}
            </button>
          </div>
        </div>

        {/* COGS 입력 테이블들 */}
        {renderCogsInputTable('onNetBackbone', 'COGS - On net Backbone', cogsData.onNetBackbone)}
        {renderCogsInputTable('localLoopKtVpn', 'Local loop (KT VPN)', cogsData.localLoopKtVpn)}
      </div>

      {/* COGS 결과 섹션 */}
      <div className="bg-gradient-to-r from-green-50 to-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 COGS (Cost of Goods Sold) 결과 - {region === 'mumbai' ? '뭄바이' : '첸나이'}</h3>
        
        {/* COGS 결과 테이블들 */}
        {renderCogsResultTable('onNetBackbone', 'COGS - On net Backbone', cogsData.onNetBackbone)}
        {renderCogsResultTable('localLoopKtVpn', 'Local loop (KT VPN)', cogsData.localLoopKtVpn)}

        {/* 전체 총계 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">📊 전체 COGS 총계</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {calculateGrandTotal().map((total, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-800">{2025 + index}년</div>
                <div className="text-lg font-bold text-blue-600">{formatCurrency(total)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COGS 요약 정보 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-800">총 COGS</div>
            <div className="text-lg font-bold text-blue-600">
              {formatCurrency(calculateGrandTotal().reduce((sum, val) => sum + val, 0))}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-800">연평균 COGS</div>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(calculateGrandTotal().reduce((sum, val) => sum + val, 0) / 5)}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-800">연평균 성장률</div>
            <div className="text-lg font-bold text-purple-600">
              {((Math.pow(
                calculateGrandTotal()[4] / calculateGrandTotal()[0], 
                1/4
              ) - 1) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 