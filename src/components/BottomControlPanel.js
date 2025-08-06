// Professional SVG icons
const FrameIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const RotateIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ZoomInIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
);

const controlItems = [
  { icon: FrameIcon, title: 'Frame Only', color: 'blue' },
  { icon: RotateIcon, title: 'Rotate 360', color: 'emerald' },
  { icon: ZoomInIcon, title: 'Zoom In', color: 'purple' },
  { icon: ZoomOutIcon, title: 'Zoom Out', color: 'orange' }
];

export default function BottomControlPanel({ onControlClick }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-5 duration-500">
      {/* Main Panel */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 ring-1 ring-black/5 p-3">
        {/* Content Container */}
        <div className="flex items-center gap-3">
          {controlItems.map((item, index) => {
            const IconComponent = item.icon;
            const colorClasses = {
              blue: 'hover:bg-blue-500 hover:border-blue-400 hover:shadow-blue-500/25',
              emerald: 'hover:bg-emerald-500 hover:border-emerald-400 hover:shadow-emerald-500/25',
              purple: 'hover:bg-purple-500 hover:border-purple-400 hover:shadow-purple-500/25',
              orange: 'hover:bg-orange-500 hover:border-orange-400 hover:shadow-orange-500/25'
            };
            
            return (
              <div 
                key={index}
                className={`
                  group relative flex items-center justify-center w-12 h-12 rounded-xl
                  bg-gradient-to-br from-gray-50 to-white border border-gray-200/60
                  cursor-pointer transition-all duration-300 ease-out transform
                  hover:scale-110 hover:text-white hover:shadow-lg
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
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-gradient-radial from-white/40 via-transparent to-transparent transition-opacity duration-150" />
                
                {/* Icon */}
                <div className="transition-all duration-300 transform group-hover:scale-110 text-gray-600 drop-shadow-sm">
                  <IconComponent />
                </div>
                
                {/* Enhanced Tooltip */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
                    {item.title}
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className={`
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-br from-${item.color}-400/10 to-${item.color}-600/10
                `} />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Floating shadow */}
      <div className="absolute inset-0 -z-10 bg-black/5 blur-2xl rounded-2xl transform translate-y-3 scale-95"></div>
    </div>
  );
}
