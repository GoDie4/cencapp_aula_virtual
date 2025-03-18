import { ClasesInterface } from "./ClasesInterface"

export interface MaterialesInterface {
  id?: string
  nombre: string
  descripcion: string
  path_archivo: string
  createdAt?: Date
  updatedAt?: Date
  clase?: ClasesInterface
}