import React from 'react';

const DefaultPanel = ({ title, description }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">
            {description || `Configure your garage ${title.toLowerCase()} options here.`}
          </p>
          <div className="text-sm text-gray-500">
            Panel content coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultPanel;
