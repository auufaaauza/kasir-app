export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  barcode?: string;
  image?: string;
  description?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  paid: number;
  change: number;
  paymentMethod: 'cash' | 'card' | 'digital';
  cashierName: string;
  customerName?: string;
  discount: number;
  tax: number;
  shiftId: string;
  timestamp: Date;
  status: 'completed' | 'cancelled' | 'refunded';
}

export interface Shift {
  id: string;
  cashierName: string;
  startTime: Date;
  endTime?: Date;
  startingCash: number;
  endingCash?: number;
  totalSales: number;
  totalTransactions: number;
  status: 'active' | 'closed';
}

export interface StockAdjustment {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  userId: string;
  timestamp: Date;
}