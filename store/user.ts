import { create } from "zustand";

// เพิ่ม user mock สำหรับ dev/test
export const useUserStore = create((set) => ({
  id: 1,
  username: "demo",
}));
