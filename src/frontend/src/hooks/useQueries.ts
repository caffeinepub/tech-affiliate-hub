import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product } from '../backend';

export function useGetAllFeaturedProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: async () => {
      console.log('=== [useGetAllFeaturedProducts] Query function START ===');
      console.log('[useGetAllFeaturedProducts] Actor available:', !!actor);
      console.log('[useGetAllFeaturedProducts] Actor isFetching:', isFetching);
      console.log('[useGetAllFeaturedProducts] Actor object:', actor);
      
      if (!actor) {
        console.warn('[useGetAllFeaturedProducts] No actor available, returning empty array');
        return [];
      }

      try {
        console.log('[useGetAllFeaturedProducts] Calling actor.getAllFeaturedProducts()...');
        const startTime = performance.now();
        const products = await actor.getAllFeaturedProducts();
        const endTime = performance.now();
        
        console.log('[useGetAllFeaturedProducts] ✅ Backend call completed in', (endTime - startTime).toFixed(2), 'ms');
        console.log('[useGetAllFeaturedProducts] Raw response type:', typeof products);
        console.log('[useGetAllFeaturedProducts] Is array:', Array.isArray(products));
        console.log('[useGetAllFeaturedProducts] Product count:', products?.length || 0);
        console.log('[useGetAllFeaturedProducts] Full products array:', JSON.stringify(products, null, 2));
        
        if (products && products.length > 0) {
          console.log('[useGetAllFeaturedProducts] First product:', products[0]);
          console.log('[useGetAllFeaturedProducts] Last product:', products[products.length - 1]);
          console.log('[useGetAllFeaturedProducts] All product titles:', products.map(p => p.title));
          console.log('[useGetAllFeaturedProducts] All product categories:', products.map(p => p.category));
        } else {
          console.warn('[useGetAllFeaturedProducts] ⚠️ No products returned from backend!');
        }
        
        console.log('=== [useGetAllFeaturedProducts] Query function END ===');
        return products || [];
      } catch (error) {
        console.error('=== [useGetAllFeaturedProducts] ERROR ===');
        console.error('[useGetAllFeaturedProducts] Error type:', error?.constructor?.name);
        console.error('[useGetAllFeaturedProducts] Error message:', error instanceof Error ? error.message : String(error));
        console.error('[useGetAllFeaturedProducts] Full error:', error);
        console.error('=== [useGetAllFeaturedProducts] ERROR END ===');
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetAllTodaysDeals() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['todays-deals'],
    queryFn: async () => {
      console.log('=== [useGetAllTodaysDeals] Query function START ===');
      console.log('[useGetAllTodaysDeals] Actor available:', !!actor);
      
      if (!actor) {
        console.warn('[useGetAllTodaysDeals] No actor available, returning empty array');
        return [];
      }

      try {
        console.log('[useGetAllTodaysDeals] Calling actor.getAllTodaysDeals()...');
        const startTime = performance.now();
        const deals = await actor.getAllTodaysDeals();
        const endTime = performance.now();
        
        console.log('[useGetAllTodaysDeals] ✅ Backend call completed in', (endTime - startTime).toFixed(2), 'ms');
        console.log('[useGetAllTodaysDeals] Deal count:', deals?.length || 0);
        console.log('[useGetAllTodaysDeals] Full deals array:', JSON.stringify(deals, null, 2));
        
        console.log('=== [useGetAllTodaysDeals] Query function END ===');
        return deals || [];
      } catch (error) {
        console.error('=== [useGetAllTodaysDeals] ERROR ===');
        console.error('[useGetAllTodaysDeals] Error:', error);
        console.error('=== [useGetAllTodaysDeals] ERROR END ===');
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
