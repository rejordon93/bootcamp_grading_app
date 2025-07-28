// stores/userStore.ts
import { create } from "zustand";

type UserStore = {
  username: string;
  role: string;
  token: string;
  isOnline: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: {
    username: string;
    role: string;
    token: string;
    isOnline: boolean;
  }) => void;
  setLoading: (loading: boolean) => void;
  setError: (msg: string | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  role: "",
  token: "",
  isOnline: false,
  isLoading: false,
  error: null,

  setUser: ({ username, role, token, isOnline }) =>
    set(() => ({
      username,
      role,
      token,
      isOnline,
      isLoading: false,
      error: null,
    })),

  setLoading: (loading) => set(() => ({ isLoading: loading })),
  setError: (msg) => set(() => ({ error: msg })),

  clearUser: () =>
    set(() => ({
      username: "",
      role: "",
      token: "",
      isOnline: false,
      isLoading: false,
      error: null,
    })),
}));
