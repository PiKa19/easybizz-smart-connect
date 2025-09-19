import { useApi, useMutation } from './useApi';
import { supplierSpaceApi, categoriesApi } from '@/services/api';
import { ApiOrder, ApiInventory, ApiCategory } from '@/types/api';

// Supplier Orders hooks
export const useSupplierOrders = () => {
  return useApi(() => supplierSpaceApi.orders.getAll(), [], { immediate: true });
};

export const useSupplierOrderById = (id: number) => {
  return useApi(() => supplierSpaceApi.orders.getById(id), [id], { immediate: !!id });
};

export const useCreateSupplierOrder = () => {
  return useMutation(
    (orderData: any) => supplierSpaceApi.orders.create(orderData),
    {
      successMessage: 'Order created successfully',
    }
  );
};

export const useUpdateSupplierOrder = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiOrder> }) => 
      supplierSpaceApi.orders.update(id, data),
    {
      successMessage: 'Order updated successfully',
    }
  );
};

export const useDeleteSupplierOrder = () => {
  return useMutation(
    (id: number) => supplierSpaceApi.orders.delete(id),
    {
      successMessage: 'Order deleted successfully',
    }
  );
};

// Supplier Inventory hooks
export const useSupplierInventory = () => {
  return useApi(() => supplierSpaceApi.inventory.getAll(), [], { immediate: true });
};

export const useSupplierInventoryById = (id: number) => {
  return useApi(() => supplierSpaceApi.inventory.getById(id), [id], { immediate: !!id });
};

export const useCreateSupplierInventory = () => {
  return useMutation(
    (inventoryData: {
      product_id: number;
      product_name?: string;
      category_id?: number;
      purchased_quantity?: number;
      sold_quantity?: number;
      returned_quantity?: number;
      damaged_quantity?: number;
      current_quantity?: number;
      unit_price?: number;
      total_cost?: number;
      status: boolean;
    }) => 
      supplierSpaceApi.inventory.create(inventoryData),
    {
      successMessage: 'Inventory item created successfully',
    }
  );
};

export const useUpdateSupplierInventory = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiInventory> }) => 
      supplierSpaceApi.inventory.update(id, data),
    {
      successMessage: 'Inventory item updated successfully',
    }
  );
};

export const useDeleteSupplierInventory = () => {
  return useMutation(
    (id: number) => supplierSpaceApi.inventory.delete(id),
    {
      successMessage: 'Inventory item deleted successfully',
    }
  );
};

// Supplier Clients hooks
export const useSupplierClients = () => {
  return useApi(() => supplierSpaceApi.clients.getAll(), [], { immediate: true });
};

export const useSupplierClientById = (id: number) => {
  return useApi(() => supplierSpaceApi.clients.getById(id), [id], { immediate: !!id });
};

export const useCreateSupplierClient = () => {
  return useMutation(
    (clientData: {
      name: string;
      email: string;
      total_orders?: number;
      last_order_date?: string;
    }) => 
      supplierSpaceApi.clients.create(clientData),
    {
      successMessage: 'Client created successfully',
    }
  );
};

export const useUpdateSupplierClient = () => {
  return useMutation(
    ({ id, data }: { id: number; data: any }) => 
      supplierSpaceApi.clients.update(id, data),
    {
      successMessage: 'Client updated successfully',
    }
  );
};

export const useDeleteSupplierClient = () => {
  return useMutation(
    (id: number) => supplierSpaceApi.clients.delete(id),
    {
      successMessage: 'Client deleted successfully',
    }
  );
};

// Supplier Products hooks
export const useSupplierProducts = () => {
  return useApi(() => supplierSpaceApi.products.getAll(), [], { immediate: true });
};

export const useSupplierProductById = (id: number) => {
  return useApi(() => supplierSpaceApi.products.getById(id), [id], { immediate: !!id });
};

export const useCreateSupplierProduct = () => {
  return useMutation(
    (productData: {
      store_id: number;
      name: string;
      description?: string;
      category_id?: number;
      barcode?: string;
      stock_quantity: number;
      unit_price?: number;
      min_order_volume?: number;
      dimensions?: string;
      storage_requirements?: string;
    }) => 
      supplierSpaceApi.products.create(productData),
    {
      successMessage: 'Product created successfully',
    }
  );
};

export const useUpdateSupplierProduct = () => {
  return useMutation(
    ({ id, data }: { id: number; data: any }) => 
      supplierSpaceApi.products.update(id, data),
    {
      successMessage: 'Product updated successfully',
    }
  );
};

export const useDeleteSupplierProduct = () => {
  return useMutation(
    (id: number) => supplierSpaceApi.products.delete(id),
    {
      successMessage: 'Product deleted successfully',
    }
  );
};

// Shared Categories hooks (for general use)
export const useCategories = () => {
  return useApi(() => categoriesApi.getAll(), [], { immediate: true });
};

export const useCategoryById = (id: number) => {
  return useApi(() => categoriesApi.getById(id), [id], { immediate: !!id });
};

export const useCreateCategory = () => {
  return useMutation(
    (categoryData: Omit<ApiCategory, 'id' | 'created_at' | 'updated_at'>) => 
      categoriesApi.create(categoryData),
    {
      successMessage: 'Category created successfully',
    }
  );
};

export const useUpdateCategory = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiCategory> }) => 
      categoriesApi.update(id, data),
    {
      successMessage: 'Category updated successfully',
    }
  );
};

export const useDeleteCategory = () => {
  return useMutation(
    (id: number) => categoriesApi.delete(id),
    {
      successMessage: 'Category deleted successfully',
    }
  );
};