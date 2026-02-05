import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // 1. New State for the Toggle
  const [isChatMode, setIsChatMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 2. Pass the state and setter to Header */}
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        isChatMode={isChatMode}        // <--- NEW
        onToggleChat={() => setIsChatMode(!isChatMode)} // <--- NEW
      />
      
      <main className="flex-1 pt-20 px-6 pb-6">
        <div className="max-w-[1920px] mx-auto w-full">
          {/* 3. Pass the state DOWN to the page */}
          <Outlet context={{ searchQuery, isChatMode }} />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;