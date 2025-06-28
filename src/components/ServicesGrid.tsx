import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Battery, Car, Fuel, Lock, Flag, Plug } from "lucide-react";
const services = [{
  type: "battery",
  title: "Battery Jump Start",
  price: "$49",
  icon: Battery,
  description: "Dead battery? We'll get you back on the road in minutes.",
  details: ["Professional-grade jump starter equipment", "Battery health diagnostic check", "Safety inspection before jump start", "Advice on battery replacement if needed"],
  timeEstimate: "15-20 minutes",
  coverage: "Available 24/7"
}, {
  type: "tire",
  title: "Tire Change Service",
  price: "$69",
  icon: Car,
  description: "Flat tire? Our experts will safely change it for you.",
  details: ["Professional tire mounting and balancing", "Proper torque specifications applied", "Spare tire inspection and inflation", "Disposal of damaged tire (if requested)"],
  timeEstimate: "20-30 minutes",
  coverage: "Available 24/7"
}, {
  type: "fuel",
  title: "Emergency Fuel Delivery",
  price: "$45",
  icon: Fuel,
  description: "Ran out of gas? We'll bring fuel directly to you.",
  details: ["Up to 2 gallons of gasoline delivered", "Premium fuel quality guaranteed", "EPA-approved fuel containers", "Safe fuel transfer procedures"],
  timeEstimate: "15-25 minutes",
  coverage: "Available 24/7"
}, {
  type: "lockout",
  title: "Vehicle Lockout Service",
  price: "$75",
  icon: Lock,
  description: "Locked out of your car? We'll get you back in safely.",
  details: ["Non-destructive entry techniques", "Professional locksmith tools", "No damage to vehicle guaranteed", "Works on most vehicle makes and models"],
  timeEstimate: "10-20 minutes",
  coverage: "Available 24/7"
}, {
  type: "tow",
  title: "Towing Service",
  price: "$99",
  icon: Flag,
  description: "Need a tow? Professional and safe vehicle transport.",
  details: ["Flatbed towing for maximum safety", "Up to 10 miles included in base price", "Licensed and insured operators", "Secure vehicle loading and transport"],
  timeEstimate: "30-45 minutes",
  coverage: "Available 24/7"
}, {
  type: "charging",
  title: "EV Charging Assistance",
  price: "$59",
  icon: Plug,
  description: "Electric vehicle out of charge? Mobile charging solution.",
  details: ["Portable EV charging equipment", "Compatible with most EV models", "Enough charge to reach nearest station", "EV-certified technicians"],
  timeEstimate: "30-60 minutes",
  coverage: "Available in major cities"
}];
export default function ServicesGrid() {
  const navigate = useNavigate();
  const handleRequestService = (serviceType: string) => {
    navigate(`/request/${serviceType}`);
  };
  return <section className="py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => {
          const IconComponent = service.icon;
          return <Card key={service.type} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-center">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Time:</span>
                    <span className="font-medium">{service.timeEstimate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium">{service.coverage}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-center">What's Included:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {service.details.map((detail, index) => <li key={index} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{detail}</span>
                      </li>)}
                  </ul>
                </div>
                
                <Button className="w-full" onClick={() => handleRequestService(service.type)}>
                  Request {service.title}
                </Button>
              </Card>;
        })}
        </div>
      </div>
    </section>;
}