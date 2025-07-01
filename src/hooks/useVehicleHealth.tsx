
import { useState, useEffect } from 'react';

interface MaintenanceItem {
  id: string;
  type: 'oil_change' | 'tire_rotation' | 'brake_check' | 'battery_check' | 'inspection';
  name: string;
  lastCompleted?: Date;
  nextDue: Date;
  mileageInterval?: number;
  priority: 'low' | 'medium' | 'high' | 'overdue';
  cost?: number;
}

interface VehicleHealth {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  lastUpdated: Date;
  maintenanceItems: MaintenanceItem[];
  healthScore: number; // 0-100
}

export const useVehicleHealth = () => {
  const [vehicles, setVehicles] = useState<VehicleHealth[]>([
    {
      vehicleId: 'vehicle-1',
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      mileage: 45000,
      lastUpdated: new Date(),
      healthScore: 85,
      maintenanceItems: [
        {
          id: 'maint-1',
          type: 'oil_change',
          name: 'Oil Change',
          lastCompleted: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
          nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          mileageInterval: 5000,
          priority: 'medium',
          cost: 45
        },
        {
          id: 'maint-2',
          type: 'tire_rotation',
          name: 'Tire Rotation',
          nextDue: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days overdue
          mileageInterval: 7500,
          priority: 'overdue',
          cost: 50
        }
      ]
    }
  ]);

  const [predictions, setPredictions] = useState<{
    likelyBreakdowns: string[];
    seasonalReminders: string[];
    costEstimates: { item: string; cost: number; timeframe: string }[];
  }>({
    likelyBreakdowns: ['Battery may need replacement within 6 months', 'Brake pads showing wear'],
    seasonalReminders: ['Winter tire change recommended', 'Check antifreeze levels'],
    costEstimates: [
      { item: 'Oil Change', cost: 45, timeframe: 'Next month' },
      { item: 'Tire Rotation', cost: 50, timeframe: 'Overdue' }
    ]
  });

  const updateMileage = (vehicleId: string, newMileage: number) => {
    setVehicles(prev =>
      prev.map(vehicle =>
        vehicle.vehicleId === vehicleId
          ? { ...vehicle, mileage: newMileage, lastUpdated: new Date() }
          : vehicle
      )
    );
  };

  const markMaintenanceComplete = (vehicleId: string, maintenanceId: string) => {
    setVehicles(prev =>
      prev.map(vehicle =>
        vehicle.vehicleId === vehicleId
          ? {
              ...vehicle,
              maintenanceItems: vehicle.maintenanceItems.map(item =>
                item.id === maintenanceId
                  ? {
                      ...item,
                      lastCompleted: new Date(),
                      nextDue: new Date(Date.now() + (item.mileageInterval || 90) * 24 * 60 * 60 * 1000),
                      priority: 'low' as const
                    }
                  : item
              )
            }
          : vehicle
      )
    );
  };

  const getOverdueItems = () => {
    return vehicles.flatMap(vehicle =>
      vehicle.maintenanceItems.filter(item => item.priority === 'overdue')
    );
  };

  const getUpcomingItems = () => {
    return vehicles.flatMap(vehicle =>
      vehicle.maintenanceItems.filter(item => 
        item.nextDue <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
        item.priority !== 'overdue'
      )
    );
  };

  return {
    vehicles,
    predictions,
    updateMileage,
    markMaintenanceComplete,
    getOverdueItems,
    getUpcomingItems
  };
};
