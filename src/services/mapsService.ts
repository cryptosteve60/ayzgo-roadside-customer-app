
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
      const { data, error } = await supabase.functions.invoke('maps-reverse-geocode', {
        body: { lat, lng }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      return data.data;
    } catch {
      return null;
    }
  }

  async geocode(address: string): Promise<Coordinates | null> {
    try {
      const { data, error } = await supabase.functions.invoke('maps-geocode', {
        body: { address }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      return data.data.coordinates;
    } catch {
      return null;
    }
  }

  async getDirections(
    origin: Coordinates | string,
    destination: Coordinates | string,
    travelMode = 'DRIVING'
  ): Promise<unknown> {
    try {
      const { data, error } = await supabase.functions.invoke('maps-directions', {
        body: { origin, destination, travelMode }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);

      return data.data;
    } catch {
      return null;
    }
  }
}

export const mapsService = new MapsService();
