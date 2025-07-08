
import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Loader } from '@googlemaps/js-api-loader';

interface MapViewProps {
  height?: string;
  showCurrentLocation?: boolean;
  showJobLocation?: boolean;
  jobLocation?: { lat: number; lng: number };
  interactive?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  height = 'h-[200px]',
  showCurrentLocation = true,
  showJobLocation = false,
  jobLocation,
  interactive = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const { currentLocation } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use your API key directly
        const API_KEY = 'AIzaSyA6myHzS10YXdcazAFalmXvDkrYCp5cLc8';
        
        // Initialize Google Maps
        const loader = new Loader({
          apiKey: API_KEY,
          version: 'weekly',
          libraries: ['places', 'marker']
        });

        await loader.load();
        
        if (!mapRef.current) return;
        
        const mapOptions: google.maps.MapOptions = {
          center: currentLocation || { lat: 34.0522, lng: -118.2437 }, // Default to LA
          zoom: 15,
          disableDefaultUI: !interactive,
          gestureHandling: interactive ? 'auto' : 'none',
          zoomControl: interactive,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Add current location marker
        if (showCurrentLocation && currentLocation) {
          new google.maps.Marker({
            position: currentLocation,
            map: map,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
            }
          });
        }

        // Add job location marker
        if (showJobLocation && jobLocation) {
          new google.maps.Marker({
            position: jobLocation,
            map: map,
            title: 'Service Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B35"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
            }
          });

          // Draw route if both locations exist
          if (currentLocation) {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#FF6B35',
                strokeWeight: 4,
              }
            });
            
            directionsRenderer.setMap(map);
            
            directionsService.route({
              origin: currentLocation,
              destination: jobLocation,
              travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
              if (status === 'OK' && result) {
                directionsRenderer.setDirections(result);
              }
            });
          }
        }
        
        setIsLoading(false);
        console.log('Google Map successfully initialized!');
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map. Please check your API key authorization.');
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [currentLocation, showCurrentLocation, showJobLocation, jobLocation, interactive]);
  
  if (error) {
    return (
      <div className={`w-full ${height} rounded-lg border overflow-hidden flex items-center justify-center bg-secondary/50`}>
        <div className="text-center text-muted-foreground">
          <p className="font-medium">Map unavailable</p>
          <p className="text-xs">{error}</p>
          <p className="text-xs mt-1">Please authorize your domain in Google Cloud Console</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full ${height} rounded-lg border overflow-hidden relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        aria-label="Map view showing location"
      />
    </div>
  );
};

export default MapView;
