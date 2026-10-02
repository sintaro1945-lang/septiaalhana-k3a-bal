import React from 'react';
import { LayoutDashboard, Compass, Database, FileText, Calendar, Wrench, BarChart3, Bot, Ship } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'tracking' | 'master' | 'transactions' | 'voyages' | 'maintenance' | 'reports' | 'ai';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard Analitik', icon: LayoutDashboard },
    { id: 'tracking' as ActiveTab, label: 'Radar & Pelacakan Live', icon: Compass },
    { id: 'master' as ActiveTab, label: 'Master Data', icon: Database },
    { id: 'transactions' as ActiveTab, label: 'Transaksi Pengiriman', icon: FileText },
    { id: 'voyages' as ActiveTab, label: 'Jadwal Pelayaran', icon: Calendar },
    { id: 'maintenance' as ActiveTab, label: 'Perawatan & BBM', icon: Wrench },
    { id: 'reports' as ActiveTab, label: 'Laporan & Keuangan', icon: BarChart3 },
    { id: 'ai' as ActiveTab, label: 'Asisten AI Logistik', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
          Menu Utama Operasional
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Ship className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">Armada Siaga</span>
          </div>
          <p className="text-[11px] text-slate-400">
            5 Kapal aktif dalam pemantauan real-time satelit AIS Nusantara.
          </p>
        </div>
      </div>
    </aside>
  );
}
