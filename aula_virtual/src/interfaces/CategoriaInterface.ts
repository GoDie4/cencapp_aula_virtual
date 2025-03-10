import { Curso } from "./CursoInterface"

export interface Categoria {
  id?: number
  nombre: string
  slug?: string
  url_imagen: string
  url_icono: string
  createdAt?: Date
  updatedAt?: Date
  cursos?: Curso[]
}