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

  // Events associated with the selected building/item for canvas configurator (BuildingTypePanel)
  events: {},
  setEvents: (eventsObj) => set({
    events: (eventsObj && typeof eventsObj === 'object' && !Array.isArray(eventsObj)) ? eventsObj : {}
  }),
  // Update a single event value by key
  setEventValue: (key, value) => set((state) => {
    console.log('Store : setEventValue', { key, value });
    return { events: { ...state.events, [key]: value } };
  }),
  // Update multiple event values at once
  patchEventValues: (partial) => set((state) => {
    console.log('Store : patchEventValues', partial);
    return { events: { ...state.events, ...(partial && typeof partial === 'object' ? partial : {}) } };
  }),

  // Cached categories to avoid re-fetching on remount (BuildingTypePanel)
  categories: [],
  setCategories: (cats) => set({ categories: Array.isArray(cats) ? cats : [] }),
}));

export default useStore;


