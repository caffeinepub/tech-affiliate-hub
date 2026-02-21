import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Zap } from 'lucide-react';
import type { Product } from '../backend';

interface DealCardProps {
  product: Product;
}

const productImageMap: Record<string, string> = {
  // Featured products
  'Apple 2025 MacBook Pro Laptop': '/assets/generated/macbook-pro-2025.dim_800x600.png',
  'Sony WF-1000XM5': '/assets/generated/sony-wf1000xm5.dim_800x600.png',
  'SOLAKAKA A75 75% Wireless Mechanical Keyboard': '/assets/generated/solakaka-keyboard.dim_800x600.png',
  'Sony ULT Field 1 Waterproof Portable Bluetooth Speaker': '/assets/generated/sony-ult-speaker.dim_800x600.png',
  'Dell 14 Laptop': '/assets/generated/dell-14-laptop.dim_800x600.png',
  'Apple AirPods 4': '/assets/generated/airpods-4.dim_800x600.png',
  // New featured products
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
  // Today's Deals products
  '2TB Portable SSD External Solid State Drive': '/assets/generated/deal-product-1.dim_400x400.png',
  'SLUOTU 15200mAh Charger For iPhone': '/assets/generated/deal-product-2.dim_400x400.png',
  'Apple Vision Pro Stand Charging Stand': '/assets/generated/deal-product-3.dim_400x400.png',
  'Klsniur Webcam w Microphone': '/assets/generated/deal-product-4.dim_400x400.png',
  'Microsoft Surface Laptop 7th Edition': '/assets/generated/deal-product-5.dim_400x400.png',
  '2024 HP Envy 16" 2-in-1 360° Touchscreen Laptop': '/assets/generated/deal-product-6.dim_400x400.png',
  'Mini Portable Projector': '/assets/generated/deal-product-7.dim_400x400.png',
  'Dell XPS 14 Laptop': '/assets/generated/deal-product-8.dim_400x400.png',
  'HP Envy Move 23.8" All-in-One PC': '/assets/generated/deal-product-9.dim_400x400.png',
  'Samsung Galaxy Book4 Pro 16" Laptop': '/assets/generated/deal-product-10.dim_400x400.png',
};

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

function calculateDiscountPercentage(title: string): number {
  // Generate consistent discount percentages based on product title
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 10 + (hash % 41); // 10-50% discount range
}

export function DealCard({ product }: DealCardProps) {
  const navigate = useNavigate();
  const imageSrc = productImageMap[product.title] || '/assets/generated/deal-product-1.dim_400x400.png';
  const discountPercentage = calculateDiscountPercentage(product.title);
  const productSlug = titleToSlug(product.title);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the button
    if ((e.target as HTMLElement).closest('button, a[href]')) {
      return;
    }
    navigate({ to: '/product/$productId', params: { productId: productSlug } });
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[oklch(0.65_0.22_35)]/20 border-2 border-[oklch(0.65_0.22_35)]/30 hover:border-[oklch(0.65_0.22_35)]/60 bg-gradient-to-br from-card to-[oklch(0.65_0.22_35)]/5 relative cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-gradient-to-r from-[oklch(0.70_0.24_40)] to-[oklch(0.65_0.22_35)] text-white font-bold text-sm px-3 py-1.5 shadow-lg">
          <Zap className="w-3 h-3 mr-1 inline" />
          {discountPercentage}% OFF
        </Badge>
      </div>
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden bg-muted/30 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.65_0.22_35)]/20 to-transparent z-[1]" />
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[oklch(0.65_0.22_35)]/15 text-[oklch(0.55_0.20_30)]">
            {product.category}
          </span>
        </div>
        <CardTitle className="text-xl mb-3 line-clamp-2 group-hover:text-[oklch(0.65_0.22_35)] transition-colors">
          {product.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-[oklch(0.65_0.22_35)]">
            {formatINR(product.price * (1 - discountPercentage / 100))}
          </span>
          <span className="text-lg text-muted-foreground line-through">
            {formatINR(product.price)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-[oklch(0.70_0.24_40)] to-[oklch(0.65_0.22_35)] hover:from-[oklch(0.65_0.22_35)] hover:to-[oklch(0.60_0.20_30)] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-base"
          size="lg"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Grab This Deal
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
