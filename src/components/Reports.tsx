import React from 'react';
import { Shipment, Vessel, MaintenanceRecord } from '../types';
import { BarChart3, Download, Printer, DollarSign, TrendingUp, ShieldCheck, FileSpreadsheet } from 'lucide-react';

interface ReportsProps {
  shipments: Shipment[];
  vessels: Vessel[];
  maintenance: MaintenanceRecord[];
}

export default function Reports({ shipments, vessels, maintenance }: ReportsProps) {
  const totalRevenue = shipments.reduce((acc, s) => acc + s.costIDR, 0);
  const totalMaintCost = maintenance.reduce((acc, m) => acc + m.costIDR, 0);
  const netProfit = totalRevenue - totalMaintCost;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Laporan Keuangan & Kinerja Operasional</h1>
          <p className="text-sm text-slate-400 mt-1">Rekapitulasi pendapatan, biaya perawatan bunker, dan efisiensi armada kapal.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-slate-400 mb-1">Total Pendapatan Kargo</div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums">
            Rp {(totalRevenue / 1000000).toLocaleString('id-ID')} Juta
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Akumulasi dari {shipments.length} pengiriman</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-slate-400 mb-1">Total Biaya Operasional & BBM</div>
          <div className="text-2xl font-bold text-amber-400 tabular-nums">
            Rp {(totalMaintCost / 1000000).toLocaleString('id-ID')} Juta
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Bunker BBM & Dry Docking</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-slate-400 mb-1">Estimasi Laba Bersih</div>
          <div className="text-2xl font-bold text-cyan-400 tabular-nums">
            Rp {(netProfit / 1000000).toLocaleString('id-ID')} Juta
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Margin operasional sehat (68%)</span>
          </div>
        </div>
      </div>

      {/* Detailed Revenue Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200">Rekapitulasi Keuangan per Transaksi Kargo</span>
          <span className="text-xs text-cyan-400">PT. Samudera Raya Logistics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-4">No. Resi</th>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Rute</th>
                <th className="p-4">Kapal Pengangkut</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 text-right">Nilai (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {shipments.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-cyan-400">{s.trackingNo}</td>
                  <td className="p-4 font-semibold text-white">{s.customerName}</td>
                  <td className="p-4 text-slate-300">{s.routeName}</td>
                  <td className="p-4 text-slate-300">{s.vesselName}</td>
                  <td className="p-4 text-slate-300 tabular-nums">{s.createdAt}</td>
                  <td className="p-4 text-right font-semibold text-emerald-400 tabular-nums">
                    Rp {s.costIDR.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
