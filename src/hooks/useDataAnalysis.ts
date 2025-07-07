import { useState, useEffect, useRef } from 'react';
import { fetchTable, fetchSOFTable } from '../services/supabaseService';

export type DataSource = 'RFQ' | 'SOF' | 'KOTRA' | 'EPSILON_POPS' | 'KT_POPS' | 'VPN_CONNECTIONS' | 'HYUNDAI_MOTORS';

const TABLE_MAPPING: Record<DataSource, string> = {
  'RFQ': 'rfq_middlemile',
  'SOF': 'sof_middlemile', 
  'KOTRA': 'kotra',
  'EPSILON_POPS': 'epsilon_pops',
  'KT_POPS': 'kt_pops',
  'VPN_CONNECTIONS': 'vpn_connections',
  'HYUNDAI_MOTORS': 'hyundai_motors'
};

export function useDataAnalysis(dataSource: DataSource) {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const mountedRef = useRef(true);
  
  useEffect(() => {
    if (!mountedRef.current) return;
    
    let cancelled = false;

    async function loadData() {
      try {
        if (!cancelled && mountedRef.current) {
          setLoading(true);
          setError(null);
        }
        
        const tableName = TABLE_MAPPING[dataSource];
        if (!tableName) {
          throw new Error(`Unknown data source: ${dataSource}`);
        }
        
        console.log(`🔍 요청한 메뉴: ${dataSource}`);
        console.log(`📋 변환된 테이블명: ${tableName}`);
        console.log(`⏱️ 데이터 로딩 시작...`);
        
        const data = tableName === 'sof_middlemile' 
          ? await fetchSOFTable(tableName) 
          : await fetchTable(tableName);

        if (!cancelled && mountedRef.current) {
          if (data && data.length > 0) {
            console.log(`✅ 데이터 로딩 성공!`);
            console.log(`📊 불러온 rowData 개수: ${data.length}`);
            console.log(`🔑 첫 번째 행의 컬럼들:`, Object.keys(data[0]));
            
            setRowData(data);
            setColumnDefs(
              Object.keys(data[0]).map((key) => ({ headerName: key, field: key }))
            );
          } else {
            console.warn(`⚠️ ${dataSource} 데이터가 비어있습니다! (받은 데이터: ${data?.length || 0}건)`);
            setRowData([]);
            setColumnDefs([]);
          }
        }
      } catch (err) {
        if (!cancelled && mountedRef.current) {
          console.error(`❌ ${dataSource} 데이터 로딩 오류:`, err);
          const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다';
          setError(errorMessage);
          setRowData([]);
          setColumnDefs([]);
        }
      } finally {
        if (!cancelled && mountedRef.current) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [dataSource]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { rowData, columnDefs, loading, error };
} 