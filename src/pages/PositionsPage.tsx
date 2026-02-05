import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PositionsGrid from '../features/positions/components/PositionsGrid';
import { AddClientModal } from '../features/clients/AddClientModal';
import { Plus, Save, RotateCcw } from 'lucide-react'; // Import icons
import { MOCK_COLUMN_CONFIG, MOCK_ROW_DATA } from '../features/positions/data/mockData';
import AgentChat from '../features/agent/AgentChat';

const PositionsPage = () => {
  const { searchQuery, isChatMode } = useOutletContext<{ searchQuery: string; isChatMode: boolean }>();
  
  // 1. Master Data State
  const [rowData, setRowData] = useState<any[]>(MOCK_ROW_DATA);
  
  // 2. "Dirty" State (Are there unsaved changes?)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // 3. Client Options State
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientOptions, setClientOptions] = useState<string[]>(() => {
    const clientCol = MOCK_COLUMN_CONFIG.find(c => c.field === 'client');
    return clientCol?.options || [];
  });

  // --- ACTIONS ---

  // Add a Blank Row to the TOP
  const handleAddPosition = () => {
    const newRow = {
      id: Date.now(), // Temporary ID
      role: '',       // Blank Role
      client: '',
      location: 'India', 
      status: 'Open',
      priority: 'Medium',
      type: 'New'
    };
    
    setRowData([newRow, ...rowData]); // Add to top
    setHasUnsavedChanges(true);       // Enable Save Button
  };

  // Handle Grid Edits
  const handleGridUpdate = (newData: any[]) => {
    setRowData(newData);
    setHasUnsavedChanges(true);
  };

  // Save Everything
  const handleSave = () => {
    console.log("Saving Data to Backend:", rowData);
    
    // Simulate API Call delay
    setTimeout(() => {
        setHasUnsavedChanges(false); // Disable Save Button
        alert("All changes saved successfully!");
    }, 500);
  };

  // Client Modal Handlers
  const handleOpenAddClient = () => setIsClientModalOpen(true);
  const handleClientAdded = (newClientName: string) => {
    setClientOptions(prev => [...prev.filter(o => o !== '➕ Add New Client'), newClientName, '➕ Add New Client']);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isChatMode ? 'AI Assistant' : 'Open Positions'}
          </h1>
          <p className="text-sm text-gray-500">
            {isChatMode ? 'Ask questions about your hiring data.' : 'Manage hiring demands and resource allocations.'}
          </p>
        </div>
        
        {/* BUTTON AREA */}
        {!isChatMode && (
          <div className="flex gap-3">
             {/* SAVE BUTTON (Only shows when dirty) */}
            {hasUnsavedChanges && (
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-all animate-in fade-in slide-in-from-right-4"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}

            {/* ADD BUTTON (Always visible) */}
            <button 
                onClick={handleAddPosition}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Position
            </button>
          </div>
        )}
      </div>

      <div className="flex-1">
        {isChatMode ? (
          <AgentChat />
        ) : (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-h-[500px] h-full">
            <PositionsGrid 
              rowData={rowData}          // Pass data down
              onDataChange={handleGridUpdate} // Listen for updates
              onAddClient={handleOpenAddClient} 
              clientOptions={clientOptions}
              searchQuery={searchQuery} 
            />
          </div>
        )}
      </div>

      <AddClientModal 
        isOpen={isClientModalOpen} 
        onClose={() => setIsClientModalOpen(false)}
        onClientAdded={handleClientAdded}
      />
    </div>
  );
};

export default PositionsPage;