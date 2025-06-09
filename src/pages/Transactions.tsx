import React, { useState } from 'react';
import { Plus, Minus, Trash2, Calculator, CreditCard, Banknote } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Transactions = () => {
  const { state, dispatch } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'digital'>('cash');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [showPayment, setShowPayment] = useState(false);

  // Mock products for demo
  const mockProducts = [
    { id: '1', name: 'Kopi Americano', price: 15000, stock: 50, category: 'Beverages', cost: 8000, createdAt: new Date() },
    { id: '2', name: 'Nasi Goreng', price: 25000, stock: 30, category: 'Food', cost: 15000, createdAt: new Date() },
    { id: '3', name: 'Es Teh Manis', price: 5000, stock: 100, category: 'Beverages', cost: 2000, createdAt: new Date() },
    { id: '4', name: 'Ayam Bakar', price: 35000, stock: 20, category: 'Food', cost: 20000, createdAt: new Date() },
    { id: '5', name: 'Jus Jeruk', price: 12000, stock: 40, category: 'Beverages', cost: 7000, createdAt: new Date() },
    { id: '6', name: 'Mie Ayam', price: 18000, stock: 25, category: 'Food', cost: 10000, createdAt: new Date() },
  ];

  const total = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = total * 0.1;
  const grandTotal = total + tax;
  const change = paidAmount - grandTotal;

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleCheckout = () => {
    if (change >= 0) {
      // Process transaction
      dispatch({ type: 'CLEAR_CART' });
      setShowPayment(false);
      setPaidAmount(0);
      alert('Transaksi berhasil!');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Product List */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Produk</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleAddToCart(product)}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">{product.category === 'Beverages' ? '☕' : '🍽️'}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Stok: {product.stock}</p>
                <p className="font-semibold text-blue-600">Rp {product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Keranjang</h2>
        </div>
        
        <div className="p-6">
          {state.cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Keranjang kosong</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">Rp {item.product.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pajak (10%):</span>
                  <span>Rp {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span>Rp {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Checkout</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Pembayaran</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Pembayaran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'cash', label: 'Tunai', icon: Banknote },
                    { value: 'card', label: 'Kartu', icon: CreditCard },
                    { value: 'digital', label: 'Digital', icon: Calculator },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setPaymentMethod(method.value as any)}
                      className={`p-3 border rounded-lg flex flex-col items-center space-y-1 ${
                        paymentMethod === method.value
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <method.icon className="w-5 h-5" />
                      <span className="text-xs">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total: Rp {grandTotal.toLocaleString()}
                </label>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  placeholder="Jumlah dibayar"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {paidAmount > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Kembalian:</span>
                    <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      Rp {Math.abs(change).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleCheckout}
                disabled={change < 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;