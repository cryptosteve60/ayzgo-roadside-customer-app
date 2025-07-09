import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, X, Users, Phone, MapPin } from 'lucide-react';
import { useFamilyTracking } from '@/hooks/useFamilyTracking';
import { useEmergencyDetection } from '@/hooks/useEmergencyDetection';

interface SafetyOverlayProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SafetyOverlay: React.FC<SafetyOverlayProps> = ({ isOpen, onOpen, onClose }) => {
  const { shareLocation, setShareLocation, notifyFamily } = useFamilyTracking();
  const { triggerManualEmergency, startMonitoring, isMonitoring } = useEmergencyDetection();

  if (!isOpen) {
    return (
      <div className="fixed top-24 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          onClick={onOpen}
        >
          <Shield className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-24 right-4 z-40">
      <Card className="p-4 w-64 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold">Safety Tools</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Share Location</p>
              <p className="text-xs text-muted-foreground">Let family track you</p>
            </div>
            <Switch
              checked={shareLocation}
              onCheckedChange={setShareLocation}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Emergency Detection</p>
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
            className="w-full"
          >
            <Phone className="h-4 w-4 mr-2" />
            Notify Family
          </Button>

          <Button
            className="w-full bg-red-500 hover:bg-red-600"
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
