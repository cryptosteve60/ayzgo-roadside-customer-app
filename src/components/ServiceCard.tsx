
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceType } from "@/contexts/AppContext";
import { Battery, Car, Flag, Fuel, Lock, Plug } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  type: ServiceType;
  title: string;
  price: number;
  description: string;
}

export default function ServiceCard({ type, title, price, description }: ServiceCardProps) {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (type) {
      case "battery":
        return <Battery className="h-8 w-8 text-primary" />;
      case "tire":
        return <Car className="h-8 w-8 text-primary" />;
      case "fuel":
        return <Fuel className="h-8 w-8 text-primary" />;
      case "lockout":
        return <Lock className="h-8 w-8 text-primary" />;
      case "tow":
        return <Flag className="h-8 w-8 text-primary" />;
      case "charging":
        return <Plug className="h-8 w-8 text-primary" />;
    }
  };
  
  const handleSelect = () => {
    navigate(`/request/${type}`);
  };
  
  return (
    <Card className="app-card flex flex-col relative">
      {price > 60 && (
        <Badge className="absolute -top-2 -right-2 bg-orange-500">
          Premium
        </Badge>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-accent rounded-md">
          {getIcon()}
        </div>
        <span className="text-primary font-bold text-lg">${price}</span>
      </div>
      
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
      
      <Button 
        className="app-button" 
        onClick={handleSelect}
      >
        Select Service
      </Button>
    </Card>
  );
}
