import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  if (categories.length <= 1) {
    return null;
  }

  return (
    <section className="py-8 border-b border-border bg-card/30">
      <div className="container mx-auto px-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Browse by Category</h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <Button
                  key={category}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => onCategoryChange(category)}
                  className={
                    isSelected
                      ? 'bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.60_0.20_30)] hover:from-[oklch(0.60_0.20_30)] hover:to-[oklch(0.55_0.18_25)] text-white font-semibold shadow-md border-0'
                      : 'border-border hover:border-[oklch(0.60_0.20_30)]/50 hover:bg-[oklch(0.60_0.20_30)]/5 transition-colors'
                  }
                  size="lg"
                >
                  {category}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
