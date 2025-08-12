import { create } from 'zustand';

// Example initial state for the garage configurator
const useStore = create((set) => ({
  leftLeanEnabled: false,
  rightLeanEnabled: false,
  setLeftLeanEnabled: (enabled) => set({ leftLeanEnabled: enabled }),
  setRightLeanEnabled: (enabled) => set({ rightLeanEnabled: enabled }),
}));

export default useStore;
