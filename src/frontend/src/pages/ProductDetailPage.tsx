import { useParams, useNavigate } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { useGetAllFeaturedProducts, useGetAllTodaysDeals } from '../hooks/useQueries';
import { ProductDetailsSection } from '../components/ProductDetailsSection';
import { ProductReviews } from '../components/ProductReviews';
import { useMemo, useState } from 'react';
import type { Product } from '../backend';

const productImageMap: Record<string, string> = {
  'Apple 2025 MacBook Pro Laptop': '/assets/generated/macbook-pro-2025.dim_800x600.png',
  'Sony WF-1000XM5': '/assets/generated/sony-wf1000xm5.dim_800x600.png',
  'SOLAKAKA A75 75% Wireless Mechanical Keyboard': '/assets/generated/solakaka-keyboard.dim_800x600.png',
  'Sony ULT Field 1 Waterproof Portable Bluetooth Speaker': '/assets/generated/sony-ult-speaker.dim_800x600.png',
  'Dell 14 Laptop': '/assets/generated/dell-14-laptop.dim_800x600.png',
  'Apple AirPods 4': '/assets/generated/airpods-4.dim_800x600.png',
};

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatINR(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductDetailPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: featuredProducts, isLoading: loadingFeatured } = useGetAllFeaturedProducts();
  const { data: todaysDeals, isLoading: loadingDeals } = useGetAllTodaysDeals();

  const product = useMemo(() => {
    if (!featuredProducts && !todaysDeals) return null;
    
    const allProducts = [...(featuredProducts || []), ...(todaysDeals || [])];
    const titleFromSlug = slugToTitle(productId);
    
    return allProducts.find(p => 
      p.title.toLowerCase().replace(/\s+/g, '-') === productId.toLowerCase() ||
      p.title.toLowerCase() === titleFromSlug.toLowerCase()
    );
  }, [productId, featuredProducts, todaysDeals]);

  const isLoading = loadingFeatured || loadingDeals;

  if (isLoading) {
    return (
      <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.60_0.20_30)]" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate({ to: '/' })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }

  const imageSrc = productImageMap[product.title] || '/assets/generated/macbook-pro-2025.dim_800x600.png';

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-6 hover:bg-[oklch(0.60_0.20_30)]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted/30">
            <img
              src={imageSrc}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[oklch(0.60_0.20_30)]/10 text-[oklch(0.50_0.18_30)]">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-[oklch(0.60_0.20_30)]">
                {formatINR(product.price)}
              </span>
            </div>
            <Button
              asChild
              className="w-full lg:w-auto bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.60_0.20_30)] hover:from-[oklch(0.60_0.20_30)] hover:to-[oklch(0.55_0.18_25)] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              size="lg"
            >
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Buy Now on Amazon
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Product Details Section */}
        <ProductDetailsSection product={product} />

        {/* Reviews Section */}
        <ProductReviews productTitle={product.title} />
      </div>
    </Layout>
  );
}
