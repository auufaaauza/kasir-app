import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import History from './pages/History';
import Shifts from './pages/Shifts';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import PrinterPage from './pages/Printer';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="history" element={<History />} />
              <Route path="shifts" element={<Shifts />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="reports" element={<Reports />} />
              <Route path="printer" element={<PrinterPage />} />
              <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Pengaturan</h1></div>} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;