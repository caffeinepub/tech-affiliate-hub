import { useMemo, useEffect } from 'react';
import { useGetAllFeaturedProducts } from '../hooks/useQueries';
import { ProductCard } from './ProductCard';
import { Loader2, SearchX, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FeaturedProductsProps {
  searchQuery: string;
  selectedCategory: string;
}

export function FeaturedProducts({ searchQuery, selectedCategory }: FeaturedProductsProps) {
  const { data: products, isLoading, error, isFetching, isError } = useGetAllFeaturedProducts();

  useEffect(() => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║         [FeaturedProducts] Component State Update         ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('[FeaturedProducts] isLoading:', isLoading);
    console.log('[FeaturedProducts] isFetching:', isFetching);
    console.log('[FeaturedProducts] isError:', isError);
    console.log('[FeaturedProducts] error:', error);
    console.log('[FeaturedProducts] products type:', typeof products);
    console.log('[FeaturedProducts] products is array:', Array.isArray(products));
    console.log('[FeaturedProducts] products count:', products?.length || 0);
    console.log('[FeaturedProducts] products data:', products);
    console.log('[FeaturedProducts] searchQuery:', searchQuery);
    console.log('[FeaturedProducts] selectedCategory:', selectedCategory);
    
    if (products && products.length > 0) {
      console.log('[FeaturedProducts] ✅ Products available:', products.length);
      console.log('[FeaturedProducts] Product titles:', products.map(p => p.title));
    } else {
      console.warn('[FeaturedProducts] ⚠️ No products in component state!');
    }
    console.log('════════════════════════════════════════════════════════════');
  }, [isLoading, isFetching, isError, error, products, searchQuery, selectedCategory]);

  const filteredProducts = useMemo(() => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║      [FeaturedProducts] Computing filteredProducts        ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    
    if (!products) {
      console.log('[FeaturedProducts] ⚠️ No products available for filtering');
      return [];
    }

    console.log('[FeaturedProducts] Starting with', products.length, 'products');
    console.log('[FeaturedProducts] Initial products:', products.map(p => ({ title: p.title, category: p.category })));
    
    let filtered = [...products]; // Create a copy to avoid mutations

    // Apply category filter
    if (selectedCategory !== 'All') {
      console.log('[FeaturedProducts] 🔍 Filtering by category:', selectedCategory);
      const beforeCount = filtered.length;
      filtered = filtered.filter(product => product.category === selectedCategory);
      console.log('[FeaturedProducts] Category filter: reduced from', beforeCount, 'to', filtered.length, 'products');
    } else {
      console.log('[FeaturedProducts] ℹ️ No category filter applied (showing All)');
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      console.log('[FeaturedProducts] 🔍 Filtering by search query:', query);
      const beforeCount = filtered.length;
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      console.log('[FeaturedProducts] Search filter: reduced from', beforeCount, 'to', filtered.length, 'products');
    } else {
      console.log('[FeaturedProducts] ℹ️ No search filter applied');
    }

    console.log('[FeaturedProducts] ✅ Final filtered count:', filtered.length);
    console.log('[FeaturedProducts] Final filtered products:', filtered.map(p => p.title));
    console.log('════════════════════════════════════════════════════════════');
    
    return filtered;
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║    [FeaturedProducts] Filtered Products Changed           ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('[FeaturedProducts] Will render', filteredProducts.length, 'product cards');
    console.log('[FeaturedProducts] Products to render:', filteredProducts.map(p => p.title));
    console.log('════════════════════════════════════════════════════════════');
  }, [filteredProducts]);

  if (isLoading) {
    console.log('[FeaturedProducts] 🔄 Rendering loading state');
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.60_0.20_30)]" />
      </div>
    );
  }

  if (error) {
    console.error('[FeaturedProducts] ❌ Rendering error state:', error);
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Products</AlertTitle>
            <AlertDescription>
              Failed to load products. Please try refreshing the page.
              {error instanceof Error && (
                <div className="mt-2 text-xs font-mono">
                  {error.message}
                </div>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    console.log('[FeaturedProducts] ⚠️ No products available - showing empty state');
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Products Available</AlertTitle>
            <AlertDescription>
              No products are currently available. Please check back later.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  if (filteredProducts.length === 0) {
    console.log('[FeaturedProducts] 🔍 No filtered products to display - showing no results state');
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.55_0.18_25)] bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium tech products
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <SearchX className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-md">
              {searchQuery
                ? `No products match "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                : `No products found in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>
    );
  }

  console.log('[FeaturedProducts] ✅ Rendering', filteredProducts.length, 'products in grid');
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.55_0.18_25)] bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {searchQuery || selectedCategory !== 'All'
              ? `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`
              : 'Discover our handpicked selection of premium tech products'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => {
            console.log('[FeaturedProducts] Rendering ProductCard', index + 1, 'of', filteredProducts.length, ':', product.title);
            return <ProductCard key={`${product.title}-${index}`} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
}
