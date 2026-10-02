import React from 'react';
import { Vessel, Shipment, Voyage, MaintenanceRecord } from '../types';
import { Ship, Anchor, FileText, DollarSign, TrendingUp, Compass, AlertTriangle, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  vessels: Vessel[];
  shipments: Shipment[];
  voyages: Voyage[];
  maintenance: MaintenanceRecord[];
  onNavigateTab: (tab: any) => void;
}

export default function Dashboard({ vessels, shipments, voyages, maintenance, onNavigateTab }: DashboardProps) {
  const totalRevenue = shipments.reduce((acc, s) => acc + s.costIDR, 0);
  const activeShipments = shipments.filter(s => s.status === 'Dalam Pelayaran' || s.status === 'Diproses').length;
  const activeVessels = vessels.filter(v => v.status === 'Aktif' || v.status === 'Dalam Pelayaran').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sistem Terhubung Real-Time Database (Firebase)</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Operasional Angkutan Laut</h1>
            <p className="text-sm text-slate-400 mt-1">
              Pemantauan armada kapal, penjadwalan pelayaran, dan manajemen kargo Nusantara secara terpusat.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('tracking')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Buka Radar Live</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Armada Aktif</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">{activeVessels} <span className="text-xs font-normal text-slate-500">/ {vessels.length} Kapal</span></div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% siap operasional</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Pengiriman Aktif</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">{activeShipments} <span className="text-xs font-normal text-slate-500">Kargo</span></div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-cyan-400">
            <span>{shipments.length} Total riwayat pesanan</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Jadwal Voyage</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Anchor className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">{voyages.length} <span className="text-xs font-normal text-slate-500">Pelayaran</span></div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-400">
            <span>Rute Antar Pulau Utama</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Estimasi Pendapatan</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white tabular-nums">
            Rp {(totalRevenue / 1000000).toLocaleString('id-ID')} Juta
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% dari bulan lalu</span>
          </div>
        </div>
      </div>

      {/* Quick Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Vessels Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Status Armada Kapal</h2>
            <button
              onClick={() => onNavigateTab('master')}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Kelola Master Kapal →
            </button>
          </div>
          <div className="space-y-3">
            {vessels.slice(0, 4).map(v => (
              <div key={v.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{v.name}</div>
                  <div className="text-[10px] text-slate-400">Kapten: {v.captain} &bull; Kapasitas: {v.capacityTEU} TEU</div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                    v.status === 'Aktif' || v.status === 'Dalam Pelayaran'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {v.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">BBM: {v.fuelLevelPercent}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Shipments */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Pengiriman Kargo Terbaru</h2>
            <button
              onClick={() => onNavigateTab('transactions')}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Lihat Semua Transaksi →
            </button>
          </div>
          <div className="space-y-3">
            {shipments.slice(0, 4).map(s => (
              <div key={s.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{s.trackingNo} &bull; <span className="text-cyan-400">{s.customerName}</span></div>
                  <div className="text-[10px] text-slate-400">Rute: {s.routeName}</div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {s.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">Rp {(s.costIDR / 1000000).toLocaleString('id-ID')} Juta</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
