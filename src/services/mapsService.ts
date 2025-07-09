
import { supabase } from '@/integrations/supabase/client';

export interface AddressData {
  city?: string;
  state?: string;
  fullAddress?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

class MapsService {
  async reverseGeocode(lat: number, lng: number): Promise<AddressData | null> {
    try {
      console.log('Calling maps-reverse-geocode edge function:', { lat, lng });
      
      const { data, error } = await supabase.functions.invoke('maps-reverse-geocode', {
        body: { lat, lng }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data.success) {
        console.error('Maps API error:', data.error);
        throw new Error(data.error);
      }

      console.log('Reverse geocoding successful:', data.data);
      return data.data;
    } catch (error) {
      console.error('Error in reverseGeocode:', error);
      return null;
    }
  }

  async geocode(address: string): Promise<Coordinates | null> {
    try {
      console.log('Calling maps-geocode edge function:', { address });
      
      const { data, error } = await supabase.functions.invoke('maps-geocode', {
        body: { address }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data.success) {
        console.error('Maps API error:', data.error);
        throw new Error(data.error);
      }

      console.log('Geocoding successful:', data.data);
      return data.data.coordinates;
    } catch (error) {
      console.error('Error in geocode:', error);
      return null;
    }
  }

  async getDirections(origin: Coordinates | string, destination: Coordinates | string, travelMode = 'DRIVING') {
    try {
      console.log('Calling maps-directions edge function:', { origin, destination, travelMode });
      
      const { data, error } = await supabase.functions.invoke('maps-directions', {
        body: { origin, destination, travelMode }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data.success) {
        console.error('Maps API error:', data.error);
        throw new Error(data.error);
      }

      console.log('Directions successful');
      return data.data;
    } catch (error) {
      console.error('Error in getDirections:', error);
      return null;
    }
  }
}

export const mapsService = new MapsService();
