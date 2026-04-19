
import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { CRASH_THRESHOLD_MS2, CRASH_SEVERITY_HIGH_MS2 } from '@/constants/services';

interface EmergencyEvent {
  id: string;
  type: 'crash' | 'manual' | 'timeout';
  timestamp: Date;
  location: { lat: number; lng: number };
  severity: 'low' | 'medium' | 'high';
  autoTriggered: boolean;
}

interface IOSDeviceMotionEventConstructor {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export const useEmergencyDetection = () => {
  const { currentLocation, customer } = useApp();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [lastEvent, setLastEvent] = useState<EmergencyEvent | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([]);

  // Use refs to avoid re-registering the event listener on every location/contacts change
  const locationRef = useRef(currentLocation);
  const contactsRef = useRef(emergencyContacts);

  useEffect(() => { locationRef.current = currentLocation; }, [currentLocation]);
  useEffect(() => { contactsRef.current = emergencyContacts; }, [emergencyContacts]);

  const triggerEmergency = useCallback((event: EmergencyEvent) => {
    setEmergencyActive(true);

    contactsRef.current.forEach((_contact) => {
      // Future: Send SMS/call via backend
    });

    if (event.severity === 'high') {
      // Future: Auto-request emergency roadside assistance via API
    }
  }, []);

  const detectCrash = useCallback((acceleration: number) => {
    const loc = locationRef.current;
    if (acceleration > CRASH_THRESHOLD_MS2 && loc) {
      const event: EmergencyEvent = {
        id: `emergency-${Date.now()}`,
        type: 'crash',
        timestamp: new Date(),
        location: loc,
        severity: acceleration > CRASH_SEVERITY_HIGH_MS2 ? 'high' : 'medium',
        autoTriggered: true,
      };
      setLastEvent(event);
      triggerEmergency(event);
    }
  }, [triggerEmergency]);

  const startMonitoring = useCallback(() => {
    const DeviceMotionEventAny = DeviceMotionEvent as unknown as IOSDeviceMotionEventConstructor;

    if (DeviceMotionEventAny.requestPermission) {
      DeviceMotionEventAny.requestPermission()
        .then((permission) => {
          if (permission === 'granted') setIsMonitoring(true);
        })
        .catch(() => {
          setIsMonitoring(true);
        });
    } else {
      setIsMonitoring(true);
    }
  }, []);

  const triggerManualEmergency = useCallback(() => {
    const loc = locationRef.current;
    if (loc) {
      const event: EmergencyEvent = {
        id: `emergency-${Date.now()}`,
        type: 'manual',
        timestamp: new Date(),
        location: loc,
        severity: 'high',
        autoTriggered: false,
      };
      setLastEvent(event);
      triggerEmergency(event);
    }
  }, [triggerEmergency]);

  // Device motion listener — only depends on isMonitoring and detectCrash (stable ref-based callback)
  useEffect(() => {
    if (!isMonitoring) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        const { x, y, z } = event.accelerationIncludingGravity;
        const totalAcceleration = Math.sqrt((x ?? 0) ** 2 + (y ?? 0) ** 2 + (z ?? 0) ** 2);
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

  // Suppress unused variable warning for customer (used for future profile-based emergency contacts)
  void customer;

  return {
    isMonitoring,
    emergencyActive,
    lastEvent,
    emergencyContacts,
    startMonitoring,
    triggerManualEmergency,
    cancelEmergency,
    setEmergencyContacts,
  };
};
