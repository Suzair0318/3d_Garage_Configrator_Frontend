import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';
import { sendMessageToPlayCanvas } from '../../utils/configuratorBridge';


const BuildingTypePanel = (
  {
    expandedCategory,
    setExpandedCategory,
    selectedItem,
    setSelectedItem,
    setActiveIndex,
    setActivePanelItem
  }
) => {


  const [selectedCategory, setSelectedCategory] = useState(null);
  const setSelectedBuilding = useStore(state => state.setSelectedBuilding);
  const setEvents = useStore(state => state.setEvents);
  const patchEventValues = useStore(state => state.patchEventValues);
  const events = useStore(state => state.events);
  // Categories cache from store
  const categoriesFromStore = useStore(state => state.categories);
  const setCategoriesInStore = useStore(state => state.setCategories);


  // API-driven categories
  const [categories, setCategories] = useState([]);


  // Refs to measure dynamic content heights for smooth accordion animation
  const contentRefs = useRef({}); // animated wrapper
  const innerContentRefs = useRef({}); // actual content to measure
  // Force re-render on resize so measured heights stay accurate on responsive breakpoints
  const [, forceRerender] = useState(0);
  useEffect(() => {
    const onResize = () => forceRerender(v => v + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  // Keep outer animated maxHeight in sync with inner content size while expanded
  useEffect(() => {
    if (!expandedCategory) return;
    const inner = innerContentRefs.current[expandedCategory];
    const outer = contentRefs.current[expandedCategory];
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

    // Also handle images or async content inside
    const imgs = inner.querySelectorAll ? inner.querySelectorAll('img') : [];
    const listeners = [];
    imgs.forEach((img) => {
      if (!img.complete) {
        const handler = () => apply();
        img.addEventListener('load', handler);
        listeners.push([img, handler]);
      }
    });

    // On next frame, re-apply to catch layout after transition start
    const raf = requestAnimationFrame(apply);

    return () => {
      if (ro) ro.disconnect();
      listeners.forEach(([img, handler]) => img.removeEventListener('load', handler));
      cancelAnimationFrame(raf);
    };
  }, [expandedCategory, selectedItem]);

  useEffect(() => {
    const unsub = useStore.subscribe(
      (state) => state.events,
      (ev) => console.log('[events changed]', ev)
    );
    return unsub;
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const initFromData = (data) => {
      setCategories(Array.isArray(data) ? data : []);

      // Auto-select default item if nothing is selected yet
      if (!selectedItem && Array.isArray(data)) {
        // Prefer category named 'carports' and item named 'Standard Carport'
        const targetCategory = data.find(c =>
          typeof c.name === 'string' && c.name.toLowerCase() === 'carports'
        ) || data.find(c => Array.isArray(c.items) && c.items.length > 0);

        const targetItem = targetCategory?.items?.find(i =>
          typeof i.name === 'string' && i.name.toLowerCase() === 'standard carport'
        ) || targetCategory?.items?.[0];

        if (targetCategory && targetItem) {
          // Update local and global selections
          setSelectedItem(targetItem);
          setSelectedBuilding({
            ...targetItem,
            categoryId: targetCategory.id,
            categoryName: targetCategory.name,
          });
          // Events are provided at category level as an array with a single object
          const rawEvents = Array.isArray(targetCategory.events) ? (targetCategory.events[0] || {}) : {};
          setEvents(rawEvents);
          // Populate default values into events

          // UI state: open/highlight the category
          setSelectedCategory(targetCategory.id);
        } else {
          // Fallback: clear events if no items
          setEvents({});
        }
      }
    };

    const load = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/building/categories_items');
        const data = await res.json();
        // Persist to store and local
        setCategoriesInStore(Array.isArray(data) ? data : []);
        initFromData(data);
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    };

    if (Array.isArray(categoriesFromStore) && categoriesFromStore.length > 0) {
      // Use cached categories
      initFromData(categoriesFromStore);
    } else {
      // Fetch once when cache is empty
      load();
    }
  }, []);


  // const categories = [
  //   {
  //     id: 'carports',
  //     name: 'Carports',
  //     items: [
  //       {
  //         id: 'standard-carport',
  //         name: 'Standard Carport',
  //         width: '12-24',
  //         length: '20-100',
  //         height: '8-12',
  //         image: '/stanadard_carpot.png'
  //       },
  //       {
  //         id: 'triple_wide_carpot',
  //         name: 'Triple Wide Carpot',
  //         width: '12-30',
  //         length: '20-100',
  //         height: '8-14',
  //         image: '/triple_wide_carpot.png'
  //       },
  //       {
  //         id: 'utility_carport',
  //         name: 'Utility Carport',
  //         width: '12-30',
  //         length: '20-100',
  //         height: '8-14',
  //         image: '/utility_carpot.png'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'garages',
  //     name: 'Garages',
  //     items: [
  //       {
  //         id: 'standard_garage',
  //         name: 'Standard Garage',
  //         width: '12-16',
  //         length: '20-24',
  //         height: '8-12',
  //         image: '/standard_garage.png'
  //       },
  //       {
  //         id: 'garage_with_lean_to',
  //         name: 'Garage with Lean To',
  //         width: '20-24',
  //         length: '20-30',
  //         height: '8-14',
  //         image: '/garage_with_lean.png'
  //       },
  //       {
  //         id: 'triple_wide_garage',
  //         name: 'Triple Wide Garage',
  //         width: '24-30',
  //         length: '30-40',
  //         height: '10-16',
  //         image: '/triple_wide_garage.png'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'barns',
  //     name: 'Barns',
  //     items: [
  //       {
  //         id: 'standard_barns',
  //         name: 'Standard Barns',
  //         width: '30-40',
  //         length: '40-60',
  //         height: '12-20',
  //         image: '/standard_barns.png'
  //       },
  //       {
  //         id: 'raised_center_barns',
  //         name: 'Raised Center Barns',
  //         width: '20-30',
  //         length: '30-50',
  //         height: '10-16',
  //         image: '/raised_center_barns.png'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'rv-covers',
  //     name: 'RV Covers',
  //     items: [
  //       {
  //         id: 'rv-cover',
  //         name: 'RV Cover',
  //         width: '12-24',
  //         length: '20-100',
  //         height: '10-16',
  //         image: '/rv_cover.png',
  //       }
  //     ]
  //   },
  //   {
  //     id: 'commercials',
  //     name: 'Commercials',
  //     items: [
  //       {
  //         id: 'commercial_carpot',
  //         name: 'Commercial Carpot',
  //         width: '40-100',
  //         length: '60-200',
  //         height: '16-30',
  //         image: '/commercial_carpot.png'
  //       },
  //       {
  //         id: 'commercial_building',
  //         name: 'Commercial Building',
  //         width: '30-60',
  //         length: '40-100',
  //         height: '12-20',
  //         image: '/commercial_building.png'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'free-standings',
  //     name: 'Free Standings',
  //     items: [
  //       {
  //         id: 'free_standing_building',
  //         name: 'Free Standing Building',
  //         width: '20-40',
  //         length: '20-60',
  //         height: '10-16',
  //         image: '/free_standard_building.png'
  //       },
  //       {
  //         id: 'free_standing_lean_to',
  //         name: 'Free Standing Lean To',
  //         width: '12-20',
  //         length: '12-20',
  //         height: '8-12',
  //         image: '/free_strandard_lean.png'
  //       }
  //     ]
  //   }
  // ];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const selectItem = (item, category) => {
    setSelectedItem(item);
    // Persist selection to global store for SizePanel consumption
    setSelectedBuilding({
      ...item,
      categoryId: category?.id,
      categoryName: category?.name,
    });
    // On card selection, set events from the category (single object inside array)
    const rawEvents = Array.isArray(category?.events) ? (category.events[0] || {}) : {};
    setEvents(rawEvents);
    // Populate default values into events on selection
    patchEventValues({
      Carportsbuilding: null,
      barn_height: 10,
      barn_Width: 24,
      barn_Length: 40,
      leansLeftW: 6,
      leansLeftL: 20,
      leansheightL: 6,
      leansRightW: 10,
      leansRightL: 40,
      leansheightR: 6,
      storageFeetL: 4,
      barn_heightS: null,
    });

    console.log("events", useStore.getState().events);
    
  };

  const handle_open_size_panel = () => {
    setActiveIndex(1);
    setActivePanelItem({ id: 'size' });
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header Section */}
      <div className="px-3 sm:px-4 md:px-6 mb-2">
        <h2 className="text-base sm:text-lg font-semibold text-[#07223D] mb-1">
          Pre-Designed Buildings
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Select a buildings style from pre-designed building sets
        </p>
      </div>

      <div className="p-1 sm:p-2 px-2 sm:px-4 space-y-1 sm:space-y-2">
        {categories.map((category, index) => {
          const isExpanded = expandedCategory === category.id;
          const isSelected = selectedCategory === category.id; // Use dynamic selected state
          // Keep parent highlighted if any child in this category is selected
          const hasSelectedChild = !!selectedItem && category.items?.some(i => i.id === selectedItem.id);

          return (
            <div
              key={category.id}
              className={`
                rounded-lg border transition-all duration-200 overflow-hidden bg-transparent
                ${(isExpanded)
                  ? 'border-[#FF1717]'
                  : 'border-[#07223D]'
                }
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Category Header - Compact */}
              <div
                className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-150 bg-transparent"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className={`
                    font-semibold text-xs sm:text-sm capitalize
                    ${(isExpanded || hasSelectedChild) ? 'text-[#FF1717]' : 'text-[#07223D]'}
                  `}>
                    {category.name?.replace(/_/g, ' ')}
                  </span>
                  {(hasSelectedChild) && (
                    <span className="border border-[#FF1717] text-[#FF1717] text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-[4px] font-medium">
                      selected
                    </span>
                  )}
                </div>

                {isExpanded ? (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF1717] transition-all duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#07223D] transition-all duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>

              {/* Category Content - Card Layout with smooth height animation */}
              <div
                ref={(el) => { if (el) contentRefs.current[category.id] = el; }}
                className={`
                  bg-transparent overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] px-2 sm:px-4 
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
                  className={`flex flex-col gap-2 sm:gap-4 px-1 sm:px-3 py-2 sm:py-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'translate-y-0' : '-translate-y-1'}`}
                >
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className={`
                        relative bg-white rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                        ${selectedItem?.id === item.id
                          ? 'border-[#FF1717] bg-[#FF1717] shadow-lg transform -translate-y-1'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                        ${item.featured ? 'ring-2 ring-red-200 bg-gradient-to-br from-red-50 to-orange-50' : ''}
                      `}
                      onClick={() => selectItem(item, category)}
                      style={{ animationDelay: `${itemIndex * 100}ms` }}
                    >
                      {/* Selection Indicator */}
                      {selectedItem?.id === item.id && (
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                          <div className="bg-[#FF1717] text-white rounded-full p-0.5 sm:p-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                          <span className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-2 sm:p-3">
                        {/* Large Image/Icon */}
                        <div className="w-full h-20 sm:h-24 md:h-28 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full object-contain"
                          // onError={(e) => {
                          //   e.target.onerror = null;
                          //   e.target.src = 'https://via.placeholder.com/200x100?text=Building';
                          // }}
                          />
                        </div>

                        {/* Item Details */}
                        <div className="text-center">
                          <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base leading-tight">
                            {item.name}
                          </h4>

                          {/* Dimensions in a clean grid */}
                          <div className="grid grid-cols-3 gap-0.5 sm:gap-1 text-xs sm:text-sm text-gray-600 mb-2">
                            <div className="bg-gray-50 rounded-md sm:rounded-lg p-0.5 sm:p-1">
                              <div className="font-medium text-gray-800 text-[10px] sm:text-xs">Width</div>
                              <div className="text-xs sm:text-sm">{item.width}&#39;</div>
                            </div>
                            <div className="bg-gray-50 rounded-md sm:rounded-lg p-0.5 sm:p-1">
                              <div className="font-medium text-gray-800 text-[10px] sm:text-xs">Length</div>
                              <div className="text-xs sm:text-sm">{item.length}&#39;</div>
                            </div>
                            <div className="bg-gray-50 rounded-md sm:rounded-lg p-0.5 sm:p-1">
                              <div className="font-medium text-gray-800 text-[10px] sm:text-xs">Height</div>
                              <div className="text-xs sm:text-sm">{item.height}&#39;</div>
                            </div>
                          </div>

                          {selectedItem?.id === item.id && (
                            <button
                              className="mx-auto w-full sm:w-[85%] md:w-4/5 py-1.5 sm:py-1 rounded-lg font-medium transition-all duration-200 bg-[#07223D] text-white shadow-md cursor-pointer text-xs sm:text-sm"
                              onClick={() => handle_open_size_panel()}
                            >
                              Next ( Build & Size)
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuildingTypePanel;
