import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { crearAdmin, login, logout, register } from "../controllers/auth.controller";
import { actualizarCategoria, createCategoriaMemory, deleteCategoria, obtenerCategoriaPorId, obtenerCategoriaPorNombre, showAllCategorias, upload } from "../controllers/categoria.controller";
import { actualizarCurso, createCurso, deleteCurso, obtenerCursoPorId, showAllCursos, uploadImageCurso } from "../controllers/curso.controller";
// import { createCursoSchema } from "../schemas/curso.schema";
import { verifyAdmin, verifyAdminOrProfesor, verifyAlumno, verifyProfesor } from "../middlewares/JWTMiddleware";
import { getDecodedUser } from "../controllers/user.controller";
import { actualizarProfesor, crearProfesor, deleteProfesor, obtenerProfesorPorId, showAllProfesores } from "../controllers/profesor.controller";
import { actualizarAlumno, crearAlumno, deleteAlumno, obtenerAlumnoPorId, showAllAlumnos } from "../controllers/alumno.controller";
import { enviarVenta } from "../controllers/mercadopago.controller";
import { actualizarSeccion, createSeccion, deleteSeccion, obtenerSecciones, obtenerSeccionesCurso, obtenerSeccionPorId, showAllSecciones } from "../controllers/seccion.controller";
import { actualizarClase, createClase, deleteClase, obtenerClasePorId, obtenerClases, showAllClases } from "../controllers/clase.controller";
// import { CategoriaSchema } from "../schemas/categoria.schema";

const router = Router();

router.post('/crearAdmin', validateSchema(registerSchema), crearAdmin)

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get('/user', verifyAdmin, getDecodedUser)
router.get('/alumno', verifyAlumno, getDecodedUser)
router.get('/profesor', verifyProfesor, getDecodedUser)

router.post('/alumnos', verifyAdmin)

/** Categorias */
router.post('/categorias',  /*verifyAdmin,*/ upload.fields([{ name: 'url_imagen', maxCount: 1 }, { name: 'url_icono', maxCount: 1 }]) , createCategoriaMemory)
router.get('/categorias', showAllCategorias)
router.get('/categorias/:id', obtenerCategoriaPorId)
router.get('/categoriasBuscar/:nombre', obtenerCategoriaPorNombre)
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
router.get('/profesores', verifyAdmin, showAllProfesores)
router.get('/profesores/:id', verifyAdmin, obtenerProfesorPorId)
router.post('/profesores/:id', verifyAdmin, actualizarProfesor)
router.post('/borrarProfesor/:id', verifyAdmin, deleteProfesor)

/** Alumnos */
router.post('/alumnos', validateSchema(registerSchema) , verifyAdmin, crearAlumno)
router.get('/alumnos', showAllAlumnos)
router.get('/alumnos/:id', verifyAdmin, obtenerAlumnoPorId)
router.post('/alumnos/:id', validateSchema(registerSchema), verifyAdmin, actualizarAlumno)
router.post('/borrarAlumno/:id', verifyAdmin, deleteAlumno)

router.get('/mercado', enviarVenta)

router.get('/secciones', verifyAdminOrProfesor, showAllSecciones)
router.post('/secciones', verifyAdminOrProfesor, createSeccion)
router.get('/secciones/:id', verifyAdminOrProfesor, obtenerSeccionPorId)
router.post('/secciones/:id', verifyAdminOrProfesor, actualizarSeccion)
router.post('/borrarSeccion/:id', verifyAdminOrProfesor, deleteSeccion)
router.get('/seccionesBuscar/:nombre', verifyAdminOrProfesor, obtenerSecciones)
router.get('/seccionesCurso/:id', verifyAdminOrProfesor, obtenerSeccionesCurso)

router.get('/clases', verifyAdminOrProfesor, showAllClases)
router.post('/clases', verifyAdminOrProfesor, createClase)
router.get('/clases/:id', verifyAdminOrProfesor, obtenerClasePorId)
router.post('/clases/:id', verifyAdminOrProfesor, actualizarClase)
router.post('/borrarClase/:id', verifyAdminOrProfesor, deleteClase)
router.get('/clasesBuscar/:nombre', verifyAdminOrProfesor, obtenerClases)

export default router;
