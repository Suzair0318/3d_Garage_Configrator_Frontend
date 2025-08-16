import React, { useState } from 'react';

// Default data schema for future API-driven content
const defaultOptionsData = {
  windRatings: {
    label: 'Wind & Snow Ratings',
    items: [
      { id: 'uncertified', label: 'Uncertified' },
      { id: '140mph', label: '140 MPH + 30 PSF Certified' },
      { id: '155mph', label: '155 MPH Certified' },
    ],
  },
  additionalOptions: [
    { id: 'panelUpgrade', type: 'toggle', label: '26 GA Panel Upgrade' },
    { id: 'coloredScrews', type: 'toggle', label: 'Colored Screws' },
    { id: 'sideOverhang', type: 'toggle', label: 'Side Overhang', extra: { kind: 'select', options: [
      { value: '2ft', label: '2 ft' },
      { value: '3ft', label: '3 ft' },
      { value: '4ft', label: '4 ft' },
      { value: '6ft', label: '6 ft' },
    ]}},
    { id: 'extraBows', type: 'toggle', label: 'Extra Bows', extra: { kind: 'number', min: 1, max: 20, placeholder: 'Qty', helper: 'quantity' }},
    { id: 'mobileAnchor', type: 'toggle', label: 'Mobile Home Anchor', extra: { kind: 'number', min: 1, max: 50, placeholder: 'Qty', helper: 'quantity' }},
    { id: 'extraBraces', type: 'toggle', label: "2' Extra Braces", extra: { kind: 'number', min: 1, max: 20, placeholder: 'Qty', helper: 'quantity' }},
  ],
  siteInfo: {
    label: 'Site Information',
    items: [
      { id: 'jobSiteLevel', label: 'Job Site Level' },
      { id: 'powerAvailable', label: 'Power Available' },
    ],
  },
  drawings: {
    label: 'Drawings',
    items: [
      { id: 'generic', label: 'Generic' },
      { id: 'engineered', label: 'Engineered' },
      { id: 'none', label: 'None' },
    ],
  },
  extra: { label: 'Extra', placeholder: 'Leave a comment here' },
  surfaces: {
    label: 'Installation Surface',
    items: [
      { value: 'concrete', label: 'Concrete' },
      { value: 'gravel', label: 'Gravel' },
      { value: 'dirt', label: 'Dirt' },
      { value: 'asphalt', label: 'Asphalt' },
    ],
  },
};

const OptionsPanel = ({ data = defaultOptionsData }) => {
  const [selectedWindRating, setSelectedWindRating] = useState('uncertified');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDrawings, setSelectedDrawings] = useState('none');
  const [selectedSurface, setSelectedSurface] = useState('concrete');
  const [jobSiteLevel, setJobSiteLevel] = useState(false);
  const [powerAvailable, setPowerAvailable] = useState(false);
  const [extraComments, setExtraComments] = useState('');
  
  // Additional option states
  const [sideOverhangOption, setSideOverhangOption] = useState('2ft');
  const [extraBowsQuantity, setExtraBowsQuantity] = useState(1);
  const [mobileAnchorQuantity, setMobileAnchorQuantity] = useState(1);
  const [extraBracesQuantity, setExtraBracesQuantity] = useState(1);

  const toggleOption = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-white">
      <div className="p-3 sm:p-4 lg:p-6">
    
        {/* Wind & Snow Ratings */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#07223D] mb-2 sm:mb-3 lg:mb-4">{data.windRatings.label}</h3>
          <div className="space-y-2 sm:space-y-3">
            {data.windRatings.items.map(item => (
              <div key={item.id} className="flex items-center space-x-2 sm:space-x-3">
                <div
                  onClick={() => setSelectedWindRating(item.id)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                    selectedWindRating === item.id ? 'border-[#FF1717] bg-[#FF1717]' : 'border-gray-300'
                  }`}
                >
                  {selectedWindRating === item.id && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <span className="text-[#07223D] font-medium text-xs sm:text-sm lg:text-base">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="space-y-2 sm:space-y-3">
            {data.additionalOptions.map(opt => (
              <div key={opt.id} className="space-y-1 sm:space-y-2">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div
                    onClick={() => toggleOption(opt.id)}
                    className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-all duration-300 cursor-pointer ${
                      selectedOptions.includes(opt.id) ? 'bg-[#FF1717]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      selectedOptions.includes(opt.id) ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                  <span className="text-[#07223D] font-medium text-xs sm:text-sm lg:text-base">{opt.label}</span>
                </div>

                {/* Extras for specific toggles */}
                {selectedOptions.includes(opt.id) && opt.extra?.kind === 'select' && (
                  <div className="">
                    <select
                      value={sideOverhangOption}
                      onChange={(e) => setSideOverhangOption(e.target.value)}
                      className="w-full p-1.5 sm:p-2 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 text-[#07223D] bg-white text-xs sm:text-sm"
                    >
                      {opt.extra.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedOptions.includes(opt.id) && opt.extra?.kind === 'number' && (
                  <div className="">
                    {opt.extra.helper && (
                      <span className="ml-2 text-xs sm:text-sm text-gray-600">{opt.extra.helper}</span>
                    )}
                    <input
                      type="number"
                      min={opt.extra.min}
                      max={opt.extra.max}
                      value={
                        opt.id === 'extraBows' ? extraBowsQuantity :
                        opt.id === 'mobileAnchor' ? mobileAnchorQuantity :
                        extraBracesQuantity
                      }
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || opt.extra.min;
                        if (opt.id === 'extraBows') setExtraBowsQuantity(val);
                        else if (opt.id === 'mobileAnchor') setMobileAnchorQuantity(val);
                        else setExtraBracesQuantity(val);
                      }}
                      className="w-full p-1.5 sm:p-2 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 text-[#07223D] bg-white text-xs sm:text-sm"
                      placeholder={opt.extra.placeholder}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Site Information */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#07223D] mb-2 sm:mb-3 lg:mb-4">{data.siteInfo.label}</h3>
          <div className="space-y-2 sm:space-y-3">
            {data.siteInfo.items.map(si => (
              <div key={si.id} className="flex items-center space-x-2 sm:space-x-3">
                <div
                  onClick={() => si.id === 'jobSiteLevel' ? setJobSiteLevel(!jobSiteLevel) : setPowerAvailable(!powerAvailable)}
                  className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-all duration-300 cursor-pointer ${
                    (si.id === 'jobSiteLevel' ? jobSiteLevel : powerAvailable) ? 'bg-[#FF1717]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    (si.id === 'jobSiteLevel' ? jobSiteLevel : powerAvailable) ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-[#07223D] font-medium text-xs sm:text-sm lg:text-base">{si.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drawings */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#07223D] mb-2 sm:mb-3 lg:mb-4">{data.drawings.label}</h3>
          <div className="space-y-2 sm:space-y-3">
            {data.drawings.items.map(d => (
              <div key={d.id} className="flex items-center space-x-2 sm:space-x-3">
                <div
                  onClick={() => setSelectedDrawings(d.id)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                    selectedDrawings === d.id ? 'border-[#FF1717] bg-[#FF1717]' : 'border-gray-300'
                  }`}
                >
                  {selectedDrawings === d.id && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <span className="text-[#07223D] font-medium text-xs sm:text-sm lg:text-base">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extra */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#07223D] mb-2 sm:mb-3 lg:mb-4">{data.extra.label}</h3>
          <textarea
            value={extraComments}
            onChange={(e) => setExtraComments(e.target.value)}
            placeholder={data.extra.placeholder}
            className="w-full h-16 sm:h-20 p-2 sm:p-3 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 resize-none text-[#07223D] placeholder-gray-400 text-xs sm:text-sm"
          />
        </div>

        {/* Installation Surface */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#07223D] mb-2 sm:mb-3 lg:mb-4">{data.surfaces.label}</h3>
          <select
            value={selectedSurface}
            onChange={(e) => setSelectedSurface(e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 text-[#07223D] bg-white text-xs sm:text-sm"
          >
            {data.surfaces.items.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default OptionsPanel;