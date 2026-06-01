import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };
  
  const closeMenu = () => setIsMobileMenuOpen(false);

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
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
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

            {/* Mobile Hamburger Icon */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-primary transition">
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-orange-100 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
                <Link onClick={closeMenu} className={`transition ${location.pathname === '/' ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'}`} to="/">Home</Link>
                <Link onClick={closeMenu} className={`transition ${location.pathname === '/rooms' ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'}`} to="/rooms">Rooms</Link>
                <Link onClick={closeMenu} className={`transition ${location.pathname === '/foods' ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'}`} to="/foods">Foods</Link>
                <Link onClick={closeMenu} className={`transition ${location.pathname === '/guide' ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'}`} to="/guide">Guide</Link>
                <Link onClick={closeMenu} className={`transition ${location.pathname === '/about' ? 'text-primary font-bold' : 'text-slate-600 hover:text-primary'}`} to="/about">About</Link>
                
                <hr className="border-orange-50 my-2" />
                
                <div className="flex flex-col gap-3">
                    {!user ? (
                        <>
                            <Link onClick={closeMenu} to="/login" className="px-5 py-2 text-center rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                                Log In
                            </Link>
                            <Link onClick={closeMenu} to="/signup" className="px-5 py-2 text-center rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:bg-accent transition">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            {user.role === 'owner' ? (
                                <Link onClick={closeMenu} to="/owner-dashboard" className="px-5 py-2 text-center rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                                    Owner Dashboard
                                </Link>
                            ) : (
                                <Link onClick={closeMenu} to="/account-settings" className="px-5 py-2 text-center rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-orange-50 transition">
                                    User Dashboard
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 text-center rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:bg-accent transition">
                                Log Out
                            </button>
                        </>
                    )}
                </div>
            </div>
        )}
    </header>
  );
};

export default Header;
