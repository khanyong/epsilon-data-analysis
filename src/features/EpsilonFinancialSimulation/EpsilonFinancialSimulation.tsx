import React, { useState, useEffect, useCallback, useRef } from 'react';
import './EpsilonFinancialSimulation.css';

interface CellData {
  value: number | string;
  formula?: string;
  readonly?: boolean;
  type?: 'input' | 'formula' | 'calculated' | 'header' | 'year' | 'total' | 'empty';
}

interface SheetData {
  [key: string]: CellData;
}

const EpsilonFinancialSimulation: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState('valuation');
  const [wacc, setWacc] = useState(6.86);
  const [terminalGrowth, setTerminalGrowth] = useState(2.0);
  const [currentCell, setCurrentCell] = useState<string | null>(null);
  
  // Financial data state
  const [financialData, setFinancialData] = useState({
    revenue: {
      2021: 23156279,
      2022: 30451679,
      2023: 38568085,
      2024: 39199876,
      2025: 42036926,
      2026: 47459314,
      2027: 52500000,
      2028: 57000000,
      2029: 61500000,
    },
    costOfSales: {
      2021: -11573910,
      2022: -15540267,
      2023: -20978439,
      2024: -20301639,
      2025: -21775128,
      2026: -24583925,
      2027: -27195000,
      2028: -29526000,
      2029: -31857000,
    },
    sgaExpenses: {
      2021: -14504623,
      2022: -16163984,
      2023: -18651369,
      2024: -16170350,
      2025: -17319214,
      2026: -19553237,
      2027: -21630000,
      2028: -23484000,
      2029: -25338000,
    },
    depreciation: {
      2021: -1601347,
      2022: -2101654,
      2023: -1931173,
      2024: -1931173,
      2025: -2000000,
      2026: -2200000,
      2027: -2400000,
      2028: -2600000,
      2029: -2800000,
    },
    capex: {
      2021: -2491591,
      2022: -214326,
      2023: -523409,
      2024: -523409,
      2025: -583,
      2026: -56580646,
      2027: -41927113,
      2028: -28298670,
      2029: -15000000,
    },
    nwcChange: {
      2021: 0,
      2022: 0,
      2023: 0,
      2024: 0,
      2025: 0,
      2026: 0,
      2027: 0,
      2028: 0,
      2029: 0,
    },
    cash: 1948227,
    debt: 0,
    shares: 213660,
  });

  // Calculate derived values
  const calculateFinancials = useCallback(() => {
    const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
    const results: any = {
      grossProfit: {},
      ebitda: {},
      ebit: {},
      tax: {},
      nopat: {},
      fcf: {},
      pvFcf: {},
    };

    years.forEach((year) => {
      // Gross Profit
      results.grossProfit[year] = financialData.revenue[year] + financialData.costOfSales[year];
      
      // EBITDA
      results.ebitda[year] = results.grossProfit[year] + financialData.sgaExpenses[year];
      
      // EBIT
      results.ebit[year] = results.ebitda[year] + financialData.depreciation[year];
      
      // Tax (17% if EBIT > 0)
      results.tax[year] = results.ebit[year] > 0 ? -results.ebit[year] * 0.17 : 0;
      
      // NOPAT
      results.nopat[year] = results.ebit[year] + results.tax[year];
      
      // Free Cash Flow
      results.fcf[year] = results.nopat[year] 
        + Math.abs(financialData.depreciation[year])
        - financialData.nwcChange[year]
        + financialData.capex[year];
    });

    // Calculate PV of FCF for forecast years
    const forecastYears = [2025, 2026, 2027, 2028, 2029];
    const discountPeriods = [0.5, 1.5, 2.5, 3.5, 4.5];
    let sumPvFcf = 0;

    forecastYears.forEach((year, idx) => {
      const discountFactor = Math.pow(1 + wacc / 100, -discountPeriods[idx]);
      results.pvFcf[year] = results.fcf[year] * discountFactor;
      sumPvFcf += results.pvFcf[year];
    });

    // Terminal Value
    const lastFcf = results.fcf[2029];
    const terminalValue = (lastFcf * (1 + terminalGrowth / 100)) / (wacc / 100 - terminalGrowth / 100);
    const terminalDiscountFactor = Math.pow(1 + wacc / 100, -5);
    const pvTerminalValue = terminalValue * terminalDiscountFactor;

    // Enterprise and Equity Value
    const enterpriseValue = sumPvFcf + pvTerminalValue;
    const equityValue = enterpriseValue + financialData.cash - financialData.debt;
    const valuePerShare = equityValue / financialData.shares;

    return {
      ...results,
      sumPvFcf,
      terminalValue,
      pvTerminalValue,
      enterpriseValue,
      equityValue,
      valuePerShare,
    };
  }, [financialData, wacc, terminalGrowth]);

  const calculatedValues = calculateFinancials();

  // Format number with commas
  const formatNumber = (num: number | undefined, decimals: number = 0): string => {
    if (num === undefined || num === null) return '';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Handle input changes
  const handleInputChange = (field: string, year: number | string, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    
    if (typeof year === 'number') {
      setFinancialData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [year]: numValue,
        },
      }));
    } else {
      setFinancialData(prev => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  // Input cell component
  const InputCell = ({ 
    value, 
    onChange, 
    readonly = false, 
    className = '',
    type = 'number'
  }: {
    value: number | string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    className?: string;
    type?: string;
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(
      typeof value === 'number' ? value.toString() : value
    );

    // Update local value when prop changes
    React.useEffect(() => {
      if (!isFocused) {
        setLocalValue(typeof value === 'number' ? value.toString() : value);
      }
    }, [value, isFocused]);

    const displayValue = isFocused 
      ? localValue 
      : (typeof value === 'number' ? formatNumber(value) : value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      onChange?.(newValue);
    };

    const handleFocus = () => {
      setIsFocused(true);
      // Show raw number without commas when focused
      setLocalValue(typeof value === 'number' ? value.toString() : value.toString().replace(/,/g, ''));
    };

    const handleBlur = () => {
      setIsFocused(false);
      // Trigger final onChange with cleaned value
      const cleanValue = localValue.replace(/,/g, '');
      onChange?.(cleanValue);
    };

    return (
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        readOnly={readonly}
        className={className}
        style={{ textAlign: 'right' }}
      />
    );
  };

  return (
    <div className="epsilon-financial-simulation">
      <div className="excel-container">
        <div className="excel-header">
          <h1>📊 DCF Valuation Model - Epsilon SP Financial Projection</h1>
          <div>
            <span style={{ fontSize: '12px' }}>Auto-save: On | Last saved: Just now</span>
          </div>
        </div>

        <div className="excel-toolbar">
          <div className="toolbar-group">
            <button className="toolbar-button">💾 Save</button>
            <button className="toolbar-button">📁 Open</button>
            <button className="toolbar-button">📤 Export</button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button">📋 Copy</button>
            <button className="toolbar-button">📄 Paste</button>
            <button className="toolbar-button">🗑️ Clear</button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button">➕ Row</button>
            <button className="toolbar-button">➕ Column</button>
            <button className="toolbar-button">➖ Row</button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button">Σ Sum</button>
            <button className="toolbar-button">fx Function</button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button">$ Format</button>
            <button className="toolbar-button">% Percent</button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button" onClick={() => calculateFinancials()}>
              🔄 Recalculate
            </button>
          </div>
        </div>

        <div className="formula-bar">
          <label id="cellAddress">{currentCell || 'A1'}</label>
          <input 
            type="text" 
            className="formula-input" 
            placeholder="Enter value or formula (start with =)"
          />
        </div>

        <div className="sheet-tabs">
          <div 
            className={`sheet-tab ${activeSheet === 'valuation' ? 'active' : ''}`}
            onClick={() => setActiveSheet('valuation')}
          >
            Valuation
          </div>
          <div 
            className={`sheet-tab ${activeSheet === 'income' ? 'active' : ''}`}
            onClick={() => setActiveSheet('income')}
          >
            Income Statement
          </div>
          <div 
            className={`sheet-tab ${activeSheet === 'cashflow' ? 'active' : ''}`}
            onClick={() => setActiveSheet('cashflow')}
          >
            Cash Flow
          </div>
          <div 
            className={`sheet-tab ${activeSheet === 'wacc' ? 'active' : ''}`}
            onClick={() => setActiveSheet('wacc')}
          >
            WACC
          </div>
          <div 
            className={`sheet-tab ${activeSheet === 'assumptions' ? 'active' : ''}`}
            onClick={() => setActiveSheet('assumptions')}
          >
            Assumptions
          </div>
          <div 
            className={`sheet-tab ${activeSheet === 'sensitivity' ? 'active' : ''}`}
            onClick={() => setActiveSheet('sensitivity')}
          >
            Sensitivity
          </div>
          <div 
            className={`sheet-tab ${activeSheet === 'charts' ? 'active' : ''}`}
            onClick={() => setActiveSheet('charts')}
          >
            Charts
          </div>
        </div>

        <div className="spreadsheet-wrapper">
          {activeSheet === 'valuation' && (
            <table className="spreadsheet">
              <thead>
                <tr>
                  <th className="row-header"></th>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].map(col => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Title Row */}
                <tr>
                  <td className="row-header">1</td>
                  <td colSpan={13} className="section-title">
                    <input type="text" value="DCF VALUATION MODEL - EPSILON SP" readOnly />
                  </td>
                </tr>

                {/* Empty Row */}
                <tr>
                  <td className="row-header">2</td>
                  <td className="cell-empty" colSpan={13}></td>
                </tr>

                {/* Year Headers */}
                <tr>
                  <td className="row-header">3</td>
                  <td colSpan={3} className="cell-header">
                    <input type="text" value="DCF Analysis" readOnly />
                  </td>
                  <td className="cell-year"><input type="text" value="Actual" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Actual" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Actual" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Base Year" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Year 1" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Year 2" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Year 3" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Year 4" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Year 5" readOnly /></td>
                  <td className="cell-year"><input type="text" value="Terminal" readOnly /></td>
                </tr>

                {/* Period Row */}
                <tr>
                  <td className="row-header">4</td>
                  <td colSpan={3} className="cell-header">
                    <input type="text" value="Period" readOnly />
                  </td>
                  <td className="cell-input"><input type="text" value="2021" readOnly /></td>
                  <td className="cell-input"><input type="text" value="2022" readOnly /></td>
                  <td className="cell-input"><input type="text" value="2023" readOnly /></td>
                  <td className="cell-input"><input type="text" value="2024" readOnly /></td>
                  <td className="cell-formula"><input type="text" value="2025" readOnly /></td>
                  <td className="cell-formula"><input type="text" value="2026" readOnly /></td>
                  <td className="cell-formula"><input type="text" value="2027" readOnly /></td>
                  <td className="cell-formula"><input type="text" value="2028" readOnly /></td>
                  <td className="cell-formula"><input type="text" value="2029" readOnly /></td>
                  <td className="cell-formula"><input type="text" value="Perpetual" readOnly /></td>
                </tr>

                {/* Empty Row */}
                <tr>
                  <td className="row-header">5</td>
                  <td className="cell-empty" colSpan={13}></td>
                </tr>

                {/* INCOME STATEMENT Section */}
                <tr>
                  <td className="row-header">6</td>
                  <td colSpan={13} className="cell-header" style={{ background: '#e8f4f8' }}>
                    <input type="text" value="I. INCOME STATEMENT" readOnly />
                  </td>
                </tr>

                {/* Revenue */}
                <tr>
                  <td className="row-header">7</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Revenue" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-input">
                      <InputCell
                        value={financialData.revenue[year]}
                        onChange={(val) => handleInputChange('revenue', year, val)}
                      />
                    </td>
                  ))}
                  <td className="cell-calculated">
                    <input type="text" value={`=${formatNumber(financialData.revenue[2029] * 1.02)}`} readOnly />
                  </td>
                </tr>

                {/* Cost of Sales */}
                <tr>
                  <td className="row-header">8</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Cost of Sales" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-input">
                      <InputCell
                        value={financialData.costOfSales[year]}
                        onChange={(val) => handleInputChange('costOfSales', year, val)}
                      />
                    </td>
                  ))}
                  <td className="cell-formula">
                    <input type="text" value="=M7*51.8%" readOnly />
                  </td>
                </tr>

                {/* Gross Profit */}
                <tr>
                  <td className="row-header">9</td>
                  <td colSpan={3} className="cell-subheader" style={{ fontWeight: 600 }}>
                    <input type="text" value="Gross Profit" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-calculated">
                      <input 
                        type="text" 
                        value={formatNumber(calculatedValues.grossProfit[year])} 
                        readOnly 
                        style={{ textAlign: 'right' }}
                      />
                    </td>
                  ))}
                  <td className="cell-calculated">
                    <input type="text" value="=SUM(M7:M8)" readOnly />
                  </td>
                </tr>

                {/* SG&A */}
                <tr>
                  <td className="row-header">10</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="SG&A Expenses" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-input">
                      <InputCell
                        value={financialData.sgaExpenses[year]}
                        onChange={(val) => handleInputChange('sgaExpenses', year, val)}
                      />
                    </td>
                  ))}
                  <td className="cell-formula">
                    <input type="text" value="=M7*41.2%" readOnly />
                  </td>
                </tr>

                {/* EBITDA */}
                <tr>
                  <td className="row-header">11</td>
                  <td colSpan={3} className="cell-subheader" style={{ fontWeight: 600 }}>
                    <input type="text" value="EBITDA" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-calculated">
                      <input 
                        type="text" 
                        value={formatNumber(calculatedValues.ebitda[year])} 
                        readOnly 
                        style={{ textAlign: 'right' }}
                      />
                    </td>
                  ))}
                  <td className="cell-calculated">
                    <input type="text" value="=M9+M10" readOnly />
                  </td>
                </tr>

                {/* D&A */}
                <tr>
                  <td className="row-header">12</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Depreciation & Amortization" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-input">
                      <InputCell
                        value={financialData.depreciation[year]}
                        onChange={(val) => handleInputChange('depreciation', year, val)}
                      />
                    </td>
                  ))}
                  <td className="cell-formula">
                    <input type="text" value="=-2800000" readOnly />
                  </td>
                </tr>

                {/* EBIT */}
                <tr>
                  <td className="row-header">13</td>
                  <td colSpan={3} className="cell-subheader" style={{ fontWeight: 600 }}>
                    <input type="text" value="EBIT" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-calculated">
                      <input 
                        type="text" 
                        value={formatNumber(calculatedValues.ebit[year])} 
                        readOnly 
                        style={{ textAlign: 'right' }}
                      />
                    </td>
                  ))}
                  <td className="cell-calculated">
                    <input type="text" value="=M11+M12" readOnly />
                  </td>
                </tr>

                {/* Tax */}
                <tr>
                  <td className="row-header">14</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Tax (17%)" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-formula">
                      <input 
                        type="text" 
                        value={formatNumber(calculatedValues.tax[year])} 
                        readOnly 
                        style={{ textAlign: 'right' }}
                      />
                    </td>
                  ))}
                  <td className="cell-formula">
                    <input type="text" value="=M13*-17%" readOnly />
                  </td>
                </tr>

                {/* NOPAT */}
                <tr>
                  <td className="row-header">15</td>
                  <td colSpan={3} className="cell-subheader" style={{ fontWeight: 600 }}>
                    <input type="text" value="NOPAT" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-calculated">
                      <input 
                        type="text" 
                        value={formatNumber(calculatedValues.nopat[year])} 
                        readOnly 
                        style={{ textAlign: 'right' }}
                      />
                    </td>
                  ))}
                  <td className="cell-calculated">
                    <input type="text" value="=M13+M14" readOnly />
                  </td>
                </tr>

                {/* Empty Row */}
                <tr>
                  <td className="row-header">16</td>
                  <td className="cell-empty" colSpan={13}></td>
                </tr>

                {/* CASH FLOW Section */}
                <tr>
                  <td className="row-header">17</td>
                  <td colSpan={13} className="cell-header" style={{ background: '#e8f4f8' }}>
                    <input type="text" value="II. CASH FLOW CALCULATION" readOnly />
                  </td>
                </tr>

                {/* Free Cash Flow */}
                <tr>
                  <td className="row-header">22</td>
                  <td colSpan={3} className="cell-total">
                    <input type="text" value="Free Cash Flow to Firm" readOnly />
                  </td>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                    <td key={year} className="cell-total">
                      <input 
                        type="text" 
                        value={formatNumber(calculatedValues.fcf[year])} 
                        readOnly 
                        style={{ textAlign: 'right' }}
                      />
                    </td>
                  ))}
                  <td className="cell-total">
                    <input 
                      type="text" 
                      value={formatNumber(calculatedValues.fcf[2029])} 
                      readOnly 
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                </tr>

                {/* Empty Row */}
                <tr>
                  <td className="row-header">23</td>
                  <td className="cell-empty" colSpan={13}></td>
                </tr>

                {/* DCF VALUATION Section */}
                <tr>
                  <td className="row-header">24</td>
                  <td colSpan={13} className="cell-header" style={{ background: '#e8f4f8' }}>
                    <input type="text" value="III. DCF VALUATION" readOnly />
                  </td>
                </tr>

                {/* WACC */}
                <tr>
                  <td className="row-header">25</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="WACC (%)" readOnly />
                  </td>
                  <td className="cell-input" colSpan={10}>
                    <InputCell
                      value={wacc}
                      onChange={(val) => setWacc(parseFloat(val) || 0)}
                    />
                  </td>
                </tr>

                {/* Terminal Growth */}
                <tr>
                  <td className="row-header">26</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Terminal Growth Rate (%)" readOnly />
                  </td>
                  <td className="cell-input" colSpan={10}>
                    <InputCell
                      value={terminalGrowth}
                      onChange={(val) => setTerminalGrowth(parseFloat(val) || 0)}
                    />
                  </td>
                </tr>

                {/* Empty Row */}
                <tr>
                  <td className="row-header">32</td>
                  <td className="cell-empty" colSpan={13}></td>
                </tr>

                {/* ENTERPRISE VALUE Section */}
                <tr>
                  <td className="row-header">33</td>
                  <td colSpan={13} className="section-title" style={{ background: '#217346' }}>
                    <input type="text" value="IV. ENTERPRISE & EQUITY VALUE" readOnly style={{ color: 'white' }} />
                  </td>
                </tr>

                {/* Sum of PV */}
                <tr>
                  <td className="row-header">34</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Sum of PV of FCF (Years 1-5)" readOnly />
                  </td>
                  <td className="cell-calculated" colSpan={10}>
                    <input 
                      type="text" 
                      value={formatNumber(calculatedValues.sumPvFcf)} 
                      readOnly 
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                </tr>

                {/* Terminal Value PV */}
                <tr>
                  <td className="row-header">35</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="PV of Terminal Value" readOnly />
                  </td>
                  <td className="cell-calculated" colSpan={10}>
                    <input 
                      type="text" 
                      value={formatNumber(calculatedValues.pvTerminalValue)} 
                      readOnly 
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                </tr>

                {/* Enterprise Value */}
                <tr>
                  <td className="row-header">36</td>
                  <td colSpan={3} className="cell-total" style={{ fontWeight: 700 }}>
                    <input type="text" value="Enterprise Value" readOnly />
                  </td>
                  <td className="cell-total" colSpan={10} style={{ fontWeight: 700 }}>
                    <input 
                      type="text" 
                      value={formatNumber(calculatedValues.enterpriseValue)} 
                      readOnly 
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                </tr>

                {/* Add Cash */}
                <tr>
                  <td className="row-header">37</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="(+) Cash & Cash Equivalents" readOnly />
                  </td>
                  <td className="cell-input" colSpan={10}>
                    <InputCell
                      value={financialData.cash}
                      onChange={(val) => handleInputChange('cash', 'cash', val)}
                    />
                  </td>
                </tr>

                {/* Less Debt */}
                <tr>
                  <td className="row-header">38</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="(-) Total Debt" readOnly />
                  </td>
                  <td className="cell-input" colSpan={10}>
                    <InputCell
                      value={financialData.debt}
                      onChange={(val) => handleInputChange('debt', 'debt', val)}
                    />
                  </td>
                </tr>

                {/* Equity Value */}
                <tr>
                  <td className="row-header">39</td>
                  <td colSpan={3} className="cell-total" style={{ fontWeight: 700, background: '#90EE90' }}>
                    <input type="text" value="Equity Value" readOnly />
                  </td>
                  <td className="cell-total" colSpan={10} style={{ fontWeight: 700, background: '#90EE90' }}>
                    <input 
                      type="text" 
                      value={formatNumber(calculatedValues.equityValue)} 
                      readOnly 
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                </tr>

                {/* Shares Outstanding */}
                <tr>
                  <td className="row-header">40</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="Shares Outstanding" readOnly />
                  </td>
                  <td className="cell-input" colSpan={10}>
                    <InputCell
                      value={financialData.shares}
                      onChange={(val) => handleInputChange('shares', 'shares', val)}
                    />
                  </td>
                </tr>

                {/* Value per Share */}
                <tr>
                  <td className="row-header">41</td>
                  <td colSpan={3} className="cell-total" style={{ fontWeight: 700, background: '#FFD700' }}>
                    <input type="text" value="Value per Share" readOnly />
                  </td>
                  <td className="cell-total" colSpan={10} style={{ fontWeight: 700, background: '#FFD700' }}>
                    <input 
                      type="text" 
                      value={formatNumber(calculatedValues.valuePerShare, 2)} 
                      readOnly 
                      style={{ textAlign: 'right' }}
                    />
                  </td>
                </tr>

                {/* Empty Row */}
                <tr>
                  <td className="row-header">42</td>
                  <td className="cell-empty" colSpan={13}></td>
                </tr>

                {/* IMPLIED MULTIPLES Section */}
                <tr>
                  <td className="row-header">43</td>
                  <td colSpan={13} className="cell-header" style={{ background: '#e8f4f8' }}>
                    <input type="text" value="V. IMPLIED VALUATION MULTIPLES" readOnly />
                  </td>
                </tr>

                {/* EV/Revenue */}
                <tr>
                  <td className="row-header">44</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="EV / Revenue (2024)" readOnly />
                  </td>
                  <td className="cell-calculated" colSpan={10}>
                    <input 
                      type="text" 
                      value={`${(calculatedValues.enterpriseValue / financialData.revenue[2024]).toFixed(2)}x`} 
                      readOnly 
                    />
                  </td>
                </tr>

                {/* EV/EBITDA */}
                <tr>
                  <td className="row-header">45</td>
                  <td colSpan={3} className="cell-subheader">
                    <input type="text" value="EV / EBITDA (2024)" readOnly />
                  </td>
                  <td className="cell-calculated" colSpan={10}>
                    <input 
                      type="text" 
                      value={`${(calculatedValues.enterpriseValue / calculatedValues.ebitda[2024]).toFixed(2)}x`} 
                      readOnly 
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {/* Other sheets can be implemented similarly */}
          {activeSheet === 'income' && (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>Income Statement</h2>
              <p>Detailed income statement analysis coming soon...</p>
            </div>
          )}

          {activeSheet === 'cashflow' && (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>Cash Flow Statement</h2>
              <p>Cash flow analysis coming soon...</p>
            </div>
          )}

          {activeSheet === 'wacc' && (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>WACC Calculation</h2>
              <p>Weighted Average Cost of Capital analysis coming soon...</p>
            </div>
          )}

          {activeSheet === 'assumptions' && (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>Key Assumptions</h2>
              <p>Model assumptions and scenarios coming soon...</p>
            </div>
          )}

          {activeSheet === 'sensitivity' && (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>Sensitivity Analysis</h2>
              <p>Sensitivity tables and analysis coming soon...</p>
            </div>
          )}

          {activeSheet === 'charts' && (
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>Charts & Visualizations</h2>
              <p>Interactive charts coming soon...</p>
            </div>
          )}
        </div>

        <div className="status-bar">
          <span>Ready | Cells: A1:M47 | Sum: {formatNumber(calculatedValues.sumPvFcf)} | Avg: 0</span>
          <span>Calculation: Automatic | 100% Zoom</span>
        </div>
      </div>
    </div>
  );
};

export default EpsilonFinancialSimulation;