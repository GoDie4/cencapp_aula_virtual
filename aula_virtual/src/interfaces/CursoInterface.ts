import { Categoria } from "./CategoriaInterface"

export interface Curso {
  id?: string
  nombre: string
  precio: number
  horas: number
  imagen: string
  banner?: string
  categoriaId: number
  categoria?: Categoria
  detalles?: CursoDetalles
  createdAt?: Date
  updatedAt?: Date
  dolar?: number
  descuento?: number
}

export interface CursoDetalles {
  id: string
  cursoId: string
  presentacion?: string
  dirigido?: string
  metodologia?: string
  objetivo?: string
  certificacion?: string
  createdAt?: Date
  updatedAt?: Date
  curso?: Curso
}
