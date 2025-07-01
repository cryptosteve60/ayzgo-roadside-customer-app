
import { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';

interface EmergencyEvent {
  id: string;
  type: 'crash' | 'manual' | 'timeout';
  timestamp: Date;
  location: { lat: number; lng: number };
  severity: 'low' | 'medium' | 'high';
  autoTriggered: boolean;
}

export const useEmergencyDetection = () => {
  const { currentLocation, customer } = useApp();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [lastEvent, setLastEvent] = useState<EmergencyEvent | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([]);

  // Crash detection using device motion
  const detectCrash = useCallback((acceleration: number) => {
    const CRASH_THRESHOLD = 15; // m/s²
    
    if (acceleration > CRASH_THRESHOLD && currentLocation) {
      const event: EmergencyEvent = {
        id: `emergency-${Date.now()}`,
        type: 'crash',
        timestamp: new Date(),
        location: currentLocation,
        severity: acceleration > 25 ? 'high' : 'medium',
        autoTriggered: true
      };
      
      setLastEvent(event);
      triggerEmergency(event);
    }
  }, [currentLocation]);

  // Start emergency monitoring
  const startMonitoring = useCallback(() => {
    if (typeof DeviceMotionEvent !== 'undefined' && DeviceMotionEvent.requestPermission) {
      DeviceMotionEvent.requestPermission().then(permission => {
        if (permission === 'granted') {
          setIsMonitoring(true);
        }
      });
    } else {
      setIsMonitoring(true);
    }
  }, []);

  // Manual emergency trigger
  const triggerManualEmergency = useCallback(() => {
    if (currentLocation) {
      const event: EmergencyEvent = {
        id: `emergency-${Date.now()}`,
        type: 'manual',
        timestamp: new Date(),
        location: currentLocation,
        severity: 'high',
        autoTriggered: false
      };
      
      setLastEvent(event);
      triggerEmergency(event);
    }
  }, [currentLocation]);

  // Emergency response logic
  const triggerEmergency = useCallback((event: EmergencyEvent) => {
    setEmergencyActive(true);
    
    // Notify emergency services (simulated)
    console.log('Emergency triggered:', event);
    
    // Notify emergency contacts
    emergencyContacts.forEach(contact => {
      console.log(`Notifying emergency contact: ${contact}`);
      // Future: Send SMS/call
    });
    
    // Auto-request roadside assistance
    if (event.severity === 'high') {
      console.log('Auto-requesting emergency roadside assistance');
    }
  }, [emergencyContacts]);

  // Device motion listener
  useEffect(() => {
    if (!isMonitoring) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        const { x, y, z } = event.accelerationIncludingGravity;
        const totalAcceleration = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2);
        detectCrash(totalAcceleration);
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [isMonitoring, detectCrash]);

  const cancelEmergency = useCallback(() => {
    setEmergencyActive(false);
    setLastEvent(null);
  }, []);

  return {
    isMonitoring,
    emergencyActive,
    lastEvent,
    emergencyContacts,
    startMonitoring,
    triggerManualEmergency,
    cancelEmergency,
    setEmergencyContacts
  };
};
