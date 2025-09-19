import { useApi, usePaginatedApi, useMutation } from './useApi';
import { 
  merchantBizzApi, 
  merchantBoutiquesApi, 
  merchantInventoryApi, 
  merchantOrdersApi, 
  merchantStockAlertsApi 
} from '@/services/api';
import { ApiBizz, ApiBoutique, ApiInventory, ApiOrder, ApiStockAlert } from '@/types/api';

// Merchant Bizz hooks
export const useMerchantBizz = () => {
  return useApi(() => merchantBizzApi.getAll(), [], { immediate: true });
};

export const useMerchantBizzById = (id: number) => {
  return useApi(() => merchantBizzApi.getById(id), [id], { immediate: !!id });
};

export const useCreateMerchantBizz = () => {
  return useMutation(
    (bizzData: Omit<ApiBizz, 'id' | 'created_at' | 'updated_at'>) => 
      merchantBizzApi.create(bizzData),
    {
      successMessage: 'Bizz created successfully',
    }
  );
};

export const useUpdateMerchantBizz = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiBizz> }) => 
      merchantBizzApi.update(id, data),
    {
      successMessage: 'Bizz updated successfully',
    }
  );
};

export const useDeleteMerchantBizz = () => {
  return useMutation(
    (id: number) => merchantBizzApi.delete(id),
    {
      successMessage: 'Bizz deleted successfully',
    }
  );
};

// Merchant Boutiques hooks
export const useMerchantBoutiques = () => {
  return useApi(() => merchantBoutiquesApi.getAll(), [], { immediate: true });
};

export const useMerchantBoutiqueById = (id: number) => {
  return useApi(() => merchantBoutiquesApi.getById(id), [id], { immediate: !!id });
};

export const useCreateMerchantBoutique = () => {
  return useMutation(
    (boutiqueData: Omit<ApiBoutique, 'id' | 'created_at' | 'updated_at'>) => 
      merchantBoutiquesApi.create(boutiqueData),
    {
      successMessage: 'Boutique created successfully',
    }
  );
};

export const useUpdateMerchantBoutique = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiBoutique> }) => 
      merchantBoutiquesApi.update(id, data),
    {
      successMessage: 'Boutique updated successfully',
    }
  );
};

export const useDeleteMerchantBoutique = () => {
  return useMutation(
    (id: number) => merchantBoutiquesApi.delete(id),
    {
      successMessage: 'Boutique deleted successfully',
    }
  );
};

// Merchant Inventory hooks
export const useMerchantInventory = () => {
  return useApi(() => merchantInventoryApi.getAll(), [], { immediate: true });
};

export const useMerchantInventoryById = (id: number) => {
  return useApi(() => merchantInventoryApi.getById(id), [id], { immediate: !!id });
};

export const useCreateMerchantInventory = () => {
  return useMutation(
    (inventoryData: Omit<ApiInventory, 'id' | 'created_at' | 'updated_at'>) => 
      merchantInventoryApi.create(inventoryData),
    {
      successMessage: 'Inventory item created successfully',
    }
  );
};

export const useUpdateMerchantInventory = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiInventory> }) => 
      merchantInventoryApi.update(id, data),
    {
      successMessage: 'Inventory item updated successfully',
    }
  );
};

export const useDeleteMerchantInventory = () => {
  return useMutation(
    (id: number) => merchantInventoryApi.delete(id),
    {
      successMessage: 'Inventory item deleted successfully',
    }
  );
};

// Merchant Orders hooks  
export const useMerchantOrders = () => {
  return useApi(() => merchantOrdersApi.getAll(), [], { immediate: true });
};

export const useMerchantOrderById = (id: number) => {
  return useApi(() => merchantOrdersApi.getById(id), [id], { immediate: !!id });
};

export const useCreateMerchantOrder = () => {
  return useMutation(
    (orderData: any) => merchantOrdersApi.create(orderData),
    {
      successMessage: 'Order created successfully',
    }
  );
};

export const useUpdateMerchantOrder = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiOrder> }) => 
      merchantOrdersApi.update(id, data),
    {
      successMessage: 'Order updated successfully',
    }
  );
};

export const useDeleteMerchantOrder = () => {
  return useMutation(
    (id: number) => merchantOrdersApi.delete(id),
    {
      successMessage: 'Order deleted successfully',
    }
  );
};

// Merchant Stock Alerts hooks
export const useMerchantStockAlerts = () => {
  return useApi(() => merchantStockAlertsApi.getAll(), [], { immediate: true });
};

export const useMerchantStockAlertById = (id: number) => {
  return useApi(() => merchantStockAlertsApi.getById(id), [id], { immediate: !!id });
};

export const useResolveMerchantStockAlert = () => {
  return useMutation(
    (id: number) => merchantStockAlertsApi.markAsResolved(id),
    {
      successMessage: 'Stock alert resolved successfully',
    }
  );
};

export const useDeleteMerchantStockAlert = () => {
  return useMutation(
    (id: number) => merchantStockAlertsApi.delete(id),
    {
      successMessage: 'Stock alert deleted successfully',
    }
  );
};