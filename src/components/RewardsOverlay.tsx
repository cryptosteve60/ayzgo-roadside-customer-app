
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, X, Star, DollarSign, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RewardsOverlayProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const RewardsOverlay: React.FC<RewardsOverlayProps> = ({ isOpen, onOpen, onClose }) => {
  const navigate = useNavigate();

  // Mock user rewards data
  const userRewards = {
    availableCredits: 45,
    referralCount: 8,
    level: "Gold Member"
  };

  const quickRewards = [
    { id: 1, title: "$5 Service Credit", cost: 25, available: true },
    { id: 2, title: "$10 Service Credit", cost: 50, available: false },
    { id: 3, title: "Free Car Wash", cost: 75, available: false }
  ];

  if (!isOpen) {
    return (
      <div className="fixed top-24 left-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow-lg"
          onClick={onOpen}
        >
          <Gift className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-24 left-4 z-40">
      <Card className="p-3 w-56 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-yellow-500" />
            <h3 className="font-bold text-sm">Rewards</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-secondary/50 rounded">
              <DollarSign className="h-3 w-3 mx-auto mb-1 text-green-500" />
              <div className="text-xs font-bold">${userRewards.availableCredits}</div>
              <div className="text-xs text-muted-foreground">Credits</div>
            </div>
            <div className="text-center p-2 bg-secondary/50 rounded">
              <Users className="h-3 w-3 mx-auto mb-1 text-blue-500" />
              <div className="text-xs font-bold">{userRewards.referralCount}</div>
              <div className="text-xs text-muted-foreground">Referrals</div>
            </div>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="text-yellow-600 text-xs">
              {userRewards.level}
            </Badge>
          </div>

          {/* Quick Rewards */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium">Quick Redeem</h4>
            {quickRewards.slice(0, 2).map((reward) => (
              <div 
                key={reward.id} 
                className={`flex items-center justify-between p-2 rounded text-xs ${
                  reward.available ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-xs">{reward.title}</span>
                <Button 
                  size="sm" 
                  disabled={!reward.available}
                  variant={reward.available ? "default" : "outline"}
                  className="h-5 text-xs px-2"
                >
                  {reward.cost}
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onClose();
              navigate('/rewards');
            }}
            className="w-full h-7 text-xs"
          >
            View All Rewards
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RewardsOverlay;
