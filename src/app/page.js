'use client';

import ConfiguratorLayout from '../components/ConfiguratorLayout';
import ConfiguratorIframe from '../components/ConfiguratorIframe';
import TopInfoPanel from '../components/TopInfoPanel';
import LeftMenuPanel from '../components/LeftMenuPanel';
import BottomControlPanel from '../components/BottomControlPanel';
import useConfiguratorState from '../hooks/useConfiguratorState';

export default function Home() {
  const {
    selectedMenuItem,
    zoomLevel,
    rotation,
    frameOnly,
    handleMenuItemClick,
    handleControlClick
  } = useConfiguratorState();

  return (
    <ConfiguratorLayout>
      {/* <ConfiguratorIframe /> */}
  
      {/* <TopInfoPanel />
      <LeftMenuPanel onMenuItemClick={handleMenuItemClick} />
      <BottomControlPanel onControlClick={handleControlClick} /> */}
      
      
      {/* Debug info - can be removed in production */}
      {selectedMenuItem && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          Selected: {selectedMenuItem.label}
        </div>
      )} 
    </ConfiguratorLayout>
  );
}
