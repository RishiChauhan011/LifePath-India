import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Activity, Settings, Bell, User } from 'lucide-react';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'text-white font-medium' : 'text-text-secondary hover:text-white';
  };

  return (
    <nav className="bg-[#0B101A] border-b border-slate-800 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* 1. Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-blue to-blue-600 flex items-center justify-center text-white shadow-glow">
          <Activity size={20} />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">WealthSim Pro</span>
      </div>

      {/* 2. Centered Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
        <Link to="/scenarios" className={isActive('/scenarios')}>Scenarios</Link>
        <Link to="/assets" className={isActive('/assets')}>Assets</Link>
        <Link to="/processing" className={`relative ${isActive('/processing')}`}>
           Processing
           {location.pathname === '/processing' && (
               <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary-blue shadow-[0_0_10px_#2563eb]" />
           )}
        </Link>
      </div>

      {/* 3. Right Actions (Icons) */}
      <div className="flex items-center gap-4">
         <Link to="/settings" className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings size={18} />
         </Link>
         <Link to="/notifications" className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-[#0B101A]" />
         </Link>
         <Link to="/profile" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-all">
            <User size={18} />
         </Link>
      </div>
    </nav>
  );
};

export default Navbar;
