import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign, Package, Users, Calendar, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { exportTransactionsToExcel, exportInventoryToExcel, exportSalesReportToExcel } from '../utils/excel';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [reportType, setReportType] = useState('sales');

  // Mock data
  const salesData = [
    { name: 'Sen', penjualan: 1200000, transaksi: 45 },
    { name: 'Sel', penjualan: 1450000, transaksi: 52 },
    { name: 'Rab', penjualan: 980000, transaksi: 38 },
    { name: 'Kam', penjualan: 1680000, transaksi: 61 },
    { name: 'Jum', penjualan: 2100000, transaksi: 78 },
    { name: 'Sab', penjualan: 2450000, transaksi: 89 },
    { name: 'Min', penjualan: 1890000, transaksi: 67 },
  ];

  const categoryData = [
    { name: 'Food', value: 45, color: '#F59E0B' },
    { name: 'Beverages', value: 30, color: '#3B82F6' },
    { name: 'Snacks', value: 15, color: '#10B981' },
    { name: 'Dessert', value: 10, color: '#8B5CF6' },
  ];

  const topProducts = [
    { name: 'Kopi Americano', sold: 156,  revenue: 2340000 },
    { name: 'Nasi Goreng', sold: 89, revenue: 2225000 },
    { name: 'Es Teh Manis', sold: 234, revenue: 1170000 },
    { name: 'Ayam Bakar', sold: 67, revenue: 2345000 },
    { name: 'Jus Jeruk', sold: 123, revenue: 1476000 },
  ];

  const handleExportSales = () => {
    const salesReportData = {
      period: selectedPeriod,
      totalSales: 12750000,
      totalTransactions: 430,
      averageTransaction: 29651,
      topProduct: 'Ayam Bakar',
      topCashier: 'Maria'
    };
    
    exportSalesReportToExcel(salesReportData);
  };

  const handleExportTransactions = () => {
    // Mock transaction data
    const transactions = [
      {
        id: 'TRX001',
        timestamp: new Date(),
        total: 85000,
        tax: 8500,
        cashierName: 'Maria',
        customerName: 'John Doe',
        items: [{ name: 'Kopi Americano' }, { name: 'Nasi Goreng' }],
        paymentMethod: 'cash',
        status: 'completed',
        shiftId: 'SHIFT001'
      }
    ];
    
    exportTransactionsToExcel(transactions);
  };

  const handleExportInventory = () => {
    // Mock inventory data
    const inventory = [
      {
        id: '1',
        name: 'Kopi Americano',
        category: 'Beverages',
        price: 15000,
        cost: 8000,
        stock: 45,
        minStock: 20,
        maxStock: 100,
        status: 'normal'
      }
    ];
    
    exportInventoryToExcel(inventory);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
          
          <button
            onClick={handleExportSales}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            {[
              { id: 'sales', label: 'Penjualan', icon: TrendingUp },
              { id: 'products', label: 'Produk', icon: Package },
              { id: 'cashiers', label: 'Kasir', icon: Users },
              { id: 'financial', label: 'Keuangan', icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  reportType === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
              <p className="text-2xl font-bold text-green-600 mt-2">Rp 12.750.000</p>
              <p className="text-sm text-green-600 mt-1">+15.3% dari periode sebelumnya</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">430</p>
              <p className="text-sm text-blue-600 mt-1">+8.7% dari periode sebelumnya</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata/Transaksi</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">Rp 29.651</p>
              <p className="text-sm text-purple-600 mt-1">+6.1% dari periode sebelumnya</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produk Terjual</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">1.247</p>
              <p className="text-sm text-orange-600 mt-1">+12.4% dari periode sebelumnya</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50 text-orange-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Tren Penjualan</h2>
            <button
              onClick={handleExportTransactions}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'penjualan' ? `Rp ${value.toLocaleString()}` : value,
                    name === 'penjualan' ? 'Penjualan' : 'Transaksi'
                  ]}
                />
                <Bar dataKey="penjualan" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Distribusi Kategori</h2>
            <button
              onClick={handleExportInventory}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Produk Terlaris</h2>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ranking</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Produk</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Terjual</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => {
                  const totalSold = topProducts.reduce((sum, p) => sum + p.sold, 0);
                  const percentage = ((product.sold / totalSold) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-600' :
                            'bg-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600">{product.sold} unit</td>
                      <td className="py-3 px-4 font-medium text-green-600">
                        Rp {product.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Laporan</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleExportSales}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Laporan Penjualan</h3>
                  <p className="text-sm text-gray-600">Export data penjualan ke Excel</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleExportTransactions}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Data Transaksi</h3>
                  <p className="text-sm text-gray-600">Export detail transaksi ke Excel</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleExportInventory}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Data Inventory</h3>
                  <p className="text-sm text-gray-600">Export data stok ke Excel</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;