
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MapView from "@/components/MapView";
import { useApp } from "@/contexts/AppContext";
import { useExclusiveOverlay } from "@/hooks/useExclusiveOverlay";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmergencyButton from "@/components/EmergencyButton";
import SafetyOverlay from "@/components/SafetyOverlay";
import RewardsOverlay from "@/components/RewardsOverlay";
import CommunityOverlay from "@/components/CommunityOverlay";
import ServiceRequestOverlay from "@/components/ServiceRequestOverlay";
import LocationOverlay from "@/components/LocationOverlay";
import SupportOverlay from "@/components/SupportOverlay";
import NotificationsOverlay from "@/components/NotificationsOverlay";

interface AddressData {
  city?: string;
  state?: string;
}

const CustomerHome: React.FC = () => {
  const { currentRequest, currentLocation } = useApp();
  const navigate = useNavigate();
  const { activeOverlay, openOverlay, closeOverlay, isOverlayActive } = useExclusiveOverlay();
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [address, setAddress] = useState<AddressData | null>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
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
    }
  };

  useEffect(() => {
    if (currentLocation) {
      setLocationStatus('GPS: Active');
      fetchAddress(currentLocation.lat, currentLocation.lng);
    } else {
      setLocationStatus('GPS: Searching...');
    }
  }, [currentLocation]);

  return (
    <div className="relative h-full">
      {/* Full-screen Map */}
      <div className="absolute inset-0">
        <MapView 
          height="h-full" 
          interactive={true}
          showCurrentLocation={true}
          showJobLocation={!!currentRequest}
          jobLocation={currentRequest?.customerLocation}
        />
      </div>

      {/* Emergency Button - Always Available */}
      <EmergencyButton />
      
      {/* Overlay Components - Each manages its own positioning and trigger */}
      <RewardsOverlay 
        isOpen={isOverlayActive('rewards')} 
        onOpen={() => openOverlay('rewards')} 
        onClose={closeOverlay} 
      />
      
      {/* These components manage their own state internally */}
      <SafetyOverlay />
      <CommunityOverlay />
      <LocationOverlay />
      
      <SupportOverlay 
        isOpen={isOverlayActive('support')} 
        onOpen={() => openOverlay('support')} 
        onClose={closeOverlay} 
      />
      <NotificationsOverlay 
        isOpen={isOverlayActive('notifications')} 
        onOpen={() => openOverlay('notifications')} 
        onClose={closeOverlay} 
      />
      
      {/* ServiceRequestOverlay manages its own state */}
      <ServiceRequestOverlay />

      {/* Active Request Overlay */}
      {currentRequest && (
        <div className="fixed top-20 left-4 right-4 z-40">
          <Card className="p-4 border-l-4 border-l-primary shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold">Active Request</h3>
                <p className="text-sm text-muted-foreground">
                  {currentRequest.serviceType.charAt(0).toUpperCase() + currentRequest.serviceType.slice(1)} Service
                </p>
              </div>
              <Badge variant="secondary">{currentRequest.status}</Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{currentRequest.customerLocation.address || "Your Location"}</span>
            </div>
            
            <button 
              onClick={() => navigate(`/job/${currentRequest.id}`)}
              className="w-full bg-primary text-primary-foreground p-2 rounded-md font-medium"
            >
              View Details
            </button>
          </Card>
        </div>
      )}

      {/* Enhanced Location Info */}
      {currentLocation && (
        <div className="fixed bottom-32 left-4 z-30">
          <Card className="p-3 bg-white/90 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">{locationStatus}</p>
                <p className="text-xs text-muted-foreground">
                  {address?.city && address?.state ? `${address.city}, ${address.state}` : 'Loading location...'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
