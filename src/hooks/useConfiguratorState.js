import { useState, useCallback } from 'react';

export default function useConfiguratorState() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [frameOnly, setFrameOnly] = useState(false);

  const handleMenuItemClick = useCallback((label, index) => {
    setSelectedMenuItem({ label, index });
    console.log(`Menu item clicked: ${label} (index: ${index})`);
  }, []);

  const handleControlClick = useCallback((title, index) => {
    console.log(`Control clicked: ${title} (index: ${index})`);
    
    switch (title) {
      case 'Frame Only':
        setFrameOnly(prev => !prev);
        break;
      case 'Rotate 360':
        setRotation(prev => prev + 90);
        break;
      case 'Zoom In':
        setZoomLevel(prev => Math.min(prev + 0.1, 3));
        break;
      case 'Zoom Out':
        setZoomLevel(prev => Math.max(prev - 0.1, 0.1));
        break;
      default:
        break;
    }
  }, []);

  return {
    selectedMenuItem,
    zoomLevel,
    rotation,
    frameOnly,
    handleMenuItemClick,
    handleControlClick
  };
}
