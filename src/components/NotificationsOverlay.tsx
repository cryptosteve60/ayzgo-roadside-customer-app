import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsOverlayProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({ isOpen, onOpen, onClose }) => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Service Completed',
      message: 'Your battery jump service was completed successfully',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New Service Available',
      message: 'EV charging service is now available in your area',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '3',
      type: 'warning',
      title: 'High Demand Alert',
      message: 'Increased wait times due to high demand in your area',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed top-72 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-indigo-500 hover:bg-indigo-600 shadow-lg relative"
          onClick={onOpen}
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-72 right-4 z-40">
      <Card className="p-4 w-72 h-80 shadow-lg flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-500" />
            <h3 className="font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = getIcon(notification.type);
              return (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-secondary/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className={`h-4 w-4 mt-0.5 ${getIconColor(notification.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <Button variant="outline" size="sm" className="w-full mt-4">
          Mark All as Read
        </Button>
      </Card>
    </div>
  );
};

export default NotificationsOverlay;
