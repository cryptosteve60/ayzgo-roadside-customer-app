
import React from "react";
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

const CustomerHome: React.FC = () => {
  const { currentRequest, currentLocation } = useApp();
  const navigate = useNavigate();
  const { activeOverlay, openOverlay, closeOverlay, isOverlayActive } = useExclusiveOverlay();

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

      {/* Location Info */}
      {currentLocation && (
        <div className="fixed bottom-32 left-4 z-30">
          <Card className="p-2 bg-white/90 backdrop-blur">
            <p className="text-xs text-muted-foreground">
              📍 {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
