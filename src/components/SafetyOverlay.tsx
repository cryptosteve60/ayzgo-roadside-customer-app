
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, X, Users, Phone, MapPin } from 'lucide-react';
import { useFamilyTracking } from '@/hooks/useFamilyTracking';
import { useEmergencyDetection } from '@/hooks/useEmergencyDetection';

const SafetyOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { shareLocation, setShareLocation, notifyFamily } = useFamilyTracking();
  const { triggerManualEmergency, startMonitoring, isMonitoring } = useEmergencyDetection();

  if (!isOpen) {
    return (
      <div className="fixed top-24 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Shield className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-24 right-4 z-40">
      <Card className="p-3 w-56 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <h3 className="font-bold text-sm">Safety Tools</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-xs">Share Location</p>
              <p className="text-xs text-muted-foreground">Let family track you</p>
            </div>
            <Switch
              checked={shareLocation}
              onCheckedChange={setShareLocation}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-xs">Emergency Detection</p>
              <p className="text-xs text-muted-foreground">Auto-detect crashes</p>
            </div>
            <Switch
              checked={isMonitoring}
              onCheckedChange={() => isMonitoring ? null : startMonitoring()}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => notifyFamily('I need assistance')}
            className="w-full h-7 text-xs"
          >
            <Phone className="h-3 w-3 mr-1" />
            Notify Family
          </Button>

          <Button
            className="w-full bg-red-500 hover:bg-red-600 h-7 text-xs"
            size="sm"
            onClick={triggerManualEmergency}
          >
            Emergency SOS
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SafetyOverlay;
