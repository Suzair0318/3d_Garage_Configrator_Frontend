import { useState , useEffect } from 'react';
import SlidingPanel from './SlidingPanel';

export default function LeftMenuPanel({ onMenuItemClick , activeIndex , setActiveIndex , activePanelItem , setActivePanelItem , isPanelVisible , setIsPanelVisible , menuItems }) {

  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    
    // If clicking the same item, toggle panel visibility
    if (activePanelItem?.id === item.id && isPanelVisible) {
      setIsPanelVisible(false);
      setActivePanelItem(null);
    } else {
      // Show panel for the clicked item
      setActivePanelItem(item);
      setIsPanelVisible(true);
    }
    
    onMenuItemClick?.(item.label, index);
  };

  const handleClosePanel = () => {
    setIsPanelVisible(false);
    setActivePanelItem(null);
  };

  return (
    <>
    <div className="fixed left-6 top-80 -translate-y-1/2 z-20 animate-in slide-in-from-left-5 duration-500">
      {/* Sidebar Container */}
      <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-2xl p-2  shadow-2xl border border-gray-200/50 ring-1 ring-black/5">
        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;
          
            return (
              <div
                key={item.id}
                className={`
                  group relative overflow-hidden rounded-xl cursor-pointer 
                  transition-all duration-300 ease-out transform hover:scale-105
                  flex items-center justify-center w-14 h-14
                  backdrop-blur-sm border 
                  ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-[#FF1717] border-t-slate-200 border-r-slate-200 border-b-slate-200 shadow-lg shadow-red-500/10 scale-105'
                      : 'bg-white/80 border-2 border-gray-200/60 text-gray-600 shadow-sm hover:bg-white hover:shadow-md  hover:border'
                  }
                `}
                onClick={() => handleItemClick(item, index)}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-gradient-radial from-white/30 via-transparent to-transparent transition-opacity duration-150" />
                
                {/* Icon */}
                <div className={`
                  transition-all duration-300 transform group-hover:scale-110
                  ${
                    isActive
                      ? 'text-[#FF1717] drop-shadow-sm'
                      : 'text-gray-500 group-hover:text-gray-700'
                  }
                `}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                {/* Hover Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none z-50">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
                    {item.label}
                    {/* Tooltip arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-sm animate-pulse" />
                  </>
                )}
                
                {/* Hover glow effect */}
                <div className={`
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-400/10 to-blue-600/10'
                      : 'bg-gradient-to-br from-gray-400/5 to-gray-600/5'
                  }
                `} />
              </div>
            );
          })}
        </div>
        
        {/* Bottom accent line */}
        <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />
      </div>
      
      {/* Floating shadow */}
      <div className="absolute inset-0 -z-10 bg-black/5 blur-xl rounded-2xl transform translate-y-2 scale-95" />
    </div>

    {/* Sliding Panel */}
    <SlidingPanel
      activeMenuItem={activePanelItem}
      isVisible={isPanelVisible}
      onClose={handleClosePanel}
    />
  </>
  );
}
