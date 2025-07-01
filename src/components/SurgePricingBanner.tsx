
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp } from 'lucide-react';

interface SurgePricingBannerProps {
  multiplier: number;
  reason: string;
}

const SurgePricingBanner: React.FC<SurgePricingBannerProps> = ({ multiplier, reason }) => {
  if (multiplier <= 1) return null;
  
  return (
    <Alert className="border-orange-200 bg-orange-50 mb-4">
      <TrendingUp className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <strong>High Demand Pricing:</strong> {multiplier}x pricing is in effect due to {reason}. 
        Premium members get reduced surge rates.
      </AlertDescription>
    </Alert>
  );
};

export default SurgePricingBanner;
