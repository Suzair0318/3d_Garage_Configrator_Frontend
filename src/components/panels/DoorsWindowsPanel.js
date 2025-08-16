import React, { useState, useEffect, useRef } from 'react';

const DoorsWindowsPanel = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedLeftLean, setSelectedLeftLean] = useState('');
  const [selectedRightLean, setSelectedRightLean] = useState('');

  // Handle selection changes
  const handleBuildingChange = (e) => {
    setSelectedBuilding(e.target.value);
  };

  const handleLeftLeanChange = (e) => {
    setSelectedLeftLean(e.target.value);
  };

  const handleRightLeanChange = (e) => {
    setSelectedRightLean(e.target.value);
  };

  // Static data structure for dropdown options (replaceable by API later)
  const optionsData = {
    buildings: [
      { value: 'building1', label: 'Building Type 1' },
      { value: 'building2', label: 'Building Type 2' },
      { value: 'building3', label: 'Building Type 3' },
    ],
    leftLeans: [
      { value: 'lean1', label: 'Lean Type 1' },
      { value: 'lean2', label: 'Lean Type 2' },
      { value: 'lean3', label: 'Lean Type 3' },
    ],
    rightLeans: [
      { value: 'lean1', label: 'Lean Type 1' },
      { value: 'lean2', label: 'Lean Type 2' },
      { value: 'lean3', label: 'Lean Type 3' },
    ],
  };

  // Accordion and selection state (internal)
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState(null);

  // Refs to measure dynamic content heights for smooth accordion animation
  const contentRefs = useRef({}); // animated wrapper
  const innerContentRefs = useRef({}); // actual content to measure

  // Force re-render on resize so measured heights stay accurate
  const [, forceRerender] = useState(0);
  useEffect(() => {
    const onResize = () => forceRerender(v => v + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Keep outer animated maxHeight in sync with inner content size while expanded
  useEffect(() => {
    if (!expanded) return;
    const inner = innerContentRefs.current[expanded];
    const outer = contentRefs.current[expanded];
    if (!inner || !outer) return;

    const apply = () => {
      outer.style.maxHeight = `${inner.scrollHeight}px`;
    };

    // Apply immediately and observe future changes
    apply();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => apply());
      ro.observe(inner);
    }

    // On next frame, re-apply to catch layout after transition start
    const raf = requestAnimationFrame(apply);

    return () => {
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [expanded]);

  // Handle category expansion
  const toggleCategory = (categoryId) => {
    setExpanded(expanded === categoryId ? null : categoryId);
  };

  // Categories for the expandable buttons with their content
  const categories = [
    { 
      id: 'doors', 
      name: 'Doors',
      items: [
        {
          id: 'roll-up',
          name: 'Roll-Up',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M150 146.5v2.1c-1 1.2-2.3 1.5-3.8 1.5H3.2c-2 0-3.1-.9-3.1-2.5 0-1.5 1.1-2.4 3-2.4h4.4v-125H3.2C.9 20 0 19.1 0 16.9c0-4.3.1-8.7 0-13C0 2.3.3 1 1.5 0H150v18.5c-.9 1.3-2.2 1.6-3.7 1.6-1.2-.1-2.4 0-3.7 0v125c1.2 0 2.4.1 3.5 0 1.6-.3 2.9.1 3.9 1.4M137.4 20.1H12.7v124.8h4.8V29.2c0-.6 0-1.3.1-1.9.1-1.2.8-2 2-2.2.6-.1 1.3-.1 1.9-.1h107.2c.5 0 1.1 0 1.6.1 1.3.2 2.2 1 2.3 2.5V145h4.9c-.1-41.7-.1-83.2-.1-124.9M22.6 64.9h104.8V50.1H22.6zm104.8 5.2H22.7v14.8h104.7zm0 20H22.7v14.8h104.7zm0 20.1H22.7v14.7h104.7zM22.6 44.8h104.7V30.1H22.6zm104.8 85.3H22.7v14.8h104.7zm17.5-125H5.1v9.8h139.8z"/>
              <path d="M75 142.5h-7.4c-1.6-.2-2.5-1.1-2.5-2.5s1-2.4 2.5-2.5c4.9-.1 9.8-.1 14.8 0 1.6 0 2.6 1.1 2.6 2.4 0 1.5-.9 2.5-2.5 2.6-2.6.1-5 0-7.5 0"/>
            </svg>
          )
        }
      ]
    },
    { 
      id: 'framed-openings', 
      name: 'Framed openings',
      items: [
        {
          id: 'roll-up-frameout',
          name: 'Roll-Up Frameout',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
             <path d="M6.7 150H2.1v-2.1c0-46.3 0-92.5.1-138.8 0-1.9.5-4 1.3-5.8C4.4 1.1 6.3 0 9 0c44 .1 88 0 132 0 3.6 0 6.5 2.6 6.8 6.3.1.7 0 1.4 0 2.1v141.5h-4.4V10.1c0-.8.2-1.8-.2-2.5-.5-.9-1.3-1.9-2.1-2.1-1.9-.4-4-.5-5.9-.5H15.8c-2.2 0-4.5.2-6.7.4-1.4.2-2.1 1.1-2.3 2.3-.1.7-.1 1.4-.1 2.1V150"/></svg>
          )
        },
        {
          id: 'reinforced-frame',
          name: 'Door Frameout',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M122.7 0v150H27.4V0zm-4.5 145.7V4.6H31.9v141.1z"/>
            <path d="M36.3 8.9h77.5v132.4H36.3zm4.3 127.9h68.7V13.2H40.6z"/>
            </svg>
          )
        },
        {
          id: 'windows-frameout',
          name: 'Windows Frameout',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M132 150c-23.1-.1-45.7-.1-64.8-.1H18.1c-3 0-3.6-.6-3.6-3.7V3.8c0-2.4.6-3.3 1.7-3.8h117.6c1.1.6 1.7 1.5 1.7 3.8-.1 54.5-.1 99.9 0 142.6 0 1-.3 1.9-1 2.6-.6.7-1.5 1-2.5 1m-52.4-14.5h-44c-1.5 0-2.5.4-3.2 1.1-.9 1-1.7 2-2.6 3.1-.3.4-.6.8-1 1.2l-2.7 3.3h100.7l-3.7-3.5c-.4-.4-.9-.8-1.3-1.2-.9-.9-1.8-1.8-2.8-2.6s-2.3-1.4-3.5-1.4H79.6m-59.5 6.6 3.6-4.4 1.2-1.5c1-1.2 1.9-2.3 2.8-3.5.7-.9 1.1-2.1 1.1-3.1V20.1c0-.6 0-1.8-.8-2.6-1-1.1-2.1-2.2-3.2-3.4l-1.2-1.3-3.5-3.7zM126.4 13.4l-1.3 1.3c-1.1 1.1-2 2.1-3 3.1-.8.8-1 2-1 2.8v108.6c0 .6 0 1.7.8 2.6 1 1.2 2.1 2.4 3.3 3.7l1.2 1.3 3.6 3.9V9.7zM34.5 129.9h81V53.7h-81zm0-81.9h81V20h-81zm40-33.6c14.3 0 26 0 36.7.1h.3c3.5 0 8-.6 11-5.5l2.1-3.5H23.7L27.4 9c.5.4.9.8 1.3 1.2.9.8 1.7 1.6 2.4 2.3 1.1 1.2 2.4 1.7 4.1 1.7h14.6c8.2.2 16.5.2 24.7.2"/>
            </svg>
          )
        }
      ]
    },
    { 
      id: 'walk-in-doors', 
      name: 'Walk-in Doors',
      items: [
        {
          id: 'main-door',
          name: 'Main Door',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M124.1 145h10.3v5h-119v-5h10.2V0H124c.1 48.2.1 96.5.1 145m-18.1-.1V18.2H44v126.7zm5.3-132v131.9h7.7V5.2H31.1v139.6h7.8V12.9z"/>
              <path d="M55.7 95.7c-3.6 0-6.5-2.8-6.6-6.3 0-3.7 2.8-6.6 6.5-6.6 3.6 0 6.5 2.8 6.5 6.4s-2.9 6.5-6.4 6.5m0-4.7c.5-.8 1.1-1.4 1.1-1.8-.1-.5-.8-.8-1.2-1.2-.4.5-1.1.9-1.2 1.4-.1.4.6.9 1.3 1.6"/>
            </svg>
          )
        },
        {
          id: 'heavy-duty',
          name: 'Heavy Duty',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M124.1 145h10.3v5h-119v-5h10.2V0H124c.1 48.2.1 96.5.1 145m-18.1-.1V18.2H44v126.7zm5.3-132v131.9h7.7V5.2H31.1v139.6h7.8V12.9z"/>
              <path d="M55.7 95.7c-3.6 0-6.5-2.8-6.6-6.3 0-3.7 2.8-6.6 6.5-6.6 3.6 0 6.5 2.8 6.5 6.4s-2.9 6.5-6.4 6.5m0-4.7c.5-.8 1.1-1.4 1.1-1.8-.1-.5-.8-.8-1.2-1.2-.4.5-1.1.9-1.2 1.4-.1.4.6.9 1.3 1.6"/>
            </svg>
          )
        },
        {
          id: 'diamond-door',
          name: 'Diamond Door',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M124.1 145h10.3v5H15.5v-5h10.2V0h98.4zM44 18.1v126.7h62V18.1zm74.9 126.8V5.2H31.1v139.6h7.7V12.9h72.5v131.9c2.6.1 5 .1 7.6.1"/>
              <path d="M61 40.7c4.8-5.7 9.5-11.4 14.3-17.2 4.7 5.7 9.4 11.3 14 16.9-4.8 5.7-9.6 11.3-14.5 17.2-4.6-5.8-9.3-11.4-13.8-16.9"/>
            </svg>
          )
        },
        {
          id: 'cottage',
          name: 'Cottage',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M15.5 150v-5h10.3V0h98.3v144.9h10.3v5.1zm90.5-5.1V18.2H44.1v126.7zM31.1 5.2v139.7h7.7V13h72.5v131.9h7.6V5.2z"/>
              <path d="M98.3 59.3v30.1c0 1.4-.4 1.8-1.8 1.8-14.1-.1-28.3-.1-42.4 0-1.4 0-1.8-.4-1.8-1.8V29.2c0-1.4.4-1.8 1.8-1.8 14.1.1 28.3.1 42.4 0 1.4 0 1.8.4 1.8 1.8zm-24-9.8H54.1v19.2h20.2zm22.3 0H76.4v19.2h20.2zM54.1 70.9v18.6h20.2V70.9zm42.5 18.7V71H76.4v18.6zM54.1 47.4h20.2V29.1H54.1zm22.3-18.3v18.3h20.2V29.1z"/>
            </svg>
          )
        }
      ]
    },
    { 
      id: 'windows', 
      name: 'Windows',
      items: [
        {
          id: 'single-pane',
          name: 'Single Pane',
          image: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#07223D] stroke-2 fill-none" viewBox="0 0 150 150.1">
              <path d="M17.6 0h114.8c1.3.8 1.5 2 1.5 3.4v131.3l.3.1h8.2c1.9 0 2.7.8 2.7 2.6 0 3.3.1 6.5 0 9.8 0 2.1-.8 2.7-2.9 2.7H7.7c-2.3 0-3-.7-3-3V139c0-4 .4-4.3 4.4-4.3h7.2V3.4c.1-1.2.2-2.5 1.3-3.4m111.6 4.7H21v130h5.7V13c0-2.1.8-2.8 2.8-2.8h91.3c1.9.1 2.6.7 2.7 2.7v121.9h5.7zm-10.3 10.1H77.5v36.8h41.4zm0 41.6H77.5v36.8h41.4zm0 41.6H77.5v36.8h41.4zM31.4 51.5h41.3V14.7H31.4zm0 41.6h41.3V56.4H31.4zm0 41.6h41.3V98H31.4zM9.5 145.4h129.3c.4 0 .9.1 1.3 0 .3-.1.8-.5.8-.8.1-1.7 0-3.4 0-5.1H9.5z"/>
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-4">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#07223D] mb-1">
          DOORS & WINDOWS
        </h2>
      </div>
      
      {/* Building Selection Dropdowns */}
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        {[
          {
            id: 'center-building',
            label: 'Center Building',
            value: selectedBuilding,
            onChange: handleBuildingChange,
            options: optionsData.buildings,
          },
          {
            id: 'left-leans',
            label: 'Left Leans',
            value: selectedLeftLean,
            onChange: handleLeftLeanChange,
            options: optionsData.leftLeans,
          },
          {
            id: 'right-leans',
            label: 'Right Leans',
            value: selectedRightLean,
            onChange: handleRightLeanChange,
            options: optionsData.rightLeans,
          },
        ].map((group) => (
          <div className="space-y-1 sm:space-y-2" key={group.id}>
            <label className="block text-[#07223D] font-semibold text-sm sm:text-base">{group.label}</label>
            <select 
              value={group.value}
              onChange={group.onChange}
              className="w-full p-1.5 sm:p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#07223D] text-sm sm:text-base"
            >
              <option value="">Select</option>
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      
      {/* Category Accordions */}
      <div className="space-y-2 sm:space-y-3">
        {categories.map((category, index) => {
          const isExpanded = expanded === category.id;
          
          return (
            <div 
              key={category.id}
              className={`
                rounded-lg border transition-all duration-200 overflow-hidden
                ${isExpanded ? 'border-[#FF1717]' : 'border-[#07223D]'}
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Accordion Header */}
              <div
                className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-150"
                onClick={() => toggleCategory(category.id)}
              >
                <span className={`font-semibold text-xs sm:text-sm ${isExpanded ? 'text-[#FF1717] ' : 'text-[#07223D] '}`}>
                  {category.name}
                </span>
                
                {isExpanded ? (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF1717]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#07223D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              
              {/* Accordion Content with smooth height animation */}
              <div
                ref={(el) => { if (el) contentRefs.current[category.id] = el; }}
                className={`
                  overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isExpanded ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                  maxHeight: isExpanded
                    ? `${innerContentRefs.current[category.id]?.scrollHeight || 0}px`
                    : '0px',
                  transitionDelay: isExpanded ? '60ms' : '0ms'
                }}
                aria-hidden={!isExpanded}
              >
                <div
                  ref={(el) => { if (el) innerContentRefs.current[category.id] = el; }}
                  className={`p-2 sm:p-3 lg:p-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'translate-y-0' : '-translate-y-4'}`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                    {category.items.map((item) => {
                      // Calculate if name is long (more than 2 words or 15 chars)
                      const isLongName = item.name.split(' ').length > 2 || item.name.length > 15;
                      
                      return (
                        <div key={item.id} className="flex flex-col items-center h-full">
                          <div className="w-full text-center mb-1 min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center">
                            <p className={`text-xs sm:text-sm font-medium text-[#07223D] ${isLongName ? 'line-clamp-2' : 'whitespace-nowrap'}`}>
                              {item.name}
                            </p>
                          </div>
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-1 sm:mb-2 flex-shrink-0 flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-center">
                              {item.image}
                            </div>
                          </div>
                          <button 
                            className="mt-auto px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 border border-[#07223D] rounded-md text-[#07223D] text-xs sm:text-sm font-medium hover:bg-[#07223D] hover:text-white transition-colors duration-200 whitespace-nowrap"
                            onClick={() => setSelected(item)}
                          >
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoorsWindowsPanel;
