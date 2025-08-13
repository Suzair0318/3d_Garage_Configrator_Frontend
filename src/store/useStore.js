import { create } from 'zustand';

// Example initial state for the garage configurator
const useStore = create((set) => ({
  leftLeanEnabled: false,
  rightLeanEnabled: false,
  setLeftLeanEnabled: (enabled) => set({ leftLeanEnabled: enabled }),
  setRightLeanEnabled: (enabled) => set({ rightLeanEnabled: enabled }),

  // Selected building from BuildingTypePanel to be shown in SizePanel
  selectedBuilding: null,
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),
}));

export default useStore;


