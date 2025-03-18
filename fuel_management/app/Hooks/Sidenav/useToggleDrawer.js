import { create } from 'zustand';

const useToggleDrawer = create((set, get) => ({
  isOpen: true, //default state of the drawer is always open,
  isToggled: () => {
    const _isOpen = get().isOpen;
    set({isOpen: !_isOpen})
  },
}))

export default useToggleDrawer;
