
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Battery, Car, Fuel, Lock, Flag, Zap, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceType } from '@/contexts/AppContext';

const ServiceRequestOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const services = [
    { 
      type: 'battery' as ServiceType, 
      name: 'Battery Jump', 
      icon: Battery, 
      price: 49,
      availability: 'Available',
      eta: '8-12 min',
      providersNearby: 4
    },
    { 
      type: 'tire' as ServiceType, 
      name: 'Tire Change', 
      icon: Car, 
      price: 69,
      availability: 'Available',
      eta: '10-15 min',
      providersNearby: 3
    },
    { 
      type: 'fuel' as ServiceType, 
      name: 'Fuel Delivery', 
      icon: Fuel, 
      price: 45,
      availability: 'Available',
      eta: '12-18 min',
      providersNearby: 5
    },
    { 
      type: 'lockout' as ServiceType, 
      name: 'Lockout', 
      icon: Lock, 
      price: 75,
      availability: 'Limited',
      eta: '15-25 min',
      providersNearby: 2
    },
    { 
      type: 'tow' as ServiceType, 
      name: 'Towing', 
      icon: Flag, 
      price: 99,
      availability: 'Available',
      eta: '20-30 min',
      providersNearby: 3
    },
    { 
      type: 'charging' as ServiceType, 
      name: 'EV Charging', 
      icon: Zap, 
      price: 59,
      availability: 'Available',
      eta: '10-15 min',
      providersNearby: 2
    }
  ];

  const handleServiceSelect = (serviceType: ServiceType) => {
    navigate(`/request/${serviceType}`);
    setIsOpen(false);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Busy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Services Available in Your Area</h3>
            <p className="text-sm text-muted-foreground">Real-time availability and estimated arrival times</p>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              {services.map((service) => (
                <Button
                  key={service.type}
                  variant="outline"
                  className="h-auto p-4 flex justify-between items-center text-left"
                  onClick={() => handleServiceSelect(service.type)}
                >
                  <div className="flex items-center gap-3">
                    <service.icon className="h-6 w-6 text-primary" />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.eta}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {service.providersNearby} nearby
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">${service.price}</div>
                    <Badge 
                      className={`text-xs ${getAvailabilityColor(service.availability)}`}
                      variant="secondary"
                    >
                      {service.availability}
                    </Badge>
                  </div>
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
