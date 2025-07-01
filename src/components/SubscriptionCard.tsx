
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { SubscriptionTier } from '@/hooks/useSubscription';

interface SubscriptionCardProps {
  tier: SubscriptionTier;
  isCurrentTier?: boolean;
  onUpgrade: (tierId: string) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  tier, 
  isCurrentTier = false, 
  onUpgrade 
}) => {
  return (
    <Card className={`p-6 relative ${isCurrentTier ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
      {isCurrentTier && (
        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">
          Your Plan
        </Badge>
      )}
      {tier.priority === 2 && (
        <Badge className="absolute -top-2 right-4 bg-orange-500">
          <Star className="h-3 w-3 mr-1" />
          Popular
        </Badge>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
        <div className="text-3xl font-bold text-primary mb-1">
          ${tier.price}
          {tier.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
        </div>
        {tier.price === 0 && <p className="text-sm text-muted-foreground">Forever free</p>}
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
        variant={isCurrentTier ? "outline" : "default"}
        onClick={() => onUpgrade(tier.id)}
        disabled={isCurrentTier}
      >
        {isCurrentTier ? "Current Plan" : tier.price === 0 ? "Get Started" : "Upgrade"}
      </Button>
    </Card>
  );
};

export default SubscriptionCard;
