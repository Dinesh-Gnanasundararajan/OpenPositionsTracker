import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/layout/MainLayout';
import PositionsPage from './pages/PositionsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Area */}
        <Route element={<MainLayout />}>
          {/* Default path redirects to positions */}
          <Route path="/" element={<Navigate to="/positions" replace />} />
          <Route path="/positions" element={<PositionsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;