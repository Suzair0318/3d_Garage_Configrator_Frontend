import React, { useState } from 'react';
import { useConfigurator } from '../../context/ConfiguratorContext';

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
  // const [expandedCategory, setExpandedCategory] = useState(null); // No expanded by default
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'carports',
      name: 'Carports',
      items: [
        {
          id: 'standard-carport',
          name: 'Standard Carport',
          width: '12-24',
          length: '20-100',
          height: '8-12',
          image: '🏗️'
        },
        {
          id: 'enclosed-carport',
          name: 'Enclosed Carport',
          width: '12-30',
          length: '20-100',
          height: '8-14',
          image: '🏢'
        }
      ]
    },
    {
      id: 'garages',
      name: 'Garages',
      items: [
        {
          id: 'single-garage',
          name: 'Single Car Garage',
          width: '12-16',
          length: '20-24',
          height: '8-12',
          image: '🏠'
        },
        {
          id: 'double-garage',
          name: 'Double Car Garage',
          width: '20-24',
          length: '20-30',
          height: '8-14',
          image: '🏘️'
        },
        {
          id: 'workshop-garage',
          name: 'Workshop Garage',
          width: '24-30',
          length: '30-40',
          height: '10-16',
          image: '🔧'
        }
      ]
    },
    {
      id: 'barns',
      name: 'Barns',
      items: [
        {
          id: 'equipment-barn',
          name: 'Equipment Barn',
          width: '30-40',
          length: '40-60',
          height: '12-20',
          image: '🚜'
        },
        {
          id: 'storage-barn',
          name: 'Storage Barn',
          width: '20-30',
          length: '30-50',
          height: '10-16',
          image: '📦'
        }
      ]
    },
    {
      id: 'rv-covers',
      name: 'RV Covers',
      items: [
        {
          id: 'rv-cover-standard',
          name: 'RV Cover',
          width: '12-24',
          length: '20-100',
          height: '10-16',
          image: '🚐',
        }
      ]
    },
    {
      id: 'commercials',
      name: 'Commercials',
      items: [
        {
          id: 'warehouse',
          name: 'Warehouse',
          width: '40-100',
          length: '60-200',
          height: '16-30',
          image: '🏭'
        },
        {
          id: 'retail-building',
          name: 'Retail Building',
          width: '30-60',
          length: '40-100',
          height: '12-20',
          image: '🏪'
        }
      ]
    },
    {
      id: 'free-standings',
      name: 'Free Standings',
      items: [
        {
          id: 'pavilion',
          name: 'Pavilion',
          width: '20-40',
          length: '20-60',
          height: '10-16',
          image: '🏛️'
        },
        {
          id: 'gazebo',
          name: 'Gazebo',
          width: '12-20',
          length: '12-20',
          height: '8-12',
          image: '🏯'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const handle_open_size_panel = () => {
    setActiveIndex(1);
    setActivePanelItem({ id: 'size'});
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header Section */}
      <div className="px-6 mb-2">
        <h2 className="text-lg font-semibold text-[#07223D] mb-1">
          Pre-Designed Buildings
        </h2>
        <p className="text-sm text-gray-600">
          Select a buildings style from pre-designed building sets
        </p>
      </div>
      
      <div className="p-2 px-4 space-y-2">
        {categories.map((category, index) => {
          const isExpanded = expandedCategory === category.id;
          const isSelected = selectedCategory === category.id; // Use dynamic selected state

          return (
            <div
              key={category.id}
              className={`
                rounded-lg border transition-all duration-200 overflow-hidden bg-transparent
                ${isExpanded
                  ? 'border-[#FF1717]'
                  : 'border-[#07223D]'
                }
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Category Header - Compact */}
              <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer transition-all duration-150 bg-transparent"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center space-x-2">
                  <span className={`
                    font-semibold text-sm
                    ${isExpanded ? 'text-[#FF1717]' : 'text-[#07223D]'}
                  `}>
                    {category.name}
                  </span>
                  {isExpanded && (
                    <span className="border border-[#FF1717] text-[#FF1717] text-xs px-1.5 py-0.5 rounded-[4px] font-medium">
                      selected
                    </span>
                  )}
                </div>

                {isExpanded ? (
                  <svg
                    className="w-4 h-4 text-[#FF1717] transition-all duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-[#07223D] transition-all duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>

              {/* Category Content - Card Layout */}
              {isExpanded && (
                <div className="p-3 bg-transparent">
                  <div className="flex flex-col gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className={`
                          relative bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                          ${selectedItem?.id === item.id
                            ? 'border-[#FF1717] bg-[#FF1717] shadow-lg transform -translate-y-1'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                          ${item.featured ? 'ring-2 ring-red-200 bg-gradient-to-br from-red-50 to-orange-50' : ''}
                        `}
                        onClick={() => selectItem(item)}
                        style={{ animationDelay: `${itemIndex * 100}ms` }}
                      >
                        {/* Selection Indicator */}
                        {selectedItem?.id === item.id && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="bg-[#FF1717] text-white rounded-full p-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {/* Featured Badge */}
                        {item.featured && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          </div>
                        )}

                        {/* Card Content */}
                        <div className="p-4">
                          {/* Large Image/Icon */}
                          <div className="w-full h-32 rounded-lg flex items-center justify-center text-5xl mb-4">
                            {item.image}
                          </div>

                          {/* Item Details */}
                          <div className="text-center">
                            <h4 className="font-bold text-gray-900 mb-2 text-lg">
                              {item.name}
                            </h4>

                            {/* Dimensions in a clean grid */}
                            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                              <div className="bg-gray-50 rounded-lg p-2">
                                <div className="font-medium text-gray-800">Width</div>
                                <div>{item.width}'</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-2">
                                <div className="font-medium text-gray-800">Length</div>
                                <div>{item.length}'</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-2">
                                <div className="font-medium text-gray-800">Height</div>
                                <div>{item.height}'</div>
                              </div>
                            </div>

                            {selectedItem?.id === item.id && (
                              <button
                                className="w-full py-1  rounded-lg font-medium transition-all duration-200 bg-[#07223D] text-white shadow-md cursor-pointer"
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuildingTypePanel;
