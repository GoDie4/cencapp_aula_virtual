import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { login, logout, register } from "../controllers/auth.controller";
import { actualizarCategoria, createCategoriaMemory, deleteCategoria, obtenerCategoriaPorId, showAllCategorias, upload } from "../controllers/categoria.controller";
import { actualizarCurso, createCurso, deleteCurso, obtenerCursoPorId, showAllCursos, uploadImageCurso } from "../controllers/curso.controller";
// import { createCursoSchema } from "../schemas/curso.schema";
import { verifyAdmin } from "../middlewares/JWTMiddleware";
import { getDecodedUser } from "../controllers/user.controller";
import { actualizarProfesor, crearProfesor, deleteProfesor, obtenerProfesorPorId, showAllProfesores } from "../controllers/profesor.controller";
import { actualizarAlumno, crearAlumno, deleteAlumno, obtenerAlumnoPorId, showAllAlumnos } from "../controllers/alumno.controller";
// import { CategoriaSchema } from "../schemas/categoria.schema";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get('/user', verifyAdmin, getDecodedUser)

router.post('/alumnos', verifyAdmin)

/** Categorias */
router.post('/categorias',  /*verifyAdmin,*/ upload.fields([{ name: 'url_imagen', maxCount: 1 }, { name: 'url_icono', maxCount: 1 }]) , createCategoriaMemory)
router.get('/categorias', showAllCategorias)
router.get('/categorias/:id', obtenerCategoriaPorId)
router.post('/categorias/:id', verifyAdmin , upload.fields([{ name: 'url_imagen', maxCount: 1 }, { name: 'url_icono', maxCount: 1 }]) ,actualizarCategoria)
router.post('/borrarCategoria/:id', verifyAdmin, deleteCategoria)

/** Cursos */
router.post('/cursos', verifyAdmin, uploadImageCurso ,createCurso)
router.get('/cursos', showAllCursos)
router.get('/cursos/:id', obtenerCursoPorId)
router.post('/cursos/:id', verifyAdmin, uploadImageCurso , actualizarCurso)
router.post('/borrarCurso/:id', verifyAdmin, deleteCurso)

/** Profesores */
router.post('/profesores', verifyAdmin, crearProfesor)
router.get('/profesores', showAllProfesores)
router.get('/profesores/:id', verifyAdmin, obtenerProfesorPorId)
router.post('/profesores/:id', verifyAdmin, actualizarProfesor)
router.post('/borrarProfesor/:id', verifyAdmin, deleteProfesor)

/** Alumnos */
router.post('/alumnos', verifyAdmin, crearAlumno)
router.get('/alumnos', showAllAlumnos)
router.get('/alumnos/:id', verifyAdmin, obtenerAlumnoPorId)
router.post('/alumnos/:id', verifyAdmin, actualizarAlumno)
router.post('/borrarAlumno/:id', verifyAdmin, deleteAlumno)


export default router;
