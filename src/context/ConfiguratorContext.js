"use client";
import React, { createContext, useContext, useState } from "react";

// Create the context
const ConfiguratorContext = createContext();

// Provider component
export const ConfiguratorProvider = ({ children }) => {

  const [sidebar_accordion_child_to_left_menu_parent, setsidebar_accordion_child_to_left_menu_parent] = useState(''); // default to building-type or null
 
  return (
    <ConfiguratorContext.Provider
      value={{
        sidebar_accordion_child_to_left_menu_parent,
        setsidebar_accordion_child_to_left_menu_parent,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

// Custom hook for easy access
export const useConfigurator = () => useContext(ConfiguratorContext);
