import { Outlet, NavLink } from 'react-router-dom';
import { Home, Store, ReceiptText, User } from 'lucide-react';

export default function Layout() {
  return (
    <div className="h-screen bg-slate-50 overflow-x-hidden flex flex-col font-sans">
      <main className="flex-1 overflow-y-auto pb-24 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-3 rounded-full flex justify-between items-center z-50 shadow-xl">
        <NavItem to="/" icon={<Home size={22} />} label="Home" />
        <NavItem to="/shop" icon={<Store size={22} />} label="Shop" />
        <NavItem to="/emi-dues" icon={<ReceiptText size={22} />} label="EMI" />
        <NavItem to="/profile" icon={<User size={22} />} label="Profile" />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-violet-700 scale-110' : 'text-slate-400 hover:text-slate-600'}`
      }
    >
      {icon}
      <span className="text-[10px] font-bold tracking-wide">{label}</span>
    </NavLink>
  );
}
