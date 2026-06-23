import { Battery, Car, Flag, Fuel, Lock, Plug } from "lucide-react";
import type { ReactElement } from "react";
import type { ServiceType } from "@/contexts/AppContext";
import { SERVICE_TITLES, SERVICE_PRICES } from "@/constants/services";

export function getServiceTitle(type: ServiceType): string {
  return SERVICE_TITLES[type] ?? "Roadside Service";
}

export function getServicePrice(type: ServiceType): number {
  return SERVICE_PRICES[type] ?? 69;
}

export function getServiceIconName(type: ServiceType): string {
  const names: Record<ServiceType, string> = {
    battery: "Battery",
    tire: "Car",
    fuel: "Fuel",
    lockout: "Lock",
    tow: "Flag",
    charging: "Plug",
  };
  return names[type] ?? "Car";
}

interface IconOptions {
  className?: string;
}

export function getServiceIcon(
  type: ServiceType,
  options: IconOptions = {}
): ReactElement {
  const { className = "h-6 w-6 text-primary" } = options;
  switch (type) {
    case "battery":
      return Battery({ className }) as ReactElement;
    case "tire":
      return Car({ className }) as ReactElement;
    case "fuel":
      return Fuel({ className }) as ReactElement;
    case "lockout":
      return Lock({ className }) as ReactElement;
    case "tow":
      return Flag({ className }) as ReactElement;
    case "charging":
      return Plug({ className }) as ReactElement;
  }
}

export function formatServiceType(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
