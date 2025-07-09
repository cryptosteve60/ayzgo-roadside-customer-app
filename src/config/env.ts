
export const config = {
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Helper to check if required environment variables are set
export const checkRequiredEnvVars = () => {
  const missing = [];
  
  if (!config.googleMapsApiKey) {
    missing.push('VITE_GOOGLE_MAPS_API_KEY');
  }
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing.join(', '));
    console.warn('Please add your Google Maps API key to the .env file');
  }
  
  return missing.length === 0;
};
