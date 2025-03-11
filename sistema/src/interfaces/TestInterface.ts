import { type ClasesInterface } from './ClasesInterface'
import { type Curso } from './CursoInterface'

export interface TestInterface {
  id: string
  url_archivo: string
  titulo: string
  descripcion: string
  fecha_inicio: Date
  fecha_fin: Date
  tiempo_limite: number
  tipo_prueba: TipoPrueba
  puntaje_maxima: number
  activo: boolean
  curso?: Curso
  clase?: ClasesInterface
  createdAt: Date
  updatedAt: Date
}

enum TipoPrueba {
  examen = 'EXAMEN',
  cuestionario = 'EJERCICIO'
}

export interface TestValues {
  titulo: string
  descripcion: string
  fecha_inicio: string
  fecha_fin: string
  tiempo_limite: string
  puntaje_maxima: string
  activo: boolean
}
