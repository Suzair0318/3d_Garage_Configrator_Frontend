import React, { useState, useEffect } from 'react';
import BuildingTypePanel from './panels/BuildingTypePanel';
import SizePanel from './panels/SizePanel';
import ColorsPanel from './panels/ColorsPanel';
import DefaultPanel from './panels/DefaultPanel';
import LeanPanel from './panels/LeanPanel';
import SidePanel from './panels/SidePanel';

const SlidingPanel = ({ activeMenuItem, isVisible, onClose , setActiveIndex , setActivePanelItem }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null); 
  const [selectedItem , setSelectedItem] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, activeMenuItem]);

  const renderPanelContent = () => {
    if (!activeMenuItem) return null;

    switch (activeMenuItem.id) {
      case 'building':
        return <BuildingTypePanel 
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setActiveIndex={setActiveIndex}
        setActivePanelItem={setActivePanelItem}
        />;
      case 'size':
        return <SizePanel />;
      case 'colors':
        return <ColorsPanel />;
      case 'lean':
        return <LeanPanel />;
      case 'sides':
        return <SidePanel />;
      case 'doors':
        return <DefaultPanel title="Doors & Windows" description="Select and position doors, windows, and other openings." />;
      case 'options':
        return <DefaultPanel title="Additional Options" description="Explore extra features and customization options." />;
      case 'summary':
        return <DefaultPanel title="Configuration Summary" description="Review your garage configuration and specifications." />;
      case 'quotes':
        return <DefaultPanel title="Get Quote" description="Calculate pricing and request a detailed quote." />;
      default:
        return <DefaultPanel title={activeMenuItem.label} />;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop - Invisible click area */}
      <div 
        className={`
          fixed inset-0 z-30 transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div
        className={`
          fixed left-24 top-6 bottom-6 z-40 w-80 flex flex-col
          bg-white rounded-2xl shadow-2xl border border-gray-200/50
          transform transition-all duration-300 ease-out backdrop-blur-sm 
          ${isVisible && !isAnimating 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-4 opacity-0 scale-95'
          }
        `}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-0.5">
            {activeMenuItem?.icon && (
              <div className="w-8 h-8 text-[#FF1717] mt-2">
                <activeMenuItem.icon />
              </div>
            )}
            <h2 className="text-lg font-semibold text-[#FF1717]">
              {activeMenuItem?.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group"
          >
            <svg 
              className="w-4 h-4 text-gray-500 group-hover:text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            {renderPanelContent()}
          </div>
        </div>

        {/* Panel Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF1717] focus:ring-offset-2">
              Reset
            </button>
            <button className="flex-1 px-4 py-2 bg-[#FF1717] text-white rounded-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidingPanel;
