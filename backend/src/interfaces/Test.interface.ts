import { Curso, TestResuelto } from "@prisma/client"

export interface Test {
  id: string
  titulo: string
  descripcion: string
  cursoId: string
  url_archivo: string
  fecha_inicio: Date
  fecha_fin: Date
  tiempo_limite?: number
  tipo_prueba: TipoPrueba
  puntaje_maxima: number
  activo: boolean
  createdAt: Date
  updatedAt: Date

  curso?: Curso
  examenesResueltos?: TestResuelto[]
}

enum TipoPrueba {
  EXAMEN = 'EXAMEN',
  EJERCICIOS = 'EJERCICIOS'
}

export interface TestBody {
  titulo: string
  descripcion: string
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dc2913c (d)
  claseId?: string
  cursoId?: string
  fecha_inicio: string
  fecha_fin: string
  tiempo_limite?: string
  tipo_prueba: TipoPrueba
  puntaje_maxima: string
=======
=======
  claseId: string
>>>>>>> 3cd482d (d)
  cursoId: string
  fecha_inicio: string
  fecha_fin: string
  tiempo_limite?: string
  tipo_prueba: TipoPrueba
<<<<<<< HEAD
  puntaje_maxima: number
>>>>>>> 255dc57 (d)
=======
  puntaje_maxima: string
>>>>>>> 3cd482d (d)
  activo?: boolean
}