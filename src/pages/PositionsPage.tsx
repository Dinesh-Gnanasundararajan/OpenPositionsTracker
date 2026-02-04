import { useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // <--- Import this
import PositionsGrid from '../features/positions/components/PositionsGrid';
import { AddClientModal } from '../features/clients/AddClientModal';
import { Plus } from 'lucide-react';
import { MOCK_COLUMN_CONFIG } from '../features/positions/data/mockData';

const PositionsPage = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientOptions, setClientOptions] = useState<string[]>(() => {
    const clientCol = MOCK_COLUMN_CONFIG.find(c => c.field === 'client');
    return clientCol?.options || [];
  });

  // 1. Get the search query from the Layout
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

  const handleOpenAddClient = () => setIsClientModalOpen(true);

  const handleClientAdded = (newClientName: string) => {
    setClientOptions(prevOptions => {
      const cleanList = prevOptions.filter(opt => opt !== '➕ Add New Client');
      return [...cleanList, newClientName, '➕ Add New Client'];
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Open Positions</h1>
          <p className="text-sm text-gray-500">Manage hiring demands and resource allocations.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add New Position
        </button>
      </div>

      <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-h-[500px]">
        <PositionsGrid 
          onAddClient={handleOpenAddClient} 
          clientOptions={clientOptions}
          // 2. Pass it to the Grid
          searchQuery={searchQuery} 
        />
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