import { create } from 'zustand';

const useStationStore = create((set, get) => ({
  departmentOnView: false,
  departmentOnViewId: null,
  stationDetails: null, // Object expected
  tanks: [],
  departments: null,
  saveDepartments: [],
  onSetStationDetails: (form) => {
    set({ stationDetails: form })
  },
  onSetTanks: (items) => {
    set({ tanks: items })
  },
  onSetDepartments: (items) => {
    set({ departments: items })
  },
  onSetDeleteSaveDepartments: (id) => {
    set((state) => {
      return {
        saveDepartments: state.saveDepartments.filter(a => a.id !== id) // Remove item instead of keeping it
      };
    });
  },
  onSetEditSaveDepartments: (id, items = {}) => {
    let dep = get().saveDepartments.find(a => a.id === id);
    dep = {
      ...dep,
      details: items.details,
      departmentLin: items.departmentLin,
    };

    let index = get().saveDepartments.findIndex(a => a.id === id);

    set((state) => {
      state.saveDepartments[index] = dep;
      return {
        ...state.saveDepartments,
      }
    })

  },
  /// TODO: fix reinserting of duplicate deparment
  onSetSaveDepartments: (items = {}) => {
    if (!items.hasOwnProperty('id')) return null;
    set((state) => {
      // First check if the item already exists
      const isDuplicate = state.saveDepartments.some(existingItem => {
        return existingItem.id === items.id
      });

      // If duplicate found, return the unchanged state
      if (isDuplicate) {
        return state; // Return the existing state to make no changes
      }

      // Otherwise add the new item
      return {
        saveDepartments: [...state.saveDepartments, items],
      };
    });
  },
  onDepartmentOnView: (viewing = false, id = null) => {
    set({ departmentOnView: viewing, departmentOnViewId: id });
  }
}));

export default useStationStore;
