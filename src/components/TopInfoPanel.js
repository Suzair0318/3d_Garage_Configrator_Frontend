import { Fragment } from 'react';

// Professional SVG icons
const LocationIcon = ({color}) => (
  <svg className={`w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DollarIcon = ({color}) => (
  <svg className={`w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const EmailIcon = ({color}) => (
  <svg className={`w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({color}) => (
  <svg className={`w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function TopInfoPanel() {
  // Sample dynamic content array driving the UI
  const items = [
    {
      key: 'state',
      title: 'State',
      Icon: LocationIcon,
      value: 'California',
    },
    {
      key: 'subtotal',
      title: 'Sub Total',
      Icon: DollarIcon,
      value: '$0.00',
    },
    {
      key: 'contact',
      title: 'Contact',
      Icon: EmailIcon,
      email: 'info@salesflow.com',
      number: '+1 (999) 434-8943',
    },
  ];

  return (
    <div className="hidden sm:block fixed top-1 lg:top-1 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top-5 duration-500">
      {/* Main Panel */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-gray-200/50 ring-1 ring-black/5">
        {/* Content Container */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 overflow-x-auto sm:overflow-visible">
          {items.map((item, idx) => {
            const BadgeIcon = item.Icon;
            return (
              <Fragment key={item.key}>
                <div className="group flex items-center gap-2 lg:gap-3 px-2.5 py-1.5 lg:px-3.5 lg:py-2 rounded-lg lg:rounded-xl bg-gradient-to-br hover:shadow-md transition-all duration-300 max-w-full min-w-0 overflow-hidden">
                  <div className={`flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 bg-[#FF1717] rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <BadgeIcon color="text-white" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden">
                    <div className={`text-[8px] lg:text-[9px] xl:text-[10px] font-semibold text-[#FF1717] uppercase tracking-wider`}>{item.title}</div>
                    <div className="flex gap-0.5 text-[10px] lg:text-[11px] xl:text-[12px] ">
                    <span className={`flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors`}>
                          <span className="font-semibold">{item.value}</span>
                        </span>
                        </div>
                     { item?.email && item?.number &&  (
                      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-0.5 text-[10px] lg:text-[11px] xl:text-[12px] w-full overflow-hidden">
                        <span className={`flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors flex-1 min-w-0 max-w-full w-full lg:w-auto`}> 
                          <span className="font-semibold whitespace-normal break-words">{item.email}</span>
                        </span>
                        <span className={`flex items-center lg:ml-4 gap-1.5 text-gray-700 hover:text-gray-900 transition-colors flex-1 min-w-0 max-w-full w-full lg:w-auto`}>
                          <span className="font-semibold whitespace-normal break-words">{item.number}</span>
                        </span>
                      </div>
                  )}
                  </div>
                </div>
                {idx < items.length - 1 && (
                  <div className="w-px h-9 lg:h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Floating shadow */}
      <div className="absolute inset-0 -z-10 bg-black/5 blur-2xl rounded-2xl transform translate-y-3 lg:translate-y-4 scale-95 lg:scale-100"></div>
    </div>
  );
}
