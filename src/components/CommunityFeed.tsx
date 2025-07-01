
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ThumbsUp, MapPin, AlertTriangle } from 'lucide-react';

interface CommunityPost {
  id: string;
  type: 'review' | 'alert' | 'tip';
  author: string;
  content: string;
  location: string;
  timestamp: Date;
  likes: number;
  comments: number;
}

const CommunityFeed: React.FC = () => {
  const posts: CommunityPost[] = [
    {
      id: '1',
      type: 'alert',
      author: 'Sarah M.',
      content: 'Heavy traffic on I-405 due to accident. Allow extra time!',
      location: 'Los Angeles',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      likes: 12,
      comments: 3
    },
    {
      id: '2',
      type: 'review',
      author: 'Mike R.',
      content: 'Great service from driver Tom! Fast tire change and very professional.',
      location: 'Santa Monica',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 8,
      comments: 1
    },
    {
      id: '3',
      type: 'tip',
      author: 'Jennifer L.',
      content: 'Pro tip: Keep jumper cables in your trunk during winter months!',
      location: 'Community',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 25,
      comments: 7
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'review':
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'tip':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'destructive';
      case 'review':
        return 'default';
      case 'tip':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="font-bold mb-4">Community Updates</h3>
      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="p-3 bg-secondary/30 rounded-md">
            <div className="flex items-start gap-2 mb-2">
              {getIcon(post.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{post.author}</span>
                  <Badge variant={getTypeColor(post.type)} className="text-xs">
                    {post.type}
                  </Badge>
                </div>
                <p className="text-sm mb-2">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>{post.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommunityFeed;
