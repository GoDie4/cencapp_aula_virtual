import { type SeccionInterface } from './SeccionInterface'

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
}
