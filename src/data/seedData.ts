import { Vessel, Route, Port, Crew, Customer, CargoType, Shipment, Voyage, MaintenanceRecord, AppNotification } from '../types';

export const initialVessels: Vessel[] = [
  {
    id: 'v-1',
    name: 'KM. Nusantara Samudera I',
    type: 'Container Ship',
    capacityTEU: 1200,
    yearBuilt: 2018,
    status: 'Dalam Pelayaran',
    captain: 'Capt. Bambang Santoso',
    speedKnots: 18.5,
    fuelLevelPercent: 78,
    latitude: -5.4294,
    longitude: 106.8250,
    updatedAt: 'Baru saja'
  },
  {
    id: 'v-2',
    name: 'KM. Samudera Makmur',
    type: 'Bulk Carrier',
    capacityTEU: 850,
    yearBuilt: 2016,
    status: 'Aktif',
    captain: 'Capt. Hendra Wijaya',
    speedKnots: 15.2,
    fuelLevelPercent: 64,
    latitude: -7.2575,
    longitude: 112.7521,
    updatedAt: '10 menit lalu'
  },
  {
    id: 'v-3',
    name: 'KM. Bahtera Express',
    type: 'Ro-Ro',
    capacityTEU: 600,
    yearBuilt: 2020,
    status: 'Dalam Pelayaran',
    captain: 'Capt. Yohanes Pattinasarany',
    speedKnots: 21.0,
    fuelLevelPercent: 82,
    latitude: 1.3521,
    longitude: 103.8198,
    updatedAt: '5 menit lalu'
  },
  {
    id: 'v-4',
    name: 'KM. Khatulistiwa Oil Tanker',
    type: 'Tanker',
    capacityTEU: 1500,
    yearBuilt: 2019,
    status: 'Standby',
    captain: 'Capt. Andi Syafruddin',
    speedKnots: 0.0,
    fuelLevelPercent: 95,
    latitude: -0.7893,
    longitude: 113.9213,
    updatedAt: '30 menit lalu'
  },
  {
    id: 'v-5',
    name: 'KM. Maluku Permai',
    type: 'General Cargo',
    capacityTEU: 450,
    yearBuilt: 2015,
    status: 'Docking',
    captain: 'Capt. Rahmat Hidayat',
    speedKnots: 0.0,
    fuelLevelPercent: 30,
    latitude: -3.6547,
    longitude: 128.1908,
    updatedAt: '1 jam lalu'
  }
];

export const initialRoutes: Route[] = [
  { id: 'r-1', name: 'Jawa - Sumatera (Tanjung Priok - Belawan)', originPort: 'Tanjung Priok (Jakarta)', destinationPort: 'Belawan (Medan)', estimatedDays: 3, baseTariffIDR: 12500000 },
  { id: 'r-2', name: 'Jawa - Sulawesi (Tanjung Perak - Makassar)', originPort: 'Tanjung Perak (Surabaya)', destinationPort: 'Soekarno-Hatta (Makassar)', estimatedDays: 4, baseTariffIDR: 16000000 },
  { id: 'r-3', name: 'Jawa - Kalimantan (Tanjung Priok - Banjarmasin)', originPort: 'Tanjung Priok (Jakarta)', destinationPort: 'Trisakti (Banjarmasin)', estimatedDays: 2, baseTariffIDR: 9500000 },
  { id: 'r-4', name: 'Inter-Island Timur (Surabaya - Ambon - Sorong)', originPort: 'Tanjung Perak (Surabaya)', destinationPort: 'Yos Sudarso (Sorong)', estimatedDays: 7, baseTariffIDR: 24000000 }
];

export const initialPorts: Port[] = [
  { id: 'p-1', code: 'JKT', name: 'Pelabuhan Tanjung Priok', city: 'Jakarta', country: 'Indonesia', berthCapacity: 25 },
  { id: 'p-2', code: 'SBY', name: 'Pelabuhan Tanjung Perak', city: 'Surabaya', country: 'Indonesia', berthCapacity: 20 },
  { id: 'p-3', code: 'MDN', name: 'Pelabuhan Belawan', city: 'Medan', country: 'Indonesia', berthCapacity: 15 },
  { id: 'p-4', code: 'MKS', name: 'Pelabuhan Soekarno-Hatta', city: 'Makassar', country: 'Indonesia', berthCapacity: 12 },
  { id: 'p-5', code: 'BDJ', name: 'Pelabuhan Trisakti', city: 'Banjarmasin', country: 'Indonesia', berthCapacity: 10 }
];

export const initialCrews: Crew[] = [
  { id: 'c-1', name: 'Capt. Bambang Santoso', position: 'Kapten', certificateNo: 'ANT-I/10294/2018', status: 'Di Kapal', vesselAssigned: 'KM. Nusantara Samudera I' },
  { id: 'c-2', name: 'Drs. Supriyadi, M.Mar', position: 'KKM (Kepala Kamar Mesin)', certificateNo: 'ATT-I/09421/2017', status: 'Di Kapal', vesselAssigned: 'KM. Nusantara Samudera I' },
  { id: 'c-3', name: 'Eko Prasetyo, S.ST', position: 'Mualim I', certificateNo: 'ANT-II/11823/2019', status: 'Di Kapal', vesselAssigned: 'KM. Samudera Makmur' },
  { id: 'c-4', name: 'Siti Rahmawati', position: 'Bosun', certificateNo: 'BSN-4421/2021', status: 'Siap Tugas' },
  { id: 'c-5', name: 'Budi Santoso', position: 'Juru Mudi', certificateNo: 'JM-8812/2022', status: 'Cuti' }
];

export const initialCustomers: Customer[] = [
  { id: 'cust-1', companyName: 'PT. Global Logistik Nusantara', contactPerson: 'Bapak Irwan Santoso', email: 'irwan@globallogistik.co.id', phone: '+62 811-2345-6789', address: 'Jl. Sudirman Kav. 45, Jakarta Pusat', category: 'VIP' },
  { id: 'cust-2', companyName: 'CV. Samudera Berkah Abadi', contactPerson: 'Ibu Ratna Dewi', email: 'ratna@samuderaberkah.com', phone: '+62 812-9876-5432', address: 'Jl. Perak Timur No. 12, Surabaya', category: 'Korporat' },
  { id: 'cust-3', companyName: 'PT. Borneo Mineral Resources', contactPerson: 'Bapak Marcus Tan', email: 'marcus@borneoresources.id', phone: '+62 813-5544-3322', address: 'Jl. Lambung Mangkurat 88, Banjarmasin', category: 'VIP' }
];

export const initialCargoTypes: CargoType[] = [
  { id: 'ct-1', name: 'Dry Container 20ft / 40ft', category: 'Dry Container', specialHandling: 'Standar' },
  { id: 'ct-2', name: 'Refrigerated Container (Reefer)', category: 'Refrigerated', specialHandling: 'Suhu Terkontrol -20°C s.d +15°C' },
  { id: 'ct-3', name: 'Liquid Bulk / CPO', category: 'Liquid Bulk', specialHandling: 'Sistem Pipa Tertutup & Inert Gas' },
  { id: 'ct-4', name: 'Heavy Machinery & Vehicles', category: 'Heavy Lift', specialHandling: 'Crane Hook & Lashing Khusus' }
];

export const initialShipments: Shipment[] = [
  {
    id: 's-101',
    trackingNo: 'SRL-2026-0019',
    customerName: 'PT. Global Logistik Nusantara',
    routeName: 'Jawa - Sumatera (Tanjung Priok - Belawan)',
    vesselName: 'KM. Nusantara Samudera I',
    cargoType: 'Dry Container 20ft / 40ft',
    weightTon: 240,
    status: 'Dalam Pelayaran',
    departureDate: '2026-09-28',
    estimatedArrival: '2026-10-02',
    costIDR: 45000000,
    history: [
      { timestamp: '2026-09-28 08:00', status: 'Pending', location: 'Depo Jakarta', description: 'Booking dikonfirmasi & kontainer diterima di depo' },
      { timestamp: '2026-09-28 14:30', status: 'Diproses', location: 'Pelabuhan Tanjung Priok', description: 'Proses muat ke kapal KM. Nusantara Samudera I' },
      { timestamp: '2026-09-29 02:00', status: 'Dalam Pelayaran', location: 'Selat Sunda', description: 'Kapal berangkat menuju Pelabuhan Belawan' }
    ],
    createdAt: '2026-09-28'
  },
  {
    id: 's-102',
    trackingNo: 'SRL-2026-0020',
    customerName: 'CV. Samudera Berkah Abadi',
    routeName: 'Jawa - Sulawesi (Tanjung Perak - Makassar)',
    vesselName: 'KM. Samudera Makmur',
    cargoType: 'Refrigerated Container (Reefer)',
    weightTon: 180,
    status: 'Diproses',
    departureDate: '2026-10-02',
    estimatedArrival: '2026-10-06',
    costIDR: 32000000,
    history: [
      { timestamp: '2026-10-01 10:00', status: 'Pending', location: 'Depo Surabaya', description: 'Booking diterima' },
      { timestamp: '2026-10-01 15:00', status: 'Diproses', location: 'Pelabuhan Tanjung Perak', description: 'Pemeriksaan suhu reefer container' }
    ],
    createdAt: '2026-10-01'
  },
  {
    id: 's-103',
    trackingNo: 'SRL-2026-0021',
    customerName: 'PT. Borneo Mineral Resources',
    routeName: 'Jawa - Kalimantan (Tanjung Priok - Banjarmasin)',
    vesselName: 'KM. Bahtera Express',
    cargoType: 'Heavy Machinery & Vehicles',
    weightTon: 410,
    status: 'Selesai',
    departureDate: '2026-09-25',
    estimatedArrival: '2026-09-27',
    costIDR: 68000000,
    history: [
      { timestamp: '2026-09-25 09:00', status: 'Diproses', location: 'Tanjung Priok', description: 'Muat alat berat excavator' },
      { timestamp: '2026-09-27 16:00', status: 'Selesai', location: 'Trisakti Banjarmasin', description: 'Bongkar muat selesai & diserahterimakan ke penerima' }
    ],
    createdAt: '2026-09-24'
  }
];

export const initialVoyages: Voyage[] = [
  { id: 'v-voy-1', vesselName: 'KM. Nusantara Samudera I', routeName: 'Jawa - Sumatera (Tanjung Priok - Belawan)', etd: '2026-10-05 08:00', eta: '2026-10-08 16:00', status: 'Terjadwal', occupiedTEU: 950 },
  { id: 'v-voy-2', vesselName: 'KM. Samudera Makmur', routeName: 'Jawa - Sulawesi (Tanjung Perak - Makassar)', etd: '2026-10-06 10:00', eta: '2026-10-10 14:00', status: 'Terjadwal', occupiedTEU: 620 },
  { id: 'v-voy-3', vesselName: 'KM. Bahtera Express', routeName: 'Jawa - Kalimantan (Tanjung Priok - Banjarmasin)', etd: '2026-10-03 06:00', eta: '2026-10-05 12:00', status: 'Berangkat', occupiedTEU: 510 }
];

export const initialMaintenance: MaintenanceRecord[] = [
  { id: 'm-1', vesselName: 'KM. Nusantara Samudera I', activity: 'Pengisian Bahan Bakar (Bunker) HSD 450 Ton', type: 'Pengisian Bahan Bakar (Bunker)', costIDR: 450000000, fuelBunkerTon: 450, date: '2026-09-27', status: 'Selesai' },
  { id: 'm-2', vesselName: 'KM. Maluku Permai', activity: 'Perbaikan Utama Mesin Induk & Dry Docking', type: 'Docking Tahunan', costIDR: 1250000000, date: '2026-09-15', status: 'Dalam Proses' },
  { id: 'm-3', vesselName: 'KM. Samudera Makmur', activity: 'Inspeksi Navigasi & Radar Rutin', type: 'Inspeksi Keselamatan', costIDR: 25000000, date: '2026-09-30', status: 'Selesai' }
];

export const initialNotifications: AppNotification[] = [
  { id: 'n-1', title: 'Kapal Tiba di Tujuan', message: 'KM. Bahtera Express telah sukses bersandar di Pelabuhan Trisakti Banjarmasin.', timestamp: '10 menit lalu', type: 'success', read: false },
  { id: 'n-2', title: 'Peringatan Cuaca BMKG', message: 'Gelombang tinggi 2.5 meter terpantau di perairan Selat Makassar. Harap berhati-hati.', timestamp: '1 jam lalu', type: 'warning', read: false },
  { id: 'n-3', title: 'Booking Pengiriman Baru', message: 'Pesanan baru #SRL-2026-0020 dari CV. Samudera Berkah Abadi telah masuk.', timestamp: '3 jam lalu', type: 'info', read: true }
];
