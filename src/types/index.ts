/**
 * Global Types
 * Common TypeScript types used throughout the app
 */

// User types
export interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegistrationData {
  phone: string;
  password: string;
  name: string;
  email?: string;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Vehicle types
export interface Vehicle {
  id: string;
  name: string;
  model: string;
  batteryLevel: number;
  isCharging: boolean;
  isAvailable: boolean;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  image: string;
}

// Ride types
export interface Ride {
  id: string;
  vehicleId: string;
  startTime: string;
  endTime?: string;
  startLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  endLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance: number;
  duration: number;
  cost: number;
  status: 'active' | 'completed' | 'cancelled';
}

// Wallet types
export interface Wallet {
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

// Common types
export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  field?: string;
}