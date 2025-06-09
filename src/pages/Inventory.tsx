import React, { useState } from 'react';
import { Plus, Minus, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const Inventory = () => {
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [adjustmentForm, setAdjustmentForm] = useState({
    type: 'in' as 'in' | 'out' | 'adjustment',
    quantity: '',
    reason: '',
  });

  // Mock inventory data
  const inventoryData = [
    { id: '1', name: 'Kopi Americano', currentStock: 45, minStock: 20, maxStock: 100, lastAdjustment: new Date(), status: 'normal' },
    { id: '2', name: 'Nasi Goreng', currentStock: 8, minStock: 10, maxStock: 50, lastAdjustment: new Date(), status: 'low' },
    { id: '3', name: 'Es Teh Manis', currentStock: 95, minStock: 30, maxStock: 120, lastAdjustment: new Date(), status: 'normal' },
    { id: '4', name: 'Ayam Bakar', currentStock: 2, minStock: 5, maxStock: 30, lastAdjustment: new Date(), status: 'critical' },
  ];

  const recentAdjustments = [
    { id: '1', productName: 'Kopi Americano', type: 'in', quantity: 50, reason: 'Restok mingguan', timestamp: new Date(), user: 'Admin' },
    { id: '2', productName: 'Nasi Goreng', type: 'out', quantity: 5, reason: 'Rusak/Expired', timestamp: new Date(Date.now() - 3600000), user: 'Maria' },
    { id: '3', productName: 'Es Teh Manis', type: 'adjustment', quantity: -3, reason: 'Koreksi stok', timestamp: new Date(Date.now() - 7200000), user: 'Admin' },
  ];

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current <= min / 2) return { status: 'critical', color: 'text-red-600 bg-red-100', icon: AlertTriangle };
    if (current <= min) return { status: 'low', color: 'text-yellow-600 bg-yellow-100', icon: AlertTriangle };
    if (current >= max * 0.9) return { status: 'high', color: 'text-blue-600 bg-blue-100', icon: TrendingUp };
    return { status: 'normal', color: 'text-green-600 bg-green-100', icon: Package };
  };

  const handleAdjustment = (product: any) => {
    setSelectedProduct(product);
    setShowAdjustment(true);
  };

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Stock adjustment:', { product: selectedProduct, ...adjustmentForm });
    setShowAdjustment(false);
    setSelectedProduct(null);
    setAdjustmentForm({ type: 'in', quantity: '', reason: '' });
  };

  const lowStockItems = inventoryData.filter(item => item.status === 'low' || item.status === 'critical');
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.currentStock * 15000), 0); // Mock calculation

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Stok Opname</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Stok Menipis ({lowStockItems.length})</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Lakukan Opname</span>
          </button>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Item</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{inventoryData.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nilai Stok</p>
              <p className="text-2xl font-bold text-green-600 mt-2">Rp {totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stok Rendah</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{lowStockItems.length}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Penyesuaian Hari Ini</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">{recentAdjustments.length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Daftar Stok</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {inventoryData.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minStock, item.maxStock);
                const percentage = (item.currentStock / item.maxStock) * 100;
                
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${stockStatus.color}`}>
                        <stockStatus.icon className="w-3 h-3" />
                        <span className="capitalize">{stockStatus.status}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Stok Saat Ini:</span>
                        <span className="font-medium">{item.currentStock} unit</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min - Max:</span>
                        <span>{item.minStock} - {item.maxStock} unit</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            percentage <= 25 ? 'bg-red-500' :
                            percentage <= 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-500">
                          Terakhir disesuaikan: {item.lastAdjustment.toLocaleDateString('id-ID')}
                        </span>
                        <button
                          onClick={() => handleAdjustment(item)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Sesuaikan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Adjustments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Penyesuaian Terbaru</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentAdjustments.map((adjustment) => (
                <div key={adjustment.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    adjustment.type === 'in' ? 'bg-green-100 text-green-600' :
                    adjustment.type === 'out' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {adjustment.type === 'in' ? <Plus className="w-4 h-4" /> :
                     adjustment.type === 'out' ? <Minus className="w-4 h-4" /> :
                     <Package className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{adjustment.productName}</h4>
                      <span className={`text-sm font-medium ${
                        adjustment.type === 'in' ? 'text-green-600' :
                        adjustment.type === 'out' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {adjustment.type === 'in' ? '+' : adjustment.type === 'out' ? '-' : ''}{Math.abs(adjustment.quantity)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{adjustment.reason}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{adjustment.user}</span>
                      <span>{adjustment.timestamp.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {showAdjustment && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">Penyesuaian Stok</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedProduct.name}</p>
              <p className="text-sm text-gray-500">Stok saat ini: {selectedProduct.currentStock} unit</p>
            </div>
            
            <form onSubmit={handleSubmitAdjustment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Penyesuaian
                </label>
                <select
                  value={adjustmentForm.type}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, type: e.target.value as any })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="in">Masuk (+)</option>
                  <option value="out">Keluar (-)</option>
                  <option value="adjustment">Koreksi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <input
                  type="number"
                  required
                  value={adjustmentForm.quantity}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, quantity: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alasan *
                </label>
                <textarea
                  required
                  value={adjustmentForm.reason}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan alasan penyesuaian stok..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdjustment(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan Penyesuaian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;