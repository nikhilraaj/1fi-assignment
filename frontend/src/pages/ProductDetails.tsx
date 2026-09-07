import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2 } from 'lucide-react';

interface EmiPlan {
  id: string;
  months: number;
  interestRate: number;
}

interface Variant {
  id: string;
  name: string;
  priceModifier: number;
}

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  variants: Variant[];
  emiPlans: EmiPlan[];
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedEmi, setSelectedEmi] = useState<EmiPlan | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")}/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        if (data.variants?.length > 0) setSelectedVariant(data.variants[0]);
        if (data.emiPlans?.length > 0) setSelectedEmi(data.emiPlans[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center text-slate-500 font-medium">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <p className="text-red-500 font-medium mb-4">{error || 'Product not found'}</p>
        <button onClick={() => navigate(-1)} className="text-violet-600 font-bold hover:underline">Go Back</button>
      </div>
    );
  }

  const totalPrice = product.basePrice + (selectedVariant?.priceModifier || 0);
  const emiAmount = selectedEmi ? Math.ceil(totalPrice / selectedEmi.months) : 0; // naive calculation

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans">
      <div className="w-full max-w-4xl mx-auto md:mt-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white md:rounded-t-none">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-800 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <span className="font-bold tracking-widest text-sm uppercase">1Fi Checkout</span>
          </div>
          <button className="w-10 h-10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center hover:bg-emerald-400 hover:text-slate-900 transition-colors">
            <Share2 size={18} />
          </button>
        </div>

        <div className="bg-white border-x-4 border-b-4 border-slate-900 shadow-[8px_8px_0_0_rgba(15,23,42,1)] p-0">
          
          {/* Full Bleed Image */}
          <div className="w-full h-64 md:h-96 bg-slate-100 border-b-4 border-slate-900 p-8 flex items-center justify-center relative overflow-hidden group">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute top-4 right-4 bg-emerald-400 text-slate-900 font-bold px-3 py-1 uppercase text-xs border-2 border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)]">
              In Stock
            </div>
          </div>

          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-serif mb-4 uppercase leading-tight">{product.name}</h1>
            <p className="text-slate-600 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-2xl">{product.description}</p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-sm font-black text-slate-900 mb-3 tracking-widest uppercase border-b-2 border-slate-900 pb-2 inline-block">Select Variant</h2>
                <div className="flex flex-col gap-3 mt-4">
                  {product.variants.map(v => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-left p-4 border-2 transition-all font-bold ${selectedVariant?.id === v.id ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-[4px_4px_0_0_rgba(16,185,129,1)] translate-x-[-2px] translate-y-[-2px]' : 'border-slate-300 text-slate-500 hover:border-slate-500'}`}
                    >
                      {v.name}
                      {v.priceModifier > 0 && <span className="block text-xs mt-1 text-slate-400">+₹{v.priceModifier.toLocaleString()}</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-black text-slate-900 mb-3 tracking-widest uppercase border-b-2 border-slate-900 pb-2 inline-block">EMI Plan</h2>
                <div className="flex flex-col gap-3 mt-4">
                  {product.emiPlans.map(plan => {
                    const planMonthly = Math.ceil(totalPrice / plan.months);
                    return (
                      <button 
                        key={plan.id}
                        onClick={() => setSelectedEmi(plan)}
                        className={`flex justify-between items-center p-4 border-2 transition-all font-bold ${selectedEmi?.id === plan.id ? 'border-violet-600 bg-violet-50 text-violet-900 shadow-[4px_4px_0_0_rgba(124,58,237,1)] translate-x-[-2px] translate-y-[-2px]' : 'border-slate-300 text-slate-500 hover:border-slate-500'}`}
                      >
                        <span>{plan.months} Months</span>
                        <span className="text-right">₹{planMonthly.toLocaleString()}<span className="text-xs font-normal block text-slate-400 opacity-70">/mo</span></span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-12 bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-emerald-400 shadow-[8px_8px_0_0_rgba(203,213,225,1)]">
              <div>
                <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-1">Total Price</p>
                <p className="text-4xl md:text-5xl font-black font-serif">₹{totalPrice.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mb-1">Monthly EMI</p>
                <p className="text-3xl md:text-4xl font-black">₹{emiAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-slate-900 p-4 md:p-6 z-40 flex items-center justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.1)] pb-8 md:pb-6">
        <button 
          className="w-full max-w-sm bg-emerald-400 text-slate-900 text-lg font-black uppercase tracking-widest py-4 border-2 border-slate-900 shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition-all"
          onClick={() => alert(`Proceeding with ₹${emiAmount}/mo for ${selectedEmi?.months} months!`)}
        >
          Pay ₹{emiAmount.toLocaleString()} Now
        </button>
      </div>
    </div>
  );
}
