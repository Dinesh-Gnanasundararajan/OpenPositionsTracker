import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  // 1. Create the shared state
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 2. Pass the state setters to the Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="flex-1 pt-20 px-6 pb-6">
        <div className="max-w-[1920px] mx-auto w-full">
          {/* 3. Pass the search text DOWN to the pages via Context */}
          <Outlet context={{ searchQuery }} />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;