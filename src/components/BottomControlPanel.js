// Professional SVG icons
const FrameIcon = ({color}) => (
  <svg className={`w-5 h-5 text-[${color}]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const RotateIcon = ({color}) => (
  <svg className={`w-5 h-5 text-[${color}]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ZoomInIcon = ({color}) => (
  <svg className={`w-5 h-5 text-[${color}]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
  </svg>
);

const ZoomOutIcon = ({color}) => (
  <svg className={`w-5 h-5 text-[${color}]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
);

const controlItems = [
  { icon: FrameIcon, title: 'Frame Only', color: '#FF1717' },
  { icon: RotateIcon, title: 'Rotate 360', color: '#FF1717' },
  { icon: ZoomInIcon, title: 'Zoom In', color: '#FF1717' },
  { icon: ZoomOutIcon, title: 'Zoom Out', color: '#FF1717' }
];

export default function BottomControlPanel({ onControlClick }) {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 sm:inset-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-30 animate-in slide-in-from-bottom-5 duration-500">
  {/* Main Panel */}
  <div className="bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 ring-1 ring-black/5 p-1 md:p-1.5 lg:p-2 max-w-[85vw] sm:max-w-none">
    {/* Content Container */}
    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 overflow-x-auto sm:overflow-visible">
      {controlItems.map((item, index) => {
        const IconComponent = item.icon;
        const colorClasses = {
          '#FF1717' : 'hover:bg-red-500 hover:border-red-400 hover:shadow-red-500/25',
        };
        
        return (
          <div 
            key={index}
            className={`
              group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg
              bg-gradient-to-br from-gray-50 to-white border border-gray-200/60
              cursor-pointer transition-all duration-300 ease-out transform
              hover:scale-105 hover:text-white hover:shadow-lg
              ${colorClasses[item.color]}
              backdrop-blur-sm 
            `}
            onClick={() => onControlClick?.(item.title, index)}
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-100 bg-gradient-radial from-white/40 via-transparent to-transparent transition-opacity duration-150" />
            
            {/* Icon */}
            <div className="transition-all duration-300 transform group-hover:scale-110 text-gray-600 drop-shadow-sm group-hover:text-[#FF1717]">
              <IconComponent color="currentColor" />
            </div>
            
            {/* Enhanced Tooltip */}
            <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 pointer-events-none z-50">
              <div className="bg-gray-900 text-white px-2 py-1 rounded-md shadow-lg text-xs font-medium whitespace-nowrap">
                {item.title}
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
            
            {/* Hover glow effect */}
            <div className={`
              absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-br from-${item.color}-400/10 to-${item.color}-600/10
            `} />
          </div>
        );
      })}
    </div>
  </div>
  
  {/* Floating shadow - made smaller */}
  <div className="absolute inset-0 -z-10 bg-black/5 blur-xl rounded-xl transform translate-y-2 scale-95"></div>
</div>
  );
}
