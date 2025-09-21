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

// Generic hook for API data fetching
export function useApiData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching data...');
      const result = await fetchFunction();
      console.log('✅ Data fetched successfully:', result);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('❌ API Error in hook:', err);
      setError(errorMessage);
      
      // Set empty data as fallback to prevent blank screens
      setData([] as T);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    console.log('🔄 Refetching data...');
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Merchant Hooks
export function useBizz() {
  return useApiData<Bizz[]>(() => apiService.getBizz());
}

export function useBoutiques() {
  return useApiData<Boutique[]>(() => apiService.getBoutiques());
}

export function useMerchantInventory() {
  return useApiData<MerchantInventory[]>(() => apiService.getMerchantInventory());
}

export function useMerchantOrders() {
  return useApiData<MerchantOrder[]>(() => apiService.getMerchantOrders());
}

// Supplier Hooks
export function useSupplierClients() {
  return useApiData<SupplierClient[]>(() => apiService.getSupplierClients());
}

export function useSupplierInventory() {
  return useApiData<SupplierInventory[]>(() => apiService.getSupplierInventory());
}

export function useSupplierOrders() {
  return useApiData<SupplierOrder[]>(() => apiService.getSupplierOrders());
}

export function useSupplierProducts() {
  return useApiData<SupplierProduct[]>(() => apiService.getSupplierProducts());
}

export function useSuppliers() {
  return useApiData<Supplier[]>(() => apiService.getSuppliers());
}

// CRUD Operations Hook
export function useApiCrud<T, CreateData, UpdateData>(
  fetchFunction: () => Promise<T[]>,
  createFunction: (data: CreateData) => Promise<T>,
  updateFunction: (id: number, data: UpdateData) => Promise<T>,
  deleteFunction: (id: number) => Promise<{ message: string }>
) {
  const { data, loading, error, refetch } = useApiData<T[]>(fetchFunction);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const create = useCallback(async (data: CreateData) => {
    try {
      setIsCreating(true);
      const result = await createFunction(data);
      await refetch(); // Refresh the list
      return result;
    } catch (err) {
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, [createFunction, refetch]);

  const update = useCallback(async (id: number, data: UpdateData) => {
    try {
      setIsUpdating(true);
      const result = await updateFunction(id, data);
      await refetch(); // Refresh the list
      return result;
    } catch (err) {
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, [updateFunction, refetch]);

  const remove = useCallback(async (id: number) => {
    try {
      setIsDeleting(true);
      const result = await deleteFunction(id);
      await refetch(); // Refresh the list
      return result;
    } catch (err) {
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [deleteFunction, refetch]);

  return {
    data,
    loading,
    error,
    refetch,
    create,
    update,
    remove,
    isCreating,
    isUpdating,
    isDeleting,
  };
}

// Specific CRUD hooks
export function useBizzCrud() {
  return useApiCrud(
    () => apiService.getBizz(),
    (data: Omit<Bizz, 'id'>) => apiService.createBizz(data),
    (id: number, data: Partial<Bizz>) => apiService.updateBizz(id, data),
    (id: number) => apiService.deleteBizz(id)
  );
}

export function useBoutiquesCrud() {
  return useApiCrud(
    () => apiService.getBoutiques(),
    (data: Omit<Boutique, 'id'>) => apiService.createBoutique(data),
    (id: number, data: Partial<Boutique>) => apiService.updateBoutique(id, data),
    (id: number) => apiService.deleteBoutique(id)
  );
}

export function useMerchantInventoryCrud() {
  return useApiCrud(
    () => apiService.getMerchantInventory(),
    (data: Omit<MerchantInventory, 'id'>) => apiService.createMerchantInventory(data),
    (id: number, data: Partial<MerchantInventory>) => apiService.updateMerchantInventory(id, data),
    (id: number) => apiService.deleteMerchantInventory(id)
  );
}

export function useMerchantOrdersCrud() {
  return useApiCrud(
    () => apiService.getMerchantOrders(),
    (data: Omit<MerchantOrder, 'id'>) => apiService.createMerchantOrder(data),
    (id: number, data: Partial<MerchantOrder>) => apiService.updateMerchantOrder(id, data),
    (id: number) => apiService.deleteMerchantOrder(id)
  );
}

export function useSupplierClientsCrud() {
  return useApiCrud(
    () => apiService.getSupplierClients(),
    (data: Omit<SupplierClient, 'id'>) => apiService.createSupplierClient(data),
    (id: number, data: Partial<SupplierClient>) => apiService.updateSupplierClient(id, data),
    (id: number) => apiService.deleteSupplierClient(id)
  );
}

export function useSupplierInventoryCrud() {
  return useApiCrud(
    () => apiService.getSupplierInventory(),
    (data: Omit<SupplierInventory, 'id'>) => apiService.createSupplierInventory(data),
    (id: number, data: Partial<SupplierInventory>) => apiService.updateSupplierInventory(id, data),
    (id: number) => apiService.deleteSupplierInventory(id)
  );
}

export function useSupplierOrdersCrud() {
  return useApiCrud(
    () => apiService.getSupplierOrders(),
    (data: Omit<SupplierOrder, 'id'>) => apiService.createSupplierOrder(data),
    (id: number, data: Partial<SupplierOrder>) => apiService.updateSupplierOrder(id, data),
    (id: number) => apiService.deleteSupplierOrder(id)
  );
}

export function useSupplierProductsCrud() {
  return useApiCrud(
    () => apiService.getSupplierProducts(),
    (data: Omit<SupplierProduct, 'id'>) => apiService.createSupplierProduct(data),
    (id: number, data: Partial<SupplierProduct>) => apiService.updateSupplierProduct(id, data),
    (id: number) => apiService.deleteSupplierProduct(id)
  );
}

export function useSuppliersCrud() {
  return useApiCrud(
    () => apiService.getSuppliers(),
    (data: Omit<Supplier, 'id'>) => apiService.createSupplier(data),
    (id: number, data: Partial<Supplier>) => apiService.updateSupplier(id, data),
    (id: number) => apiService.deleteSupplier(id)
  );
}
