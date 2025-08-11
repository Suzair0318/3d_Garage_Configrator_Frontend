import React, { useState } from 'react';

const ColorsPanel = () => {
  const [selectedRoof, setSelectedRoof] = useState('green');
  const [selectedTrim, setSelectedTrim] = useState('green');
  const [selectedWall, setSelectedWall] = useState('red');
  const [addWainscot, setAddWainscot] = useState(false);

  const roofColors = [
    { id: 'brown', name: 'Brown', color: '#8B4513' },
    { id: 'charcoal', name: 'Charcoal', color: '#36454F' },
    { id: 'green', name: 'Green', color: '#228B22' },
    { id: 'red', name: 'Red', color: '#DC143C' },
    { id: 'tan', name: 'Tan', color: '#D2B48C' },
    { id: 'darkBrown', name: 'Dark Brown', color: '#654321' },
    { id: 'darkGreen', name: 'Dark Green', color: '#006400' },
    { id: 'lightBlue', name: 'Light Blue', color: '#ADD8E6' },
    { id: 'blue', name: 'Blue', color: '#0066CC' },
    { id: 'burgundy', name: 'Burgundy', color: '#800020' },
    { id: 'cream', name: 'Cream', color: '#FFFDD0' },
    { id: 'gray', name: 'Gray', color: '#808080' },
    { id: 'darkGray', name: 'Dark Gray', color: '#555555' },
    { id: 'beige', name: 'Beige', color: '#F5F5DC' },
    { id: 'steelBlue', name: 'Steel Blue', color: '#4682B4' },
    { id: 'lightTan', name: 'Light Tan', color: '#E6D3A3' },
    { id: 'white', name: 'White', color: '#FFFFFF' }
  ];

  const trimColors = [
    { id: 'brown', name: 'Brown', color: '#8B4513' },
    { id: 'charcoal', name: 'Charcoal', color: '#36454F' },
    { id: 'green', name: 'Green', color: '#228B22' },
    { id: 'red', name: 'Red', color: '#DC143C' },
    { id: 'tan', name: 'Tan', color: '#D2B48C' },
    { id: 'darkBrown', name: 'Dark Brown', color: '#654321' },
    { id: 'darkGreen', name: 'Dark Green', color: '#006400' },
    { id: 'lightBlue', name: 'Light Blue', color: '#ADD8E6' },
    { id: 'blue', name: 'Blue', color: '#0066CC' },
    { id: 'burgundy', name: 'Burgundy', color: '#800020' },
    { id: 'cream', name: 'Cream', color: '#FFFDD0' },
    { id: 'gray', name: 'Gray', color: '#808080' },
    { id: 'darkGray', name: 'Dark Gray', color: '#555555' },
    { id: 'beige', name: 'Beige', color: '#F5F5DC' },
    { id: 'steelBlue', name: 'Steel Blue', color: '#4682B4' },
    { id: 'lightTan', name: 'Light Tan', color: '#E6D3A3' },
    { id: 'white', name: 'White', color: '#FFFFFF' }
  ];

  const wallColors = [
    { id: 'brown', name: 'Brown', color: '#8B4513' },
    { id: 'charcoal', name: 'Charcoal', color: '#36454F' },
    { id: 'burgundy', name: 'Burgundy', color: '#800020' },
    { id: 'red', name: 'Cardinal Red', color: '#DC143C' },
    { id: 'tan', name: 'Tan', color: '#D2B48C' },
    { id: 'darkBrown', name: 'Dark Brown', color: '#654321' },
    { id: 'darkGreen', name: 'Dark Green', color: '#006400' },
    { id: 'lightBlue', name: 'Light Blue', color: '#ADD8E6' },
    { id: 'blue', name: 'Blue', color: '#0066CC' },
    { id: 'darkBurgundy', name: 'Dark Burgundy', color: '#5D001E' },
    { id: 'cream', name: 'Cream', color: '#FFFDD0' },
    { id: 'gray', name: 'Gray', color: '#808080' },
    { id: 'darkGray', name: 'Dark Gray', color: '#555555' },
    { id: 'beige', name: 'Beige', color: '#F5F5DC' },
    { id: 'steelBlue', name: 'Steel Blue', color: '#4682B4' },
    { id: 'lightTan', name: 'Light Tan', color: '#E6D3A3' },
    { id: 'white', name: 'White', color: '#FFFFFF' }
  ];

  const ColorSelector = ({ title, colors, selected, onSelect, selectedColorName }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
        <span className="text-sm text-gray-600 font-medium">{selectedColorName}</span>
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
                w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg
                ${selected === color.id 
                  ? 'border-gray-400 shadow-md' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
              style={{ backgroundColor: color.color }}
            >
              {selected === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-green-500 drop-shadow-lg" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
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
          <h4 className="text-lg font-medium text-gray-800 mb-3">Roof Pitch</h4>
          <label className="inline-flex items-center gap-3 select-none cursor-pointer">
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${addWainscot ? 'bg-green-500' : 'bg-gray-300'}`}>
              <input
                type="checkbox"
                className="sr-only"
                checked={addWainscot}
                onChange={(e) => setAddWainscot(e.target.checked)}
              />
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${addWainscot ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-gray-800 font-medium">Add Wainscot (Full Building)</span>
          </label>
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Disclaimer</h4>
          <p className="text-sm leading-6 text-gray-600">
            Due to the variations in monitors and browsers, the color samples displayed on this tool may appear different on different monitors and devices. Computer monitors are not all calibrated equally and color reproduction on the Internet is not precise. Since it is not possible to guarantee our online colors will look the same on all computers, we do not guarantee that what you see accurately portrays the color of the actual color of the Sheet Metal. We do our very best to make sure our samples are as close to the exact product as possible, but cannot guarantee that what you see is an exact sample. If it is important that the sample be exact, it is highly recommended that once you contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorsPanel;
