import React, { useState } from 'react';

const SizePanel = () => {
  const [width, setWidth] = useState('16');
  const [length, setLength] = useState('40');
  const [height, setHeight] = useState('10');
  const [roofStyle, setRoofStyle] = useState('Vertical');
  const [roofPitch, setRoofPitch] = useState('3/12');
  const [gauge, setGauge] = useState('12');

  const widthOptions = ['12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];
  const lengthOptions = ['20', '25', '30', '35', '40', '45', '50', '55', '60'];
  const heightOptions = ['8', '9', '10', '11', '12', '13', '14', '15', '16'];
  const roofStyleOptions = ['Vertical', 'Horizontal', 'A-Frame'];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Selected Building Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-[#FF1717] font-semibold mb-3 text-center">
            Selected Building
          </h3>
          <div className="relative bg-gray-50 rounded-lg p-6 mb-4">
            <div className="absolute top-2 right-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-2">🏗️</div>
              <h4 className="font-semibold text-[#07223D] mb-2">STANDARD CARPORTS</h4>
              <button className="bg-[#07223D] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                Change Building
              </button>
            </div>
          </div>
        </div>
     
        {/* Building Size Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Building Size</h3>
          
          <div className="space-y-4">
            {/* Width */}
            <div>
              <label className="block text-sm font-semibold tracking-wide text-[#07223D] mb-2">Width</label>
              <select 
                value={width} 
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {widthOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Length */}
            <div>
              <label className="block text-sm font-semibold tracking-wide text-[#07223D] mb-2">Length</label>
              <select 
                value={length} 
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {lengthOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold tracking-wide text-[#07223D] mb-2">Height</label>
              <select 
                value={height} 
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {heightOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Roof Style Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Roof Style</h3>
          <div>
            <label className="block text-sm font-semibold tracking-wide text-[#07223D] mb-2">Style</label>
            <select 
              value={roofStyle} 
              onChange={(e) => setRoofStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
            >
              {roofStyleOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Roof Pitch Section */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Roof Pitch</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="roofPitch"
                value="3/12"
                checked={roofPitch === '3/12'}
                onChange={(e) => setRoofPitch(e.target.value)}
                className="w-4 h-4 text-[#FF1717] border-gray-300 focus:ring-[#FF1717]"
              />
              <span className="ml-2 text-sm font-semibold tracking-wide text-[#07223D]">3/12 (Standard)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"  
                name="roofPitch"
                value="4/12"
                checked={roofPitch === '4/12'}
                onChange={(e) => setRoofPitch(e.target.value)}
                className="w-4 h-4 text-[#FF1717] border-gray-300 focus:ring-[#FF1717]"
              />
              <span className="ml-2 text-sm font-semibold tracking-wide text-[#07223D]">4/12</span>
            </label>
          </div>
        </div>

        {/* Gauge Section */}
        <div>
          <h3 className="font-semibold text-lg text-[#07223D] mb-4">Gauge</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gauge"
                value="12"
                checked={gauge === '12'}
                onChange={(e) => setGauge(e.target.value)}
                className="w-4 h-4 text-[#FF1717] border-gray-300 focus:ring-[#FF1717]"
              />
              <span className="ml-2 text-sm font-semibold tracking-wide text-[#07223D]">12 Gauge</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gauge"
                value="14"
                checked={gauge === '14'}
                onChange={(e) => setGauge(e.target.value)}
                className="w-4 h-4 text-[#FF1717] border-gray-300 focus:ring-[#FF1717]"
              />
              <span className="ml-2 text-sm font-semibold tracking-wide text-[#07223D]">14 Gauge</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizePanel;
