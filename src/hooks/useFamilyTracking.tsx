
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface FamilyMember {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isTracking: boolean;
  lastLocation?: { lat: number; lng: number; timestamp: Date };
  hasActiveService?: boolean;
}

export const useFamilyTracking = () => {
  const { customer, currentLocation } = useApp();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 'family-1',
      name: 'Jane Doe',
      phone: '+1234567891',
      relationship: 'Spouse',
      isTracking: true,
      lastLocation: { lat: 34.0522, lng: -118.2437, timestamp: new Date() }
    },
    {
      id: 'family-2', 
      name: 'Mom',
      phone: '+1234567892',
      relationship: 'Mother',
      isTracking: false
    }
  ]);

  const [shareLocation, setShareLocation] = useState(true);
  const [autoNotify, setAutoNotify] = useState(true);

  // TODO: Push location update to backend when sharing is active
  useEffect(() => {
    if (shareLocation && currentLocation) {
      // no-op until backend location sharing is implemented
    }
  }, [shareLocation, currentLocation]);

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMember = {
      ...member,
      id: `family-${Date.now()}`
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const toggleTracking = (id: string) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === id 
          ? { ...member, isTracking: !member.isTracking }
          : member
      )
    );
  };

  const notifyFamily = (message: string) => {
    const trackingMembers = familyMembers.filter(m => m.isTracking);
    trackingMembers.forEach((_member) => {
      void _member; // TODO: Send SMS/push notification via backend
    });
    void message;
  };

  return {
    familyMembers,
    shareLocation,
    autoNotify,
    setShareLocation,
    setAutoNotify,
    addFamilyMember,
    removeFamilyMember,
    toggleTracking,
    notifyFamily
  };
};
