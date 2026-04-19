import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FALLBACK_LOCATION, GEOLOCATION_OPTIONS } from "@/constants/services";

export type ServiceType =
  | "battery"
  | "tire"
  | "fuel"
  | "lockout"
  | "tow"
  | "charging";

export type JobStatus =
  | "requested"
  | "searching"
  | "driver_assigned"
  | "driver_enroute"
  | "driver_arrived"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "accepted"
  | "enroute"
  | "arrived"
  | "inProgress";

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  serviceType: ServiceType;
  description: string;
  vehicleDetails?: string;
  status: JobStatus;
  createdAt: Date;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverLocation?: {
    lat: number;
    lng: number;
  };
  estimatedArrival?: Date;
  price?: number;
  rating?: number;
  safetyPin?: string;
  acceptedBy?: string;
  acceptedAt?: Date;
  completedAt?: Date;
}

export type JobRequest = ServiceRequest;

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  emergencyContacts?: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  paymentMethods?: string[];
}

interface AppContextType {
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  currentRequest: ServiceRequest | null;
  setCurrentRequest: (request: ServiceRequest | null) => void;
  requestHistory: ServiceRequest[];
  setRequestHistory: (history: ServiceRequest[]) => void;
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  locationError: string | null;
  isLocationLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [currentRequest, setCurrentRequest] = useState<ServiceRequest | null>(null);
  const [requestHistory, setRequestHistory] = useState<ServiceRequest[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Sync auth state and load customer profile from Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setCustomer({
          id: session.user.id,
          name: session.user.user_metadata?.full_name ?? session.user.email ?? "User",
          email: session.user.email ?? undefined,
          phone: session.user.user_metadata?.phone ?? undefined,
          rating: 5.0,
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setCustomer({
          id: session.user.id,
          name: session.user.user_metadata?.full_name ?? session.user.email ?? "User",
          email: session.user.email ?? undefined,
          phone: session.user.user_metadata?.phone ?? undefined,
          rating: 5.0,
        });
      } else {
        setIsAuthenticated(false);
        setCustomer(null);
        setRequestHistory([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Get user's current location
  useEffect(() => {
    setIsLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLocationLoading(false);
      setCurrentLocation(FALLBACK_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocationLoading(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocationLoading(false);
        setCurrentLocation(FALLBACK_LOCATION);
      },
      GEOLOCATION_OPTIONS
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        customer,
        setCustomer,
        currentRequest,
        setCurrentRequest,
        requestHistory,
        setRequestHistory,
        currentLocation,
        setCurrentLocation,
        locationError,
        isLocationLoading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
