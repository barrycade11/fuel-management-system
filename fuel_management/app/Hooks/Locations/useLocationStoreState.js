import { create } from 'zustand';

const useLocationStoreState = create((set, get) => ({
  //state of city municipality
  citiesMunicipalities: [],
  isLoading: false,
  error: null,
  isError: false,
  onSetCitiesMunicipalities: (items) => {
    set({ citiesMunicipalities: items, isError: false, error: null, isLoading: false  })
  },
  onSetIsLoading: (load) => {
    set({ isLoading: load })
  },
  onSetError: (err) => {
    set({ error: err, isError: true })
  },

  //state of barangay 
  barangays: [],
  bIsLoading: false,
  bError: null,
  bIsError: false,
  onSetBarangays: (items) => {
    set({ barangays: items, bIsError: false, bIsLoading: false, bError: null })
  },
  onSetBarangayLoading: (load) => {
    set({ bIsLoading: load })
  },
  onSetBarangayError: (err) => {
    set({ bError: err, bIsError: true, bIsLoading: false })
  }
}));

export default useLocationStoreState;
