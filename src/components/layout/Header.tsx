import { Search, LogOut, Bot, LayoutGrid } from 'lucide-react'; // Import icons
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  // 👇 Add new props
  isChatMode: boolean;
  onToggleChat: () => void;
}

const Header = ({ searchQuery, onSearchChange, isChatMode, onToggleChat }: HeaderProps) => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/login');

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <span className="text-xl font-bold text-gray-800">Open Positions<span className="text-red-600">.</span></span>
      </div>

      {/* CENTER: The Toggle Switch */}
      <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
        <button 
          onClick={!isChatMode ? undefined : onToggleChat} // Only click if not active
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!isChatMode ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <LayoutGrid className="w-4 h-4" />
          Grid
        </button>
        <button 
          onClick={isChatMode ? undefined : onToggleChat}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isChatMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Bot className="w-4 h-4" />
          Agent
        </button>
      </div>

      {/* RIGHT: Search & Profile */}
      <div className="flex items-center gap-4">
        {/* Only show search bar if NOT in chat mode (optional choice) */}
        {!isChatMode && (
          <div className="hidden md:flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-lg w-64 border border-gray-100 focus-within:border-gray-300 focus-within:text-gray-600 transition-colors">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Quick Filter..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-700"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {/* ... (Keep Profile & Logout Code Same) ... */}
         <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
            {/* ... */}
        </div>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;