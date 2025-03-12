import { Categoria } from "./CategoriaInterface";

export interface Curso {
  id?: string;
  nombre: string;
  slug?: string;
  precio: number;
  horas: number;
  imagen: string;
  banner?: string;
  categoriaId: number;
  categoria?: Categoria;
  detalles?: CursoDetalles;
  createdAt?: Date;
  updatedAt?: Date;
  dolar?: number;
  PorcentajeCurso?: PorcentajeCurso[];
  descuento?: number;
}

export interface PorcentajeCurso {
  id: number;
  cursoId: number;
  userId: string;
  porcentaje: number;
}

export interface CursoDetalles {
  id: string;
  cursoId: string;
  presentacion?: string;
  dirigido?: string;
  metodologia?: string;
  objetivo?: string;
  certificacion?: string;
  createdAt?: Date;
  updatedAt?: Date;
  curso?: Curso;
}
