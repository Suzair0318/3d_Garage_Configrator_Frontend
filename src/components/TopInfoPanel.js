import { Fragment } from 'react';

// Professional SVG icons
const LocationIcon = ({color}) => (
  <svg className={`w-4 h-4 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DollarIcon = ({color}) => (
  <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const EmailIcon = ({color}) => (
  <svg className={`w-4 h-4 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({color}) => (
  <svg className={`w-4 h-4 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function TopInfoPanel() {
  // Sample dynamic content array driving the UI
  const items = [
    {
      key: 'location',
      title: 'Location',
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
      contacts: [
        { Icon: EmailIcon, text: 'info@salesflow.com' },
        { Icon: PhoneIcon, text: '+1 (999) 434-8943' },
      ],
    },
  ];

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top-5 duration-500">
      {/* Main Panel */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 ring-1 ring-black/5 p-2.5">
        {/* Content Container */}
        <div className="flex items-center gap-5">
          {items.map((item, idx) => {
            const BadgeIcon = item.Icon;
            return (
              <Fragment key={item.key}>
                <div className="group flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/50 hover:shadow-md transition-all duration-300">
                  <div className={`flex items-center justify-center w-7 h-7 bg-[#FF1717] rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <BadgeIcon color="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className={`text-[10px] font-semibold text-[#FF1717] uppercase tracking-wider`}>{item.title}</div>
                    {item.contacts ? (
                      <div className="flex gap-0.5 text-[9px] ">
                        {item.contacts.map((c, i) => (
                          <span key={i} className={`flex items-center ${i > 0 ? 'ml-2' : ''} gap-1.5 text-gray-700 hover:text-gray-900 transition-colors`}>
                            <c.Icon color="text-[#FF1717]" />
                            <span className="font-medium">{c.text}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] font-bold text-gray-600">{item.value}</div>
                    )}
                  </div>
                </div>
                {idx < items.length - 1 && (
                  <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                )}
              </Fragment>
            );
          })}
        </div>
        
      </div>
      
      {/* Floating shadow */}
      <div className="absolute inset-0 -z-10 bg-black/5 blur-2xl rounded-2xl transform translate-y-3 scale-95"></div>
    </div>
  );
}
