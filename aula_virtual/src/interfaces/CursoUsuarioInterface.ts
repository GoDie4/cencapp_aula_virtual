import { Curso } from "./CursoInterface"
import { TestInterface } from "./TestInterface"
import { Usuario } from "./UsuarioInterface"

export interface CursosUsuario {
  userId: string
  usuario: Usuario
  curso?: Curso
  test?: TestInterface[]
}