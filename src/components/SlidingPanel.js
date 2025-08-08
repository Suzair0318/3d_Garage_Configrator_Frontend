import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BuildingTypePanel from './panels/BuildingTypePanel';
import SizePanel from './panels/SizePanel';
import ColorsPanel from './panels/ColorsPanel';
import DefaultPanel from './panels/DefaultPanel';
import LeanPanel from './panels/LeanPanel';
import SidePanel from './panels/SidePanel';

const SlidingPanel = ({ activeMenuItem, isVisible, onClose , setActiveIndex , setActivePanelItem }) => {
  const [expandedCategory, setExpandedCategory] = useState(null); 
  const [selectedItem , setSelectedItem] = useState(null);

  const renderPanelContent = () => {
    if (!activeMenuItem) return null;

    switch (activeMenuItem.id) {
      case 'building':
        return <BuildingTypePanel 
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setActiveIndex={setActiveIndex}
        setActivePanelItem={setActivePanelItem}
        />;
      case 'size':
        return <SizePanel />;
      case 'colors':
        return <ColorsPanel />;
      case 'lean':
        return <LeanPanel />;
      case 'sides':
        return <SidePanel />;
      case 'doors':
        return <DefaultPanel title="Doors & Windows" description="Select and position doors, windows, and other openings." />;
      case 'options':
        return <DefaultPanel title="Additional Options" description="Explore extra features and customization options." />;
      case 'summary':
        return <DefaultPanel title="Configuration Summary" description="Review your garage configuration and specifications." />;
      case 'quotes':
        return <DefaultPanel title="Get Quote" description="Calculate pricing and request a detailed quote." />;
      default:
        return <DefaultPanel title={activeMenuItem.label} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Backdrop with Framer Motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-10 "
            onClick={onClose}
          />

          {/* Fade Panel with Framer Motion */}
          <motion.div
            key="fade-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
            className="fixed left-[100px] top-6 bottom-6 z-40 w-96 flex flex-col
                     bg-white rounded-2xl border border-gray-200/50 shadow-xl
                     backdrop-blur-sm"
          >
            {/* Panel Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-4 border-gray-100"
            >
              <div className="flex items-center justify-center w-full">
                <h2 className="text-lg text-center font-semibold text-[#FF1717]">
                  {activeMenuItem?.label}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
                         flex items-center justify-center transition-colors duration-200 group"
              >
                <svg 
                  className="w-4 h-4 text-gray-500 group-hover:text-gray-700" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>

            {/* Panel Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 
                       scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
            >
              {renderPanelContent()}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlidingPanel;
