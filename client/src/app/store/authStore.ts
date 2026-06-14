import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const getStoredUser = () => {
  if (typeof window === "undefined")
    return null;

  const user =
    localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

const getStoredToken = () => {
  if (typeof window === "undefined")
    return null;

  return localStorage.getItem(
    "token"
  );
};

export const useAuthStore =
  create<AuthState>((set) => ({
    user: getStoredUser(),
    token: getStoredToken(),

    login: (
      token,
      user
    ) => {
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      set({
        token,
        user
      });
    },

    logout: () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      set({
        token: null,
        user: null
      });
    }
  }));