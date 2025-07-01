
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  priority: number;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: ['Standard response time', 'Basic services', 'Email support'],
    priority: 1
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    features: ['Priority response', 'All services included', '24/7 phone support', 'Free tire changes'],
    priority: 2
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    features: ['Fastest response', 'Unlimited services', 'Dedicated support', 'Fleet management', 'Corporate billing'],
    priority: 3
  }
];

export const useSubscription = () => {
  const { customer } = useApp();
  const [subscription, setSubscription] = useState<{
    tier: SubscriptionTier;
    isActive: boolean;
    expiresAt?: Date;
  }>({
    tier: SUBSCRIPTION_TIERS[0], // Default to Basic
    isActive: true
  });

  useEffect(() => {
    // Simulate subscription check - in real app, this would call Supabase
    if (customer) {
      // For demo, randomly assign premium to some users
      const isPremium = customer.rating > 4.5;
      setSubscription({
        tier: isPremium ? SUBSCRIPTION_TIERS[1] : SUBSCRIPTION_TIERS[0],
        isActive: true,
        expiresAt: isPremium ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
      });
    }
  }, [customer]);

  const upgrade = (tierId: string) => {
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (tier) {
      setSubscription({
        tier,
        isActive: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
    }
  };

  return {
    subscription,
    upgrade,
    tiers: SUBSCRIPTION_TIERS
  };
};
