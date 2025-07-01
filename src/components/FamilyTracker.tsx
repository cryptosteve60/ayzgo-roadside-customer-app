
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useFamilyTracking } from '@/hooks/useFamilyTracking';
import { MapPin, Phone, Users } from 'lucide-react';

const FamilyTracker: React.FC = () => {
  const {
    familyMembers,
    shareLocation,
    setShareLocation,
    toggleTracking,
    notifyFamily
  } = useFamilyTracking();

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Family Safety</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Share My Location</p>
            <p className="text-sm text-muted-foreground">
              Let family track you during services
            </p>
          </div>
          <Switch
            checked={shareLocation}
            onCheckedChange={setShareLocation}
          />
        </div>

        <div className="space-y-2">
          <p className="font-medium">Family Members</p>
          {familyMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{member.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.relationship}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {member.lastLocation && (
                  <MapPin className="h-4 w-4 text-green-500" />
                )}
                <Switch
                  checked={member.isTracking}
                  onCheckedChange={() => toggleTracking(member.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => notifyFamily('I need roadside assistance')}
          className="w-full"
        >
          <Phone className="h-4 w-4 mr-2" />
          Notify Family
        </Button>
      </div>
    </Card>
  );
};

export default FamilyTracker;
