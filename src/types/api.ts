// Laravel API Response Types
export interface LaravelResponse<T = any> {
  data: T;
  message?: string;
  status?: string;
}

export interface LaravelPaginatedResponse<T = any> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface LaravelErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// Product related types for Laravel API
export interface ApiProduct {
  id: number;
  name: string;
  reference: string;
  barcode?: string;
  description?: string;
  category_id?: number;
  supplier_id?: number;
  buy_price_ht: number;
  buy_price_ttc: number;
  sell_price_ht: number;
  sell_price_ttc: number;
  tva_rate: number;
  stock_quantity: number;
  alert_quantity: number;
  fabrication_date?: string;
  perimation_date?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  rotation_status: 'Rapid' | 'Normal' | 'Slow';
  created_at: string;
  updated_at: string;
}

// Order related types
export interface ApiOrder {
  id: number;
  supplier: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  items?: ApiOrderItem[];
  created_at: string;
  updated_at: string;
}

export interface ApiOrderItem {
  id: number;
  product_id: number;
  product: ApiProduct;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// User/Authentication types
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'supplier';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
  expires_at: string;
}

// Supplier related types
export interface ApiSupplier {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  subscription_plan: 'monthly' | 'semi_annual' | 'annual';
  subscription_expires_at: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

// Analytics types
export interface ApiAnalytics {
  sales: {
    total_revenue: number;
    orders_count: number;
    average_order_value: number;
  };
  inventory: {
    total_products: number;
    low_stock_alerts: number;
    out_of_stock_count: number;
  };
  customers: {
    total_customers: number;
    new_customers: number;
    returning_customers: number;
  };
}