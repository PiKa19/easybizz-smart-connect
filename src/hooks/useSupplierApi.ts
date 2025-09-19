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
    (inventoryData: Omit<ApiInventory, 'id' | 'created_at' | 'updated_at'>) => 
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

// Supplier Categories hooks
export const useSupplierCategories = () => {
  return useApi(() => supplierSpaceApi.categories.getAll(), [], { immediate: true });
};

export const useSupplierCategoryById = (id: number) => {
  return useApi(() => supplierSpaceApi.categories.getById(id), [id], { immediate: !!id });
};

export const useCreateSupplierCategory = () => {
  return useMutation(
    (categoryData: Omit<ApiCategory, 'id' | 'created_at' | 'updated_at'>) => 
      supplierSpaceApi.categories.create(categoryData),
    {
      successMessage: 'Category created successfully',
    }
  );
};

export const useUpdateSupplierCategory = () => {
  return useMutation(
    ({ id, data }: { id: number; data: Partial<ApiCategory> }) => 
      supplierSpaceApi.categories.update(id, data),
    {
      successMessage: 'Category updated successfully',
    }
  );
};

export const useDeleteSupplierCategory = () => {
  return useMutation(
    (id: number) => supplierSpaceApi.categories.delete(id),
    {
      successMessage: 'Category deleted successfully',
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