import { type Categoria } from './CategoriaInterface'

export interface Curso {
  id?: string
  nombre: string
  precio: number
  horas: number
  imagen: string
  categoriaId: number
  presentacion: string
  dirigido: string
  metodologia: string
  certificacion: string
  categoria?: Categoria
  createdAt?: Date
  updatedAt?: Date
}
