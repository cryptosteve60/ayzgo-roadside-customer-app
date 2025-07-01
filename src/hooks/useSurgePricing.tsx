
import { useState, useEffect } from 'react';

interface SurgeData {
  multiplier: number;
  reason: string;
  isActive: boolean;
}

export const useSurgePricing = () => {
  const [surge, setSurge] = useState<SurgeData>({
    multiplier: 1,
    reason: '',
    isActive: false
  });

  useEffect(() => {
    const checkSurgeConditions = () => {
      const hour = new Date().getHours();
      const isWeekend = [0, 6].includes(new Date().getDay());
      
      // Simulate surge pricing conditions
      if (hour >= 17 && hour <= 20) {
        setSurge({
          multiplier: 1.5,
          reason: 'rush hour traffic',
          isActive: true
        });
      } else if (isWeekend && (hour >= 20 || hour <= 2)) {
        setSurge({
          multiplier: 1.8,
          reason: 'weekend night demand',
          isActive: true
        });
      } else if (Math.random() > 0.8) {
        setSurge({
          multiplier: 1.3,
          reason: 'high demand in your area',
          isActive: true
        });
      } else {
        setSurge({
          multiplier: 1,
          reason: '',
          isActive: false
        });
      }
    };

    checkSurgeConditions();
    const interval = setInterval(checkSurgeConditions, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const calculateSurgePrice = (basePrice: number, hasSubscription: boolean = false) => {
    const adjustedMultiplier = hasSubscription ? Math.max(1, surge.multiplier - 0.2) : surge.multiplier;
    return Math.round(basePrice * adjustedMultiplier);
  };

  return {
    surge,
    calculateSurgePrice
  };
};
