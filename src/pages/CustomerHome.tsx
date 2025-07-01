import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServicesGrid from "@/components/ServicesGrid";
import ServicesHeader from "@/components/ServicesHeader";
import ServicesHero from "@/components/ServicesHero";
import MapView from "@/components/MapView";
import { useApp } from "@/contexts/AppContext";
import { Clock, MapPin, Star, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SurgePricingBanner from "@/components/SurgePricingBanner";
import { useSurgePricing } from "@/hooks/useSurgePricing";
import { useSubscription } from "@/hooks/useSubscription";
import EmergencyButton from "@/components/EmergencyButton";
import FamilyTracker from "@/components/FamilyTracker";
import VehicleHealthCard from "@/components/VehicleHealthCard";
import CommunityFeed from "@/components/CommunityFeed";

const CustomerHome: React.FC = () => {
  const { customer, currentRequest, requestHistory, currentLocation } = useApp();
  const { surge } = useSurgePricing();
  const { subscription } = useSubscription();
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl mx-auto space-y-6">
      {/* Emergency Button - Always Available */}
      <EmergencyButton />
      
      {/* Hero Section */}
      <ServicesHero />
      
      {/* Surge Pricing Banner */}
      <SurgePricingBanner multiplier={surge.multiplier} reason={surge.reason} />
      
      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-lg">{customer?.rating || 4.8}</span>
          </div>
          <p className="text-sm text-muted-foreground">Your Rating</p>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">{requestHistory.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">Services Used</p>
        </Card>
      </div>

      {/* Active Request */}
      {currentRequest && (
        <Card className="p-4 border-l-4 border-l-primary">
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
          
          <Button 
            onClick={() => navigate(`/job/${currentRequest.id}`)}
            className="w-full"
          >
            View Details
          </Button>
        </Card>
      )}

      {/* New Enhanced Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FamilyTracker />
        <VehicleHealthCard />
      </div>

      {/* Community Feed */}
      <CommunityFeed />

      {/* Map */}
      <Card className="p-4">
        <h3 className="font-bold mb-3">Your Location</h3>
        <MapView height="h-[200px]" />
        {currentLocation && (
          <p className="text-sm text-muted-foreground mt-2">
            📍 {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
          </p>
        )}
      </Card>

      {/* Services Header */}
      <ServicesHeader />
      
      {/* Services Grid */}
      <ServicesGrid />

      {/* Recent Activity */}
      {requestHistory.length > 0 && (
        <Card className="p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {requestHistory.slice(-3).reverse().map((request) => (
              <div key={request.id} className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                <div>
                  <p className="font-medium capitalize">
                    {request.serviceType.replace('_', ' ')} Service
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={request.status === 'completed' ? 'default' : 'secondary'}
                  >
                    {request.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">${request.price}</p>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/profile')}
          >
            View All History
          </Button>
        </Card>
      )}

      {/* Upgrade Prompt for Basic Users */}
      {subscription.tier.id === 'basic' && (
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Upgrade to Premium</h3>
              <p className="text-sm text-muted-foreground">
                Get priority response, reduced surge pricing, and more!
              </p>
            </div>
            <Button onClick={() => navigate('/subscription')}>
              Upgrade
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CustomerHome;
