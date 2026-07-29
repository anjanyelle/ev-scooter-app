/**
 * Lexicon EV Scooter — Static Mock Data
 * Used for UI demonstration only. Replace with API calls when backend is ready.
 */

import type {
  User,
  Vehicle,
  Ride,
  ServiceCenter,
  Notification,
  RecentDestination,
  FavouritePlace,
} from '../types';

export const MOCK_USER: User = {
  id: 'u_001',
  name: 'Rohit Sharma',
  email: 'rohit.sharma@email.com',
  phone: '+91 98765 43210',
  isVerified: true,
};

export const MOCK_VEHICLE: Vehicle = {
  id: 'v_001',
  model: 'Lexicon S1 Pro',
  color: 'Stealth Black',
  plateNumber: 'UP32 AB 1234',
  batteryPercent: 78,
  rangeKm: 94,
  isLocked: false,
  isOnline: true,
  lastSeen: '2 min ago',
  odometer: 4821,
  speedMode: 'city',
};

export const MOCK_RIDES: Ride[] = [
  {
    id: 'r_001',
    date: '28 Jul 2026',
    duration: '32 min',
    distanceKm: 12.4,
    energyUsed: 1.8,
    cost: 0,
    startLocation: 'Hazratganj',
    endLocation: 'Gomti Nagar',
    maxSpeed: 52,
    avgSpeed: 23,
    co2Saved: 2.1,
  },
  {
    id: 'r_002',
    date: '27 Jul 2026',
    duration: '48 min',
    distanceKm: 18.7,
    energyUsed: 2.6,
    cost: 0,
    startLocation: 'Lucknow Airport',
    endLocation: 'Indira Nagar',
    maxSpeed: 58,
    avgSpeed: 23,
    co2Saved: 3.2,
  },
  {
    id: 'r_003',
    date: '26 Jul 2026',
    duration: '22 min',
    distanceKm: 7.9,
    energyUsed: 1.1,
    cost: 0,
    startLocation: 'Aminabad',
    endLocation: 'Aliganj',
    maxSpeed: 45,
    avgSpeed: 21,
    co2Saved: 1.4,
  },
  {
    id: 'r_004',
    date: '25 Jul 2026',
    duration: '61 min',
    distanceKm: 24.3,
    energyUsed: 3.4,
    cost: 0,
    startLocation: 'Chinhat',
    endLocation: 'Hazratganj',
    maxSpeed: 60,
    avgSpeed: 24,
    co2Saved: 4.1,
  },
  {
    id: 'r_005',
    date: '24 Jul 2026',
    duration: '15 min',
    distanceKm: 4.6,
    energyUsed: 0.7,
    cost: 0,
    startLocation: 'Gomti Nagar',
    endLocation: 'Vibhuti Khand',
    maxSpeed: 40,
    avgSpeed: 18,
    co2Saved: 0.8,
  },
];

export const MOCK_SERVICE_CENTERS: ServiceCenter[] = [
  {
    id: 'sc_001',
    name: 'Lexicon Service Hub — Hazratganj',
    address: 'MG Road, Hazratganj, Lucknow',
    distanceKm: 1.2,
    rating: 4.8,
    isOpen: true,
    phone: '+91 98765 00001',
  },
  {
    id: 'sc_002',
    name: 'Lexicon Express — Gomti Nagar',
    address: 'Vibhuti Khand, Gomti Nagar, Lucknow',
    distanceKm: 3.4,
    rating: 4.6,
    isOpen: true,
    phone: '+91 98765 00002',
  },
  {
    id: 'sc_003',
    name: 'Lexicon Service — Indira Nagar',
    address: 'Sector 9, Indira Nagar, Lucknow',
    distanceKm: 5.1,
    rating: 4.5,
    isOpen: false,
    phone: '+91 98765 00003',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n_001',
    title: 'Charging Complete',
    message: 'Your Lexicon S1 Pro is fully charged (100%).',
    type: 'success',
    isRead: false,
    timestamp: '10 min ago',
  },
  {
    id: 'n_002',
    title: 'Service Reminder',
    message: 'Your next service is due in 3 days. Book now.',
    type: 'warning',
    isRead: false,
    timestamp: '2 hr ago',
  },
  {
    id: 'n_003',
    title: 'Ride Summary',
    message: 'You traveled 12.4 km today. Great ride!',
    type: 'info',
    isRead: true,
    timestamp: '5 hr ago',
  },
  {
    id: 'n_004',
    title: 'Security Alert',
    message: 'Vehicle moved while locked. Check location.',
    type: 'alert',
    isRead: true,
    timestamp: 'Yesterday',
  },
];

export const MOCK_RECENT_DESTINATIONS: RecentDestination[] = [
  {
    id: 'd_001',
    name: 'Rashtra Prerna Sthal, Lucknow',
    address: 'VIP Road, Gomti Nagar, Lucknow, UP',
    timestamp: '2 hr ago',
  },
  {
    id: 'd_002',
    name: 'Hazratganj',
    address: 'Hazratganj, Lucknow, UP',
    timestamp: '5 hr ago',
  },
  {
    id: 'd_003',
    name: 'Phoenix Palassio Mall',
    address: 'Amar Shaheed Path, Lucknow, UP',
    timestamp: 'Yesterday',
  },
];

export const MOCK_FAVOURITE_PLACES: FavouritePlace[] = [
  {id: 'f_001', label: 'Home', address: 'Add Address', icon: 'home'},
  {id: 'f_002', label: 'Work', address: 'Add Address', icon: 'briefcase'},
  {id: 'f_003', label: "Mom's Home", address: 'Add Address', icon: 'heart'},
  {id: 'f_004', label: 'Add New', icon: 'plus'},
];

export const RIDE_STATS = {
  totalRides: 128,
  totalDistanceKm: 1847.3,
  co2SavedKg: 13.3,
  totalEnergyKwh: 312.4,
  vehiclesConnected: 1,
};
