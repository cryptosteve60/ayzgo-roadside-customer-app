
import { useState } from 'react';

type OverlayType = 'rewards' | 'safety' | 'community' | 'location' | 'support' | 'notifications' | 'service' | null;

export const useExclusiveOverlay = () => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);

  const openOverlay = (overlay: OverlayType) => {
    setActiveOverlay(overlay);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  const isOverlayActive = (overlay: OverlayType) => {
    return activeOverlay === overlay;
  };

  return {
    activeOverlay,
    openOverlay,
    closeOverlay,
    isOverlayActive
  };
};
