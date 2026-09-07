import { ArrowRight, Sparkles, Percent } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Brand {
  id: string;
  name: string;
}

interface Offer {
  id: string;
  title: string;
  tag: string;
  priceText: string;
  gradient: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
}

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")}/home-data`)
      .then(res => res.json())
      .then(data => {
        setBrands(data.brands);
        setOffers(data.offers);
        setFeatures(data.features);
      })
      .catch(err => console.error("Failed to load home data", err));
  }, []);

  const renderIcon = (name: string, colorClass: string) => {
    let className = 'text-slate-500';
    if (colorClass === 'green') className = 'text-green-500';
    if (colorClass === 'fuchsia') className = 'text-fuchsia-500';
    if (colorClass === 'blue') className = 'text-blue-500';
    if (colorClass === 'orange') className = 'text-orange-500';
    
    if (name === 'percent') return <Percent className={className} size={28} />;
    return <Sparkles className={className} size={28} />;
  };

  return (
    <div className="bg-slate-50 min-h-full pb-6 md:pb-12 font-sans">
      {/* Header Banner */}
      <div className="p-6 md:p-12 pt-12 md:pt-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs md:text-sm font-medium tracking-widest text-slate-400 mb-2 uppercase">WELCOME TO 1FI</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight font-serif">
            Purchase on <span className="text-emerald-400">no-cost EMI</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mb-8 max-w-[250px] md:max-w-md">
            Backed by your mutual funds. No credit pull, No charges, & quick approval.
          </p>
          <button className="bg-emerald-400 text-slate-900 font-bold py-3 md:py-4 px-6 md:px-8 flex items-center gap-2 hover:bg-emerald-300 transition-colors shadow-lg">
            See if you qualify <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Offers Section */}
        {offers.length > 0 && (
          <div className="mt-8 px-4">
            <h2 className="text-xs md:text-sm font-bold tracking-wider text-violet-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-4 bg-slate-900" />
              HOT OFFERS
            </h2>
            <div className={`bg-violet-900 border-4 border-slate-900 rounded-none p-6 md:p-8 text-white shadow-[8px_8px_0_0_rgba(15,23,42,1)]`}>
              <p className="text-[10px] md:text-xs font-bold tracking-widest text-violet-300 mb-2 uppercase border-b-2 border-violet-700 pb-1 inline-block">{offers[0].tag}</p>
              <h3 className="text-xl md:text-3xl font-black mb-6 w-2/3 md:w-1/2 leading-tight uppercase font-serif mt-2">{offers[0].title}</h3>
              <div className="inline-block bg-emerald-400 text-slate-900 px-4 py-2 text-xs md:text-sm font-black border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] uppercase">
                {offers[0].priceText}
              </div>
            </div>
          </div>
        )}

        {/* Top Brands Section */}
        <div className="mt-12 px-4">
          <h2 className="text-sm md:text-base font-black tracking-widest text-slate-900 mb-6 flex items-center gap-2 border-b-4 border-slate-900 pb-2 uppercase">
            <div className="w-2 h-4 bg-slate-900" />
            PARTNER BRANDS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-white border-4 border-slate-900 p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 transition-all cursor-pointer h-24 md:h-32">
                <span className="font-black text-slate-900 text-sm md:text-lg uppercase">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Pay With 1Fi */}
        <div className="mt-12 px-4 mb-8">
          <h2 className="text-sm md:text-base font-black tracking-widest text-slate-900 mb-6 flex items-center gap-2 border-b-4 border-slate-900 pb-2 uppercase">
            <div className="w-2 h-4 bg-slate-900" />
            WHY CHOOSE 1FI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {features.map(feature => (
              <div key={feature.id} className="bg-white border-4 border-slate-900 p-6 flex items-start gap-4 shadow-[6px_6px_0_0_rgba(15,23,42,1)]">
                <div className="bg-slate-100 p-3 border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
                  {renderIcon(feature.iconName, feature.iconColor)}
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 uppercase">{feature.title}</p>
                  <p className="text-sm text-slate-600 mt-1 font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
