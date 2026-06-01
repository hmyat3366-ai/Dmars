import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <div className="text-2xl font-bold text-dark flex items-center gap-1">
                    <span className="text-primary">D</span>Mar
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link className={`transition ${location.pathname === '/' ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/">Home</Link>
                    <Link className={`transition ${location.pathname === '/rooms' ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/rooms">Rooms</Link>
                    <Link className={`transition ${location.pathname === '/foods' ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/foods">Foods</Link>
                    <Link className={`transition ${location.pathname === '/guide' ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/guide">Guide</Link>
                    <Link className={`transition ${location.pathname === '/about' ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/about">About</Link>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {!user ? (
                    <>
                        <Link to="/login" className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:bg-accent transition">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        {user.role === 'owner' ? (
                            <Link to="/owner-dashboard" className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                                Owner Dashboard
                            </Link>
                        ) : (
                            <Link to="/account-settings" className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                                User Dashboard
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:bg-accent transition">
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    </header>
  );
};

export default Header;
