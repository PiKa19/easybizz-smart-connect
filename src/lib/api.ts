// API Configuration and Service Functions
const API_BASE_URL = '/api';

// Types for API responses
export interface Bizz {
  id: number;
  boutique_id: number;
  product_name: string;
  category_id: number;
  rating?: number;
  reviews?: number;
  price: number;
}

export interface Boutique {
  id: number;
  name: string;
  address: string;
  status: boolean;
}

export interface MerchantInventory {
  id: number;
  product_id: number;
  product_name: string;
  barcode?: string;
  category_id: number;
  purchased_quantity: number;
  sold_quantity: number;
  returned_quantity: number;
  damaged_quantity: number;
  current_quantity: number;
  unit_price_ht: number;
  total_cost: number;
  supplier_id: number;
  supplier_name: string;
}

export interface MerchantOrder {
  id: number;
  supplier_id: number;
  supplier_name: string;
  order_date: string;
  amount: number;
  status: 'pending' | 'delivered' | 'canceled';
}

export interface SupplierClient {
  id: number;
  name: string;
  email: string;
  total_orders?: number;
  last_order_date?: string;
}

export interface SupplierInventory {
  id: number;
  product_id: number;
  product_name: string;
  category_id: number;
  purchased_quantity: number;
  sold_quantity: number;
  returned_quantity: number;
  damaged_quantity: number;
  current_quantity: number;
  unit_price: number;
  total_cost: number;
  status: boolean;
}

export interface SupplierOrder {
  id: number;
  client_id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  order_date: string;
  status: 'delivered' | 'on_hold' | 'canceled';
  total_amount: number;
}

export interface SupplierProduct {
  id: number;
  store_id: number;
  name: string;
  description?: string;
  category_id: number;
  barcode?: string;
  stock_quantity: number;
  unit_price: number;
  min_order_volume?: number;
  dimensions?: string;
  storage_requirements?: string;
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
  address?: string;
}

// API Service Class
class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Generic HTTP methods
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('🌐 Making API request to:', url);
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      mode: 'cors',
      credentials: 'omit',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      console.log('📤 Request config:', { url, method: options.method || 'GET', headers: config.headers });
      
      const response = await fetch(url, config);
      
      console.log('📥 Response received:', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('💥 API request failed:', {
        url,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  // CSRF Token
  async getCsrfToken(): Promise<void> {
    await this.request('/sanctum/csrf-cookie', { method: 'GET' });
  }

  // Merchant - Bizz endpoints
  async getBizz(): Promise<Bizz[]> {
    return this.request<Bizz[]>('/merchant/bizz');
  }

  async createBizz(data: Omit<Bizz, 'id'>): Promise<Bizz> {
    return this.request<Bizz>('/merchant/bizz', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBizzById(id: number): Promise<Bizz> {
    return this.request<Bizz>(`/merchant/bizz/${id}`);
  }

  async updateBizz(id: number, data: Partial<Bizz>): Promise<Bizz> {
    return this.request<Bizz>(`/merchant/bizz/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBizz(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/merchant/bizz/${id}`, {
      method: 'DELETE',
    });
  }

  // Merchant - Boutiques endpoints
  async getBoutiques(): Promise<Boutique[]> {
    return this.request<Boutique[]>('/merchant/boutiques');
  }

  async createBoutique(data: Omit<Boutique, 'id'>): Promise<Boutique> {
    return this.request<Boutique>('/merchant/boutiques', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBoutiqueById(id: number): Promise<Boutique> {
    return this.request<Boutique>(`/merchant/boutiques/${id}`);
  }

  async updateBoutique(id: number, data: Partial<Boutique>): Promise<Boutique> {
    return this.request<Boutique>(`/merchant/boutiques/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBoutique(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/merchant/boutiques/${id}`, {
      method: 'DELETE',
    });
  }

  // Merchant - Inventory endpoints
  async getMerchantInventory(): Promise<MerchantInventory[]> {
    return this.request<MerchantInventory[]>('/merchant/inventory');
  }

  async createMerchantInventory(data: Omit<MerchantInventory, 'id'>): Promise<MerchantInventory> {
    return this.request<MerchantInventory>('/merchant/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMerchantInventoryById(id: number): Promise<MerchantInventory> {
    return this.request<MerchantInventory>(`/merchant/inventory/${id}`);
  }

  async updateMerchantInventory(id: number, data: Partial<MerchantInventory>): Promise<MerchantInventory> {
    return this.request<MerchantInventory>(`/merchant/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMerchantInventory(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/merchant/inventory/${id}`, {
      method: 'DELETE',
    });
  }

  // Merchant - Orders endpoints
  async getMerchantOrders(): Promise<MerchantOrder[]> {
    return this.request<MerchantOrder[]>('/merchant/orders');
  }

  async createMerchantOrder(data: Omit<MerchantOrder, 'id'>): Promise<MerchantOrder> {
    return this.request<MerchantOrder>('/merchant/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMerchantOrderById(id: number): Promise<MerchantOrder> {
    return this.request<MerchantOrder>(`/merchant/orders/${id}`);
  }

  async updateMerchantOrder(id: number, data: Partial<MerchantOrder>): Promise<MerchantOrder> {
    return this.request<MerchantOrder>(`/merchant/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMerchantOrder(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/merchant/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Supplier - Clients endpoints
  async getSupplierClients(): Promise<SupplierClient[]> {
    return this.request<SupplierClient[]>('/supplier/clients');
  }

  async createSupplierClient(data: Omit<SupplierClient, 'id'>): Promise<SupplierClient> {
    return this.request<SupplierClient>('/supplier/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSupplierClientById(id: number): Promise<SupplierClient> {
    return this.request<SupplierClient>(`/supplier/clients/${id}`);
  }

  async updateSupplierClient(id: number, data: Partial<SupplierClient>): Promise<SupplierClient> {
    return this.request<SupplierClient>(`/supplier/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSupplierClient(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/supplier/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // Supplier - Inventory endpoints
  async getSupplierInventory(): Promise<SupplierInventory[]> {
    return this.request<SupplierInventory[]>('/supplier/inventory');
  }

  async createSupplierInventory(data: Omit<SupplierInventory, 'id'>): Promise<SupplierInventory> {
    return this.request<SupplierInventory>('/supplier/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSupplierInventoryById(id: number): Promise<SupplierInventory> {
    return this.request<SupplierInventory>(`/supplier/inventory/${id}`);
  }

  async updateSupplierInventory(id: number, data: Partial<SupplierInventory>): Promise<SupplierInventory> {
    return this.request<SupplierInventory>(`/supplier/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSupplierInventory(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/supplier/inventory/${id}`, {
      method: 'DELETE',
    });
  }

  // Supplier - Orders endpoints
  async getSupplierOrders(): Promise<SupplierOrder[]> {
    return this.request<SupplierOrder[]>('/supplier/orders');
  }

  async createSupplierOrder(data: Omit<SupplierOrder, 'id'>): Promise<SupplierOrder> {
    return this.request<SupplierOrder>('/supplier/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSupplierOrderById(id: number): Promise<SupplierOrder> {
    return this.request<SupplierOrder>(`/supplier/orders/${id}`);
  }

  async updateSupplierOrder(id: number, data: Partial<SupplierOrder>): Promise<SupplierOrder> {
    return this.request<SupplierOrder>(`/supplier/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSupplierOrder(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/supplier/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Supplier - Products endpoints
  async getSupplierProducts(): Promise<SupplierProduct[]> {
    return this.request<SupplierProduct[]>('/supplier/products');
  }

  async createSupplierProduct(data: Omit<SupplierProduct, 'id'>): Promise<SupplierProduct> {
    return this.request<SupplierProduct>('/supplier/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSupplierProductById(id: number): Promise<SupplierProduct> {
    return this.request<SupplierProduct>(`/supplier/products/${id}`);
  }

  async updateSupplierProduct(id: number, data: Partial<SupplierProduct>): Promise<SupplierProduct> {
    return this.request<SupplierProduct>(`/supplier/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSupplierProduct(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/supplier/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Suppliers endpoints
  async getSuppliers(): Promise<Supplier[]> {
    return this.request<Supplier[]>('/suppliers');
  }

  async createSupplier(data: Omit<Supplier, 'id'>): Promise<Supplier> {
    return this.request<Supplier>('/suppliers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSupplierById(id: number): Promise<Supplier> {
    return this.request<Supplier>(`/suppliers/${id}`);
  }

  async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier> {
    return this.request<Supplier>(`/suppliers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSupplier(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/suppliers/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
