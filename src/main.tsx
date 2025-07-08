import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Initialize your React application
// This line remains unchanged, as it correctly mounts your App component
// into the '#root' div, managing your UI.
createRoot(document.getElementById("root")!).render(<App />);

// 2. Define an asynchronous function to initialize your Google Map
//    This function will dynamically load the necessary Google Maps libraries
//    and then create and render your map.
async function initializeGoogleMap(): Promise<void> {
  // First, we need to make sure the Google Maps API loader has run
  // and that the 'google.maps.importLibrary' function is available globally.
  // The script tag in your index.html ensures this.
  if (typeof google === 'undefined' || !google.maps || !google.maps.importLibrary) {
    console.error("Google Maps API not fully loaded or 'importLibrary' not available. " +
                  "Please ensure the Maps API script is correctly included in index.html.");
    return; // Exit if the API isn't ready
  }

  try {
    // Dynamically load the 'maps' library. This is the core library for creating a map.
    // The 'as google.maps.MapsLibrary' is a TypeScript type assertion for better autocompletion.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    // Get the HTML element where the map will be displayed.
    // This targets the '<div id="map"></div>' you added in index.html.
    const mapDiv = document.getElementById("map");

    // It's good practice to check if the div exists before trying to use it.
    if (!mapDiv) {
      console.error("Map container element with id='map' not found in the DOM. " +
                    "Make sure you have <div id='map'></div> in your index.html.");
      return;
    }

    // Now, let's create and configure your map!
    // You can adjust the 'center' coordinates (latitude and longitude) and 'zoom' level
    // to your preferred starting view.
    const map = new Map(mapDiv, {
      center: { lat: 37.7749, lng: -122.4194 }, // Example: San Francisco coordinates
      zoom: 12, // A good default zoom level for city view
      // Optional: If you've created a custom map style in the Google Cloud Console,
      // you can use its Map ID here. Replace "YOUR_MAP_ID" with your actual ID.
      // mapId: "YOUR_MAP_ID",
      // You can add many more options here, like disabling UI controls, setting min/max zoom, etc.
    });

    // Example: Add a simple marker to your map (requires the 'marker' library)
    // If you want to use markers, you'll also dynamically import the 'marker' library.
    const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    new Marker({
      map: map,
      position: { lat: 37.7749, lng: -122.4194 }, // Same as map center for this example
      title: "Hello Ayzgo!",
    });

    console.log("Google Map successfully initialized and ready!");

  } catch (error) {
    // Catch any errors during the map loading or initialization process
    console.error("Error initializing Google Map:", error);
  }
}

// 3. Call the map initialization function.
//    Because 'initializeGoogleMap' is an async function, it will run in the background
//    without blocking your React app from rendering. The 'await' calls inside it
//    will simply pause execution *within that function* until the Google Maps libraries
//    are downloaded and ready.
initializeGoogleMap();

