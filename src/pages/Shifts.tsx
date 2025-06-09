import React, { useState } from 'react';
import { Clock, DollarSign, TrendingUp, Users, Play, Square } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Shifts = () => {
  const { state, dispatch } = useApp();
  const [showStartShift, setShowStartShift] = useState(false);
  const [startingCash, setStartingCash] = useState<number>(500000);
  const [cashierName, setCashierName] = useState('');

  const handleStartShift = () => {
    const newShift = {
      id: `SHIFT_${Date.now()}`,
      cashierName,
      startTime: new Date(),
      startingCash,
      totalSales: 0,
      totalTransactions: 0,
      status: 'active' as const,
    };
    
    dispatch({ type: 'SET_CURRENT_SHIFT', payload: newShift });
    setShowStartShift(false);
    setCashierName('');
    setStartingCash(500000);
  };

  const handleEndShift = () => {
    if (state.currentShift) {
      const updatedShift = {
        ...state.currentShift,
        endTime: new Date(),
        endingCash: 750000, // Mock ending cash
        status: 'closed' as const,
      };
      
      dispatch({ type: 'SET_CURRENT_SHIFT', payload: null });
      alert('Shift berhasil ditutup!');
    }
  };

  // Mock shift history
  const shiftHistory = [
    {
      id: 'SHIFT_001',
      cashierName: 'Maria',
      startTime: new Date(Date.now() - 86400000),
      endTime: new Date(Date.now() - 57600000),
      startingCash: 500000,
      endingCash: 750000,
      totalSales: 1200000,
      totalTransactions: 45,
      status: 'closed',
    },
    {
      id: 'SHIFT_002',
      cashierName: 'Ahmad',
      startTime: new Date(Date.now() - 172800000),
      endTime: new Date(Date.now() - 144000000),
      startingCash: 500000,
      endingCash: 820000,
      totalSales: 1450000,
      totalTransactions: 52,
      status: 'closed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Shift Kasir</h1>
        {!state.currentShift ? (
          <button
            onClick={() => setShowStartShift(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Mulai Shift</span>
          </button>
        ) : (
          <button
            onClick={handleEndShift}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Square className="w-4 h-4" />
            <span>Tutup Shift</span>
          </button>
        )}
      </div>

      {/* Current Shift Status */}
      {state.currentShift ? (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Shift Aktif</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-90">Kasir</p>
              <p className="text-lg font-semibold">{state.currentShift.cashierName}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Waktu Mulai</p>
              <p className="text-lg font-semibold">
                {state.currentShift.startTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90">Modal Awal</p>
              <p className="text-lg font-semibold">Rp {state.currentShift.startingCash.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Durasi</p>
              <p className="text-lg font-semibold">
                {Math.floor((Date.now() - state.currentShift.startTime.getTime()) / 3600000)}h {Math.floor(((Date.now() - state.currentShift.startTime.getTime()) % 3600000) / 60000)}m
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Shift Aktif</h2>
          <p className="text-gray-600">Mulai shift baru untuk memulai penjualan</p>
        </div>
      )}

      {/* Shift Stats */}
      {state.currentShift && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Penjualan', value: 'Rp 0', icon: DollarSign, color: 'text-green-600' },
            { label: 'Total Transaksi', value: '0', icon: TrendingUp, color: 'text-blue-600' },
            { label: 'Rata-rata/Transaksi', value: 'Rp 0', icon: Users, color: 'text-purple-600' },
            { label: 'Kas Saat Ini', value: 'Rp 500.000', icon: DollarSign, color: 'text-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shift History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Histori Shift</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kasir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modal Awal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modal Akhir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Penjualan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaksi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shiftHistory.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shift.cashierName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.startTime.toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.startTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {shift.endTime?.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rp {shift.startingCash.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rp {shift.endingCash?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    Rp {shift.totalSales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.totalTransactions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Selesai
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Start Shift Modal */}
      {showStartShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Mulai Shift Baru</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kasir
                </label>
                <input
                  type="text"
                  value={cashierName}
                  onChange={(e) => setCashierName(e.target.value)}
                  placeholder="Masukkan nama kasir"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modal Awal
                </label>
                <input
                  type="number"
                  value={startingCash}
                  onChange={(e) => setStartingCash(Number(e.target.value))}
                  placeholder="Jumlah modal awal"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowStartShift(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleStartShift}
                disabled={!cashierName.trim()}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mulai Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shifts;