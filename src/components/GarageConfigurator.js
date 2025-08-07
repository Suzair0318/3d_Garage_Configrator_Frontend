import React from 'react';
import LeftMenuPanel from './LeftMenuPanel';

const GarageConfigurator = () => {
  const handleMenuItemClick = (label, index) => {
    console.log(`Menu item clicked: ${label} at index ${index}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,23,23,0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex">
        {/* Left Menu Panel */}
        <LeftMenuPanel onMenuItemClick={handleMenuItemClick} />
        
        {/* Main Content */}
        <div className="flex-1 ml-32 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              3D Garage Configurator
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Design and customize your perfect garage with our interactive 3D configurator.
              Click on any menu item on the left to start customizing.
            </p>
            
            {/* 3D Viewer Placeholder */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    3D Garage Preview
                  </h3>
                  <p className="text-gray-500">
                    Your customized garage will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageConfigurator;
