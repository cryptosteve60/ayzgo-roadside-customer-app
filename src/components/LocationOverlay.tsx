
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, X, Copy, Navigation } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface AddressData {
  formatted_address?: string;
  city?: string;
  state?: string;
  country?: string;
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
      
      if (data && data.display_name) {
        setAddress({
          formatted_address: data.display_name,
          city: data.address?.city || data.address?.town || data.address?.village,
          state: data.address?.state,
          country: data.address?.country
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

  const copyCoordinates = () => {
    if (currentLocation) {
      navigator.clipboard.writeText(`${currentLocation.lat}, ${currentLocation.lng}`);
    }
  };

  const openInMaps = () => {
    if (currentLocation) {
      const url = `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
      window.open(url, '_blank');
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
              <div>
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                {isLoadingAddress ? (
                  <p className="text-sm text-muted-foreground">Loading address...</p>
                ) : address?.formatted_address ? (
                  <p className="text-sm">{address.formatted_address}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Address not available</p>
                )}
              </div>

              {address?.city && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">City</p>
                  <p className="text-sm">{address.city}{address.state && `, ${address.state}`}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">GPS Coordinates</p>
                <p className="text-sm font-mono">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCoordinates}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openInMaps}
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Maps
                </Button>
              </div>
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
