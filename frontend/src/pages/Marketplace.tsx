import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
}

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")}/products`)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please check if the backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-10 text-center text-slate-500 text-sm">Loading products...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500 text-sm font-medium">{error}</div>;
  }

  return (
    <div className="font-sans">
      <h2 className="text-xl md:text-3xl font-black text-slate-900 mb-6 font-serif tracking-tight border-b-4 border-slate-900 pb-2 inline-block">
        FEATURED GEAR
      </h2>
      
      <div className="flex flex-col gap-6 pb-20">
        {products.map(product => (
          <div 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white border-4 border-slate-900 flex flex-col md:flex-row shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:shadow-[12px_12px_0_0_rgba(15,23,42,1)] hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="w-full h-48 md:w-64 md:h-auto bg-slate-100 border-b-4 md:border-b-0 md:border-r-4 border-slate-900 flex items-center justify-center shrink-0 overflow-hidden p-4 relative">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => { 
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/150x150/f9fafb/6b7280?text=Product'; 
                }}
              />
            </div>
            
            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between bg-emerald-50">
              <div>
                <h3 className="font-black text-slate-900 text-xl md:text-2xl uppercase group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                <p className="text-sm md:text-base text-slate-700 line-clamp-3 mt-3 mb-4 font-medium">{product.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t-2 border-slate-900/10">
                <span className="font-black text-slate-900 text-2xl md:text-3xl tracking-tight">₹{product.basePrice.toLocaleString('en-IN')}</span>
                <span className="text-xs md:text-sm bg-slate-900 text-white px-4 py-2 font-bold uppercase tracking-widest text-center">
                  0% EMI AVAILABLE
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
