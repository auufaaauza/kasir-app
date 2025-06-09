import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  History,
  Clock,
  Package,
  Tags,
  BarChart3,
  Settings,
  Printer,
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/transactions', icon: ShoppingCart, label: 'Transaksi' },
    { to: '/history', icon: History, label: 'Histori' },
    { to: '/shifts', icon: Clock, label: 'Shift Kasir' },
    { to: '/inventory', icon: Package, label: 'Stok Opname' },
    { to: '/products', icon: Package, label: 'Daftar Item' },
    { to: '/categories', icon: Tags, label: 'Kategori' },
    { to: '/reports', icon: BarChart3, label: 'Laporan' },
    { to: '/printer', icon: Printer, label: 'Printer' },
    { to: '/settings', icon: Settings, label: 'Pengaturan' },
  ];

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-30">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">ModernPOS</h1>
        <p className="text-sm text-gray-600">Sistem Kasir Modern</p>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;