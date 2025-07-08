
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  Gift, 
  Share, 
  Trophy, 
  Star, 
  Users, 
  DollarSign, 
  Copy, 
  CheckCircle,
  Target,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Rewards() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode] = useState("AYZGO-USER123");
  
  // Mock user rewards data
  const userRewards = {
    totalEarned: 125,
    availableCredits: 45,
    referralCount: 8,
    level: "Gold Member",
    nextLevelProgress: 75,
    nextLevelTarget: "Platinum Member"
  };

  const recentActivity = [
    { id: 1, type: "referral", description: "Friend signed up", amount: 25, date: "2 days ago" },
    { id: 2, type: "service", description: "Completed jump start", amount: 5, date: "1 week ago" },
    { id: 3, type: "review", description: "Left service review", amount: 3, date: "2 weeks ago" },
    { id: 4, type: "referral", description: "Friend's first service", amount: 15, date: "3 weeks ago" }
  ];

  const achievements = [
    { 
      id: 1, 
      title: "First Referral", 
      description: "Refer your first friend", 
      completed: true, 
      reward: 25,
      icon: Users 
    },
    { 
      id: 2, 
      title: "Service Champion", 
      description: "Complete 10 services", 
      completed: true, 
      reward: 50,
      icon: Trophy 
    },
    { 
      id: 3, 
      title: "Review Master", 
      description: "Leave 5 service reviews", 
      completed: false, 
      reward: 20,
      icon: Star 
    },
    { 
      id: 4, 
      title: "Super Referrer", 
      description: "Refer 10 friends", 
      completed: false, 
      reward: 100,
      icon: Target 
    }
  ];

  const rewards = [
    { id: 1, title: "$5 Service Credit", cost: 25, available: true },
    { id: 2, title: "$10 Service Credit", cost: 50, available: false },
    { id: 3, title: "$25 Service Credit", cost: 125, available: false },
    { id: 4, title: "Free Car Wash", cost: 75, available: false }
  ];

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the code manually"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Rewards & Referrals</h1>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Rewards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5">
            <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary mb-1">
              ${userRewards.totalEarned}
            </div>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Zap className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-600 mb-1">
              ${userRewards.availableCredits}
            </div>
            <p className="text-sm text-muted-foreground">Available Credits</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {userRewards.referralCount}
            </div>
            <p className="text-sm text-muted-foreground">Friends Referred</p>
          </Card>
          
          <Card className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-sm font-bold text-yellow-600 mb-1">
              {userRewards.level}
            </div>
            <p className="text-sm text-muted-foreground">Current Level</p>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Progress to {userRewards.nextLevelTarget}</h3>
            <Badge variant="outline">{userRewards.nextLevelProgress}%</Badge>
          </div>
          <Progress value={userRewards.nextLevelProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Earn 2 more referrals to unlock Platinum benefits
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share className="h-5 w-5" />
                Refer Friends & Earn
              </h3>
              <p className="text-muted-foreground mb-6">
                Earn $25 when friends sign up and $15 more when they complete their first service!
              </p>
              
              <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Your Referral Code</p>
                <div className="flex items-center gap-2">
                  <Input value={referralCode} readOnly className="font-mono" />
                  <Button variant="outline" size="sm" onClick={copyReferralCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share Code
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Link
                </Button>
              </div>
            </Card>

            {/* Available Rewards */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Redeem Rewards</h3>
              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div 
                    key={reward.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      reward.available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div>
                      <h4 className="font-medium">{reward.title}</h4>
                      <p className="text-sm text-muted-foreground">{reward.cost} credits</p>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!reward.available}
                      variant={reward.available ? "default" : "outline"}
                    >
                      {reward.available ? "Redeem" : "Not Available"}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Achievements & Activity */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className={`p-2 rounded-full ${
                      achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        {achievement.title}
                        {achievement.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant={achievement.completed ? "default" : "outline"}>
                      +${achievement.reward}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{activity.description}</h4>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      +${activity.amount}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
