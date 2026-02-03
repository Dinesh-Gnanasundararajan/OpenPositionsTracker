import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

// Temporary Dashboard Placeholder
const Dashboard = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold text-green-600">Welcome to Dashboard!</h1>
    <p>Login Successful.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;