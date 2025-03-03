import { create } from "zustand";

export interface RedirectParams {
  path: string
  setRedirect : (path: string) => void
}

export const useToRedirect = create<RedirectParams>((set) => ({
  path: '',
  setRedirect: (path: string) => {
    set({ path })
  }
}))