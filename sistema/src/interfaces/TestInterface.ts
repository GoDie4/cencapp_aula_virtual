<<<<<<< HEAD
<<<<<<< HEAD
import { type ClasesInterface } from './ClasesInterface'
=======
>>>>>>> 3cd482d (d)
=======
import { type ClasesInterface } from './ClasesInterface'
>>>>>>> dc2913c (d)
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
<<<<<<< HEAD
<<<<<<< HEAD
  clase?: ClasesInterface
=======
>>>>>>> 3cd482d (d)
=======
  clase?: ClasesInterface
>>>>>>> dc2913c (d)
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
