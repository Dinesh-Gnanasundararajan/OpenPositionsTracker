import { ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login -> Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <ShieldCheck className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Open Positions Tracker</h1>
          <p className="text-gray-500 text-sm">Internal Hiring Intelligence Platform</p>
        </div>

        {/* Login Action Section */}
        <div className="space-y-4 pt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            Please sign in using your corporate Perficient credentials.
          </div>

          <Button onClick={handleLogin} fullWidth className="h-12 text-lg">
            {/* Microsoft Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
            </svg>
            Sign in with Perficient SSO
          </Button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Secure Access • Perficient Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;