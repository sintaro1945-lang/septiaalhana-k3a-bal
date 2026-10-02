import React, { useState } from 'react';
import { Shipment, Voyage, MaintenanceRecord } from '../types';
import { FileText, Calendar, Wrench, Plus, Trash2, X, CheckCircle, Clock } from 'lucide-react';

interface TransactionsProps {
  shipments: Shipment[];
  onAddShipment: (s: Shipment) => void;
  onDeleteShipment: (id: string) => void;

  voyages: Voyage[];
  onAddVoyage: (v: Voyage) => void;
  onDeleteVoyage: (id: string) => void;

  maintenance: MaintenanceRecord[];
  onAddMaintenance: (m: MaintenanceRecord) => void;
  onDeleteMaintenance: (id: string) => void;
}

type TransSubTab = 'shipments' | 'voyages' | 'maintenance';

export default function Transactions({
  shipments, onAddShipment, onDeleteShipment,
  voyages, onAddVoyage, onDeleteVoyage,
  maintenance, onAddMaintenance, onDeleteMaintenance
}: TransactionsProps) {
  const [subTab, setSubTab] = useState<TransSubTab>('shipments');
  const [showShipmentModal, setShowShipmentModal] = useState(false);

  // New Shipment form state
  const [custName, setCustName] = useState('PT. Global Logistik Nusantara');
  const [routeName, setRouteName] = useState('Jawa - Sumatera (Tanjung Priok - Belawan)');
  const [vesselName, setVesselName] = useState('KM. Nusantara Samudera I');
  const [cargoType, setCargoType] = useState('Dry Container 20ft / 40ft');
  const [weightTon, setWeightTon] = useState(200);
  const [costIDR, setCostIDR] = useState(35000000);

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const newS: Shipment = {
      id: `s-${Date.now()}`,
      trackingNo: `SRL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: custName,
      routeName: routeName,
      vesselName: vesselName,
      cargoType: cargoType,
      weightTon: Number(weightTon),
      status: 'Pending',
      departureDate: '2026-10-05',
      estimatedArrival: '2026-10-09',
      costIDR: Number(costIDR),
      history: [
        { timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '), status: 'Pending', location: 'Depo Pusat', description: 'Pesanan booking kargo berhasil dibuat.' }
      ],
      createdAt: new Date().toISOString().slice(0, 10)
    };
    onAddShipment(newS);
    setShowShipmentModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Transaksi Operasional & Logistik</h1>
          <p className="text-sm text-slate-400 mt-1">Kelola pemesanan kargo pengiriman, jadwal pelayaran, serta log perawatan & BBM.</p>
        </div>
        {subTab === 'shipments' && (
          <button
            onClick={() => setShowShipmentModal(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Booking Pengiriman</span>
          </button>
        )}
      </div>

      {/* Sub-tab selection */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'shipments' as TransSubTab, label: 'Booking Pengiriman', icon: FileText },
          { id: 'voyages' as TransSubTab, label: 'Jadwal Pelayaran', icon: Calendar },
          { id: 'maintenance' as TransSubTab, label: 'Perawatan & Bunker BBM', icon: Wrench },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content: Shipments */}
      {subTab === 'shipments' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Daftar Transaksi Pengiriman Kargo ({shipments.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">No. Resi</th>
                  <th className="p-4">Pelanggan</th>
                  <th className="p-4">Rute & Kapal</th>
                  <th className="p-4">Jenis Muatan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Biaya</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {shipments.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-cyan-400">{s.trackingNo}</td>
                    <td className="p-4 font-semibold text-white">{s.customerName}</td>
                    <td className="p-4 text-slate-300">
                      <div>{s.routeName}</div>
                      <div className="text-[10px] text-cyan-300">Kapal: {s.vesselName}</div>
                    </td>
                    <td className="p-4 text-slate-300">{s.cargoType} ({s.weightTon} Ton)</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-white tabular-nums">Rp {s.costIDR.toLocaleString('id-ID')}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteShipment(s.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/40 transition-colors cursor-pointer"
                        title="Hapus Transaksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Voyages */}
      {subTab === 'voyages' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Jadwal Pelayaran Kapal ({voyages.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Kapal</th>
                  <th className="p-4">Rute Pelayaran</th>
                  <th className="p-4">ETD (Keberangkatan)</th>
                  <th className="p-4">ETA (Kedatangan)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {voyages.map(v => (
                  <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{v.vesselName}</td>
                    <td className="p-4 text-slate-300">{v.routeName}</td>
                    <td className="p-4 text-slate-300 tabular-nums">{v.etd}</td>
                    <td className="p-4 text-slate-300 tabular-nums">{v.eta}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteVoyage(v.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Maintenance */}
      {subTab === 'maintenance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Log Perawatan & Pengisian Bahan Bakar (Bunker) ({maintenance.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Kapal</th>
                  <th className="p-4">Aktivitas / Jenis</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Biaya</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {maintenance.map(m => (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{m.vesselName}</td>
                    <td className="p-4 text-slate-300">
                      <div>{m.activity}</div>
                      <div className="text-[10px] text-cyan-400">{m.type}</div>
                    </td>
                    <td className="p-4 text-slate-300 tabular-nums">{m.date}</td>
                    <td className="p-4 font-semibold text-white tabular-nums">Rp {m.costIDR.toLocaleString('id-ID')}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteMaintenance(m.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Shipment Modal */}
      {showShipmentModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Buat Booking Pengiriman Baru</h3>
              <button onClick={() => setShowShipmentModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateShipment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Pelanggan</label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Rute Pelayaran</label>
                <input
                  type="text"
                  required
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Kapal</label>
                <input
                  type="text"
                  required
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Berat (Ton)</label>
                  <input
                    type="number"
                    required
                    value={weightTon}
                    onChange={(e) => setWeightTon(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Biaya (IDR)</label>
                  <input
                    type="number"
                    required
                    value={costIDR}
                    onChange={(e) => setCostIDR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowShipmentModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Simpan Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
