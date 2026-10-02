import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, Send, Sparkles, Ship, ArrowRight, Loader2 } from 'lucide-react';
import { Vessel, Shipment } from '../types';

interface AiAssistantProps {
  vessels: Vessel[];
  shipments: Shipment[];
}

export default function AiAssistant({ vessels, shipments }: AiAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    {
      role: 'model',
      text: 'Halo! Saya Asisten AI Logistik Maritim Nusantara. Saya siap membantu Anda menganalisis rute pelayaran optimal, estimasi konsumsi bahan bakar bunker, efisiensi muatan kapal, atau penanganan khusus kargo.'
    }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMsg = prompt;
    setPrompt('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey: apiKey || process.env.GEMINI_API_KEY });

      const contextSummary = `Data Armada Saat Ini: ${vessels.map(v => `${v.name} (${v.status}, Kapasitas ${v.capacityTEU} TEU, BBM ${v.fuelLevelPercent}%)`).join('; ')}. Pengiriman aktif: ${shipments.length} pesanan.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Bertindaklah sebagai Konsultan Senior Logistik Angkutan Laut & Manajemen Pelayaran Nusantara. Konteks operasional saat ini: ${contextSummary}\n\nPertanyaan Pengguna: ${userMsg}`
              }
            ]
          }
        ]
      });

      const replyText = response.text || 'Maaf, saya tidak dapat memproses permintaan analitik saat ini.';
      setChatHistory(prev => [...prev, { role: 'model', text: replyText }]);
    } catch (err: any) {
      console.error(err);
      setChatHistory(prev => [
        ...prev,
        {
          role: 'model',
          text: 'Maaf, terjadi kendala koneksi dengan API Gemini AI. Pastikan GEMINI_API_KEY telah dikonfigurasi di panel Secrets.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Bot className="w-6 h-6 text-cyan-400" />
          <span>Asisten AI Logistik Maritim</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Konsultasi cerdas berbasis kecerdasan buatan untuk optimasi rute, efisiensi bahan bakar bunker, dan manajemen armada kapal.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[520px]">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                }`}
              >
                {msg.role === 'user' ? 'U' : <Sparkles className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400">
                AI sedang menganalisis rute & data armada kapal...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-2">
          <input
            type="text"
            placeholder="Tanyakan rekomendasi rute, estimasi BBM, atau efisiensi armada..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>Kirim</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
