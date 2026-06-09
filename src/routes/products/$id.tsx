import { createFileRoute, useParams, Link } from '@tanstack/react-router';
import { useStoreProducts } from '@/lib/store';
import Navbar from '@/components/coorg/Navbar';
import Footer from '@/components/coorg/Footer';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailPage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-red-500 bg-stone-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Oops! Route Error</h1>
      <pre className="bg-black/50 p-6 rounded-lg whitespace-pre-wrap font-mono text-sm shadow-xl max-w-4xl overflow-auto">{error?.message || String(error)}</pre>
      <pre className="bg-black/50 p-6 rounded-lg whitespace-pre-wrap font-mono text-xs shadow-xl max-w-4xl overflow-auto mt-4 opacity-70">{error?.stack}</pre>
    </div>
  ),
});

function ProductDetailPage() {
  const { id } = useParams({ from: '/products/$id' });
  const { products, isLoaded } = useStoreProducts();
  const [imageIndex, setImageIndex] = useState(0);

  if (!isLoaded) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-500">Loading...</div>;

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 px-8 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif text-amber-500 mb-4">Product Not Found</h1>
          <p className="text-stone-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Link to="/products" className="inline-flex items-center text-amber-600 hover:text-amber-500 mb-8 transition-colors text-sm font-medium">
          &larr; Back to all products
        </Link>
        
        <div className="bg-stone-900/40 rounded-3xl border border-stone-800/50 overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 bg-stone-900 relative group min-h-[400px] lg:min-h-[600px]">
            {product.images && product.images.length > 0 ? (
              <>
                <img 
                  src={product.images[imageIndex]} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" 
                />
                
                {product.discount && (
                  <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                    {product.discount}% OFF
                  </div>
                )}

                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setImageIndex(prev => prev > 0 ? prev - 1 : product.images!.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10 backdrop-blur-md"
                    >
                      &larr;
                    </button>
                    <button 
                      onClick={() => setImageIndex(prev => prev < product.images!.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10 backdrop-blur-md"
                    >
                      &rarr;
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 px-3 py-2 rounded-full backdrop-blur-md">
                      {product.images.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${imageIndex === idx ? 'bg-amber-500 w-4' : 'bg-white/50 hover:bg-white/80'}`} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full absolute inset-0 flex items-center justify-center text-stone-600">No Image Available</div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-900/30 text-amber-500 border border-amber-900/50">
                  {product.category}
                </span>
                {product.weight && (
                  <span className="text-sm font-medium text-stone-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
                    {product.weight}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-serif text-amber-50 leading-tight mb-2">{product.name}</h1>
              <div className="text-3xl font-light text-amber-500 mt-4">₹{product.price}</div>
            </div>

            <div className="prose prose-invert prose-stone max-w-none mb-8">
              <p className="text-stone-300 text-lg leading-relaxed">{product.desc}</p>
            </div>

            {product.nutritionalFacts && (
              <div className="mb-8 p-5 rounded-2xl bg-stone-900/50 border border-stone-800">
                <h3 className="text-sm font-medium text-stone-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Nutritional Facts
                </h3>
                <p className="text-stone-300 whitespace-pre-wrap font-mono text-sm">{product.nutritionalFacts}</p>
              </div>
            )}

            <div className="mt-auto pt-8 border-t border-stone-800/80">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-stone-400 text-sm">
                  Minimum Order Quantity: <span className="font-semibold text-stone-200">{product.minOrderQty || 1} units</span>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transform hover:-translate-y-1"
                >
                  Add to Cart
                </button>
              </div>
              
              <div className="mt-6 flex justify-center lg:justify-start gap-6 text-sm text-stone-500">
                <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> In Stock</div>
                <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
