import React, { useState, useEffect } from 'react';
import { Printer, Bluetooth, CheckCircle, XCircle, Settings } from 'lucide-react';
import { printer } from '../utils/printer';
import { useApp } from '../contexts/AppContext';

const PrinterPage = () => {
  const { state } = useApp();
  const [isConnected, setIsConnected] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  useEffect(() => {
    scanForDevices();
  }, []);

  const scanForDevices = async () => {
    setIsScanning(true);
    try {
      const devices = await printer.getAvailableDevices();
      setAvailableDevices(devices);
    } catch (error) {
      console.error('Error scanning devices:', error);
    }
    setIsScanning(false);
  };

  const handleConnect = async () => {
    if (!selectedDevice) return;
    
    setConnectionStatus('connecting');
    try {
      const success = await printer.connect(selectedDevice);
      if (success) {
        setIsConnected(true);
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    }
  };

  const handleDisconnect = async () => {
    try {
      await printer.disconnect();
      setIsConnected(false);
      setConnectionStatus('idle');
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const handleTestPrint = async () => {
    const testTransaction = {
      id: 'TEST001',
      items: [
        {
          product: { name: 'Test Item', price: 10000 },
          quantity: 1,
          subtotal: 10000
        }
      ],
      total: 10000,
      paid: 15000,
      change: 5000,
      cashierName: 'Test Cashier',
      timestamp: new Date()
    };

    try {
      await printer.printReceipt(testTransaction);
      alert('Test print berhasil!');
    } catch (error) {
      alert('Test print gagal!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Printer</h1>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium">
            {isConnected ? 'Terhubung' : 'Terputus'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Bluetooth className="w-5 h-5" />
              <span>Koneksi Bluetooth</span>
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Perangkat Printer
              </label>
              <div className="flex space-x-2">
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isConnected}
                >
                  <option value="">Pilih perangkat...</option>
                  {availableDevices.map((device) => (
                    <option key={device.address} value={device.name}>
                      {device.name} ({device.address})
                    </option>
                  ))}
                </select>
                <button
                  onClick={scanForDevices}
                  disabled={isScanning || isConnected}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  {isScanning ? 'Mencari...' : 'Scan'}
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={!selectedDevice || connectionStatus === 'connecting'}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {connectionStatus === 'connecting' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Menghubungkan...</span>
                    </>
                  ) : (
                    <>
                      <Bluetooth className="w-4 h-4" />
                      <span>Hubungkan</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleDisconnect}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Putuskan</span>
                </button>
              )}
            </div>

            {connectionStatus === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  Gagal terhubung ke printer. Pastikan printer dalam mode pairing dan coba lagi.
                </p>
              </div>
            )}

            {isConnected && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-green-700 text-sm">
                    Terhubung ke printer: {selectedDevice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Printer Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Aksi Printer</span>
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
            <button
              onClick={handleTestPrint}
              disabled={!isConnected}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Test Print</span>
            </button>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Pengaturan Print</h3>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Auto print setelah transaksi</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Print barcode produk</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Print logo toko</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Print detail pajak</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900 mb-3">Format Kertas</h3>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="80mm">80mm (Thermal)</option>
                <option value="58mm">58mm (Mini)</option>
                <option value="a4">A4 (Letter)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Available Devices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Perangkat Terdeteksi</h2>
        </div>
        
        <div className="p-6">
          {availableDevices.length === 0 ? (
            <div className="text-center py-8">
              <Bluetooth className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tidak ada perangkat printer terdeteksi</p>
              <p className="text-sm text-gray-500 mt-1">
                Pastikan printer Bluetooth dalam mode pairing dan klik Scan
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDevices.map((device) => (
                <div 
                  key={device.address} 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedDevice === device.name 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDevice(device.name)}
                >
                  <div className="flex items-center space-x-3">
                    <Printer className="w-8 h-8 text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{device.name}</h3>
                      <p className="text-sm text-gray-500">{device.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrinterPage;