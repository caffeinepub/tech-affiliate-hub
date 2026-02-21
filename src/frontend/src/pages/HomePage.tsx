import { useState, useMemo, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { TodaysDeals } from '../components/TodaysDeals';
import { CategoryFilter } from '../components/CategoryFilter';
import { useGetAllFeaturedProducts, useGetAllTodaysDeals } from '../hooks/useQueries';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: featuredProducts } = useGetAllFeaturedProducts();
  const { data: todaysDeals } = useGetAllTodaysDeals();

  useEffect(() => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║              [HomePage] State Update                       ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('[HomePage] featuredProducts count:', featuredProducts?.length || 0);
    console.log('[HomePage] todaysDeals count:', todaysDeals?.length || 0);
    console.log('[HomePage] searchQuery:', searchQuery);
    console.log('[HomePage] selectedCategory:', selectedCategory);
    console.log('════════════════════════════════════════════════════════════');
  }, [featuredProducts, todaysDeals, searchQuery, selectedCategory]);

  // Derive unique categories from all products
  const categories = useMemo(() => {
    console.log('[HomePage] Computing categories...');
    const allProducts = [...(featuredProducts || []), ...(todaysDeals || [])];
    console.log('[HomePage] Total products for category extraction:', allProducts.length);
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    console.log('[HomePage] Unique categories found:', uniqueCategories);
    const result = ['All', ...uniqueCategories.sort()];
    console.log('[HomePage] Final categories array:', result);
    return result;
  }, [featuredProducts, todaysDeals]);

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-[oklch(0.65_0.22_35)]/5 to-background py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.65_0.22_35)_0%,transparent_50%)] opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.60_0.20_30)_0%,transparent_50%)] opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <a
                href="https://youtube.com/@techvixo_11?si=xg8gQ9jchs209IEM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[oklch(0.70_0.24_40)]/10 to-[oklch(0.65_0.22_35)]/10 border border-[oklch(0.65_0.22_35)]/20 mb-6 hover:border-[oklch(0.65_0.22_35)]/40 hover:bg-gradient-to-r hover:from-[oklch(0.70_0.24_40)]/20 hover:to-[oklch(0.65_0.22_35)]/20 transition-all duration-200"
              >
                <span className="text-lg font-semibold bg-gradient-to-r from-[oklch(0.70_0.24_40)] to-[oklch(0.60_0.20_30)] bg-clip-text text-transparent">
                  Techvixo × Amazon
                </span>
              </a>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[oklch(0.70_0.24_40)] via-[oklch(0.65_0.22_35)] to-[oklch(0.60_0.20_30)] bg-clip-text text-transparent">
                  Premium Tech
                </span>
                <br />
                <span className="text-foreground">At Your Fingertips</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover the latest gadgets and electronics with exclusive deals on top-rated products
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Featured Products */}
        <FeaturedProducts searchQuery={searchQuery} selectedCategory={selectedCategory} />

        {/* Today's Deals */}
        <TodaysDeals searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </div>
    </Layout>
  );
}
