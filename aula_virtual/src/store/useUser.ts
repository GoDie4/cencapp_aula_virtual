import { UserInterface } from "@/interfaces/AuthInteface";
import { create } from "zustand";

export interface User {
  id: string
  email: string
  nombre: string
  apellido: string
}

export interface UserZustand {
  user: UserInterface | undefined
  setUser: (user: UserInterface) => void
}

export const useUser = create<UserZustand>((set) => ({
  user: undefined,
  setUser: (user: UserInterface) => set({ user }),
}))