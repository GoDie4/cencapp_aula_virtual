import { create } from 'zustand'

interface CursoActions {
  id: number
  setId: (id: number) => void
}

export const useCursosStore = create<CursoActions>((set) => ({
  id: 1,
  setId: (id: number) => set({ id }),
}))