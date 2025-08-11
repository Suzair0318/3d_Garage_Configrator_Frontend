import React, { useState } from 'react';

const LeanPanel = () => {
  const [leftEnabled, setLeftEnabled] = useState(false);
  const [rightEnabled, setRightEnabled] = useState(false);
  const [leftConfig, setLeftConfig] = useState({
    width: '8',
    length: '10',
    height: '8',
    alignment: 'Back'
  });
  const [rightConfig, setRightConfig] = useState({
    width: '8',
    length: '10',
    height: '8',
    alignment: 'Back'
  });
  
  const leanOptions = {
    left: {
      label: "Left",
      width: ["6", "8", "10", "12", "14", "16", "18", "20"],
      length: ["8", "10", "12", "14", "16", "18", "20", "22", "24"],
      height: ["6", "7", "8", "9", "10", "11", "12"],
      alignment: ["Front", "Back", "Center"]
    },
    right: {
      label: "Right",
      width: ["6", "8", "10", "12", "14", "16", "18", "20"],
      length: ["8", "10", "12", "14", "16", "18", "20", "22", "24"],
      height: ["6", "7", "8", "9", "10", "11", "12"],
      alignment: ["Front", "Back", "Center"]
    }
  };

  const updateLeftConfig = (field, value) => {
    setLeftConfig(prev => ({ ...prev, [field]: value }));
  };

  const updateRightConfig = (field, value) => {
    setRightConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Left Section */}
        <div>
          <div className="flex items-center mb-4">
            <button
              onClick={() => setLeftEnabled(!leftEnabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF1717] focus:ring-offset-2 mr-3
                ${leftEnabled ? 'bg-[#FF1717]' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${leftEnabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            <label className="text-lg font-semibold text-gray-800">
              {leanOptions?.left?.label}
            </label>
          </div>

          <div className="space-y-4 ml-6">
            {/* Left Width */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D] mb-2">Width</label>
              <select 
                value={leftConfig.width} 
                onChange={(e) => updateLeftConfig('width', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.left?.width?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Left Length */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D]  mb-2">Length</label>
              <select 
                value={leftConfig.length} 
                onChange={(e) => updateLeftConfig('length', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.left?.length?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Left Height */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D]  mb-2">Height</label>
              <select 
                value={leftConfig.height} 
                onChange={(e) => updateLeftConfig('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.left?.height?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Left Alignment */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D]  mb-2">Alignment</label>
              <select 
                value={leftConfig.alignment} 
                onChange={(e) => updateLeftConfig('alignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.left?.alignment?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div className="flex items-center mb-4">
            <button
              onClick={() => setRightEnabled(!rightEnabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF1717] focus:ring-offset-2 mr-3
                ${rightEnabled ? 'bg-[#FF1717]' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${rightEnabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            <label className="text-lg font-semibold text-gray-800">
              {leanOptions?.right?.label}
            </label>
          </div>

          <div className="space-y-4 ml-6">
            {/* Right Width */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D] mb-2">Width</label>
              <select 
                value={rightConfig.width} 
                onChange={(e) => updateRightConfig('width', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.right?.width?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Right Length */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D] mb-2">Length</label>
              <select 
                value={rightConfig.length} 
                onChange={(e) => updateRightConfig('length', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.right?.length?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Right Height */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D] mb-2">Height</label>
              <select 
                value={rightConfig.height} 
                onChange={(e) => updateRightConfig('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.right?.height?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Right Alignment */}
            <div>
              <label className="block text-sm font-semibold text-[#07223D] mb-2">Alignment</label>
              <select 
                value={rightConfig.alignment} 
                onChange={(e) => updateRightConfig('alignment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
              >
                {leanOptions?.right?.alignment?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeanPanel;