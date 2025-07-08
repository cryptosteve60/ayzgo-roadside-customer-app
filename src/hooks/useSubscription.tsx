
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export interface ServiceTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  serviceFee: number;
  responseBoost: string;
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'standard',
    name: 'Standard Service',
    description: 'Great service at base rates',
    features: ['Standard response time (10-20 min)', 'All basic services', 'In-app support', 'Standard dispatch'],
    serviceFee: 3.99,
    responseBoost: 'Standard'
  },
  {
    id: 'express',
    name: 'Express Service',
    description: 'Faster response for urgent needs',
    features: ['Priority response (5-12 min)', 'All services included', 'Priority dispatch', 'Live tracking', 'SMS updates'],
    serviceFee: 12.99,
    responseBoost: 'Priority'
  },
  {
    id: 'premium',
    name: 'Premium Service',
    description: 'Fastest response with premium features',
    features: ['Fastest response (3-8 min)', 'Premium providers only', 'Dedicated support line', 'Real-time family updates', 'Service guarantee'],
    serviceFee: 19.99,
    responseBoost: 'Fastest'
  }
];

export const useServiceTiers = () => {
  const { customer } = useApp();
  const [selectedTier, setSelectedTier] = useState<ServiceTier>(SERVICE_TIERS[0]);

  useEffect(() => {
    // Default to standard service - no subscriptions needed
    setSelectedTier(SERVICE_TIERS[0]);
  }, [customer]);

  const selectTier = (tierId: string) => {
    const tier = SERVICE_TIERS.find(t => t.id === tierId);
    if (tier) {
      setSelectedTier(tier);
    }
  };

  return {
    selectedTier,
    selectTier,
    tiers: SERVICE_TIERS,
    hasActiveService: true // Everyone can use the service now
  };
};
