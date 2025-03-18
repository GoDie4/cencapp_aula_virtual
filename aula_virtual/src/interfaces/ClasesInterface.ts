import { MaterialesInterface } from "./MaterialesInterface"
import { SeccionInterface } from "./SeccionInterface"
import { TestInterface } from "./TestInterface"

export interface ClasesInterface {
  id: string
  nombre: string
  duracion: string
  posicion: number
  url_video: string
  seccionId: string
  createdAt?: Date
  updatedAt?: Date
  seccion?: SeccionInterface
  test?: TestInterface[]
  materiales?: MaterialesInterface[]
}