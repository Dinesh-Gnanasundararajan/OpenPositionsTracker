import { Bell, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. Define the props
interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => { // 2. Accept props
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <span className="text-xl font-bold text-gray-800">Open Positions<span className="text-red-600">.</span></span>
      </div>

      <div className="hidden md:flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-lg w-96 border border-gray-100 focus-within:border-gray-300 focus-within:text-gray-600 transition-colors">
        <Search className="w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search by Client, Role, or Skill..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-700"
          // 3. Bind the input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* ... (Keep existing User Profile code) ... */}
        <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">Dinesh G.</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-700 font-bold border border-red-100">DG</div>
        </div>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-gray-100">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;