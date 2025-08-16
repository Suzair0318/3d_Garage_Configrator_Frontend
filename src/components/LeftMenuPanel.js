import { useState , useEffect } from 'react';
import SlidingPanel from './SlidingPanel';

export default function LeftMenuPanel({ onMenuItemClick , activeIndex , setActiveIndex , activePanelItem , setActivePanelItem , isPanelVisible , setIsPanelVisible , menuItems , setIsQuoteModalOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    
    // Special handling for quotes - open modal instead of sliding panel
    if (item.id === 'quotes') {
      setIsQuoteModalOpen(true);
      // Close any open sliding panel
      setIsPanelVisible(false);
      setActivePanelItem(null);
      onMenuItemClick?.(item.label, index);
      return;
    }
    
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
    {/* Desktop/Tablet Sidebar */}
    <div className="hidden sm:block fixed left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 animate-in slide-in-from-left-5 duration-500">
      {/* Sidebar Container */}
      <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-1.5 md:p-1 lg:p-2 shadow-lg sm:shadow-2xl border border-gray-200/50 ring-1 ring-black/5">
        {/* Menu Items */}
        <div className="flex flex-col gap-1 sm:gap-1 md:gap-1 lg:gap-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;
          
            return (
              <div
                key={item.id}
                className={`
                  group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer 
                  transition-all duration-300 ease-out transform hover:scale-105
                  flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-14 lg:h-14
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
                  <IconComponent className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>
                
                {/* Hover Tooltip - Hidden on mobile */}
                <div className="hidden sm:block absolute left-full ml-2 lg:ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none z-50">
                  <div className="bg-gray-900 text-white px-2 py-1 lg:px-3 lg:py-2 rounded-lg shadow-lg text-xs lg:text-sm font-medium whitespace-nowrap">
                    {item.label}
                    {/* Tooltip arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <>
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full shadow-sm animate-pulse" />
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
        <div className="mt-1 sm:mt-2 md:mt-1.5 lg:mt-3 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />
      </div>
      
      {/* Floating shadow */}
      <div className="absolute inset-0 -z-10 bg-black/5 blur-xl rounded-2xl transform translate-y-2 scale-95" />
    </div>

    {/* Mobile Bottom Navigation */}
    <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-2xl p-1.5 shadow-2xl border border-gray-200/50 ring-1 ring-black/5">
        <div className="flex gap-1">
          {menuItems.slice(0, 4).map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;
          
            return (
              <div
                key={item.id}
                className={`
                  group relative overflow-hidden rounded-xl cursor-pointer 
                  transition-all duration-300 ease-out transform active:scale-95
                  flex items-center justify-center w-10 h-10
                  backdrop-blur-sm border 
                  ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-[#FF1717] border-t-slate-200 border-r-slate-200 border-b-slate-200 shadow-lg shadow-red-500/10 scale-105'
                      : 'bg-white/80 border-2 border-gray-200/60 text-gray-600 shadow-sm active:bg-white active:shadow-md'
                  }
                `}
                onClick={() => handleItemClick(item, index)}
              >
                {/* Icon */}
                <div className={`
                  transition-all duration-300
                  ${
                    isActive
                      ? 'text-[#FF1717] drop-shadow-sm'
                      : 'text-gray-500'
                  }
                `}>
                  <IconComponent className="w-4 h-4" />
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full shadow-sm animate-pulse" />
                )}
              </div>
            );
          })}
          
          {/* More button if there are more than 4 items */}
          {menuItems.length > 4 && (
            <div
              className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ease-out transform active:scale-95 flex items-center justify-center w-10 h-10 backdrop-blur-sm bg-white/80 border-2 border-gray-200/60 text-gray-600 shadow-sm active:bg-white active:shadow-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="transition-all duration-300 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        {/* Extended menu for mobile */}
        {isMobileMenuOpen && menuItems.length > 4 && (
          <div className="mt-2 pt-2 border-t border-gray-200/50">
            <div className="flex gap-1">
              {menuItems.slice(4).map((item, index) => {
                const IconComponent = item.icon;
                const actualIndex = index + 4;
                const isActive = activeIndex === actualIndex;
              
                return (
                  <div
                    key={item.id}
                    className={`
                      group relative overflow-hidden rounded-xl cursor-pointer 
                      transition-all duration-300 ease-out transform active:scale-95
                      flex items-center justify-center w-10 h-10
                      backdrop-blur-sm border 
                      ${
                        isActive
                          ? 'bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-[#FF1717] border-t-slate-200 border-r-slate-200 border-b-slate-200 shadow-lg shadow-red-500/10 scale-105'
                          : 'bg-white/80 border-2 border-gray-200/60 text-gray-600 shadow-sm active:bg-white active:shadow-md'
                      }
                    `}
                    onClick={() => {
                      handleItemClick(item, actualIndex);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {/* Icon */}
                    <div className={`
                      transition-all duration-300
                      ${
                        isActive
                          ? 'text-[#FF1717] drop-shadow-sm'
                          : 'text-gray-500'
                      }
                    `}>
                      <IconComponent className="w-3 h-3" />
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-red-500 rounded-full shadow-sm animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
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
