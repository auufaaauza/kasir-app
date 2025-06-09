import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Package, ImageIcon } from 'lucide-react';

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock products
  const mockProducts = [
    { id: '1', name: 'Kopi Americano', price: 15000, cost: 8000, stock: 50, category: 'Beverages', barcode: '1234567890123', image: null },
    { id: '2', name: 'Nasi Goreng', price: 25000, cost: 15000, stock: 30, category: 'Food', barcode: '1234567890124', image: null },
    { id: '3', name: 'Es Teh Manis', price: 5000, cost: 2000, stock: 100, category: 'Beverages', barcode: '1234567890125', image: null },
    { id: '4', name: 'Ayam Bakar', price: 35000, cost: 20000, stock: 20, category: 'Food', barcode: '1234567890126', image: null },
  ];

  const categories = ['all', 'Food', 'Beverages', 'Snacks', 'Dessert'];

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    cost: '',
    stock: '',
    category: 'Food',
    barcode: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product added:', productForm);
    setShowAddProduct(false);
    setProductForm({
      name: '',
      price: '',
      cost: '',
      stock: '',
      category: 'Food',
      barcode: '',
      description: '',
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 10) return { color: 'text-red-600 bg-red-100', text: 'Stok Rendah' };
    if (stock <= 50) return { color: 'text-yellow-600 bg-yellow-100', text: 'Stok Sedang' };
    return { color: 'text-green-600 bg-green-100', text: 'Stok Aman' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Daftar Produk</h1>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'Semua Kategori' : category}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span>Total: {mockProducts.length} produk</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          const profit = product.price - product.cost;
          const profitMargin = (profit / product.price * 100).toFixed(1);

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Jual:</span>
                    <span className="font-medium text-blue-600">Rp {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Beli:</span>
                    <span className="text-gray-900">Rp {product.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Keuntungan:</span>
                    <span className="font-medium text-green-600">
                      Rp {profit.toLocaleString()} ({profitMargin}%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Stok:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{product.stock}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barcode:</span>
                    <span className="font-mono text-xs text-gray-900">{product.barcode}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">Tambah Produk Baru</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Produk *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.filter(c => c !== 'all').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Beli *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.cost}
                    onChange={(e) => setProductForm({ ...productForm, cost: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Jual *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stok Awal *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barcode
                  </label>
                  <input
                    type="text"
                    value={productForm.barcode}
                    onChange={(e) => setProductForm({ ...productForm, barcode: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;