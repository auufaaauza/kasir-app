import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  try {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
    // Save file
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

export const exportTransactionsToExcel = (transactions: any[]) => {
  const data = transactions.map(transaction => ({
    'ID Transaksi': transaction.id,
    'Tanggal': new Date(transaction.timestamp).toLocaleDateString('id-ID'),
    'Waktu': new Date(transaction.timestamp).toLocaleTimeString('id-ID'),
    'Kasir': transaction.cashierName,
    'Pelanggan': transaction.customerName || '-',
    'Jumlah Item': transaction.items?.length || 0,
    'Subtotal': transaction.total,
    'Pajak': transaction.tax || transaction.total * 0.1,
    'Total': (transaction.total || 0) + (transaction.tax || transaction.total * 0.1),
    'Metode Pembayaran': transaction.paymentMethod,
    'Status': transaction.status,
    'Shift ID': transaction.shiftId,
  }));
  
  return exportToExcel(data, `laporan-transaksi-${new Date().toISOString().split('T')[0]}`, 'Transaksi');
};

export const exportInventoryToExcel = (inventory: any[]) => {
  const data = inventory.map(item => ({
    'ID Produk': item.id,
    'Nama Produk': item.name,
    'Kategori': item.category,
    'Harga Jual': item.price,
    'Harga Beli': item.cost,
    'Stok Saat Ini': item.currentStock || item.stock,
    'Stok Minimum': item.minStock || 0,
    'Stok Maksimum': item.maxStock || 0,
    'Nilai Stok': (item.currentStock || item.stock) * (item.cost || 0),
    'Margin Keuntungan': item.price && item.cost ? `${(((item.price - item.cost) / item.price) * 100).toFixed(2)}%` : '0%',
    'Status Stok': item.status || 'normal',
  }));
  
  return exportToExcel(data, `laporan-inventory-${new Date().toISOString().split('T')[0]}`, 'Inventory');
};

export const exportSalesReportToExcel = (salesData: any) => {
  const data = [
    {
      'Periode': salesData.period,
      'Total Penjualan': salesData.totalSales,
      'Total Transaksi': salesData.totalTransactions,
      'Rata-rata per Transaksi': salesData.averageTransaction,
      'Produk Terlaris': salesData.topProduct,
      'Kasir Terbaik': salesData.topCashier,
    }
  ];
  
  return exportToExcel(data, `laporan-penjualan-${new Date().toISOString().split('T')[0]}`, 'Laporan Penjualan');
};