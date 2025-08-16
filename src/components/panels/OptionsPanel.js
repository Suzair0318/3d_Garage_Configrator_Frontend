import React, { useState } from 'react';

// Default data schema for future API-driven content
const defaultOptionsData = {
  windRatings: [
    { id: 'uncertified', label: 'Uncertified' },
    { id: '140mph', label: '140 MPH + 30 PSF Certified' },
    { id: '155mph', label: '155 MPH Certified' },
  ],
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
  siteInfo: [
    { id: 'jobSiteLevel', label: 'Job Site Level' },
    { id: 'powerAvailable', label: 'Power Available' },
  ],
  drawings: [
    { id: 'generic', label: 'Generic' },
    { id: 'engineered', label: 'Engineered' },
    { id: 'none', label: 'None' },
  ],
  extra: { label: 'Extra', placeholder: 'Leave a comment here' },
  surfaces: [
    { value: 'concrete', label: 'Concrete' },
    { value: 'gravel', label: 'Gravel' },
    { value: 'dirt', label: 'Dirt' },
    { value: 'asphalt', label: 'Asphalt' },
  ],
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
      <div className="p-6">
    
        {/* Wind & Snow Ratings */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#07223D] mb-4">Wind & Snow Ratings</h3>
          <div className="space-y-3">
            {data.windRatings.map(item => (
              <div key={item.id} className="flex items-center space-x-3">
                <div
                  onClick={() => setSelectedWindRating(item.id)}
                  className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                    selectedWindRating === item.id ? 'border-[#FF1717] bg-[#FF1717]' : 'border-gray-300'
                  }`}
                >
                  {selectedWindRating === item.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <span className="text-[#07223D] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="mb-8">
          <div className="space-y-3">
            {data.additionalOptions.map(opt => (
              <div key={opt.id} className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div
                    onClick={() => toggleOption(opt.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 cursor-pointer ${
                      selectedOptions.includes(opt.id) ? 'bg-[#FF1717]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      selectedOptions.includes(opt.id) ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                  <span className="text-[#07223D] font-medium">{opt.label}</span>
                </div>

                {/* Extras for specific toggles */}
                {selectedOptions.includes(opt.id) && opt.extra?.kind === 'select' && (
                  <div className="">
                    <select
                      value={sideOverhangOption}
                      onChange={(e) => setSideOverhangOption(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 text-[#07223D] bg-white text-sm"
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
                      <span className="ml-2 text-sm text-gray-600">{opt.extra.helper}</span>
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 text-[#07223D] bg-white text-sm"
                      placeholder={opt.extra.placeholder}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Site Information */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#07223D] mb-4">Site Information</h3>
          <div className="space-y-3">
            {data.siteInfo.map(si => (
              <div key={si.id} className="flex items-center space-x-3">
                <div
                  onClick={() => si.id === 'jobSiteLevel' ? setJobSiteLevel(!jobSiteLevel) : setPowerAvailable(!powerAvailable)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 cursor-pointer ${
                    (si.id === 'jobSiteLevel' ? jobSiteLevel : powerAvailable) ? 'bg-[#FF1717]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    (si.id === 'jobSiteLevel' ? jobSiteLevel : powerAvailable) ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-[#07223D] font-medium">{si.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drawings */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#07223D] mb-4">Drawings</h3>
          <div className="space-y-3">
            {data.drawings.map(d => (
              <div key={d.id} className="flex items-center space-x-3">
                <div
                  onClick={() => setSelectedDrawings(d.id)}
                  className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                    selectedDrawings === d.id ? 'border-[#FF1717] bg-[#FF1717]' : 'border-gray-300'
                  }`}
                >
                  {selectedDrawings === d.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <span className="text-[#07223D] font-medium">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extra */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#07223D] mb-4">{data.extra.label}</h3>
          <textarea
            value={extraComments}
            onChange={(e) => setExtraComments(e.target.value)}
            placeholder={data.extra.placeholder}
            className="w-full h-20 p-3 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 resize-none text-[#07223D] placeholder-gray-400 text-sm"
          />
        </div>

        {/* Installation Surface */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#07223D] mb-4">Installation Surface</h3>
          <select
            value={selectedSurface}
            onChange={(e) => setSelectedSurface(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:border-[#FF1717] focus:ring-1 focus:ring-[#FF1717] outline-none transition-all duration-200 text-[#07223D] bg-white text-sm"
          >
            {data.surfaces.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default OptionsPanel;