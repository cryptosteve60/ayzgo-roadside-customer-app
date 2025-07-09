
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Phone, Mail, HelpCircle, MapPin } from 'lucide-react';

interface SupportOverlayProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SupportOverlay: React.FC<SupportOverlayProps> = ({ isOpen, onOpen, onClose }) => {
  const quickHelpOptions = [
    { title: 'Track my service', icon: MapPin, action: () => console.log('Track service') },
    { title: 'Cancel request', icon: X, action: () => console.log('Cancel request') },
    { title: 'Payment issues', icon: Phone, action: () => console.log('Payment help') },
    { title: 'Report problem', icon: HelpCircle, action: () => console.log('Report problem') }
  ];

  if (!isOpen) {
    return (
      <div className="fixed top-56 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg"
          onClick={onOpen}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-56 right-4 z-40">
      <Card className="p-3 w-64 h-72 shadow-lg flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-purple-500" />
            <h3 className="font-bold text-sm">Support</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="space-y-3 flex-1">
          <div>
            <h4 className="font-medium mb-2 text-xs">Quick Help</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickHelpOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 text-xs"
                  onClick={option.action}
                >
                  {option.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2 text-xs">Contact Support</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start h-7 text-xs">
                <Phone className="h-3 w-3 mr-2" />
                Call Support: (555) 123-4567
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start h-7 text-xs">
                <Mail className="h-3 w-3 mr-2" />
                Email: support@ayzgo.com
              </Button>
            </div>
          </div>
        </div>

        <Button className="w-full mt-3 bg-purple-500 hover:bg-purple-600 h-7 text-xs">
          Start Live Chat
        </Button>
      </Card>
    </div>
  );
};

export default SupportOverlay;
