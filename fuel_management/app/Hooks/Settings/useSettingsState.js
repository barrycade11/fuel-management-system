import { create } from "zustand";

const useSettingsState = create((set, get) => ({
  selectedStations: new Set(),
  accounts: [],
  
  onSetSelectedStations: (items) => {
    // Ensure we're always working with a Set
    const newItems = items instanceof Set ? items : new Set(items);
    set({ selectedStations: newItems });
  },
  
  onSetAccounts: (accounts) => set({ accounts }),
  
  // Add helper methods as needed
  clearSelectedStations: () => set({ selectedStations: new Set() }),
  
  addStation: (stationName) => set((state) => {
    const newSelectedStations = new Set([...state.selectedStations]);
    newSelectedStations.add(stationName);
    return { selectedStations: newSelectedStations };
  }),
  
  removeStation: (stationName) => set((state) => {
    const newSelectedStations = new Set([...state.selectedStations]);
    newSelectedStations.delete(stationName);
    return { selectedStations: newSelectedStations };
  }),
}));

export default useSettingsState;
