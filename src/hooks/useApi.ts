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
    (data) => apiService.createBizz(data),
    (id, data) => apiService.updateBizz(id, data),
    (id) => apiService.deleteBizz(id)
  );
}

export function useBoutiquesCrud() {
  return useApiCrud(
    () => apiService.getBoutiques(),
    (data) => apiService.createBoutique(data),
    (id, data) => apiService.updateBoutique(id, data),
    (id) => apiService.deleteBoutique(id)
  );
}

export function useMerchantInventoryCrud() {
  return useApiCrud(
    () => apiService.getMerchantInventory(),
    (data) => apiService.createMerchantInventory(data),
    (id, data) => apiService.updateMerchantInventory(id, data),
    (id) => apiService.deleteMerchantInventory(id)
  );
}

export function useMerchantOrdersCrud() {
  return useApiCrud(
    () => apiService.getMerchantOrders(),
    (data) => apiService.createMerchantOrder(data),
    (id, data) => apiService.updateMerchantOrder(id, data),
    (id) => apiService.deleteMerchantOrder(id)
  );
}

export function useSupplierClientsCrud() {
  return useApiCrud(
    () => apiService.getSupplierClients(),
    (data) => apiService.createSupplierClient(data),
    (id, data) => apiService.updateSupplierClient(id, data),
    (id) => apiService.deleteSupplierClient(id)
  );
}

export function useSupplierInventoryCrud() {
  return useApiCrud(
    () => apiService.getSupplierInventory(),
    (data) => apiService.createSupplierInventory(data),
    (id, data) => apiService.updateSupplierInventory(id, data),
    (id) => apiService.deleteSupplierInventory(id)
  );
}

export function useSupplierOrdersCrud() {
  return useApiCrud(
    () => apiService.getSupplierOrders(),
    (data) => apiService.createSupplierOrder(data),
    (id, data) => apiService.updateSupplierOrder(id, data),
    (id) => apiService.deleteSupplierOrder(id)
  );
}

export function useSupplierProductsCrud() {
  return useApiCrud(
    () => apiService.getSupplierProducts(),
    (data) => apiService.createSupplierProduct(data),
    (id, data) => apiService.updateSupplierProduct(id, data),
    (id) => apiService.deleteSupplierProduct(id)
  );
}

export function useSuppliersCrud() {
  return useApiCrud(
    () => apiService.getSuppliers(),
    (data) => apiService.createSupplier(data),
    (id, data) => apiService.updateSupplier(id, data),
    (id) => apiService.deleteSupplier(id)
  );
}
