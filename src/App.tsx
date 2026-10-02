import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar, { ActiveTab } from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LiveTracking from './components/LiveTracking';
import MasterData from './components/MasterData';
import Transactions from './components/Transactions';
import Reports from './components/Reports';
import AiAssistant from './components/AiAssistant';

import {
  initialVessels,
  initialRoutes,
  initialPorts,
  initialCrews,
  initialCustomers,
  initialCargoTypes,
  initialShipments,
  initialVoyages,
  initialMaintenance,
  initialNotifications
} from './data/seedData';
import { Vessel, Route, Port, Crew, Customer, CargoType, Shipment, Voyage, MaintenanceRecord, AppNotification } from './types';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

function MainApp() {
  const { currentUser, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // State
  const [vessels, setVessels] = useState<Vessel[]>(initialVessels);
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [ports, setPorts] = useState<Port[]>(initialPorts);
  const [crews, setCrews] = useState<Crew[]>(initialCrews);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [cargoTypes, setCargoTypes] = useState<CargoType[]>(initialCargoTypes);
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [voyages, setVoyages] = useState<Voyage[]>(initialVoyages);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(initialMaintenance);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  // Fetch initial data from Firestore
  useEffect(() => {
    if (!currentUser) return;

    async function loadData() {
      try {
        const vSnap = await getDocs(collection(db, 'vessels'));
        if (!vSnap.empty) {
          setVessels(vSnap.docs.map(d => d.data() as Vessel));
        } else {
          // Seed Firestore if empty
          for (const v of initialVessels) {
            await setDoc(doc(db, 'vessels', v.id), v);
          }
        }

        const rSnap = await getDocs(collection(db, 'routes'));
        if (!rSnap.empty) {
          setRoutes(rSnap.docs.map(d => d.data() as Route));
        } else {
          for (const r of initialRoutes) {
            await setDoc(doc(db, 'routes', r.id), r);
          }
        }

        const sSnap = await getDocs(collection(db, 'shipments'));
        if (!sSnap.empty) {
          setShipments(sSnap.docs.map(d => d.data() as Shipment));
        } else {
          for (const s of initialShipments) {
            await setDoc(doc(db, 'shipments', s.id), s);
          }
        }

        const voySnap = await getDocs(collection(db, 'voyages'));
        if (!voySnap.empty) {
          setVoyages(voySnap.docs.map(d => d.data() as Voyage));
        } else {
          for (const voy of initialVoyages) {
            await setDoc(doc(db, 'voyages', voy.id), voy);
          }
        }

        const mSnap = await getDocs(collection(db, 'maintenance'));
        if (!mSnap.empty) {
          setMaintenance(mSnap.docs.map(d => d.data() as MaintenanceRecord));
        } else {
          for (const m of initialMaintenance) {
            await setDoc(doc(db, 'maintenance', m.id), m);
          }
        }

        const nSnap = await getDocs(collection(db, 'notifications'));
        if (!nSnap.empty) {
          setNotifications(nSnap.docs.map(d => d.data() as AppNotification));
        } else {
          for (const n of initialNotifications) {
            await setDoc(doc(db, 'notifications', n.id), n);
          }
        }
      } catch (err) {
        console.error("Error loading Firestore data, using local seed fallback", err);
      }
    }

    loadData();
  }, [currentUser]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
        Memuat Sistem Pelayaran Nusantara...
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  // Handlers for CRUD with graceful error fallback
  const handleAddVessel = async (v: Vessel) => {
    setVessels(prev => [v, ...prev]);
    try {
      await setDoc(doc(db, 'vessels', v.id), v);
    } catch (err) {
      console.warn("Firestore sync warning (vessel create):", err);
    }
  };

  const handleUpdateVessel = async (v: Vessel) => {
    setVessels(prev => prev.map(item => item.id === v.id ? v : item));
    try {
      await setDoc(doc(db, 'vessels', v.id), v);
    } catch (err) {
      console.warn("Firestore sync warning (vessel update):", err);
    }
  };

  const handleDeleteVessel = async (id: string) => {
    setVessels(prev => prev.filter(v => v.id !== id));
    try {
      await deleteDoc(doc(db, 'vessels', id));
    } catch (err) {
      console.warn("Firestore sync warning (vessel delete):", err);
    }
  };

  const handleAddShipment = async (s: Shipment) => {
    setShipments(prev => [s, ...prev]);
    try {
      await setDoc(doc(db, 'shipments', s.id), s);
    } catch (err) {
      console.warn("Firestore sync warning (shipment create):", err);
    }
  };

  const handleDeleteShipment = async (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id));
    try {
      await deleteDoc(doc(db, 'shipments', id));
    } catch (err) {
      console.warn("Firestore sync warning (shipment delete):", err);
    }
  };

  const handleAddVoyage = async (v: Voyage) => {
    setVoyages(prev => [v, ...prev]);
    try {
      await setDoc(doc(db, 'voyages', v.id), v);
    } catch (err) {
      console.warn("Firestore sync warning (voyage create):", err);
    }
  };

  const handleDeleteVoyage = async (id: string) => {
    setVoyages(prev => prev.filter(v => v.id !== id));
    try {
      await deleteDoc(doc(db, 'voyages', id));
    } catch (err) {
      console.warn("Firestore sync warning (voyage delete):", err);
    }
  };

  const handleAddMaintenance = async (m: MaintenanceRecord) => {
    setMaintenance(prev => [m, ...prev]);
    try {
      await setDoc(doc(db, 'maintenance', m.id), m);
    } catch (err) {
      console.warn("Firestore sync warning (maintenance create):", err);
    }
  };

  const handleDeleteMaintenance = async (id: string) => {
    setMaintenance(prev => prev.filter(m => m.id !== id));
    try {
      await deleteDoc(doc(db, 'maintenance', id));
    } catch (err) {
      console.warn("Firestore sync warning (maintenance delete):", err);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      const target = notifications.find(n => n.id === id);
      if (target) {
        await setDoc(doc(db, 'notifications', id), { ...target, read: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      <Navbar
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              vessels={vessels}
              shipments={shipments}
              voyages={voyages}
              maintenance={maintenance}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'tracking' && (
            <LiveTracking
              vessels={vessels}
              shipments={shipments}
            />
          )}

          {activeTab === 'master' && (
            <MasterData
              vessels={vessels}
              onAddVessel={handleAddVessel}
              onUpdateVessel={handleUpdateVessel}
              onDeleteVessel={handleDeleteVessel}
              routes={routes}
              onAddRoute={(r) => setRoutes(prev => [r, ...prev])}
              onDeleteRoute={(id) => setRoutes(prev => prev.filter(r => r.id !== id))}
              ports={ports}
              onAddPort={(p) => setPorts(prev => [p, ...prev])}
              onDeletePort={(id) => setPorts(prev => prev.filter(p => p.id !== id))}
              crews={crews}
              onAddCrew={(c) => setCrews(prev => [c, ...prev])}
              onDeleteCrew={(id) => setCrews(prev => prev.filter(c => c.id !== id))}
              customers={customers}
              onAddCustomer={(cust) => setCustomers(prev => [cust, ...prev])}
              onDeleteCustomer={(id) => setCustomers(prev => prev.filter(cust => cust.id !== id))}
              cargoTypes={cargoTypes}
              onAddCargoType={(ct) => setCargoTypes(prev => [ct, ...prev])}
              onDeleteCargoType={(id) => setCargoTypes(prev => prev.filter(ct => ct.id !== id))}
            />
          )}

          {activeTab === 'transactions' && (
            <Transactions
              shipments={shipments}
              onAddShipment={handleAddShipment}
              onDeleteShipment={handleDeleteShipment}
              voyages={voyages}
              onAddVoyage={handleAddVoyage}
              onDeleteVoyage={handleDeleteVoyage}
              maintenance={maintenance}
              onAddMaintenance={handleAddMaintenance}
              onDeleteMaintenance={handleDeleteMaintenance}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              shipments={shipments}
              vessels={vessels}
              maintenance={maintenance}
            />
          )}

          {activeTab === 'ai' && (
            <AiAssistant
              vessels={vessels}
              shipments={shipments}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
