import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

// Interface untuk tipe data kategori
interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  productCount: number;
}

const Categories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  // State form untuk tambah/edit kategori
  const [categoryForm, setCategoryForm] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    color: '#3B82F6',
    productCount: 0,
  });

  // State daftar kategori
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Food', description: 'Makanan dan hidangan utama', color: '#F59E0B', productCount: 15 },
    { id: '2', name: 'Beverages', description: 'Minuman panas dan dingin', color: '#3B82F6', productCount: 8 },
    { id: '3', name: 'Snacks', description: 'Camilan dan makanan ringan', color: '#10B981', productCount: 12 },
    { id: '4', name: 'Dessert', description: 'Makanan penutup dan kue', color: '#8B5CF6', productCount: 6 },
  ]);

  // Warna pilihan untuk kategori
  const colorOptions = [
    { value: '#3B82F6', label: 'Biru' },
    { value: '#10B981', label: 'Hijau' },
    { value: '#F59E0B', label: 'Kuning' },
    { value: '#EF4444', label: 'Merah' },
    { value: '#8B5CF6', label: 'Ungu' },
    { value: '#F97316', label: 'Orange' },
    { value: '#06B6D4', label: 'Cyan' },
    { value: '#84CC16', label: 'Lime' },
  ];

  // Menangani submit form (tambah atau edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryForm.name.trim()) return;

    // Jika sedang edit, cari index dan update
    if (editingId) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editingId ? { ...cat, ...categoryForm } : cat
      );
      setCategories(updatedCategories);
      alert('Kategori berhasil diupdate!');
    } else {
      // Tambah baru
      const newCategory: Category = {
        ...categoryForm,
        id: Date.now().toString(),
      };
      setCategories([...categories, newCategory]);
      alert('Kategori berhasil ditambahkan!');
    }

    // Reset form
    setEditingId(null);
    setShowAddCategory(false);
    setCategoryForm({ name: '', description: '', color: '#3B82F6', productCount: 0 });
  };

  // ID untuk menyimpan kategori yang sedang diedit
  const [editingId, setEditingId] = useState<string | null>(null);

  // Hapus kategori berdasarkan ID
  const handleDeleteCategory = (id: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
    alert('Kategori berhasil dihapus!');
  };

  // Isi form dengan data kategori untuk diedit
  const handleEditCategory = (category: Category) => {
    setCategoryForm({
      name: category.name,
      description: category.description,
      color: category.color,
      productCount: category.productCount,
    });
    setEditingId(category.id);
    setShowAddCategory(true);
    alert(`Sedang mengedit kategori: ${category.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Kategori Produk</h1>
        <button
          onClick={() => setShowAddCategory(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* Statistik Sederhana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Kategori</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{categories.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Tag className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Produk</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <Tag className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="h-20 flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <Tag className="w-8 h-8 text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {category.productCount} produk
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-500">Warna kategori</span>
              </div>
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah/Edit Kategori */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {editingId ? 'Edit' : 'Tambah'} Kategori Baru
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kategori *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warna Kategori
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setCategoryForm({ ...categoryForm, color: color.value })}
                      className={`h-12 rounded-lg border-2 transition-all ${
                        categoryForm.color === color.value 
                          ? 'border-gray-800 scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    >
                      {categoryForm.color === color.value && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setEditingId(null);
                    setCategoryForm({ name: '', description: '', color: '#3B82F6', productCount: 0 });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;