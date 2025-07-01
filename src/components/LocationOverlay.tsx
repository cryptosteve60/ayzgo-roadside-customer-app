
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, X, Copy } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const LocationOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocation } = useApp();

  const copyCoordinates = () => {
    if (currentLocation) {
      navigator.clipboard.writeText(`${currentLocation.lat}, ${currentLocation.lng}`);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-32 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-amber-500 hover:bg-amber-600 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MapPin className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-32 right-4 z-40">
      <Card className="p-4 w-64 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold">Your Location</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {currentLocation ? (
            <>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                <p className="text-sm font-mono">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-sm">Fetching address...</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={copyCoordinates}
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Coordinates
              </Button>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Location not available</p>
              <p className="text-xs">Please enable location services</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LocationOverlay;
