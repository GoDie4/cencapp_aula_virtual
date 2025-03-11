import { type Categoria } from './CategoriaInterface'
import { type Usuario } from './UserInterface'

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

export interface CursosUsuarios {
  id: number
  avance: string
  cursoId: string
  tipo: string
  userId: string
  usuario?: Usuario
<<<<<<< HEAD
  curso?: Curso
=======
>>>>>>> 8c160fd (d)
}
