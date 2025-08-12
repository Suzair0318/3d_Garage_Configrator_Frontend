import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

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
  {
    key: 'rightLeans',
    label: 'Right Leans',
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
  // Zustand toggles for lean accordions
  const leftLeanEnabled = useStore(state => state.leftLeanEnabled);
  const rightLeanEnabled = useStore(state => state.rightLeanEnabled);
  // Field state
  const [fields, setFields] = useState(initialFieldState);
  // Accordion expanded state
  const [expanded, setExpanded] = useState({ centerBuilding: true, leftLeans: false , rightLeans: false });

  // Smooth accordion animation refs per section
  const contentRefs = useRef({}); // animated wrapper
  const innerContentRefs = useRef({}); // actual content
  // Force re-render on resize so measured heights stay accurate
  const [, forceRerender] = useState(0);
  useEffect(() => {
    const onResize = () => forceRerender(v => v + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Keep animated maxHeight in sync with inner content size while expanded
  useEffect(() => {
    const observers = [];
    const listeners = [];

    const applyForKey = (key) => {
      const inner = innerContentRefs.current[key];
      const outer = contentRefs.current[key];
      if (!inner || !outer) return;
      outer.style.maxHeight = `${inner.scrollHeight}px`;
    };

    Object.keys(expanded).forEach((key) => {
      if (!expanded[key]) return;
      // Apply immediately and observe future changes
      applyForKey(key);
      const inner = innerContentRefs.current[key];
      if (inner && typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => applyForKey(key));
        ro.observe(inner);
        observers.push(ro);
      }
      // Handle async assets like images
      const imgs = inner?.querySelectorAll ? inner.querySelectorAll('img') : [];
      imgs.forEach((img) => {
        if (!img.complete) {
          const handler = () => applyForKey(key);
          img.addEventListener('load', handler);
          listeners.push([img, handler]);
        }
      });
      // Re-apply next frame to catch layout after transition start
      requestAnimationFrame(() => applyForKey(key));
    });

    return () => {
      observers.forEach(o => o.disconnect());
      listeners.forEach(([img, handler]) => img.removeEventListener('load', handler));
    };
  }, [expanded]);

  // Toggle accordion
  const handleAccordion = (key) => {
    // Mutually exclusive accordions (including leans if enabled)
    setExpanded((prev) => {
      const newState = {};
      Object.keys(prev).forEach(k => {
        if (k === key) {
          newState[k] = !prev[k];
        } else {
          newState[k] = false;
        }
      });
      return newState;
    });
  };

  // Only show leans accordions if enabled
  useEffect(() => {
    setExpanded(prev => ({
      ...prev,
      leftLeans: leftLeanEnabled ? prev.leftLeans : false,
      rightLeans: rightLeanEnabled ? prev.rightLeans : false
    }));
  }, [leftLeanEnabled, rightLeanEnabled]);

  // Handle field changes
  const handleFieldChange = (name, value, type) => {
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? !prev[name] : value }));
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Vertical Panels Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#07223D]">Vertical Panels</span>
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
        {accordionConfig
          .filter(acc => {
            if (acc.key === 'leftLeans') return leftLeanEnabled;
            if (acc.key === 'rightLeans') return rightLeanEnabled;
            return true;
          })
          .map(acc => (
          <div
            className={`
              rounded-lg border transition-all duration-200 overflow-hidden bg-transparent
              ${expanded[acc.key] ? 'border-[#FF1717]' : 'border-[#07223D]'}
            `}
            key={acc.key}
          >
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer transition-all duration-150 bg-transparent"
              onClick={() => handleAccordion(acc.key)}
            >
              <span
                className={`font-semibold text-sm ${expanded[acc.key] ? 'text-[#FF1717]' : 'text-[#07223D]'}`}
              >
                {acc.label}
              </span>
              {expanded[acc.key] ? (
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

            <div
              ref={(el) => { if (el) contentRefs.current[acc.key] = el; }}
              className={`
                bg-transparent overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] px-3
                ${expanded[acc.key] ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                maxHeight: expanded[acc.key]
                  ? `${innerContentRefs.current[acc.key]?.scrollHeight || 0}px`
                  : '0px',
                transitionDelay: expanded[acc.key] ? '60ms' : '0ms'
              }}
              aria-hidden={!expanded[acc.key]}
            >
              <div
                ref={(el) => { if (el) innerContentRefs.current[acc.key] = el; }}
                className={`border-t border-gray-200 space-y-4 py-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded[acc.key] ? 'translate-y-0' : '-translate-y-1'}`}
              >
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
                            <span className="text-sm font-semibold text-[#07223D] tracking-wide">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    );
                  }
                  // SELECT
                  if (field.type === 'select') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold text-[#07223D]  mb-1">{field.label}</label>
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
                        <span className="text-sm font-semibold text-[#07223D] tracking-wide">{field.label}</span>
                      </label>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
           </div>
        ))}

      </div>
    </div>
  );
};

export default SidePanel;