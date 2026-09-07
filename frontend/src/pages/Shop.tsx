
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Search } from 'lucide-react';
import Marketplace from './Marketplace';
import Placeholder from './Placeholder';

export default function Shop() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab from URL path
  const currentPath = location.pathname;
  const activeTab = currentPath.includes('/nearby') ? 'nearby' : currentPath.includes('/marketplace') ? 'marketplace' : 'top-brands';

  return (
    <div className="bg-slate-50 min-h-full pb-6 md:pb-12 font-sans">
      {/* Header Banner */}
      <div className="p-6 md:p-12 pt-10 md:pt-16 bg-violet-900 text-white relative overflow-hidden pb-12 md:pb-16 border-b-4 border-fuchsia-500">
        <div className="relative z-10 flex flex-col gap-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 border-l-2 border-fuchsia-400 pl-3">
            <Sparkles size={14} className="text-fuchsia-300" />
            <span className="text-[10px] md:text-xs font-bold tracking-wider text-fuchsia-200 uppercase">1Fi Shopping</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight font-serif mt-2">
            Buy now,<br/>
            <span className="text-slate-300 italic font-light">Pay later with</span><br/>
            Mutual funds.
          </h1>
          <p className="text-violet-200 text-xs md:text-sm mt-3 max-w-[200px] md:max-w-md border-t border-violet-800 pt-3">
            No credit score required. No interest. Backed by your investments.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="-mt-6 relative z-20 px-4">
          <div className="bg-white rounded-lg p-1 md:p-2 flex shadow-lg border border-slate-200 max-w-2xl mx-auto divide-x divide-slate-100">
            <TabButton 
              active={activeTab === 'top-brands'} 
              onClick={() => navigate('/shop')} 
              label="Top Brands" 
            />
            <TabButton 
              active={activeTab === 'nearby'} 
              onClick={() => navigate('/shop/nearby')} 
              label="Nearby Stores" 
            />
            <TabButton 
              active={activeTab === 'marketplace'} 
              onClick={() => navigate('/shop/marketplace')} 
              label="1Fi Marketplace" 
            />
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mt-6 md:mt-10">
          <div className="bg-white border-b-2 border-slate-300 px-2 py-3 md:py-4 flex items-center gap-3 max-w-2xl mx-auto transition-colors focus-within:border-violet-600">
            <Search size={20} className="text-violet-400" />
            <input 
              type="text" 
              placeholder="Search stores or products..." 
              className="bg-transparent outline-none flex-1 text-sm md:text-base text-slate-800 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 mt-6 md:mt-10">
          <Routes>
            <Route path="/" element={<Placeholder title="Top Brands (Blank per requirements)" />} />
            <Route path="/nearby" element={<Placeholder title="Nearby Stores (Blank per requirements)" />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 md:py-4 text-[11px] md:text-sm font-bold transition-all text-center relative ${
        active ? 'text-violet-800 bg-violet-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}
