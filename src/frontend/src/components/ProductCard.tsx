import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { Product } from '../backend';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

const productImageMap: Record<string, string> = {
  'Apple 2025 MacBook Pro Laptop': '/assets/generated/macbook-pro-2025.dim_800x600.png',
  'Sony WF-1000XM5': '/assets/generated/sony-wf1000xm5.dim_800x600.png',
  'SOLAKAKA A75 75% Wireless Mechanical Keyboard': '/assets/generated/solakaka-keyboard.dim_800x600.png',
  'Sony ULT Field 1 Waterproof Portable Bluetooth Speaker': '/assets/generated/sony-ult-speaker.dim_800x600.png',
  'Dell 14 Laptop': '/assets/generated/dell-14-laptop.dim_800x600.png',
  'Apple AirPods 4': '/assets/generated/airpods-4.dim_800x600.png',
  // New products
  'Samsung Galaxy M07 Mobile': '/assets/generated/samsung-galaxy-m07.dim_800x800.png',
  'Samsung Galaxy M56 5G Mobile': '/assets/generated/samsung-galaxy-m56-5g.dim_800x800.png',
  'iQOO Z10R 5G': '/assets/generated/iqoo-z10r-5g.dim_800x800.png',
  'Ant Esports KM1410 Wired Gaming Keyboard and Mouse Combo': '/assets/generated/ant-esports-km1410-combo.dim_800x800.png',
  'LG 1.5 Ton 5 Star DUAL Inverter Split AC': '/assets/generated/lg-dual-inverter-ac.dim_800x800.png',
  'LG 139 cm (55 inches) UA82 Series 4K Ultra HD Smart webOS LED TV 55UA82006LA': '/assets/generated/lg-55-ua82-4k-tv.dim_800x800.png',
  'Godrej 600L 3Star Frost Free Inverter Side By Side Refrigerator': '/assets/generated/godrej-600l-refrigerator.dim_800x800.png',
  'ASUS TUF A15': '/assets/generated/asus-tuf-a15.dim_800x800.png',
  'Native by Urban Company M2 PRO RO+UV+Copper+Alkaline 10-Stage Smart Water Purifier': '/assets/generated/native-m2-pro-purifier.dim_800x800.png',
  'Amazon Fire TV Stick HD': '/assets/generated/amazon-fire-tv-stick-hd.dim_800x800.png',
  'Hollyland Lark M2 Wireless Microphone': '/assets/generated/hollyland-lark-m2.dim_800x800.png',
  'ECOVACS DEEBOT N30 Plus White 2 in 1 Robot Vacuum and Mop': '/assets/generated/ecovacs-deebot-n30.dim_800x800.png',
};

const fallbackImage = '/assets/generated/macbook-pro-2025.dim_800x600.png';

function titleToSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}

function formatINR(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const imageSrc = imageError 
    ? fallbackImage 
    : (productImageMap[product.title] || fallbackImage);
  
  const productSlug = titleToSlug(product.title);

  useEffect(() => {
    console.log('[ProductCard] Rendering card for:', product.title);
    console.log('[ProductCard] Image source:', imageSrc);
    console.log('[ProductCard] Product category:', product.category);
    console.log('[ProductCard] Product price:', product.price);
  }, [product.title, imageSrc, product.category, product.price]);

  const handleImageError = () => {
    console.error('[ProductCard] ❌ Image failed to load for product:', product.title);
    console.error('[ProductCard] Attempted image path:', imageSrc);
    console.error('[ProductCard] Available in map:', product.title in productImageMap);
    setImageError(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the button
    if ((e.target as HTMLElement).closest('button, a[href]')) {
      return;
    }
    navigate({ to: '/product/$productId', params: { productId: productSlug } });
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[oklch(0.60_0.20_30)]/10 border-border/50 hover:border-[oklch(0.60_0.20_30)]/30 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden bg-muted/30">
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[oklch(0.60_0.20_30)]/10 text-[oklch(0.50_0.18_30)]">
            {product.category}
          </span>
        </div>
        <CardTitle className="text-xl mb-3 line-clamp-2 group-hover:text-[oklch(0.60_0.20_30)] transition-colors">
          {product.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            {formatINR(product.price)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.60_0.20_30)] hover:from-[oklch(0.60_0.20_30)] hover:to-[oklch(0.55_0.18_25)] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          size="lg"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Buy Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
