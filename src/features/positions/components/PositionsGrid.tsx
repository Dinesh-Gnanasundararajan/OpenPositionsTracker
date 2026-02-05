import { useMemo, useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, type ColDef, type GridApi, type GetRowIdParams } from 'ag-grid-community';
import { MOCK_COLUMN_CONFIG } from '../data/mockData';
import { Columns } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface PositionsGridProps {
  rowData: any[];
  onDataChange: (data: any[]) => void;
  clientOptions: string[];
  searchQuery: string;
  onAddClient: () => void;
}

const PositionsGrid = ({ rowData, onDataChange, clientOptions, searchQuery, onAddClient }: PositionsGridProps) => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [showColMenu, setShowColMenu] = useState(false);
  const [colVisibility, setColVisibility] = useState<Record<string, boolean>>({});

  // ⚡ FLICKER FIX 1: Stable ID Callback
  // This tells AG Grid to track rows by ID, so it only updates changed cells
  // instead of destroying/recreating the whole row.
  const getRowId = useCallback((params: GetRowIdParams) => {
    return String(params.data.id);
  }, []);

  useEffect(() => {
    const dynamicColumns: ColDef[] = MOCK_COLUMN_CONFIG.map((config: any) => {
      const col: ColDef = {
        field: config.field,
        headerName: config.headerName,
        width: config.width,
        editable: true,
        sortable: true,
        filter: true,
        resizable: true,
        hide: false,
        // 👇 TOOLTIP FIX: Show header text on hover
        headerTooltip: config.headerName, 
        tooltipField: config.field, // Optional: Show cell text on hover too
      };

      if (config.field === 'client') {
        col.cellEditor = 'agSelectCellEditor';
        col.cellEditorParams = { values: clientOptions };
      } else if (config.type === 'dropdown') {
        col.cellEditor = 'agSelectCellEditor';
        col.cellEditorParams = { values: config.options };
      }
      return col;
    });

    setColumnDefs(dynamicColumns);
    
    const initialVis: Record<string, boolean> = {};
    MOCK_COLUMN_CONFIG.forEach(c => initialVis[c.field] = true);
    setColVisibility(initialVis);

  }, [clientOptions]);

  const defaultColDef = useMemo(() => ({
    minWidth: 100,
    filter: true,
    enableCellChangeFlash: true, // Optional: Nice visual cue on change
  }), []);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onCellValueChanged = (params: any) => {
    if (params.colDef.field === 'client' && params.newValue === '➕ Add New Client') {
       params.node.setDataValue('client', params.oldValue);
       onAddClient();
       return;
    }
    
    // We update parent, but because we use 'getRowId', 
    // the grid won't flash or scroll to top when the new data comes back down.
    const allRowData: any[] = [];
    params.api.forEachNode((node: any) => allRowData.push(node.data));
    onDataChange(allRowData);
  };

  const toggleColumn = (field: string) => {
    if (!gridApi) return;
    const newVisibility = !colVisibility[field];
    setColVisibility(prev => ({ ...prev, [field]: newVisibility }));
    gridApi.setColumnsVisible([field], newVisibility);
  };

  return (
    <div className="relative h-[calc(100vh-140px)] w-full ag-theme-alpine flex flex-col">
      <div className="flex justify-end mb-2 relative">
        <button 
          onClick={() => setShowColMenu(!showColMenu)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
        >
          <Columns className="w-4 h-4" />
          Columns
        </button>

        {showColMenu && (
          <div className="absolute right-0 top-10 z-50 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-2 max-h-96 overflow-y-auto">
            <h4 className="text-xs font-bold text-gray-500 uppercase px-2 py-1 mb-1">Visible Columns</h4>
            {MOCK_COLUMN_CONFIG.map(col => (
              <label key={col.field} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={colVisibility[col.field] ?? true} 
                  onChange={() => toggleColumn(col.field)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{col.headerName}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          rowSelection="multiple"
          onCellValueChanged={onCellValueChanged}
          onGridReady={onGridReady}
          quickFilterText={searchQuery}
          getRowId={getRowId} // 👈 FLICKER FIX APPLIED HERE
          tooltipShowDelay={0} // Show tooltips instantly
        />
      </div>
    </div>
  );
};

export default PositionsGrid;