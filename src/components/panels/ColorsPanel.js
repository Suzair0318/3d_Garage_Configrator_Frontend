import React, { useState } from 'react';

const ColorsPanel = () => {
  const [selectedRoof, setSelectedRoof] = useState('green');
  const [selectedTrim, setSelectedTrim] = useState('green');
  const [selectedWall, setSelectedWall] = useState('red');
  const [addWainscot, setAddWainscot] = useState(false);
  // Single source of truth for colors (future: replace with API response)
  // Each color indicates which categories it applies to.
  const allColors = [
    { id: 'brown', name: 'Brown', color: '#8B4513', categories: ['roof', 'trim', 'wall'] },
    { id: 'charcoal', name: 'Charcoal', color: '#36454F', categories: ['roof', 'trim', 'wall'] },
    { id: 'green', name: 'Green', color: '#228B22', categories: ['roof', 'trim', 'wall'] },
    { id: 'red', name: 'Red', color: '#DC143C', categories: ['roof', 'trim', 'wall'] },
    { id: 'tan', name: 'Tan', color: '#D2B48C', categories: ['roof', 'trim', 'wall'] },
    { id: 'darkBrown', name: 'Dark Brown', color: '#654321', categories: ['roof', 'trim', 'wall'] },
    { id: 'darkGreen', name: 'Dark Green', color: '#006400', categories: ['roof', 'trim', 'wall'] },
    { id: 'lightBlue', name: 'Light Blue', color: '#ADD8E6', categories: ['roof', 'trim', 'wall'] },
    { id: 'blue', name: 'Blue', color: '#0066CC', categories: ['roof', 'trim', 'wall'] },
    { id: 'burgundy', name: 'Burgundy', color: '#800020', categories: ['roof', 'trim', 'wall'] },
    { id: 'darkBurgundy', name: 'Dark Burgundy', color: '#5D001E', categories: ['wall'] },
    { id: 'cream', name: 'Cream', color: '#FFFDD0', categories: ['roof', 'trim', 'wall'] },
    { id: 'gray', name: 'Gray', color: '#808080', categories: ['roof', 'trim', 'wall'] },
    { id: 'darkGray', name: 'Dark Gray', color: '#555555', categories: ['roof', 'trim', 'wall'] },
    { id: 'beige', name: 'Beige', color: '#F5F5DC', categories: ['roof', 'trim', 'wall'] },
    { id: 'steelBlue', name: 'Steel Blue', color: '#4682B4', categories: ['roof', 'trim', 'wall'] },
    { id: 'lightTan', name: 'Light Tan', color: '#E6D3A3', categories: ['roof', 'trim', 'wall'] },
    { id: 'white', name: 'White', color: '#FFFFFF', categories: ['roof', 'trim', 'wall'] },
  ];

  // Derived views (what the UI needs today)
  const roofColors = allColors.filter(c => c.categories.includes('roof'));
  const trimColors = allColors.filter(c => c.categories.includes('trim'));
  const wallColors = allColors.filter(c => c.categories.includes('wall'));

  const ColorSelector = ({ title, colors, selected, onSelect, selectedColorName }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-[#07223D] tracking-wide">{title}</h4>
        <span className="text-sm text-[#FF1717] font-semibold bg-[#FF1717]/10 px-3 py-1 rounded-full border border-[#FF1717]/20">{selectedColorName}</span>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {colors.map((color) => (
          <div
            key={color.id}
            onClick={() => onSelect(color.id)}
            className="relative cursor-pointer group"
          >
            <div
              className={`
                w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-xl
                ${selected === color.id 
                  ? 'border-[#FF1717] shadow-xl ring-2 ring-[#FF1717]/30' 
                  : 'border-gray-200 hover:border-[#FF1717]/50 shadow-md'
                }
              `}
              style={{ backgroundColor: color.color }}
            >
              {selected === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#FF1717] rounded-full p-0.5 shadow-lg">
                    <svg 
                      className="w-4 h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-white">
      <div className="p-6">
        <ColorSelector
          title="Roof Color"
          colors={roofColors}
          selected={selectedRoof}
          onSelect={setSelectedRoof}
          selectedColorName={roofColors.find(c => c.id === selectedRoof)?.name || 'Burgundy'}
        />

        <ColorSelector
          title="Trim Color"
          colors={trimColors}
          selected={selectedTrim}
          onSelect={setSelectedTrim}
          selectedColorName={trimColors.find(c => c.id === selectedTrim)?.name || 'Burgundy'}
        />

        <ColorSelector
          title="Wall Color"
          colors={wallColors}
          selected={selectedWall}
          onSelect={setSelectedWall}
          selectedColorName={wallColors.find(c => c.id === selectedWall)?.name || 'Cardinal Red'}
        />

        {/* Roof Pitch + Wainscot */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-[#07223D] mb-3 tracking-wide">Roof Pitch</h4>
          <label className="inline-flex items-center gap-3 select-none cursor-pointer group">
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 shadow-inner ${addWainscot ? 'bg-gradient-to-r from-[#FF1717] to-[#FF4444]' : 'bg-gray-300'}`}>
              <input
                type="checkbox"
                className="sr-only"
                checked={addWainscot}
                onChange={(e) => setAddWainscot(e.target.checked)}
              />
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${addWainscot ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-[#07223D] font-semibold group-hover:text-[#FF1717] transition-colors">Add Wainscot (Full Building)</span>
          </label>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-[#07223D] mb-3 tracking-wide">Disclaimer</h4>
          <p className="text-sm leading-6 text-gray-700">
            Due to the variations in monitors and browsers, the color samples displayed on this tool may appear different on different monitors and devices. Computer monitors are not all calibrated equally and color reproduction on the Internet is not precise. Since it is not possible to guarantee our online colors will look the same on all computers, we do not guarantee that what you see accurately portrays the color of the actual color of the Sheet Metal. We do our very best to make sure our samples are as close to the exact product as possible, but cannot guarantee that what you see is an exact sample. If it is important that the sample be exact, it is highly recommended that once you contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorsPanel;
