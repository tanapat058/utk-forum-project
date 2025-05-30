import { create } from "zustand";

export const useUserStore = create((set) => ({
  id: "",
  username: "",
}));
