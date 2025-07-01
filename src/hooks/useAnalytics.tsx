
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  totalRequests: number;
  avgResponseTime: number;
  customerSatisfaction: number;
  popularServices: { service: string; count: number }[];
  peakHours: { hour: number; requests: number }[];
  revenueData: { month: string; revenue: number }[];
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRequests: 0,
    avgResponseTime: 0,
    customerSatisfaction: 0,
    popularServices: [],
    peakHours: [],
    revenueData: []
  });

  useEffect(() => {
    // Simulate analytics data - in real app, this would come from Supabase
    const mockData: AnalyticsData = {
      totalRequests: 12548,
      avgResponseTime: 18.5,
      customerSatisfaction: 4.8,
      popularServices: [
        { service: 'Battery Jump', count: 4521 },
        { service: 'Tire Change', count: 3892 },
        { service: 'Lockout Service', count: 2134 },
        { service: 'Fuel Delivery', count: 1678 },
        { service: 'Towing Service', count: 323 }
      ],
      peakHours: [
        { hour: 8, requests: 125 },
        { hour: 12, requests: 89 },
        { hour: 17, requests: 156 },
        { hour: 19, requests: 134 },
        { hour: 22, requests: 78 }
      ],
      revenueData: [
        { month: 'Jan', revenue: 45200 },
        { month: 'Feb', revenue: 52100 },
        { month: 'Mar', revenue: 48900 },
        { month: 'Apr', revenue: 61200 },
        { month: 'May', revenue: 67800 },
        { month: 'Jun', revenue: 73400 }
      ]
    };
    
    setAnalytics(mockData);
  }, []);

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    console.log('Analytics Event:', eventName, properties);
    // In real app, send to analytics service
  };

  return {
    analytics,
    trackEvent
  };
};
