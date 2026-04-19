import type { ServiceType } from "@/contexts/AppContext";

export const SERVICE_PRICES: Record<ServiceType, number> = {
  battery: 49,
  tire: 69,
  fuel: 45,
  lockout: 75,
  tow: 99,
  charging: 59,
};

export const SERVICE_TITLES: Record<ServiceType, string> = {
  battery: "Battery Jump",
  tire: "Tire Change",
  fuel: "Fuel Delivery",
  lockout: "Lockout Assistance",
  tow: "Towing Service",
  charging: "EV Charging",
};

export const SERVICE_DESCRIPTIONS: Record<ServiceType, string> = {
  battery: "Fast battery jump start from certified helpers",
  tire: "Tire change or repair on the spot",
  fuel: "Emergency fuel delivery to your location",
  lockout: "Professional lockout assistance",
  tow: "Safe towing to your preferred destination",
  charging: "EV charging assistance when you run out of power",
};

export const FALLBACK_LOCATION = { lat: 34.0522, lng: -118.2437 };

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000,
};

export const CRASH_THRESHOLD_MS2 = 15;
export const CRASH_SEVERITY_HIGH_MS2 = 25;
export const MOBILE_BREAKPOINT_PX = 768;
export const TOAST_REMOVE_DELAY_MS = 5000;
