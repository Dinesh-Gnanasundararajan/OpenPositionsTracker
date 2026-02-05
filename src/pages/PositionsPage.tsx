import { useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // <--- Import this
import PositionsGrid from '../features/positions/components/PositionsGrid';
import { AddClientModal } from '../features/clients/AddClientModal';
import { Plus } from 'lucide-react';
import { MOCK_COLUMN_CONFIG } from '../features/positions/data/mockData';
import AgentChat from '../features/agent/AgentChat'; // Import the new component

const PositionsPage = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientOptions, setClientOptions] = useState<string[]>(() => {
    const clientCol = MOCK_COLUMN_CONFIG.find(c => c.field === 'client');
    return clientCol?.options || [];
  });

  // 1. Get the search query from the Layout
  // const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const { searchQuery, isChatMode } = useOutletContext<{ searchQuery: string; isChatMode: boolean }>();

  const handleOpenAddClient = () => setIsClientModalOpen(true);

  
  const handleClientAdded = (newClientName: string) => {
    setClientOptions(prevOptions => {
      const cleanList = prevOptions.filter(opt => opt !== '➕ Add New Client');
      return [...cleanList, newClientName, '➕ Add New Client'];
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header Area of Page */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isChatMode ? 'AI Assistant' : 'Open Positions'}
          </h1>
          <p className="text-sm text-gray-500">
            {isChatMode ? 'Ask questions about your hiring data.' : 'Manage hiring demands and resource allocations.'}
          </p>
        </div>
        
        {/* Only show "Add Position" button in Grid Mode */}
        {!isChatMode && (
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add New Position
          </button>
        )}
      </div>

      {/* CONDITIONAL RENDERING */}
      <div className="flex-1">
        {isChatMode ? (
          // VIEW A: The Agent Chat
          <AgentChat />
        ) : (
          // VIEW B: The AG Grid
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-h-[500px] h-full">
            <PositionsGrid 
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