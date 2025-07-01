
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Battery, Car, Fuel, Lock, Flag, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceType } from '@/contexts/AppContext';

const ServiceRequestOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const services = [
    { type: 'battery' as ServiceType, name: 'Battery Jump', icon: Battery, price: 49 },
    { type: 'tire' as ServiceType, name: 'Tire Change', icon: Car, price: 69 },
    { type: 'fuel' as ServiceType, name: 'Fuel Delivery', icon: Fuel, price: 45 },
    { type: 'lockout' as ServiceType, name: 'Lockout', icon: Lock, price: 75 },
    { type: 'tow' as ServiceType, name: 'Towing', icon: Flag, price: 99 },
    { type: 'charging' as ServiceType, name: 'EV Charging', icon: Zap, price: 59 }
  ];

  const handleServiceSelect = (serviceType: ServiceType) => {
    navigate(`/request/${serviceType}`);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
        <Button
          className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg text-lg font-semibold"
          onClick={() => setIsOpen(true)}
        >
          Where do you need help?
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Card className="rounded-t-3xl border-0 shadow-2xl">
        <div className="p-6">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          <div className="relative mb-6">
            <Input
              placeholder="Enter pickup location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">What do you need help with?</h3>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <Button
                  key={service.type}
                  variant="outline"
                  className="h-16 flex flex-col gap-1 p-4"
                  onClick={() => handleServiceSelect(service.type)}
                >
                  <service.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{service.name}</span>
                  <span className="text-xs text-muted-foreground">${service.price}</span>
                </Button>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ServiceRequestOverlay;
