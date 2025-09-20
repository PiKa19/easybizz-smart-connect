import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/lib/api';
import type { 
  Bizz, 
  Boutique, 
  MerchantInventory, 
  MerchantOrder, 
  SupplierClient, 
  SupplierInventory, 
  SupplierOrder, 
  SupplierProduct, 
  Supplier 
} from '@/lib/api';

// Safe API hook that never crashes
export function useSafeApiData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Safe API: Fetching data...');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000);
      });
      
      const dataPromise = fetchFunction();
      const result = await Promise.race([dataPromise, timeoutPromise]);
      
      console.log('✅ Safe API: Data fetched successfully:', result);
      setData(result);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('❌ Safe API Error:', err);
      setError(errorMessage);
      
      // Set empty data as fallback to prevent crashes
      setData([] as T);
      
      // Auto-retry once after 3 seconds
      if (retryCount === 0) {
        console.log('🔄 Safe API: Auto-retrying in 3 seconds...');
        setTimeout(() => {
          setRetryCount(1);
          fetchData();
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    console.log('🔄 Safe API: Manual refetch...');
    setRetryCount(0);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Safe API hooks that won't crash
export function useSafeBizz() {
  return useSafeApiData<Bizz[]>(() => apiService.getBizz());
}

export function useSafeBoutiques() {
  return useSafeApiData<Boutique[]>(() => apiService.getBoutiques());
}

export function useSafeMerchantInventory() {
  return useSafeApiData<MerchantInventory[]>(() => apiService.getMerchantInventory());
}

export function useSafeMerchantOrders() {
  return useSafeApiData<MerchantOrder[]>(() => apiService.getMerchantOrders());
}

export function useSafeSupplierClients() {
  return useSafeApiData<SupplierClient[]>(() => apiService.getSupplierClients());
}

export function useSafeSupplierInventory() {
  return useSafeApiData<SupplierInventory[]>(() => apiService.getSupplierInventory());
}

export function useSafeSupplierOrders() {
  return useSafeApiData<SupplierOrder[]>(() => apiService.getSupplierOrders());
}

export function useSafeSupplierProducts() {
  return useSafeApiData<SupplierProduct[]>(() => apiService.getSupplierProducts());
}

export function useSafeSuppliers() {
  return useSafeApiData<Supplier[]>(() => apiService.getSuppliers());
}
