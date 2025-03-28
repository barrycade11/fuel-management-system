import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuth = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      onSetUserDetails: (data, token = null) => {
        set({
          token: token,
          user: data
        })
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;

