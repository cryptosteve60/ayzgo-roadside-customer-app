
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceType, ServiceRequest, useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Camera, Car, Shield, Zap, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSurgePricing } from "@/hooks/useSurgePricing";
import { useServiceTiers } from "@/hooks/useSubscription";
import { useFamilyTracking } from "@/hooks/useFamilyTracking";
import SurgePricingBanner from "@/components/SurgePricingBanner";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function RequestService() {
  const { serviceType } = useParams<{ serviceType: ServiceType }>();
  const { customer, currentLocation, setCurrentRequest } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { surge, calculateSurgePrice } = useSurgePricing();
  const { selectedTier, selectTier, tiers } = useServiceTiers();
  const { notifyFamily, shareLocation, setShareLocation } = useFamilyTracking();
  
  const [location, setLocation] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [autoNotifyFamily, setAutoNotifyFamily] = useState(true);
  
  useEffect(() => {
    if (currentLocation) {
      setLocation(`${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`);
    }
    if (serviceType) {
      const price = getServicePrice(serviceType);
      setBasePrice(price);
      
      // Calculate total: base service + service tier fee + surge
      const serviceWithFee = price + selectedTier.serviceFee;
      const finalPrice = calculateSurgePrice(serviceWithFee, false); // No premium discount needed
      setTotalPrice(finalPrice);
    }
  }, [currentLocation, serviceType, surge, selectedTier]);
  
  if (!serviceType) {
    return <div>Invalid service type</div>;
  }
  
  const getServicePrice = (type: ServiceType) => {
    switch (type) {
      case "battery": return 49;
      case "tire": return 69;
      case "fuel": return 45;
      case "lockout": return 75;
      case "tow": return 99;
      case "charging": return 59;
      default: return 69;
    }
  };

  const getServiceTitle = (type: ServiceType) => {
    switch (type) {
      case "battery": return "Battery Jump";
      case "tire": return "Tire Change";
      case "fuel": return "Fuel Delivery";
      case "lockout": return "Lockout Service";
      case "tow": return "Towing Service";
      case "charging": return "EV Charging";
      default: return "Roadside Service";
    }
  };

  const handleSubmitRequest = () => {
    if (!vehicleDetails || !description || !customer) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    const newServiceRequest: ServiceRequest = {
      id: `req-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerLocation: {
        lat: currentLocation?.lat || 0,
        lng: currentLocation?.lng || 0,
        address: location
      },
      serviceType,
      description,
      vehicleDetails,
      status: "requested",
      price: totalPrice,
      createdAt: new Date(),
      safetyPin: Math.floor(1000 + Math.random() * 9000).toString()
    };
    
    setCurrentRequest(newServiceRequest);
    
    // Notify family if enabled
    if (autoNotifyFamily) {
      notifyFamily(`${customer.name} has requested ${getServiceTitle(serviceType)} at ${location}`);
    }
    
    toast({
      title: "Service Request Submitted! 🚗",
      description: "We're finding the best driver for you."
    });
    
    // Navigate to confirmation screen
    navigate('/request-confirmation', { 
      state: { job: newServiceRequest } 
    });
  };
  
  return (
    <div className="container max-w-2xl mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Request {getServiceTitle(serviceType)}</h1>
        <p className="text-muted-foreground">Help is on the way! Choose your service level and provide details.</p>
      </div>

      {/* Service Level Selection */}
      <Card className="p-4 mb-6">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Choose Service Level
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedTier.id === tier.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => selectTier(tier.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{tier.name}</span>
                    {tier.id === 'express' && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.responseBoost} response</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">+${tier.serviceFee}</div>
                  <div className="text-xs text-muted-foreground">service fee</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Surge Pricing Banner */}
      <SurgePricingBanner multiplier={surge.multiplier} reason={surge.reason} />

      {/* Price Breakdown */}
      <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
        <h3 className="font-bold mb-3">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{getServiceTitle(serviceType)} Service</span>
            <span>${basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span>{selectedTier.name} Fee</span>
            <span>+${selectedTier.serviceFee}</span>
          </div>
          {surge.multiplier > 1 && (
            <div className="flex justify-between text-orange-600">
              <span>High Demand Surge ({surge.multiplier}x)</span>
              <span>+${(totalPrice - basePrice - selectedTier.serviceFee).toFixed(2)}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total Cost</span>
            <span className="text-primary">${totalPrice}</span>
          </div>
        </div>
      </Card>

      {/* Safety Features */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-green-500" />
          <h3 className="font-bold">Safety Features</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Share location with family</p>
              <p className="text-sm text-muted-foreground">Let your family track your service</p>
            </div>
            <Switch
              checked={shareLocation}
              onCheckedChange={setShareLocation}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-notify family</p>
              <p className="text-sm text-muted-foreground">Send automatic updates to emergency contacts</p>
            </div>
            <Switch
              checked={autoNotifyFamily}
              onCheckedChange={setAutoNotifyFamily}
            />
          </div>
        </div>
      </Card>
      
      <div className="grid gap-6">
        {/* Location */}
        <div>
          <Label htmlFor="location">Pickup Location</Label>
          <div className="relative">
            <Input 
              id="location" 
              className="app-input peer" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your current location"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            📍 We'll use your GPS location for accuracy
          </p>
        </div>
        
        {/* Vehicle Details */}
        <div>
          <Label htmlFor="vehicleDetails">Vehicle Information *</Label>
          <div className="relative">
            <Input 
              id="vehicleDetails" 
              className="app-input peer" 
              placeholder="e.g., 2020 Honda Civic, Blue"
              value={vehicleDetails}
              onChange={(e) => setVehicleDetails(e.target.value)}
              required
            />
            <Car className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
          </div>
        </div>
        
        {/* Additional Information */}
        <div>
          <Label htmlFor="description">Additional Information</Label>
          <Textarea 
            id="description" 
            className="app-input min-h-[100px]" 
            placeholder="Any additional details that might help..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Photo Upload (Placeholder) */}
        <div>
          <Label>Add Photos (Optional)</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload photos to help us understand the issue</p>
            <Button variant="outline" size="sm" disabled>
              Choose Photos
            </Button>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button className="app-button mt-4" onClick={handleSubmitRequest}>
          Request Help - ${totalPrice}
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center">
          By requesting service, you agree to our Terms of Service and Privacy Policy. 
          Payment processed only after service completion.
        </p>
      </div>
    </div>
  );
}
