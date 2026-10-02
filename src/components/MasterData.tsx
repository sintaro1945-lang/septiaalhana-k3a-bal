import React, { useState } from 'react';
import { Vessel, Route, Port, Crew, Customer, CargoType } from '../types';
import { Ship, MapPin, Anchor, Users, Building, Package, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

interface MasterDataProps {
  vessels: Vessel[];
  onAddVessel: (v: Vessel) => void;
  onUpdateVessel: (v: Vessel) => void;
  onDeleteVessel: (id: string) => void;

  routes: Route[];
  onAddRoute: (r: Route) => void;
  onDeleteRoute: (id: string) => void;

  ports: Port[];
  onAddPort: (p: Port) => void;
  onDeletePort: (id: string) => void;

  crews: Crew[];
  onAddCrew: (c: Crew) => void;
  onDeleteCrew: (id: string) => void;

  customers: Customer[];
  onAddCustomer: (c: Customer) => void;
  onDeleteCustomer: (id: string) => void;

  cargoTypes: CargoType[];
  onAddCargoType: (ct: CargoType) => void;
  onDeleteCargoType: (id: string) => void;
}

type MasterSubTab = 'vessels' | 'routes' | 'ports' | 'crews' | 'customers' | 'cargo';

export default function MasterData({
  vessels, onAddVessel, onUpdateVessel, onDeleteVessel,
  routes, onAddRoute, onDeleteRoute,
  ports, onAddPort, onDeletePort,
  crews, onAddCrew, onDeleteCrew,
  customers, onAddCustomer, onDeleteCustomer,
  cargoTypes, onAddCargoType, onDeleteCargoType
}: MasterDataProps) {
  const [subTab, setSubTab] = useState<MasterSubTab>('vessels');
  const [showModal, setShowModal] = useState(false);

  // Form state for Vessel modal
  const [vesselName, setVesselName] = useState('');
  const [vesselType, setVesselType] = useState<'Container Ship' | 'Bulk Carrier' | 'Tanker' | 'Ro-Ro' | 'General Cargo'>('Container Ship');
  const [vesselCapacity, setVesselCapacity] = useState(1000);
  const [vesselYear, setVesselYear] = useState(2019);
  const [vesselCaptain, setVesselCaptain] = useState('');
  const [vesselStatus, setVesselStatus] = useState<'Aktif' | 'Docking' | 'Dalam Pelayaran' | 'Standby'>('Aktif');

  const handleCreateVessel = (e: React.FormEvent) => {
    e.preventDefault();
    const newV: Vessel = {
      id: `v-${Date.now()}`,
      name: vesselName,
      type: vesselType,
      capacityTEU: Number(vesselCapacity),
      yearBuilt: Number(vesselYear),
      status: vesselStatus,
      captain: vesselCaptain || 'Capt. Belum Ditentukan',
      speedKnots: 15.0,
      fuelLevelPercent: 85,
      latitude: -5.0,
      longitude: 106.0,
      updatedAt: 'Baru saja'
    };
    onAddVessel(newV);
    setShowModal(false);
    setVesselName('');
    setVesselCaptain('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Master Data Operasional</h1>
          <p className="text-sm text-slate-400 mt-1">Kelola data referensi kapal, rute pelabuhan, awak kapal, dan pelanggan.</p>
        </div>
        {subTab === 'vessels' && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kapal Baru</span>
          </button>
        )}
      </div>

      {/* Sub-tab navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'vessels' as MasterSubTab, label: 'Armada Kapal', icon: Ship },
          { id: 'routes' as MasterSubTab, label: 'Rute Pelayaran', icon: MapPin },
          { id: 'ports' as MasterSubTab, label: 'Pelabuhan', icon: Anchor },
          { id: 'crews' as MasterSubTab, label: 'Awak Kapal', icon: Users },
          { id: 'customers' as MasterSubTab, label: 'Pelanggan', icon: Building },
          { id: 'cargo' as MasterSubTab, label: 'Jenis Muatan', icon: Package },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
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

      {/* Tab Content: Vessels */}
      {subTab === 'vessels' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Daftar Kapal Terdaftar ({vessels.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Nama Kapal</th>
                  <th className="p-4">Jenis</th>
                  <th className="p-4">Kapasitas (TEU)</th>
                  <th className="p-4">Kapten</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {vessels.map(v => (
                  <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{v.name}</td>
                    <td className="p-4 text-slate-300">{v.type}</td>
                    <td className="p-4 text-slate-300 tabular-nums">{v.capacityTEU} TEU</td>
                    <td className="p-4 text-slate-300">{v.captain}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                        v.status === 'Aktif' || v.status === 'Dalam Pelayaran'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteVessel(v.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/40 transition-colors cursor-pointer"
                        title="Hapus Kapal"
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

      {/* Tab Content: Routes */}
      {subTab === 'routes' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Daftar Rute Pelayaran Antar Pulau ({routes.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Nama Rute</th>
                  <th className="p-4">Pelabuhan Asal</th>
                  <th className="p-4">Pelabuhan Tujuan</th>
                  <th className="p-4">Estimasi Waktu</th>
                  <th className="p-4">Tarif Dasar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {routes.map(r => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{r.name}</td>
                    <td className="p-4 text-slate-300">{r.originPort}</td>
                    <td className="p-4 text-slate-300">{r.destinationPort}</td>
                    <td className="p-4 text-slate-300">{r.estimatedDays} Hari</td>
                    <td className="p-4 font-semibold text-cyan-400 tabular-nums">Rp {r.baseTariffIDR.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Ports */}
      {subTab === 'ports' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Daftar Pelabuhan Sandar ({ports.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Kode</th>
                  <th className="p-4">Nama Pelabuhan</th>
                  <th className="p-4">Kota</th>
                  <th className="p-4">Kapasitas Sandar (Dermaga)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {ports.map(p => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-cyan-400">{p.code}</td>
                    <td className="p-4 font-semibold text-white">{p.name}</td>
                    <td className="p-4 text-slate-300">{p.city}, {p.country}</td>
                    <td className="p-4 text-slate-300 tabular-nums">{p.berthCapacity} Kapal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Crews */}
      {subTab === 'crews' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Daftar Awak Kapal & Perwira ({crews.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Nama</th>
                  <th className="p-4">Jabatan</th>
                  <th className="p-4">No. Sertifikat</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {crews.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{c.name}</td>
                    <td className="p-4 text-slate-300">{c.position}</td>
                    <td className="p-4 font-mono text-slate-400">{c.certificateNo}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                        c.status === 'Di Kapal' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {c.status} {c.vesselAssigned ? `(${c.vesselAssigned})` : ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Customers */}
      {subTab === 'customers' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Daftar Pelanggan Korporat ({customers.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Nama Perusahaan</th>
                  <th className="p-4">Kontak Person</th>
                  <th className="p-4">Email / Telepon</th>
                  <th className="p-4">Kategori</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {customers.map(cust => (
                  <tr key={cust.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{cust.companyName}</td>
                    <td className="p-4 text-slate-300">{cust.contactPerson}</td>
                    <td className="p-4 text-slate-300">{cust.email} &bull; {cust.phone}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        {cust.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Cargo Types */}
      {subTab === 'cargo' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200">Jenis Muatan & Penanganan ({cargoTypes.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Nama Muatan</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Penanganan Khusus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {cargoTypes.map(ct => (
                  <tr key={ct.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-white">{ct.name}</td>
                    <td className="p-4 text-slate-300">{ct.category}</td>
                    <td className="p-4 text-cyan-400">{ct.specialHandling}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Vessel Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Tambah Kapal Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVessel} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Kapal</label>
                <input
                  type="text"
                  required
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  placeholder="Contoh: KM. Samudera Jaya II"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Jenis Kapal</label>
                <select
                  value={vesselType}
                  onChange={(e) => setVesselType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Container Ship">Container Ship</option>
                  <option value="Bulk Carrier">Bulk Carrier</option>
                  <option value="Tanker">Tanker</option>
                  <option value="Ro-Ro">Ro-Ro</option>
                  <option value="General Cargo">General Cargo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kapasitas (TEU)</label>
                  <input
                    type="number"
                    required
                    value={vesselCapacity}
                    onChange={(e) => setVesselCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tahun Pembuatan</label>
                  <input
                    type="number"
                    required
                    value={vesselYear}
                    onChange={(e) => setVesselYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Kapten</label>
                <input
                  type="text"
                  required
                  value={vesselCaptain}
                  onChange={(e) => setVesselCaptain(e.target.value)}
                  placeholder="Capt. Nama Kapten"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Simpan Kapal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
