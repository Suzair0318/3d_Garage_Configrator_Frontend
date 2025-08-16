import React, { useState, useId } from 'react';
import useStore from '../../store/useStore';

const SizePanel = (
  {
    setActiveIndex,
    setActivePanelItem
  }
) => {
  const roofPitchName = useId();
  const gaugeName = useId();
  const [width, setWidth] = useState('16');
  const [length, setLength] = useState('40');
  const [height, setHeight] = useState('10');
  const [roofStyle, setRoofStyle] = useState('Vertical');
  const [roofPitch, setRoofPitch] = useState('3/12');
  const [gauge, setGauge] = useState('12');

  // Read selected building from global store
  const selectedBuilding = useStore(state => state.selectedBuilding);
  const setSelectedBuilding = useStore(state => state.setSelectedBuilding);

  // Generic value and setter maps for config-driven rendering
  const values = { width, length, height, roofStyle, roofPitch, gauge };
  const setters = { width: setWidth, length: setLength, height: setHeight, roofStyle: setRoofStyle, roofPitch: setRoofPitch, gauge: setGauge };

  // Config similar to SidePanel's accordionConfig to map UI infinitely from data
  const panelConfig = [
    {
      key: 'size',
      title: 'Building Size',
      fields: [
        { type: 'select', label: 'Width', options: ['12', '14', '16', '18', '20', '22', '24', '26', '28', '30'] },
        { type: 'select', label: 'Length', options: ['20', '25', '30', '35', '40', '45', '50', '55', '60'] },
        { type: 'select', label: 'Height', options: ['8', '9', '10', '11', '12', '13', '14', '15', '16'] },
      ],
    },
    {
      key: 'roofStyle',
      title: 'Roof Style',
      fields: [
        { type: 'select', label: 'Style', options: ['Vertical', 'Horizontal', 'A-Frame'] },
      ],
    },
    {
      key: 'roofPitch',
      title: 'Roof Pitch',
      fields: [
        { type: 'radio', options: ['3/12', '4/12'] },
      ],
    },
    {
      key: 'gauge',
      title: 'Gauge',
      fields: [
        { type: 'radio', options: ['12', '14'] },
      ],
    },
  ];

  const handle_open_size_panel = () => {
    setActiveIndex(0);
    setActivePanelItem({ id: 'building' });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-2 sm:p-4 space-y-4 sm:space-y-6">
        <h3 className="text-[#FF1717] font-semibold mb-2 sm:mb-3 text-center text-sm sm:text-base">
          Selected Building
        </h3>
        {/* Selected Building Section */}
        <div className="border border-red-200 rounded-lg p-2 sm:p-4 mx-2 sm:mx-4 md:mx-8">
          <div className="relative bg-white rounded-lg p-2 sm:p-4">
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 sm:mb-3 w-full flex justify-center">
                {/* If you have real images per type, swap based on selectedBuilding.id */}
                <img
                  src={selectedBuilding ? selectedBuilding?.image : '/images/carport.png'}
                  alt={selectedBuilding?.name}
                  className="h-16 sm:h-20 md:h-24 object-contain"
                />
              </div>
              <h4 className="font-semibold text-[#07223D] text-xs sm:text-sm uppercase mb-1 sm:mb-2 text-center leading-tight">
                {selectedBuilding?.name}
              </h4>
              <button
                className="bg-[#07223D] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors w-full"
                onClick={() => handle_open_size_panel()}
              >
                Change Building
              </button>

            </div>
          </div>
        </div>

        {/* Config-driven sections */}
        {panelConfig.map(section => (
          <div key={section.key}>
            <h3 className={`font-semibold text-base sm:text-lg mb-2 sm:mb-4 ${section.key === 'gauge' ? 'text-[#07223D]' : 'text-gray-800'}`}>
              {section.title}
            </h3>
            <div className={section.key === 'roofPitch' || section.key === 'gauge' ? 'space-y-1 sm:space-y-2' : 'space-y-2 sm:space-y-4'}>
              {section.fields.map((field) => {
                // derive state key based on section and label if not explicitly provided
                const labelToKey = { Width: 'width', Length: 'length', Height: 'height', Style: 'roofStyle' };
                const derivedKey = labelToKey[field.label] ||
                  (section.key === 'roofPitch' ? 'roofPitch' : section.key === 'gauge' ? 'gauge' : section.key === 'roofStyle' ? 'roofStyle' : undefined);

                if (field.type === 'select') {
                  const stateKey = derivedKey;
                  return (
                    <div key={stateKey || field.label}>
                      <label className="block text-xs sm:text-sm font-semibold tracking-wide text-[#07223D] mb-1 sm:mb-2">{field.label}</label>
                      <select
                        value={values[stateKey]}
                        onChange={(e) => setters[stateKey](e.target.value)}
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white text-xs sm:text-sm"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (field.type === 'radio') {
                  const stateKey = derivedKey;
                  const groupName = field.name || (section.key === 'roofPitch' ? `roofPitch-${roofPitchName}` : section.key === 'gauge' ? `gauge-${gaugeName}` : undefined);
                  return field.options?.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name={groupName}
                        value={option}
                        checked={values[stateKey] === option}
                        onChange={(e) => setters[stateKey](e.target.value)}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF1717] border-gray-300 focus:ring-[#FF1717]"
                      />
                      <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-semibold tracking-wide text-[#07223D]">
                        {option}
                        {section.key === 'gauge' ? ' Gauge' : ''}
                        {section.key === 'roofPitch' && option === '3/12' ? ' (Standard)' : ''}
                      </span>
                    </label>
                  ));
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizePanel;
