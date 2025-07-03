import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/auth');
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold">Alfred Blog</span>
        <button
          onClick={handleLogout}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
