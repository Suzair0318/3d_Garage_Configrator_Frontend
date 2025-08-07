import React, { useState } from 'react';

const wallOptions = {
  front: ['Open', 'Closed', 'Partial'],
  back: ['Open', 'Gable', 'Closed'],
  left: ["Open", "1 Panel(6')", '2 Panels', '3 Panels'],
  right: ["Open", "1 Panel(9')", '2 Panels', '3 Panels']
};

const leanOptions = {
  width: ['6', '8', '10', '12', '14', '16', '18', '20'],
  length: ['12', '16', '20', '24', '28', '32', '36', '40'],
  height: ['6', '7', '8', '9', '10', '11', '12'],
  alignment: ['Front', 'Center', 'Back']
};

const initialFieldState = {
  verticalPanels: false,
  buildingType: 'open',
  frontWall: 'Open',
  backWall: 'Gable',
  leftWall: "1 Panel(6')",
  rightWall: "1 Panel(9')",
  backStorage: false,
  insulation: false,
  leanType: 'single',
  leanWidth: '8',
  leanLength: '20',
  leanHeight: '8',
  leanAlignment: 'Center',
  enclosedSides: false,
  gutterSystem: false,
  concretePad: false,
};

const accordionConfig = [
  {
    key: 'centerBuilding',
    label: 'Center Building',
    fields: [
      {
        type: 'radio',
        name: 'buildingType',
        label: 'Building Type',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'fully-enclosed', label: 'Fully Enclosed' },
        ],
      },
      {
        type: 'select',
        name: 'frontWall',
        label: 'Front Wall',
        options: wallOptions.front.map(v => ({ value: v, label: v })),
      },
      {
        type: 'select',
        name: 'backWall',
        label: 'Back Wall',
        options: wallOptions.back.map(v => ({ value: v, label: v })),
      },
      {
        type: 'select',
        name: 'leftWall',
        label: 'Left Wall',
        options: wallOptions.left.map(v => ({ value: v, label: v })),
      },
      {
        type: 'select',
        name: 'rightWall',
        label: 'Right Wall',
        options: wallOptions.right.map(v => ({ value: v, label: v })),
      },
      {
        type: 'checkbox',
        name: 'backStorage',
        label: 'Back Storage',
      },
      {
        type: 'checkbox',
        name: 'insulation',
        label: 'Insulation',
      },
    ],
  },
  {
    key: 'leftLeans',
    label: 'Left Leans',
    fields: [
      {
        type: 'radio',
        name: 'leanType',
        label: 'Lean Type',
        options: [
          { value: 'single', label: 'Single Lean' },
          { value: 'double', label: 'Double Lean' },
        ],
      },
      {
        type: 'select',
        name: 'leanWidth',
        label: 'Front Wall',
        options: leanOptions.width.map(v => ({ value: v, label: v })),
      },
      {
        type: 'select',
        name: 'leanLength',
        label: 'Back Wall',
        options: leanOptions.alignment.map(v => ({ value: v, label: v })),
      },
      {
        type: 'select',
        name: 'leanHeight',
        label: 'Side Wall',
        options: leanOptions.alignment.map(v => ({ value: v, label: v })),
      }
    ],
  },
];

const SidePanel = () => {
  // Field state
  const [fields, setFields] = useState(initialFieldState);
  // Accordion expanded state
  const [expanded, setExpanded] = useState({ centerBuilding: true, leftLeans: false });

  // Toggle accordion
  const handleAccordion = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle field changes
  const handleFieldChange = (name, value, type) => {
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? !prev[name] : value }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Vertical Panels Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Vertical Panels</span>
          <button
            onClick={() => handleFieldChange('verticalPanels', !fields.verticalPanels, 'checkbox')}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF1717] focus:ring-offset-2
              ${fields.verticalPanels ? 'bg-[#FF1717]' : 'bg-gray-200'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${fields.verticalPanels ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Dynamic Accordions */}
        {accordionConfig.map(acc => (
          <div className="border border-gray-300 rounded-md bg-white" key={acc.key}>
            <button
              onClick={() => handleAccordion(acc.key)}
              className="w-full flex items-center justify-between px-3 py-2 text-left bg-white hover:bg-gray-50 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100"
            >
              <span className="text-sm text-gray-700">{acc.label}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded[acc.key] ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expanded[acc.key] && (
              <div className="px-3 py-4 border-t border-gray-200 space-y-4">
                {acc.fields.map(field => {
                  // RADIO GROUP
                  if (field.type === 'radio') {
                    return (
                      <div className="space-y-2" key={field.name}>
                        {field.options.map(opt => (
                          <label className="flex items-center" key={opt.value}>
                            <input
                              type="radio"
                              name={field.name}
                              value={opt.value}
                              checked={fields[field.name] === opt.value}
                              onChange={e => handleFieldChange(field.name, opt.value, 'radio')}
                              className="w-4 h-4 text-[#FF1717] border-gray-300 focus:ring-[#FF1717] mr-2"
                            />
                            <span className="text-sm text-gray-700">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    );
                  }
                  // SELECT
                  if (field.type === 'select') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <select
                          value={fields[field.name]}
                          onChange={e => handleFieldChange(field.name, e.target.value, 'select')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF1717] focus:ring-2 focus:ring-red-100 bg-white text-sm"
                        >
                          {field.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  // CHECKBOX
                  if (field.type === 'checkbox') {
                    return (
                      <label className="flex items-center" key={field.name}>
                        <input
                          type="checkbox"
                          checked={fields[field.name]}
                          onChange={() => handleFieldChange(field.name, !fields[field.name], 'checkbox')}
                          className="w-4 h-4 text-[#FF1717] border-gray-300 rounded focus:ring-[#FF1717] mr-2"
                        />
                        <span className="text-sm text-gray-700">{field.label}</span>
                      </label>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default SidePanel;