
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface AddressData {
  city?: string;
  state?: string;
}

const LocationOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const { currentLocation } = useApp();

  const fetchAddress = async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      // Using a reverse geocoding service (example with OpenStreetMap Nominatim)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.address) {
        setAddress({
          city: data.address?.city || data.address?.town || data.address?.village,
          state: data.address?.state
        });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    if (currentLocation && isOpen) {
      fetchAddress(currentLocation.lat, currentLocation.lng);
    }
  }, [currentLocation, isOpen]);

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
      <Card className="p-4 w-80 shadow-lg">
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
              {isLoadingAddress ? (
                <p className="text-sm text-muted-foreground">Loading location...</p>
              ) : address?.city && address?.state ? (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-sm">{address.city}, {address.state}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Location not available</p>
              )}
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
