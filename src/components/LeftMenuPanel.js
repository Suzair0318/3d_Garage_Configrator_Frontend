import { useState } from 'react';

// Professional SVG icons as components
const IconBuilding = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconRuler = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const IconHome = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconGrid = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
  </svg>
);

const IconWindow = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

const IconCog = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconClipboard = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const IconCurrency = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const menuItems = [
  { icon: IconBuilding, label: 'Building Type', id: 'building' },
  { icon: IconRuler, label: 'Size', id: 'size' },
  { icon: IconHome, label: 'Lean', id: 'lean' },
  { icon: IconGrid, label: 'Sides', id: 'sides' },
  { icon: IconPalette, label: 'Colors', id: 'colors' },
  { icon: IconWindow, label: 'Door', id: 'doors' },
  { icon: IconCog, label: 'Options', id: 'options' },
  { icon: IconClipboard, label: 'Summary', id: 'summary' },
  { icon: IconCurrency, label: 'Quotes', id: 'quotes' }
];

export default function LeftMenuPanel({ onMenuItemClick }) {
  const [activeIndex, setActiveIndex] = useState(3); // Set "Sides & Ends" as active by default

  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    onMenuItemClick?.(item.label, index);
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 animate-in slide-in-from-left-5 duration-500">
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
                      ? 'bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-blue-500 border-t-slate-200 border-r-slate-200 border-b-slate-200 shadow-lg shadow-blue-500/10 scale-105'
                      : 'bg-white/80 border-gray-200/60 text-gray-600 shadow-sm hover:bg-white hover:shadow-md hover:border-gray-300'
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
                      ? 'text-blue-600 drop-shadow-sm'
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
                    {/* Left border accent */}
                    {/* <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-500 rounded-r-full" /> */}
                    {/* Top-right indicator dot */}
                    <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full shadow-sm animate-pulse" />
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
  );
}
