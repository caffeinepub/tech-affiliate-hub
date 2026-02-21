import { useMemo } from 'react';
import { useGetAllTodaysDeals } from '../hooks/useQueries';
import { DealCard } from './DealCard';
import { Loader2, Clock, Flame, SearchX } from 'lucide-react';

interface TodaysDealsProps {
  searchQuery: string;
  selectedCategory: string;
}

export function TodaysDeals({ searchQuery, selectedCategory }: TodaysDealsProps) {
  const { data: deals, isLoading, error } = useGetAllTodaysDeals();

  const filteredDeals = useMemo(() => {
    if (!deals) return [];

    let filtered = deals;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(deal => deal.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(query) ||
        deal.description.toLowerCase().includes(query) ||
        deal.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [deals, searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.65_0.22_35)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">Failed to load deals. Please try again later.</p>
      </div>
    );
  }

  // If no deals at all, don't render the section
  if (!deals || deals.length === 0) {
    return null;
  }

  // If filtered results are empty, show a message
  if (filteredDeals.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-[oklch(0.65_0.22_35)]/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.70_0.24_40)]/20 to-[oklch(0.65_0.22_35)]/20 border border-[oklch(0.65_0.22_35)]/30 mb-4">
              <Flame className="w-5 h-5 text-[oklch(0.65_0.22_35)]" />
              <span className="text-sm font-semibold text-[oklch(0.55_0.20_30)]">Limited Time Offers</span>
              <Clock className="w-4 h-4 text-[oklch(0.60_0.20_30)]" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[oklch(0.70_0.24_40)] to-[oklch(0.60_0.20_30)] bg-clip-text text-transparent">
              Today's Hot Deals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these exclusive limited-time offers
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <SearchX className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No deals found</h3>
            <p className="text-muted-foreground max-w-md">
              {searchQuery
                ? `No deals match "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                : `No deals found in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[oklch(0.65_0.22_35)]/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.70_0.24_40)]/20 to-[oklch(0.65_0.22_35)]/20 border border-[oklch(0.65_0.22_35)]/30 mb-4">
            <Flame className="w-5 h-5 text-[oklch(0.65_0.22_35)]" />
            <span className="text-sm font-semibold text-[oklch(0.55_0.20_30)]">Limited Time Offers</span>
            <Clock className="w-4 h-4 text-[oklch(0.60_0.20_30)]" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[oklch(0.70_0.24_40)] to-[oklch(0.60_0.20_30)] bg-clip-text text-transparent">
            Today's Hot Deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {searchQuery || selectedCategory !== 'All'
              ? `Showing ${filteredDeals.length} ${filteredDeals.length === 1 ? 'deal' : 'deals'}`
              : 'Don\'t miss out on these exclusive limited-time offers'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map((deal, index) => (
            <DealCard key={index} product={deal} />
          ))}
        </div>
      </div>
    </section>
  );
}
