import { Curso } from "./CursoInterface";
import { Usuario } from "./UsuarioInterface";

export interface Certificado {
  id: string;
  nombre: string;
  emitido_en: Date;
  url_archivo: string;
  size: number;
  type_mime: string;

  usuarioId: string;
  usuario: Usuario;

  cursoId: string;
  curso: Curso;

  createdAt: Date;
  updatedAt: Date;
}
