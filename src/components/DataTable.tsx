import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
]);

interface DataTableProps {
  rowData: any[];
  columnDefs: any[];
}

export function DataTable({ rowData, columnDefs }: DataTableProps) {
  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        // pivotMode는 엔터프라이즈에서만 지원
        // sideBar, cellSelection 등도 제외 (필요시 공식 문서 참고)
      />
    </div>
  );
}
