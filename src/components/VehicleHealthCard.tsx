
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVehicleHealth } from '@/hooks/useVehicleHealth';
import { Car, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const VehicleHealthCard: React.FC = () => {
  const { vehicles, getOverdueItems, getUpcomingItems } = useVehicleHealth();
  const overdueItems = getOverdueItems();
  const upcomingItems = getUpcomingItems();
  const primaryVehicle = vehicles[0];

  if (!primaryVehicle) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-primary" />
        <h3 className="font-bold">Vehicle Health</h3>
        <Badge variant={primaryVehicle.healthScore >= 80 ? "default" : "destructive"}>
          {primaryVehicle.healthScore}%
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="p-2 bg-secondary/50 rounded-md">
          <p className="font-medium text-sm">
            {primaryVehicle.year} {primaryVehicle.make} {primaryVehicle.model}
          </p>
          <p className="text-xs text-muted-foreground">
            {primaryVehicle.mileage.toLocaleString()} miles
          </p>
        </div>

        {overdueItems.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">Overdue Items</span>
            </div>
            {overdueItems.slice(0, 2).map(item => (
              <div key={item.id} className="text-xs bg-red-50 p-2 rounded border-l-2 border-red-500">
                {item.name} - ${item.cost}
              </div>
            ))}
          </div>
        )}

        {upcomingItems.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-600">Coming Up</span>
            </div>
            {upcomingItems.slice(0, 2).map(item => (
              <div key={item.id} className="text-xs bg-yellow-50 p-2 rounded border-l-2 border-yellow-500">
                {item.name} - ${item.cost}
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full">
          View Full Report
        </Button>
      </div>
    </Card>
  );
};

export default VehicleHealthCard;
