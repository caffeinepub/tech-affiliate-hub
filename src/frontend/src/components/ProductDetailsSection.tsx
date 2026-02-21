import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Info, Zap } from 'lucide-react';
import type { Product } from '../backend';

interface ProductDetailsSectionProps {
  product: Product;
}

export function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.55_0.18_25)] bg-clip-text text-transparent">
        Product Details
      </h2>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="specifications" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Specifications
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Product Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <div className="bg-[oklch(0.60_0.20_30)]/5 border border-[oklch(0.60_0.20_30)]/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-[oklch(0.50_0.18_30)]">Category</h4>
                <p className="text-foreground">{product.category}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {product.category === 'Laptops' && (
                  <>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Display</span>
                      <span className="text-foreground">14-15 inch FHD/Retina</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Processor</span>
                      <span className="text-foreground">Latest Generation</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">RAM</span>
                      <span className="text-foreground">8GB - 16GB</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Storage</span>
                      <span className="text-foreground">256GB - 512GB SSD</span>
                    </div>
                  </>
                )}
                {product.category === 'Headphones' && (
                  <>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Type</span>
                      <span className="text-foreground">Wireless Earbuds</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Noise Cancellation</span>
                      <span className="text-foreground">Active ANC</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Battery Life</span>
                      <span className="text-foreground">Up to 24 hours</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Connectivity</span>
                      <span className="text-foreground">Bluetooth 5.3</span>
                    </div>
                  </>
                )}
                {product.category === 'Accessories' && (
                  <>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Type</span>
                      <span className="text-foreground">Mechanical Keyboard</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Layout</span>
                      <span className="text-foreground">75% Compact</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Connectivity</span>
                      <span className="text-foreground">Wireless/Wired</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">RGB Lighting</span>
                      <span className="text-foreground">Yes</span>
                    </div>
                  </>
                )}
                {product.category === 'Audio' && (
                  <>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Type</span>
                      <span className="text-foreground">Portable Bluetooth Speaker</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Waterproof</span>
                      <span className="text-foreground">IP67 Rating</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Battery Life</span>
                      <span className="text-foreground">Up to 12 hours</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="font-medium text-muted-foreground">Connectivity</span>
                      <span className="text-foreground">Bluetooth 5.2</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.60_0.20_30)] mt-2 shrink-0" />
                  <span className="text-foreground">Premium build quality with attention to detail</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.60_0.20_30)] mt-2 shrink-0" />
                  <span className="text-foreground">Latest technology for optimal performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.60_0.20_30)] mt-2 shrink-0" />
                  <span className="text-foreground">Ergonomic design for comfortable extended use</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.60_0.20_30)] mt-2 shrink-0" />
                  <span className="text-foreground">Energy efficient with long battery life</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.60_0.20_30)] mt-2 shrink-0" />
                  <span className="text-foreground">Compatible with multiple devices and platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[oklch(0.60_0.20_30)] mt-2 shrink-0" />
                  <span className="text-foreground">Manufacturer warranty and customer support included</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
