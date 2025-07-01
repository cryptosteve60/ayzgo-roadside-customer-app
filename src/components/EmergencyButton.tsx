
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone } from 'lucide-react';
import { useEmergencyDetection } from '@/hooks/useEmergencyDetection';
import { toast } from 'sonner';

const EmergencyButton: React.FC = () => {
  const { triggerManualEmergency, emergencyActive, cancelEmergency } = useEmergencyDetection();
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePress = () => {
    setIsPressed(true);
    setCountdown(5);
    
    toast.warning('Emergency mode activating in 5 seconds...', {
      description: 'Tap cancel to abort',
      duration: 5000
    });

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerManualEmergency();
          setIsPressed(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    setIsPressed(false);
    setCountdown(0);
    toast.success('Emergency activation cancelled');
  };

  if (emergencyActive) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold">EMERGENCY ACTIVE</span>
          </div>
          <p className="text-sm mb-3">Help is being dispatched to your location</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={cancelEmergency}
            className="bg-white text-red-500 hover:bg-gray-100"
          >
            Cancel Emergency
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {isPressed ? (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">{countdown}</div>
            <p className="text-sm mb-3">Activating Emergency Mode</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCancel}
              className="bg-white text-red-500 hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
          onClick={handlePress}
        >
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xs">SOS</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default EmergencyButton;
