import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Anchor, Bell, LogOut, Shield, User, Ship } from 'lucide-react';
import { AppNotification } from '../types';

interface NavbarProps {
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
}

export default function Navbar({ notifications, onMarkNotificationRead }: NavbarProps) {
  const { userProfile, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Zone 1: Brand title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Anchor className="w-5 h-5" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight text-white">Nusantara Maritime</span>
          <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
            PT. Samudera Raya Logistics
          </span>
        </div>
      </div>

      {/* Zone 2 & 3: Actions, Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 transition-colors cursor-pointer"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Notifikasi Sistem</span>
                <span className="text-[10px] text-cyan-400">{unreadCount} belum dibaca</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">Tidak ada notifikasi</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-3 hover:bg-slate-800/50 transition-colors cursor-pointer ${!n.read ? 'bg-cyan-950/20' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Badge & Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-200">{userProfile?.displayName || 'Administrator'}</div>
              <div className="text-[10px] text-cyan-400 capitalize">{userProfile?.role || 'admin'}</div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Keluar"
            className="p-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-900/50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
