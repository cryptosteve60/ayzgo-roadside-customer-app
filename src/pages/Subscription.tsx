
import React from 'react';
import Layout from '@/components/Layout';
import ServiceTierCard from '@/components/ServiceTierCard';
import { useServiceTiers } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, DollarSign, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTier, selectTier, tiers } = useServiceTiers();

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Service Options
            </h1>
            <p className="text-muted-foreground">Choose your service level for each request - no subscriptions needed!</p>
          </div>
        </div>

        {/* How It Works */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-orange-500/5">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            How Our Pricing Works
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">💰 Pay Per Use</h3>
              <p className="text-muted-foreground">Only pay when you need help - no monthly fees or commitments</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">⚡ Choose Your Speed</h3>
              <p className="text-muted-foreground">Select service level based on how urgent your situation is</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">🚗 Service + Fee</h3>
              <p className="text-muted-foreground">Service cost + small service fee (covers platform, insurance, support)</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">📱 Full Transparency</h3>
              <p className="text-muted-foreground">See exact costs upfront - no hidden fees or surprise charges</p>
            </div>
          </div>
        </Card>

        {/* Service Tiers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Service Levels Available</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <ServiceTierCard
                key={tier.id}
                tier={tier}
                isSelected={tier.id === selectedTier.id}
                onSelect={selectTier}
              />
            ))}
          </div>
        </div>

        {/* Example Breakdown */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Example: Battery Jump Service</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Battery Jump Service</span>
              <span>$49.00</span>
            </div>
            <div className="flex justify-between">
              <span>{selectedTier.name} Fee</span>
              <span>+${selectedTier.serviceFee}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Cost</span>
              <span>${(49 + selectedTier.serviceFee).toFixed(2)}</span>
            </div>
            <p className="text-muted-foreground text-xs mt-2">
              * Final price shown before confirming each request
            </p>
          </div>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">No Commitments</h3>
            <p className="text-sm text-muted-foreground">Use when you need it, nothing when you don't</p>
          </Card>
          <Card className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">Always Protected</h3>
            <p className="text-sm text-muted-foreground">Every service includes insurance and support</p>
          </Card>
          <Card className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">Choose Your Speed</h3>
            <p className="text-sm text-muted-foreground">From standard to premium response times</p>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => navigate('/')} size="lg">
            Start Using Ayzgo - No Signup Required
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Ready to help 24/7 - pay only when you need us
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
