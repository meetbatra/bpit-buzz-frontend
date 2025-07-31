import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  _id: string,
  email: string;
  name: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: { user: User; token: string }) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: ({ user, token }) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);