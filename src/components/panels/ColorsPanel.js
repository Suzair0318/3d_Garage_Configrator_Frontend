import React, { useState } from 'react';

const ColorsPanel = () => {
  const [selectedRoof, setSelectedRoof] = useState('charcoal');
  const [selectedSiding, setSelectedSiding] = useState('white');
  const [selectedTrim, setSelectedTrim] = useState('black');

  const roofColors = [
    { id: 'charcoal', name: 'Charcoal Gray', color: '#36454F' },
    { id: 'brown', name: 'Rustic Brown', color: '#8B4513' },
    { id: 'green', name: 'Forest Green', color: '#228B22' },
    { id: 'red', name: 'Barn Red', color: '#AA4A44' },
    { id: 'blue', name: 'Ocean Blue', color: '#4682B4' },
  ];

  const sidingColors = [
    { id: 'white', name: 'Classic White', color: '#FFFFFF' },
    { id: 'beige', name: 'Warm Beige', color: '#F5F5DC' },
    { id: 'gray', name: 'Stone Gray', color: '#708090' },
    { id: 'tan', name: 'Desert Tan', color: '#D2B48C' },
    { id: 'cream', name: 'Antique Cream', color: '#FFFDD0' },
  ];

  const trimColors = [
    { id: 'black', name: 'Classic Black', color: '#000000' },
    { id: 'white', name: 'Pure White', color: '#FFFFFF' },
    { id: 'brown', name: 'Dark Brown', color: '#654321' },
    { id: 'gray', name: 'Charcoal Gray', color: '#36454F' },
  ];

  const ColorSelector = ({ title, colors, selected, onSelect }) => (
    <div className="mb-6">
      <h4 className="font-medium text-gray-700 mb-3">{title}</h4>
      <div className="grid grid-cols-3 gap-3">
        {colors.map((color) => (
          <div
            key={color.id}
            onClick={() => onSelect(color.id)}
            className={`
              relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 group overflow-hidden
              ${selected === color.id
                ? 'border-[#FF1717] shadow-md'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Hover shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <div className="flex items-center space-x-3 relative">
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
                style={{ backgroundColor: color.color }}
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {color.name}
                </div>
              </div>
            </div>
            {selected === color.id && (
              <div className="absolute top-1 right-1">
                <div className="w-3 h-3 bg-[#FF1717] rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Choose Colors
        </h3>

        <ColorSelector
          title="Roof Color"
          colors={roofColors}
          selected={selectedRoof}
          onSelect={setSelectedRoof}
        />

        <ColorSelector
          title="Siding Color"
          colors={sidingColors}
          selected={selectedSiding}
          onSelect={setSelectedSiding}
        />

        <ColorSelector
          title="Trim Color"
          colors={trimColors}
          selected={selectedTrim}
          onSelect={setSelectedTrim}
        />

        {/* Color Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-3">Color Preview</h4>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-24 rounded-lg overflow-hidden shadow-lg">
              {/* Roof */}
              <div
                className="absolute top-0 left-0 right-0 h-6"
                style={{ backgroundColor: roofColors.find(c => c.id === selectedRoof)?.color }}
              />
              {/* Siding */}
              <div
                className="absolute top-6 left-0 right-0 bottom-2"
                style={{ backgroundColor: sidingColors.find(c => c.id === selectedSiding)?.color }}
              />
              {/* Trim */}
              <div
                className="absolute bottom-0 left-0 right-0 h-2"
                style={{ backgroundColor: trimColors.find(c => c.id === selectedTrim)?.color }}
              />
            </div>
          </div>
          <div className="text-center mt-3 text-sm text-gray-600">
            <div>Roof: {roofColors.find(c => c.id === selectedRoof)?.name}</div>
            <div>Siding: {sidingColors.find(c => c.id === selectedSiding)?.name}</div>
            <div>Trim: {trimColors.find(c => c.id === selectedTrim)?.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsPanel;
