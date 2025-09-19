import { 
  LaravelResponse, 
  LaravelPaginatedResponse, 
  LaravelErrorResponse,
  ApiProduct,
  ApiOrder,
  ApiUser,
  AuthResponse,
  ApiSupplier,
  ApiAnalytics,
  ApiBizz,
  ApiBoutique,
  ApiInventory,
  ApiStockAlert,
  ApiCategory
} from '@/types/api';

// API Configuration
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

// Request headers
const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic fetch wrapper with Laravel error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle Laravel validation errors
      const error: LaravelErrorResponse = data;
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Authentication API
export const authApi = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
  },

  logout: async (): Promise<LaravelResponse> => {
    return apiRequest<LaravelResponse>('/auth/logout', {
      method: 'POST',
    });
  },

  me: async (): Promise<LaravelResponse<ApiUser>> => {
    return apiRequest<LaravelResponse<ApiUser>>('/auth/me');
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    status?: string;
  }): Promise<LaravelPaginatedResponse<ApiProduct>> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return apiRequest<LaravelPaginatedResponse<ApiProduct>>(
      `/products${query ? `?${query}` : ''}`
    );
  },

  getById: async (id: number): Promise<LaravelResponse<ApiProduct>> => {
    return apiRequest<LaravelResponse<ApiProduct>>(`/products/${id}`);
  },

  create: async (productData: Partial<ApiProduct>): Promise<LaravelResponse<ApiProduct>> => {
    return apiRequest<LaravelResponse<ApiProduct>>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (id: number, productData: Partial<ApiProduct>): Promise<LaravelResponse<ApiProduct>> => {
    return apiRequest<LaravelResponse<ApiProduct>>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (id: number): Promise<LaravelResponse> => {
    return apiRequest<LaravelResponse>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<LaravelPaginatedResponse<ApiOrder>> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return apiRequest<LaravelPaginatedResponse<ApiOrder>>(
      `/orders${query ? `?${query}` : ''}`
    );
  },

  getById: async (id: number): Promise<LaravelResponse<ApiOrder>> => {
    return apiRequest<LaravelResponse<ApiOrder>>(`/orders/${id}`);
  },

  create: async (orderData: {
    items: Array<{ product_id: number; quantity: number; unit_price: number }>;
    supplier_id?: number;
  }): Promise<LaravelResponse<ApiOrder>> => {
    return apiRequest<LaravelResponse<ApiOrder>>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  updateStatus: async (id: number, status: string): Promise<LaravelResponse<ApiOrder>> => {
    return apiRequest<LaravelResponse<ApiOrder>>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Suppliers API (for supplier portal)
export const suppliersApi = {
  register: async (supplierData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
  }): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/suppliers/register', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(supplierData),
    });
  },

  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/suppliers/login', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async (): Promise<LaravelResponse<ApiSupplier>> => {
    return apiRequest<LaravelResponse<ApiSupplier>>('/suppliers/profile');
  },

  updateProfile: async (supplierData: Partial<ApiSupplier>): Promise<LaravelResponse<ApiSupplier>> => {
    return apiRequest<LaravelResponse<ApiSupplier>>('/suppliers/profile', {
      method: 'PUT',
      body: JSON.stringify(supplierData),
    });
  },

  subscribe: async (plan: 'monthly' | 'semi_annual' | 'annual'): Promise<LaravelResponse> => {
    return apiRequest<LaravelResponse>('/suppliers/subscribe', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  },
};

// Analytics API
export const analyticsApi = {
  getDashboard: async (params?: {
    date_from?: string;
    date_to?: string;
  }): Promise<LaravelResponse<ApiAnalytics>> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return apiRequest<LaravelResponse<ApiAnalytics>>(
      `/analytics/dashboard${query ? `?${query}` : ''}`
    );
  },

  getSalesReport: async (period: string): Promise<LaravelResponse> => {
    return apiRequest<LaravelResponse>(`/analytics/sales?period=${period}`);
  },

  getInventoryReport: async (): Promise<LaravelResponse> => {
    return apiRequest<LaravelResponse>('/analytics/inventory');
  },
};

// Merchant Bizz API
export const merchantBizzApi = {
  getAll: async (): Promise<ApiBizz[]> => {
    return apiRequest<ApiBizz[]>('/merchant/bizz');
  },

  getById: async (id: number): Promise<ApiBizz> => {
    return apiRequest<ApiBizz>(`/merchant/bizz/${id}`);
  },

  create: async (bizzData: Omit<ApiBizz, 'id' | 'created_at' | 'updated_at'>): Promise<ApiBizz> => {
    return apiRequest<ApiBizz>('/merchant/bizz', {
      method: 'POST',
      body: JSON.stringify(bizzData),
    });
  },

  update: async (id: number, bizzData: Partial<ApiBizz>): Promise<ApiBizz> => {
    return apiRequest<ApiBizz>(`/merchant/bizz/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bizzData),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/merchant/bizz/${id}`, {
      method: 'DELETE',
    });
  },
};

// Merchant Boutiques API
export const merchantBoutiquesApi = {
  getAll: async (): Promise<ApiBoutique[]> => {
    return apiRequest<ApiBoutique[]>('/merchant/boutiques');
  },

  getById: async (id: number): Promise<ApiBoutique> => {
    return apiRequest<ApiBoutique>(`/merchant/boutiques/${id}`);
  },

  create: async (boutiqueData: Omit<ApiBoutique, 'id' | 'created_at' | 'updated_at'>): Promise<ApiBoutique> => {
    return apiRequest<ApiBoutique>('/merchant/boutiques', {
      method: 'POST',
      body: JSON.stringify(boutiqueData),
    });
  },

  update: async (id: number, boutiqueData: Partial<ApiBoutique>): Promise<ApiBoutique> => {
    return apiRequest<ApiBoutique>(`/merchant/boutiques/${id}`, {
      method: 'PUT',
      body: JSON.stringify(boutiqueData),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/merchant/boutiques/${id}`, {
      method: 'DELETE',
    });
  },
};

// Merchant Inventory API
export const merchantInventoryApi = {
  getAll: async (): Promise<ApiInventory[]> => {
    return apiRequest<ApiInventory[]>('/merchant/inventory');
  },

  getById: async (id: number): Promise<ApiInventory> => {
    return apiRequest<ApiInventory>(`/merchant/inventory/${id}`);
  },

  create: async (inventoryData: Omit<ApiInventory, 'id' | 'created_at' | 'updated_at'>): Promise<ApiInventory> => {
    return apiRequest<ApiInventory>('/merchant/inventory', {
      method: 'POST',
      body: JSON.stringify(inventoryData),
    });
  },

  update: async (id: number, inventoryData: Partial<ApiInventory>): Promise<ApiInventory> => {
    return apiRequest<ApiInventory>(`/merchant/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/merchant/inventory/${id}`, {
      method: 'DELETE',
    });
  },
};

// Merchant Orders API (extended)
export const merchantOrdersApi = {
  getAll: async (): Promise<ApiOrder[]> => {
    return apiRequest<ApiOrder[]>('/merchant/orders');
  },

  getById: async (id: number): Promise<ApiOrder> => {
    return apiRequest<ApiOrder>(`/merchant/orders/${id}`);
  },

  create: async (orderData: any): Promise<ApiOrder> => {
    return apiRequest<ApiOrder>('/merchant/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  update: async (id: number, orderData: Partial<ApiOrder>): Promise<ApiOrder> => {
    return apiRequest<ApiOrder>(`/merchant/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/merchant/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

// Merchant Stock Alerts API
export const merchantStockAlertsApi = {
  getAll: async (): Promise<ApiStockAlert[]> => {
    return apiRequest<ApiStockAlert[]>('/merchant/stock-alerts');
  },

  getById: async (id: number): Promise<ApiStockAlert> => {
    return apiRequest<ApiStockAlert>(`/merchant/stock-alerts/${id}`);
  },

  markAsResolved: async (id: number): Promise<ApiStockAlert> => {
    return apiRequest<ApiStockAlert>(`/merchant/stock-alerts/${id}/resolve`, {
      method: 'PATCH',
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/merchant/stock-alerts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Supplier Space API
export const supplierSpaceApi = {
  // Supplier Orders
  orders: {
    getAll: async (): Promise<ApiOrder[]> => {
      return apiRequest<ApiOrder[]>('/supplier/orders');
    },

    getById: async (id: number): Promise<ApiOrder> => {
      return apiRequest<ApiOrder>(`/supplier/orders/${id}`);
    },

    create: async (orderData: any): Promise<ApiOrder> => {
      return apiRequest<ApiOrder>('/supplier/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },

    update: async (id: number, orderData: Partial<ApiOrder>): Promise<ApiOrder> => {
      return apiRequest<ApiOrder>(`/supplier/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(orderData),
      });
    },

    delete: async (id: number): Promise<{ message: string }> => {
      return apiRequest<{ message: string }>(`/supplier/orders/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Supplier Inventory
  inventory: {
    getAll: async (): Promise<ApiInventory[]> => {
      return apiRequest<ApiInventory[]>('/supplier/inventory');
    },

    getById: async (id: number): Promise<ApiInventory> => {
      return apiRequest<ApiInventory>(`/supplier/inventory/${id}`);
    },

    create: async (inventoryData: Omit<ApiInventory, 'id' | 'created_at' | 'updated_at'>): Promise<ApiInventory> => {
      return apiRequest<ApiInventory>('/supplier/inventory', {
        method: 'POST',
        body: JSON.stringify(inventoryData),
      });
    },

    update: async (id: number, inventoryData: Partial<ApiInventory>): Promise<ApiInventory> => {
      return apiRequest<ApiInventory>(`/supplier/inventory/${id}`, {
        method: 'PUT',
        body: JSON.stringify(inventoryData),
      });
    },

    delete: async (id: number): Promise<{ message: string }> => {
      return apiRequest<{ message: string }>(`/supplier/inventory/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Supplier Categories
  categories: {
    getAll: async (): Promise<ApiCategory[]> => {
      return apiRequest<ApiCategory[]>('/supplier/categories');
    },

    getById: async (id: number): Promise<ApiCategory> => {
      return apiRequest<ApiCategory>(`/supplier/categories/${id}`);
    },

    create: async (categoryData: Omit<ApiCategory, 'id' | 'created_at' | 'updated_at'>): Promise<ApiCategory> => {
      return apiRequest<ApiCategory>('/supplier/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
    },

    update: async (id: number, categoryData: Partial<ApiCategory>): Promise<ApiCategory> => {
      return apiRequest<ApiCategory>(`/supplier/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
      });
    },

    delete: async (id: number): Promise<{ message: string }> => {
      return apiRequest<{ message: string }>(`/supplier/categories/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

// Categories API (shared)
export const categoriesApi = {
  getAll: async (): Promise<ApiCategory[]> => {
    return apiRequest<ApiCategory[]>('/categories');
  },

  getById: async (id: number): Promise<ApiCategory> => {
    return apiRequest<ApiCategory>(`/categories/${id}`);
  },

  create: async (categoryData: Omit<ApiCategory, 'id' | 'created_at' | 'updated_at'>): Promise<ApiCategory> => {
    return apiRequest<ApiCategory>('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  update: async (id: number, categoryData: Partial<ApiCategory>): Promise<ApiCategory> => {
    return apiRequest<ApiCategory>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility functions
export const apiUtils = {
  setAuthToken: (token: string) => {
    localStorage.setItem('auth_token', token);
  },

  removeAuthToken: () => {
    localStorage.removeItem('auth_token');
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },
};