
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, X, MessageCircle, AlertTriangle } from 'lucide-react';

interface CommunityMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  type: 'chat' | 'alert';
  location?: string;
}

const CommunityOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages] = useState<CommunityMessage[]>([
    {
      id: '1',
      user: 'Sarah M.',
      message: 'Heavy traffic on I-405 near LAX',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'alert',
      location: 'LAX Area'
    },
    {
      id: '2',
      user: 'Mike J.',
      message: 'Great service from roadside tech today!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'chat'
    },
    {
      id: '3',
      user: 'Lisa K.',
      message: 'Road closure on Main St due to construction',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: 'alert',
      location: 'Downtown'
    }
  ]);

  if (!isOpen) {
    return (
      <div className="fixed top-36 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg relative"
          onClick={() => setIsOpen(true)}
        >
          <Users className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-36 right-4 z-40">
      <Card className="p-4 w-72 h-80 shadow-lg flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            <h3 className="font-bold">Community</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 mb-1">
                  {msg.type === 'alert' ? (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  ) : (
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="font-medium text-sm">{msg.user}</span>
                  {msg.location && (
                    <span className="text-xs text-muted-foreground">• {msg.location}</span>
                  )}
                </div>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Button size="sm" className="w-full">
          Join Chat
        </Button>
      </Card>
    </div>
  );
};

export default CommunityOverlay;
