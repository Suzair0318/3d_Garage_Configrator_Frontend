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
          id: 'main-door',
          name: 'Main Door',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="50" rx="1" />
              <line x1="15" y1="5" x2="15" y2="55" />
              <line x1="35" y1="5" x2="35" y2="55" />
            </svg>
          )
        },
        {
          id: 'heavy-duty',
          name: 'Heavy Duty',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="50" rx="1" />
              <line x1="15" y1="5" x2="15" y2="55" />
              <line x1="35" y1="5" x2="35" y2="55" />
              <line x1="20" y1="30" x2="30" y2="30" />
            </svg>
          )
        },
        {
          id: 'diamond-door',
          name: 'Diamond Door',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="50" rx="1" />
              <line x1="15" y1="5" x2="15" y2="55" />
              <line x1="35" y1="5" x2="35" y2="55" />
              <polygon points="25,15 30,25 25,35 20,25" />
            </svg>
          )
        },
        {
          id: 'cottage',
          name: 'Cottage',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="50" rx="1" />
              <line x1="25" y1="5" x2="25" y2="55" />
              <line x1="10" y1="30" x2="40" y2="30" />
              <line x1="17.5" y1="17.5" x2="17.5" y2="42.5" />
              <line x1="32.5" y1="17.5" x2="32.5" y2="42.5" />
              <line x1="17.5" y1="17.5" x2="32.5" y2="17.5" />
              <line x1="17.5" y1="42.5" x2="32.5" y2="42.5" />
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
          id: 'standard-frame',
          name: 'Standard Frame',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="50" rx="1" />
            </svg>
          )
        },
        {
          id: 'reinforced-frame',
          name: 'Reinforced Frame',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="50" rx="1" />
              <line x1="10" y1="15" x2="40" y2="15" />
              <line x1="10" y1="45" x2="40" y2="45" />
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
          id: 'standard-walk-in',
          name: 'Standard Walk-in',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="15" y="5" width="20" height="50" rx="1" />
              <circle cx="32" cy="30" r="2" fill="#07223D" />
            </svg>
          )
        },
        {
          id: 'double-walk-in',
          name: 'Double Walk-in',
          image: (
            <svg viewBox="0 0 50 60" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="5" y="5" width="40" height="50" rx="1" />
              <line x1="25" y1="5" x2="25" y2="55" />
              <circle cx="22" cy="30" r="2" fill="#07223D" />
              <circle cx="28" cy="30" r="2" fill="#07223D" />
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
            <svg viewBox="0 0 50 40" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="30" rx="1" />
            </svg>
          )
        },
        {
          id: 'double-pane',
          name: 'Double Pane',
          image: (
            <svg viewBox="0 0 50 40" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="30" rx="1" />
              <line x1="25" y1="5" x2="25" y2="35" />
            </svg>
          )
        },
        {
          id: 'sliding-window',
          name: 'Sliding Window',
          image: (
            <svg viewBox="0 0 50 40" className="w-full h-full stroke-[#07223D] stroke-2 fill-none">
              <rect x="10" y="5" width="30" height="30" rx="1" />
              <line x1="25" y1="5" x2="25" y2="35" />
              <line x1="10" y1="20" x2="40" y2="20" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#07223D] mb-1">
          DOORS & WINDOWS
        </h2>
      </div>
      
      {/* Building Selection Dropdowns */}
      <div className="space-y-4 mb-6">
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
          <div className="space-y-2" key={group.id}>
            <label className="block text-[#07223D] font-semibold">{group.label}</label>
            <select 
              value={group.value}
              onChange={group.onChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#07223D]"
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
      <div className="space-y-3">
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
                className="flex items-center justify-between px-3 py-2 cursor-pointer transition-all duration-150"
                onClick={() => toggleCategory(category.id)}
              >
                <span className={`font-semibold text-sm ${isExpanded ? 'text-[#FF1717] ' : 'text-[#07223D] '}`}>
                  {category.name}
                </span>
                
                {isExpanded ? (
                  <svg
                    className="w-4 h-4 text-[#FF1717]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-[#07223D]"
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
                  className={`p-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'translate-y-0' : '-translate-y-4'}`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.items.map((item) => {
                      // Calculate if name is long (more than 2 words or 15 chars)
                      const isLongName = item.name.split(' ').length > 2 || item.name.length > 15;
                      
                      return (
                        <div key={item.id} className="flex flex-col items-center h-full">
                          <div className="w-full text-center mb-1 min-h-[2.5rem] flex items-center justify-center">
                            <p className={`text-sm font-medium text-[#07223D] ${isLongName ? 'line-clamp-2' : 'whitespace-nowrap'}`}>
                              {item.name}
                            </p>
                          </div>
                          <div className="w-16 h-16 mb-2 flex-shrink-0">
                            {item.image}
                          </div>
                          <button 
                            className="mt-auto px-4 py-1 border border-[#07223D] rounded-md text-[#07223D] text-sm font-medium hover:bg-[#07223D] hover:text-white transition-colors duration-200 whitespace-nowrap"
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
