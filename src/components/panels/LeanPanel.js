import React, { useState } from 'react';
import useStore from '../../store/useStore';

const LeanPanel = () => {
  const leftEnabled = useStore(state => state.leftLeanEnabled);
  const setLeftEnabled = useStore(state => state.setLeftLeanEnabled);
  const rightEnabled = useStore(state => state.rightLeanEnabled);
  const setRightEnabled = useStore(state => state.setRightLeanEnabled);
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

  // Config-driven field definitions per side (easy to extend or replace with API data)
  // Keeps side-specific mapping explicit without embedding state in the object
  const fieldDefsBySide = {
    left: [
      {
        key: 'width',
        label: 'Width',
        type: 'select',
        options: ["6", "8", "10", "12", "14", "16", "18", "20"]
      },
      {
        key: 'length',
        label: 'Length',
        type: 'select',
        options: ["8", "10", "12", "14", "16", "18", "20", "22", "24"]
      },
      {
        key: 'height',
        label: 'Height',
        type: 'select',
        options: ["6", "7", "8", "9", "10", "11", "12"]
      },
      {
        key: 'alignment',
        label: 'Alignment',
        type: 'select',
        options: ["Front", "Back", "Center"]
      },
    ],
    right: [
      {
        key: 'width',
        label: 'Width',
        type: 'select',
        options: ["6", "8", "10", "12", "14", "16", "18", "20"]
      },
      {
        key: 'length',
        label: 'Length',
        type: 'select',
        options: ["8", "10", "12", "14", "16", "18", "20", "22", "24"]
      },
      {
        key: 'height',
        label: 'Height',
        type: 'select',
        options: ["6", "7", "8", "9", "10", "11", "12"]
      },
      {
        key: 'alignment',
        label: 'Alignment',
        type: 'select',
        options: ["Front", "Back", "Center"]
      },
    ],
  };

  // Static side metadata only (no state inside this object)
  const sideMeta = {
    left: { label: 'Left' },
    right: { label: 'Right' },
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Dynamic Left/Right Sections driven by fieldDefs */}
        {(['left', 'right']).map((sideKey) => {
          const enabled = sideKey === 'left' ? leftEnabled : rightEnabled;
          const setEnabled = sideKey === 'left' ? setLeftEnabled : setRightEnabled;
          const config = sideKey === 'left' ? leftConfig : rightConfig;
          const update = sideKey === 'left'
            ? (k, v) => setLeftConfig(prev => ({ ...prev, [k]: v }))
            : (k, v) => setRightConfig(prev => ({ ...prev, [k]: v }));
          return (
            <div key={sideKey}>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF1717] focus:ring-offset-2 mr-3
                    ${enabled ? 'bg-[#FF1717]' : 'bg-gray-200'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${enabled ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
                <label className="text-lg font-semibold text-gray-800">{sideMeta[sideKey].label}</label>
              </div>

              <div className="space-y-4 ml-6">
                {(fieldDefsBySide[sideKey] || []).map((field) => (
                  <div key={`${sideKey}-${field.key}`}>
                    <label className="block text-sm font-semibold text-[#07223D] mb-2">{field.label}</label>
                    {field.type === 'select' && (
                      <select
                        value={config[field.key]}
                        onChange={(e) => update(field.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white"
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeanPanel;