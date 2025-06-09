import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Header = () => {
  const { state } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-20">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {state.currentShift ? `Shift Aktif - ${state.currentShift.cashierName}` : 'Belum Ada Shift Aktif'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
          
          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;