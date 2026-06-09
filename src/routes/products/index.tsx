import { createFileRoute, Link } from '@tanstack/react-router';
import { useStoreProducts } from '@/lib/store';
import Navbar from '@/components/coorg/Navbar';
import Footer from '@/components/coorg/Footer';

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-red-500 bg-stone-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Oops! Route Error</h1>
      <pre className="bg-black/50 p-6 rounded-lg whitespace-pre-wrap font-mono text-sm shadow-xl max-w-4xl overflow-auto">{error?.message || String(error)}</pre>
      <pre className="bg-black/50 p-6 rounded-lg whitespace-pre-wrap font-mono text-xs shadow-xl max-w-4xl overflow-auto mt-4 opacity-70">{error?.stack}</pre>
    </div>
  ),
});

function ProductsPage() {
  const { products, categories, isLoaded } = useStoreProducts();

  if (!isLoaded) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-500">Loading...</div>;

  const activeProducts = products.filter(p => p.isActive);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-50">Our Premium Selection</h1>
          <p className="text-stone-400 max-w-2xl mx-auto">Explore our exclusive range of estate-grown coffees, hand-picked spices, and luxurious gift boxes.</p>
        </div>

        {categories.map(category => {
          const categoryProducts = activeProducts.filter(p => p.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-serif text-amber-500 mb-8 border-b border-stone-800 pb-2">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/products/${product.id}`}
                    className="group bg-stone-900/50 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-900/50 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(217,119,6,0.15)] flex flex-col"
                  >
                    <div className="w-full h-64 relative overflow-hidden bg-stone-800">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-600">No Image</div>
                      )}
                      {product.discount && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                          {product.discount}% OFF
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif text-amber-50 group-hover:text-amber-400 transition-colors">{product.name}</h3>
                        <span className="text-lg font-medium text-amber-500 shrink-0 ml-4">₹{product.price}</span>
                      </div>
                      <p className="text-stone-400 text-sm line-clamp-2 mb-4 flex-grow">{product.desc}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-800">
                        <span className="text-xs text-stone-500">{product.weight || 'Standard Size'}</span>
                        <span className="text-xs font-medium text-amber-600 group-hover:text-amber-400 transition-colors uppercase tracking-wider">View Details &rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
