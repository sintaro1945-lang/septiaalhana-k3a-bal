import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Anchor, Shield, Truck, Ship, Lock, Mail, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

export default function Login() {
  const { login, register, demoLogin, error } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('admin@samuderaraya.com');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('Direktur Utama');
  const [role, setRole] = useState<UserRole>('admin');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSubmitting(true);
    try {
      if (isRegister) {
        await register(email, password, name, role);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setLocalError(err.message || 'Autentikasi gagal.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background nautical grid decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>
      
      {/* Glowing anchor accent */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
            <Anchor className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Nusantara Maritime Logistics</h1>
          <p className="text-sm text-slate-400 mt-1">PT. Samudera Raya Logistics - Enterprise Fleet & Freight System</p>
        </div>

        {(error || localError) && (
          <div className="mb-6 p-3 text-xs bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>{error || localError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hak Akses (Role)</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="admin">Administrator (Akses Penuh)</option>
                  <option value="operator">Operator Pelabuhan (Logistik & Jadwal)</option>
                  <option value="customer">Pelanggan (Pelacakan Kargo)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email / Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="nama@samuderaraya.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{submitting ? 'Memproses...' : isRegister ? 'Daftar Akun Baru' : 'Masuk ke Sistem'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            {isRegister ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Registrasi akun baru'}
          </button>
        </div>

        {/* Quick Demo Login Buttons for instant evaluation */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-400 mb-3 text-center font-medium">Akses Cepat Demo Sistem:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => demoLogin('admin')}
              className="px-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex flex-col items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => demoLogin('operator')}
              className="px-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex flex-col items-center gap-1 cursor-pointer"
            >
              <Ship className="w-3.5 h-3.5 text-blue-400" />
              <span>Operator</span>
            </button>
            <button
              onClick={() => demoLogin('customer')}
              className="px-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex flex-col items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Customer</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-500">
          Terhubung ke Real Database Firebase &bull; Enkripsi TLS 1.3 &bull; PT. Samudera Raya Logistics
        </div>
      </div>
    </div>
  );
}
