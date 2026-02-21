import { SiCaffeine } from 'react-icons/si';
import { SearchBar } from './SearchBar';

interface LayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Layout({ children, searchQuery, onSearchChange }: LayoutProps) {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/techvixo-logo.dim_200x80.png" 
                alt="Techvixo Logo" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Techvixo
                </h1>
                <p className="text-sm text-muted-foreground">Premium Tech Deals</p>
              </div>
            </div>
            <div className="w-full md:w-auto md:flex-1 md:max-w-md">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Techvixo</span>
              <span>•</span>
              <span>All Rights Reserved</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <SiCaffeine className="w-4 h-4 text-[oklch(0.60_0.20_30)]" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-[oklch(0.60_0.20_30)] transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
