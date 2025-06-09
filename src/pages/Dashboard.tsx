import React from 'react';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const stats = [
    { title: 'Total Penjualan Hari Ini', value: 'Rp 2.450.000', icon: DollarSign, color: 'text-green-600' },
    { title: 'Transaksi Hari Ini', value: '156', icon: ShoppingBag, color: 'text-blue-600' },
    { title: 'Produk Terjual', value: '324', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Pelanggan', value: '89', icon: Users, color: 'text-orange-600' },
  ];

  const salesData = [
    { name: 'Sen', sales: 4000 },
    { name: 'Sel', sales: 3000 },
    { name: 'Rab', sales: 2000 },
    { name: 'Kam', sales: 2780 },
    { name: 'Jum', sales: 1890 },
    { name: 'Sab', sales: 2390 },
    { name: 'Min', sales: 3490 },
  ];

  const topProducts = [
    { name: 'Kopi Americano', sold: 45, revenue: 675000 },
    { name: 'Nasi Goreng', sold: 32, revenue: 800000 },
    { name: 'Es Teh Manis', sold: 67, revenue: 335000 },
    { name: 'Ayam Bakar', sold: 28, revenue: 700000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Penjualan Mingguan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Penjualan']} />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk Terlaris</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sold} terjual</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">
                  Rp {product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {[
            { time: '10:30', action: 'Transaksi baru', details: 'Penjualan Rp 85.000 - 3 item' },
            { time: '10:15', action: 'Stok update', details: 'Kopi Americano - Stok ditambah 50 unit' },
            { time: '09:45', action: 'Shift dimulai', details: 'Kasir: Maria - Modal awal Rp 500.000' },
            { time: '09:30', action: 'Produk baru', details: 'Es Krim Vanilla ditambahkan ke menu' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                {activity.time}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;