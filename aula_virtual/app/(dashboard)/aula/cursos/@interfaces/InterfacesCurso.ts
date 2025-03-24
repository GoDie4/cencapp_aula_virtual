import { UserInterface } from "@/interfaces/AuthInteface";
import { MaterialInterface } from "../../materiales/@interfaces/InterfacesMaterial";
import { Curso } from "@/interfaces/CursoInterface";
import { MaterialDataBase } from "@/interfaces/MaterialInterface";
import { Usuario } from "@/interfaces/UsuarioInterface";

export interface CursoMaterial {
  id: string;
  nombre: string;
  profesor: string;
  materiales: MaterialInterface[];
}

export interface Comentario {
  id: string;
  userId: string;
  claseId: string;
  comentario: string;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
  clase: Clase;
  usuario: UserInterface;
  respuestas: RespuestaComentario[]
}

export interface ComentarioListar {
  id: string;
  userId: string;
  comentario: string;
  createdAt: Date;
  usuario: UserInterface;
  respuestas?: RespuestaComentario[];
}

export interface RespuestaComentario {
  id: string;
  userId: string;
  comentarioId: string;
  respuesta: string;
  createdAt: Date;
  updatedAt: Date;
  user: Usuario;
  comentario: Comentario;
}

// Clase
export interface Clase {
  id: string;
  nombre: string;
  slug: string;
  duracion: string;
  posicion: number;
  url_video: string;
  seccionId: string;
  seccion: Seccion;
  createdAt: Date;
  updatedAt: Date;
  materiales: MaterialDataBase[];
  Comentarios: Comentario[];
  Seccion: Seccion[];
}

// Sección
export interface Seccion {
  id: string;
  nombre: string;
  slug: string;
  cursoId: string;
  curso: Curso;
  posicion: number;
  clases: Clase[];
  createdAt: Date;
  updatedAt: Date;
}
