
import React from 'react';
import Layout from '@/components/Layout';
import SubscriptionCard from '@/components/SubscriptionCard';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const { subscription, upgrade, tiers } = useSubscription();

  const handleUpgrade = (tierId: string) => {
    if (tierId === subscription.tier.id) return;
    
    upgrade(tierId);
    toast.success(`Successfully upgraded to ${tiers.find(t => t.id === tierId)?.name}!`);
  };

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
              <Crown className="h-6 w-6 text-primary" />
              Subscription Plans
            </h1>
            <p className="text-muted-foreground">Choose the plan that works best for you</p>
          </div>
        </div>

        {/* Current Plan Status */}
        <div className="mb-8 p-4 rounded-lg bg-secondary/50">
          <h2 className="font-bold mb-2">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{subscription.tier.name}</p>
              <p className="text-sm text-muted-foreground">
                {subscription.expiresAt 
                  ? `Expires ${subscription.expiresAt.toLocaleDateString()}`
                  : 'Active'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ${subscription.tier.price}
                {subscription.tier.price > 0 && <span className="text-sm">/mo</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier) => (
            <SubscriptionCard
              key={tier.id}
              tier={tier}
              isCurrentTier={tier.id === subscription.tier.id}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Why Upgrade?</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-secondary/30">
              <h3 className="font-medium mb-2">Faster Response</h3>
              <p className="text-muted-foreground">Premium members get priority dispatch</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <h3 className="font-medium mb-2">Save Money</h3>
              <p className="text-muted-foreground">Included services save you up to $200/year</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <h3 className="font-medium mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Always available when you need help</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
