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
      
      {/* Exclusive Overlay System - Only one can be open at a time */}
      {isOverlayActive('rewards') && <RewardsOverlay onClose={closeOverlay} />}
      {isOverlayActive('safety') && <SafetyOverlay onClose={closeOverlay} />}
      {isOverlayActive('community') && <CommunityOverlay onClose={closeOverlay} />}
      {isOverlayActive('location') && <LocationOverlay onClose={closeOverlay} />}
      {isOverlayActive('support') && <SupportOverlay onClose={closeOverlay} />}
      {isOverlayActive('notifications') && <NotificationsOverlay onClose={closeOverlay} />}
      {isOverlayActive('service') && <ServiceRequestOverlay onClose={closeOverlay} />}

      {/* Overlay Trigger Buttons - Smaller and More Compact */}
      <div className="fixed top-4 left-4 right-4 z-30 flex justify-between">
        <button 
          onClick={() => openOverlay('rewards')}
          className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-md hover:bg-white transition-colors"
        >
          <span className="text-xs font-medium">Rewards</span>
        </button>
        
        <button 
          onClick={() => openOverlay('safety')}
          className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-md hover:bg-white transition-colors"
        >
          <span className="text-xs font-medium">Safety</span>
        </button>
      </div>

      <div className="fixed top-16 left-4 right-4 z-30 flex justify-between">
        <button 
          onClick={() => openOverlay('community')}
          className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-md hover:bg-white transition-colors"
        >
          <span className="text-xs font-medium">Community</span>
        </button>
        
        <button 
          onClick={() => openOverlay('support')}
          className="bg-white/90 backdrop-blur p-2 rounded-lg shadow-md hover:bg-white transition-colors"
        >
          <span className="text-xs font-medium">Support</span>
        </button>
      </div>

      {/* Service Request Button - Centered */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={() => openOverlay('service')}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Request Service
        </button>
      </div>

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
