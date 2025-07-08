
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Zap } from 'lucide-react';
import { ServiceTier } from '@/hooks/useSubscription';

interface ServiceTierCardProps {
  tier: ServiceTier;
  isSelected?: boolean;
  onSelect: (tierId: string) => void;
}

const ServiceTierCard: React.FC<ServiceTierCardProps> = ({ 
  tier, 
  isSelected = false, 
  onSelect 
}) => {
  const getIcon = () => {
    switch (tier.id) {
      case 'express':
        return <Clock className="h-4 w-4" />;
      case 'premium':
        return <Zap className="h-4 w-4" />;
      default:
        return <Check className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`p-6 relative cursor-pointer transition-all ${
      isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
    }`} onClick={() => onSelect(tier.id)}>
      {isSelected && (
        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">
          Selected
        </Badge>
      )}
      {tier.id === 'express' && (
        <Badge className="absolute -top-2 right-4 bg-orange-500 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Popular
        </Badge>
      )}
      
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {getIcon()}
          <h3 className="text-xl font-bold">{tier.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
        <div className="text-2xl font-bold text-primary">
          +${tier.serviceFee}
          <span className="text-sm text-muted-foreground block">service fee per request</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className="w-full" 
        variant={isSelected ? "default" : "outline"}
      >
        {isSelected ? "Selected" : "Select Service Level"}
      </Button>
    </Card>
  );
};

export default ServiceTierCard;
