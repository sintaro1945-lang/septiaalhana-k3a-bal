import React, { useState } from 'react';
import { Vessel, Shipment } from '../types';
import { Compass, Ship, MapPin, Navigation, Clock, Search, AlertCircle, ShieldAlert } from 'lucide-react';

interface LiveTrackingProps {
  vessels: Vessel[];
  shipments: Shipment[];
}

export default function LiveTracking({ vessels, shipments }: LiveTrackingProps) {
  const [selectedVessel, setSelectedVessel] = useState<Vessel>(vessels[0]);
  const [searchTracking, setSearchTracking] = useState('');
  const [trackedShipment, setTrackedShipment] = useState<Shipment | null>(shipments[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = shipments.find(s => s.trackingNo.toLowerCase().includes(searchTracking.toLowerCase()) || s.customerName.toLowerCase().includes(searchTracking.toLowerCase()));
    if (found) setTrackedShipment(found);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Radar & Pelacakan Kapal Real-Time</h1>
          <p className="text-sm text-slate-400 mt-1">Sistem pemantauan posisi satelit AIS Nusantara & histori pelacakan kargo terpadu.</p>
        </div>

        {/* Tracking Search Form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Cari No. Resi / Pelanggan..."
              value={searchTracking}
              onChange={(e) => setSearchTracking(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 w-64"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer">
            Lacak
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Map Simulation Visualizer */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl flex flex-col min-h-[460px]">
          <div className="flex items-center justify-between mb-4 z-10">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              <h2 className="text-sm font-semibold text-white">Visualisasi Radar AIS Perairan Nusantara</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Sinyal Satelit Aktif</span>
            </div>
          </div>

          {/* Interactive Map Area (Simulated radar grid with clickable vessels) */}
          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800/80 relative overflow-hidden flex items-center justify-center p-4">
            {/* Radar concentric circles & grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
            <div className="absolute w-80 h-80 rounded-full border border-cyan-500/20"></div>
            <div className="absolute w-52 h-52 rounded-full border border-cyan-500/20"></div>
            <div className="absolute w-24 h-24 rounded-full border border-cyan-500/30"></div>
            <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10"></div>
            <div className="absolute inset-y-0 w-[1px] bg-cyan-500/10"></div>

            {/* Indonesia map water representation & markers */}
            <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-xs max-w-xs">
              <div className="font-semibold text-cyan-400 mb-1">Status Kapal Dipilih:</div>
              <div className="text-white font-medium">{selectedVessel.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Koordinat: {selectedVessel.latitude.toFixed(4)}° S, {selectedVessel.longitude.toFixed(4)}° E</div>
              <div className="text-[10px] text-slate-400">Kecepatan: {selectedVessel.speedKnots} Knot &bull; BBM: {selectedVessel.fuelLevelPercent}%</div>
            </div>

            {/* Clickable Vessel Pins on Radar */}
            <div className="absolute inset-0 flex items-center justify-center">
              {vessels.map((v, i) => {
                const offsets = [
                  { x: -80, y: -40 },
                  { x: 90, y: 50 },
                  { x: -30, y: 70 },
                  { x: 100, y: -60 },
                  { x: -120, y: 20 }
                ];
                const off = offsets[i % offsets.length];
                const isSelected = selectedVessel.id === v.id;

                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVessel(v)}
                    style={{ transform: `translate(${off.x}px, ${off.y}px)` }}
                    className={`absolute p-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
                      isSelected
                        ? 'bg-cyan-600 text-white scale-110 ring-4 ring-cyan-500/30 z-20'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <Ship className="w-4 h-4 text-cyan-300" />
                    <span className="text-[10px] font-semibold whitespace-nowrap">{v.name.replace('KM. ', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tracking History Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Histori Pelacakan Kargo</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              {trackedShipment?.trackingNo}
            </span>
          </div>

          {trackedShipment ? (
            <div className="space-y-4 flex-1">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-1">
                <div className="text-slate-400">Pelanggan: <span className="text-white font-medium">{trackedShipment.customerName}</span></div>
                <div className="text-slate-400">Rute: <span className="text-white font-medium">{trackedShipment.routeName}</span></div>
                <div className="text-slate-400">Kapal: <span className="text-cyan-400 font-medium">{trackedShipment.vesselName}</span></div>
                <div className="text-slate-400">Status: <span className="text-emerald-400 font-semibold">{trackedShipment.status}</span></div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">Timeline Perjalanan</span>
                <div className="space-y-4 relative pl-4 border-l-2 border-cyan-500/30">
                  {trackedShipment.history.map((h, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-900"></div>
                      <div className="text-[10px] text-cyan-400 font-medium">{h.timestamp} &bull; {h.location}</div>
                      <div className="text-xs font-semibold text-white mt-0.5">{h.status}</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{h.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">Pilih atau cari nomor resi pengiriman untuk melihat histori pelacakan.</div>
          )}
        </div>
      </div>
    </div>
  );
}
