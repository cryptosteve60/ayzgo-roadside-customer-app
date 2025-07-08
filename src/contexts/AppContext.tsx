import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the service types our app will offer
export type ServiceType = 
  | "battery" 
  | "tire" 
  | "fuel" 
  | "lockout" 
  | "tow"
  | "charging";

// Define the job status for customer requests
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

// Define the job data structure for customer requests
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

// Create type alias for backward compatibility
export type JobRequest = ServiceRequest;

// Define customer user data
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
  // Customer data
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  
  // Service requests
  currentRequest: ServiceRequest | null;
  setCurrentRequest: (request: ServiceRequest | null) => void;
  requestHistory: ServiceRequest[];
  setRequestHistory: (history: ServiceRequest[]) => void;
  
  // Location
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  locationError: string | null;
  isLocationLoading: boolean;
  
  // App state
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
  const [customer, setCustomer] = useState<Customer | null>({
    id: "customer-123",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    rating: 4.8,
    emergencyContacts: [
      { name: "Jane Doe", phone: "+1234567891", relationship: "Spouse" }
    ],
  });
  
  const [currentRequest, setCurrentRequest] = useState<ServiceRequest | null>(null);
  const [requestHistory, setRequestHistory] = useState<ServiceRequest[]>([
    {
      id: "req-1",
      customerId: "customer-123",
      customerName: "John Doe",
      customerLocation: {
        lat: 34.0522,
        lng: -118.2437,
        address: "123 Main St, Los Angeles, CA"
      },
      serviceType: "battery",
      description: "Dead battery, need jump start",
      status: "completed",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      price: 45,
      rating: 5,
      driverName: "Mike Johnson"
    },
    {
      id: "req-2",
      customerId: "customer-123",
      customerName: "John Doe",
      customerLocation: {
        lat: 34.0522,
        lng: -118.2437,
        address: "456 Oak Ave, Beverly Hills, CA"
      },
      serviceType: "tire",
      description: "Flat tire replacement",
      status: "completed",
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      price: 75,
      rating: 4,
      driverName: "Sarah Wilson"
    },
    {
      id: "req-3",
      customerId: "customer-123",
      customerName: "John Doe",
      customerLocation: {
        lat: 34.0522,
        lng: -118.2437,
        address: "789 Pine St, Santa Monica, CA"
      },
      serviceType: "fuel",
      description: "Out of gas",
      status: "cancelled",
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      price: 25
    }
  ]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = () => {
      setIsLocationLoading(true);
      setLocationError(null);
      
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by this browser.");
        setIsLocationLoading(false);
        // Fallback to LA
        setCurrentLocation({ lat: 34.0522, lng: -118.2437 });
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
          console.error('Error getting location:', error);
          setLocationError(error.message);
          setIsLocationLoading(false);
          // Fallback to LA
          setCurrentLocation({ lat: 34.0522, lng: -118.2437 });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    };

    getCurrentLocation();
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
