import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, type ColDef } from 'ag-grid-community';
import { MOCK_COLUMN_CONFIG, MOCK_ROW_DATA } from '../data/mockData';

ModuleRegistry.registerModules([AllCommunityModule]);

interface PositionsGridProps {
  onAddClient: () => void;
  clientOptions: string[]; // <--- NEW PROP
  searchQuery: string; // <--- Add Prop
}

// 👇 Accept the new prop
const PositionsGrid = ({ onAddClient, clientOptions, searchQuery }: PositionsGridProps) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  // 👇 Update useEffect to depend on "clientOptions"
  useEffect(() => {
    console.log("Building Grid Columns with Clients:", clientOptions);
    
    const dynamicColumns: ColDef[] = MOCK_COLUMN_CONFIG.map((config: any) => {
      const col: ColDef = {
        field: config.field,
        headerName: config.headerName,
        width: config.width,
        editable: true,
        pinned: config.pinned,
        sortable: true,
        filter: true,
        resizable: true,
      };
      
      // SPECIAL HANDLING FOR CLIENT COLUMN
      if (config.field === 'client') {
        col.cellEditor = 'agSelectCellEditor';
        // Use the prop instead of the hardcoded mock data
        col.cellEditorParams = { values: clientOptions,valueListMaxHeight: 300, // Height in pixels
      //valueListMaxWidth: 100,  
      };
      } 
      // Handle other dropdowns
      else if (config.type === 'dropdown') {
        col.cellEditor = 'agSelectCellEditor';
        col.cellEditorParams = { values: config.options };
      } 
      else if (config.type === 'date') col.cellEditor = 'agDateStringCellEditor';
      else if (config.type === 'number') col.cellEditor = 'agNumberCellEditor';
      
      if (config.cellClass) col.cellClass = config.cellClass;
      
      return col;
    }); 

    setColumnDefs(dynamicColumns);
    
    // Only set row data once (on mount)
    if (rowData.length === 0) {
      setRowData(MOCK_ROW_DATA);
    }

  }, [clientOptions]); // <--- Re-run this whenever clientOptions changes

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    filter: true,
  }), []);

  const onCellValueChanged = (params: any) => {
    if (params.colDef.field === 'client') {
      if (params.newValue === '➕ Add New Client') {
        params.node.setDataValue('client', params.oldValue);
        onAddClient();
      }
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] w-full ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
        rowSelection="multiple"
        onCellValueChanged={onCellValueChanged}
        quickFilterText={searchQuery}
      />
    </div>
  );
};

export default PositionsGrid;