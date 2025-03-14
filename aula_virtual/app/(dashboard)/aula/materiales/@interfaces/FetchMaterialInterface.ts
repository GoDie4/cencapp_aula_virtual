export interface ResponseFetchMaterial {
  cursos: Curso[]
}

export interface Curso {
  id: number
  cursoId: string
  userId: string
  avance: string
  tipo: string
  curso: Curso2
}

export interface Curso2 {
  id: string
  nombre: string
  cursosUsuarios: CursosUsuario[]
  Seccion: Seccion[]
}

export interface CursosUsuario {
  userId: string
  usuario: Usuario
}

export interface Usuario {
  id: string
  rolId: number
  nombres: string
  apellidos: string
  email: string
  celular: string
  password: string
  activo: boolean
  createdAt: string
  updatedAt: string
}

export interface Seccion {
  clases: Clase[]
}

export interface Clase {
  materiales: Materiale[]
  nombre: string
}

export interface Materiale {
  id: number
  nombre: string
  descripcion: string
  path_archivo: string
  mime_type: string
  size: number
  claseId: string
  createdAt: string
  updatedAt: string
}