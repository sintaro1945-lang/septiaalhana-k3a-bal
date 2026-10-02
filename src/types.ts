export type VesselStatus = 'Aktif' | 'Docking' | 'Dalam Pelayaran' | 'Standby';

export interface Vessel {
  id: string;
  name: string;
  type: 'Container Ship' | 'Bulk Carrier' | 'Tanker' | 'Ro-Ro' | 'General Cargo';
  capacityTEU: number;
  yearBuilt: number;
  status: VesselStatus;
  captain: string;
  speedKnots: number;
  fuelLevelPercent: number;
  latitude: number;
  longitude: number;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  originPort: string;
  destinationPort: string;
  estimatedDays: number;
  baseTariffIDR: number;
}

export interface Port {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  berthCapacity: number;
}

export interface Crew {
  id: string;
  name: string;
  position: 'Kapten' | 'Mualim I' | 'KKM (Kepala Kamar Mesin)' | 'Bosun' | 'Juru Mudi' | 'Oiler';
  certificateNo: string;
  status: 'Siap Tugas' | 'Di Kapal' | 'Cuti';
  vesselAssigned?: string;
}

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: 'VIP' | 'Reguler' | 'Korporat';
}

export interface CargoType {
  id: string;
  name: string;
  category: 'Dry Container' | 'Refrigerated' | 'Liquid Bulk' | 'General Cargo' | 'Heavy Lift';
  specialHandling: string;
}

export type ShipmentStatus = 'Pending' | 'Diproses' | 'Dalam Pelayaran' | 'Tiba di Pelabuhan' | 'Selesai' | 'Dibatalkan';

export interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export interface Shipment {
  id: string;
  trackingNo: string;
  customerName: string;
  routeName: string;
  vesselName: string;
  cargoType: string;
  weightTon: number;
  status: ShipmentStatus;
  departureDate: string;
  estimatedArrival: string;
  costIDR: number;
  history: TrackingEvent[];
  createdAt: string;
}

export interface Voyage {
  id: string;
  vesselName: string;
  routeName: string;
  etd: string;
  eta: string;
  status: 'Terjadwal' | 'Berangkat' | 'Tiba' | 'Tertunda';
  occupiedTEU: number;
}

export interface MaintenanceRecord {
  id: string;
  vesselName: string;
  activity: string;
  type: 'Perawatan Mesin' | 'Docking Tahunan' | 'Pengisian Bahan Bakar (Bunker)' | 'Inspeksi Keselamatan';
  costIDR: number;
  fuelBunkerTon?: number;
  date: string;
  status: 'Selesai' | 'Dalam Proses' | 'Dijadwalkan';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

export type UserRole = 'admin' | 'operator' | 'customer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}
