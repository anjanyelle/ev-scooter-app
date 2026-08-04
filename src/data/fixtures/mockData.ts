import type {
  AppNotification,
  ChargingPayload,
  DashboardPayload,
  RideStatsPayload,
  ServicePayload,
  UserProfile
} from '@/types/domain';

export const mockUser: UserProfile = {
  id: 'usr_lex_001',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@lexicon.co',
  phone: '+91 98765 43210',
  avatarInitials: 'AM'
};

export const dashboardFixture: DashboardPayload = {
  user: mockUser,
  vehicle: {
    vin: 'LEX26HYD8M0042187',
    model: 'LEXICON One S',
    nickname: 'LEXICON',
    registrationNumber: 'TS 09 EV 2048',
    firmwareVersion: 'LEX OS 4.8.2',
    batteryPercentage: 82,
    range: 104,
    batteryHealth: 97,
    temperature: 31.5,
    odometerKm: 1247,
    status: 'parked',
    isLocked: true,
    isCharging: false,
    lastSyncAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    location: {
      latitude: 17.4427,
      longitude: 78.3772,
      label: 'LEXICON One S',
      address: 'Mindspace Road, HITEC City, Hyderabad'
    },
    lastParkedLocation: {
      latitude: 17.4419,
      longitude: 78.3764,
      label: 'Last parked',
      address: 'Raheja Mindspace, Madhapur, Hyderabad'
    }
  },
  health: [
    { id: 'battery', label: 'Battery health', value: '97%', status: 'good', detail: 'Cells balanced' },
    { id: 'motor', label: 'Motor', value: 'Normal', status: 'good', detail: 'No active faults' },
    { id: 'tyres', label: 'Tyre pressure', value: 'Optimal', status: 'good', detail: 'Last checked today' },
    { id: 'brakes', label: 'Brakes', value: 'Good', status: 'good', detail: 'Pad life 82%' }
  ],
  carbonSavedKg: 38.6,
  nextServiceKm: 753
};

const routes = [
  [
    { x: 4, y: 72 }, { x: 18, y: 40 }, { x: 30, y: 52 }, { x: 44, y: 28 },
    { x: 58, y: 36 }, { x: 70, y: 18 }, { x: 83, y: 42 }, { x: 96, y: 25 }
  ],
  [
    { x: 4, y: 50 }, { x: 18, y: 65 }, { x: 30, y: 34 }, { x: 42, y: 42 },
    { x: 56, y: 18 }, { x: 72, y: 48 }, { x: 84, y: 30 }, { x: 96, y: 44 }
  ],
  [
    { x: 4, y: 66 }, { x: 20, y: 32 }, { x: 34, y: 44 }, { x: 49, y: 24 },
    { x: 63, y: 54 }, { x: 76, y: 22 }, { x: 88, y: 38 }, { x: 96, y: 20 }
  ]
];

export const ridesFixture: RideStatsPayload = {
  totalDistanceKm: 1247,
  todayDistanceKm: 45.6,
  averageSpeedKmph: 32,
  energyWhPerKm: 38.2,
  rideTimeMinutes: 92,
  ecoScore: 86,
  trendPercent: {
    totalDistance: 12,
    todayDistance: -8,
    averageSpeed: 5,
    energy: -6,
    rideTime: 10
  },
  chart: [
    { label: '14 May', value: 18 },
    { label: '15 May', value: 68 },
    { label: '16 May', value: 63 },
    { label: '17 May', value: 105 },
    { label: '18 May', value: 48 },
    { label: '19 May', value: 77 },
    { label: '20 May', value: 45.6 }
  ],
  rides: [
    {
      id: 'ride_001',
      startedAt: '2026-05-20T08:15:00+05:30',
      from: 'HSR Layout',
      to: 'Koramangala',
      distanceKm: 12.4,
      durationMinutes: 28,
      averageSpeedKmph: 26,
      maxSpeedKmph: 58,
      energyWhPerKm: 35.8,
      ecoScore: 92,
      route: routes[0] ?? []
    },
    {
      id: 'ride_002',
      startedAt: '2026-05-19T17:45:00+05:30',
      from: 'Electronic City',
      to: 'HSR Layout',
      distanceKm: 18.7,
      durationMinutes: 35,
      averageSpeedKmph: 29,
      maxSpeedKmph: 62,
      energyWhPerKm: 39.4,
      ecoScore: 88,
      route: routes[1] ?? []
    },
    {
      id: 'ride_003',
      startedAt: '2026-05-19T08:30:00+05:30',
      from: 'HSR Layout',
      to: 'Bellandur',
      distanceKm: 14.5,
      durationMinutes: 31,
      averageSpeedKmph: 24,
      maxSpeedKmph: 54,
      energyWhPerKm: 42.1,
      ecoScore: 80,
      route: routes[2] ?? []
    }
  ],
  tripDetails: {
    maxSpeedKmph: 62,
    maxDistanceKm: 28.3,
    maxRideMinutes: 108,
    maxEfficiencyWhPerKm: 52.1
  }
};

export const chargingFixture: ChargingPayload = {
  batteryPercentage: 64,
  status: 'charging',
  timeToFullMinutes: 85,
  powerKw: 2.4,
  currentRangeKm: 76,
  currentSessionCost: 18.6,
  currentSessionMinutes: 32,
  homeChargerName: 'Home AC Charger',
  summary: {
    sessions: 28,
    totalEnergyKWh: 156.8,
    totalCost: 1245,
    averageCostPerKWh: 7.94
  },
  nearbyStations: [
    {
      id: 'station_001',
      name: 'ChargeZone',
      distanceKm: 0.6,
      address: 'Main Road, Hyderabad',
      type: 'AC',
      availablePorts: 3,
      totalPorts: 4,
      powerKw: 2.4
    },
    {
      id: 'station_002',
      name: 'Statiq',
      distanceKm: 1.2,
      address: 'Gachibowli, Hyderabad',
      type: 'DC',
      availablePorts: 1,
      totalPorts: 2,
      powerKw: 3.3
    },
    {
      id: 'station_003',
      name: 'ThunderPlus',
      distanceKm: 2.8,
      address: 'Kondapur, Hyderabad',
      type: 'DC',
      availablePorts: 2,
      totalPorts: 3,
      powerKw: 5.6
    }
  ],
  sessions: [
    {
      id: 'charge_001',
      startedAt: '2026-05-20T09:09:00+05:30',
      stationName: 'Home Charger',
      energyKWh: 2.48,
      durationMinutes: 32,
      cost: 18.6,
      type: 'AC'
    },
    {
      id: 'charge_002',
      startedAt: '2026-05-23T07:45:00+05:30',
      stationName: 'ChargeZone',
      energyKWh: 4.62,
      durationMinutes: 68,
      cost: 36.65,
      type: 'DC'
    },
    {
      id: 'charge_003',
      startedAt: '2026-05-21T18:30:00+05:30',
      stationName: 'Statiq',
      energyKWh: 6.28,
      durationMinutes: 75,
      cost: 49.85,
      type: 'DC'
    }
  ]
};

export const notificationsFixture: AppNotification[] = [
  {
    id: 'notif_001',
    type: 'charging',
    title: 'Charging complete',
    message: 'LEXICON One S reached 100%. Cable removal is safe.',
    createdAt: '2026-07-29T18:42:00+05:30',
    isRead: false,
    severity: 'success'
  },
  {
    id: 'notif_002',
    type: 'theft',
    title: 'Unexpected movement detected',
    message: 'Your parked scooter moved 6 m while locked. Tap to review live location.',
    createdAt: '2026-07-28T23:08:00+05:30',
    isRead: false,
    severity: 'critical'
  },
  {
    id: 'notif_003',
    type: 'battery',
    title: 'Battery below 20%',
    message: 'Estimated range is 19 km. A charger is available 0.8 km away.',
    createdAt: '2026-07-27T20:15:00+05:30',
    isRead: true,
    severity: 'warning'
  },
  {
    id: 'notif_004',
    type: 'ota',
    title: 'LEX OS 4.8.2 is ready',
    message: 'Improved range prediction and smoother regenerative braking calibration.',
    createdAt: '2026-07-26T11:30:00+05:30',
    isRead: true,
    severity: 'info'
  },
  {
    id: 'notif_005',
    type: 'service',
    title: 'Service due in 753 km',
    message: 'Book a convenient slot now to keep your warranty and diagnostics current.',
    createdAt: '2026-07-24T09:00:00+05:30',
    isRead: true,
    severity: 'info'
  },
  {
    id: 'notif_006',
    type: 'tow',
    title: 'Tow alert resolved',
    message: 'Movement stopped and the scooter remains locked at the last parked location.',
    createdAt: '2026-07-22T02:18:00+05:30',
    isRead: true,
    severity: 'warning'
  },
  {
    id: 'notif_007',
    type: 'crash',
    title: 'Crash detection test passed',
    message: 'Safety sensors and emergency contact workflow are operational.',
    createdAt: '2026-07-18T14:24:00+05:30',
    isRead: true,
    severity: 'success'
  }
];

export const serviceFixture: ServicePayload = {
  nextServiceDue: '2026-09-15',
  nextServiceKm: 753,
  dealers: [
    {
      id: 'dealer_001',
      name: 'LEXICON Experience Centre — Madhapur',
      address: 'Road No. 36, Madhapur, Hyderabad',
      distanceKm: 2.4,
      rating: 4.9,
      nextAvailable: 'Tomorrow, 10:30 AM'
    },
    {
      id: 'dealer_002',
      name: 'LEXICON Service Hub — Kondapur',
      address: 'Botanical Garden Road, Kondapur',
      distanceKm: 4.8,
      rating: 4.8,
      nextAvailable: 'Tomorrow, 2:00 PM'
    },
    {
      id: 'dealer_003',
      name: 'LEXICON Care — Jubilee Hills',
      address: 'Road No. 45, Jubilee Hills',
      distanceKm: 7.1,
      rating: 4.7,
      nextAvailable: 'Friday, 9:30 AM'
    }
  ],
  documents: [
    {
      id: 'doc_001',
      type: 'insurance',
      title: 'Comprehensive Insurance',
      subtitle: 'Acko General Insurance',
      status: 'Active',
      validUntil: '2027-03-18'
    },
    {
      id: 'doc_002',
      type: 'warranty',
      title: 'Vehicle Warranty',
      subtitle: '3 years / 30,000 km',
      status: 'Active',
      validUntil: '2029-03-18'
    },
    {
      id: 'doc_003',
      type: 'invoice',
      title: 'Vehicle Invoice',
      subtitle: 'LEXICON One S — March 2026',
      status: 'Available'
    }
  ],
  serviceHistory: [
    {
      id: 'service_001',
      date: '2026-06-12',
      title: 'First inspection',
      odometerKm: 512,
      dealer: 'LEXICON Experience Centre — Madhapur'
    },
    {
      id: 'service_002',
      date: '2026-04-02',
      title: 'Delivery inspection',
      odometerKm: 7,
      dealer: 'LEXICON Experience Centre — Madhapur'
    }
  ]
};
