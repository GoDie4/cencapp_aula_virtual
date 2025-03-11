import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { crearAdmin, login, logout, register } from "../controllers/auth.controller";
import { actualizarCategoria, createCategoriaMemory, deleteCategoria, obtenerCategoriaPorId, obtenerCategoriaPorSlug, showAllCategorias, upload } from "../controllers/categoria.controller";
import { actualizarCurso, buscarPorNombre, createCurso, deleteCurso, obtenerCursoPorId, showAllCursos, uploadImageCurso } from "../controllers/curso.controller";
// import { createCursoSchema } from "../schemas/curso.schema";
import { verifyAdmin, verifyAdminOrProfesor, verifyAlumno, verifyProfesor } from "../middlewares/JWTMiddleware";
import { getDecodedUser } from "../controllers/user.controller";
import { actualizarProfesor, crearProfesor, darleCargoCurso, deleteProfesor, obtenerProfesorPorId, showAllProfesores } from "../controllers/profesor.controller";
import { actualizarAlumno, crearAlumno, deleteAlumno, obtenerAlumnoPorId, showAllAlumnos } from "../controllers/alumno.controller";
import { enviarVenta, obtenerVentas, recibirVenta } from "../controllers/mercadopago.controller";
import { actualizarSeccion, createSeccion, deleteSeccion, obtenerSecciones, obtenerSeccionesCurso, obtenerSeccionPorId, showAllSecciones } from "../controllers/seccion.controller";
import { actualizarClase, createClase, deleteClase, obtenerClasePorId, obtenerClases, obtenerClasesPorSeccion, showAllClases } from "../controllers/clase.controller";
import { actualizarTest, createTest, deleteTest, obtenerTestPorId, showAllEjercicios, showAllTests, uploadArchivoTest } from "../controllers/test.controller";
// import { CategoriaSchema } from "../schemas/categoria.schema";

const router = Router();

router.post('/crearAdmin', validateSchema(registerSchema), crearAdmin)

{/** Usuarios | Profesores | Administradores */  }
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get('/alumno', verifyAlumno, getDecodedUser)
router.get('/profesor', verifyProfesor, getDecodedUser)

router.post('/alumnos', verifyAdmin)

/** Categorias */
router.post('/categorias',  /*verifyAdmin,*/ upload.fields([{ name: 'url_imagen', maxCount: 1 }, { name: 'url_icono', maxCount: 1 }]) , createCategoriaMemory)
router.get('/categorias', showAllCategorias)
router.get('/categorias/:id', obtenerCategoriaPorId)
router.get('/categoriasBuscar/:slug', obtenerCategoriaPorSlug)
router.post('/categorias/:id', verifyAdmin , upload.fields([{ name: 'url_imagen', maxCount: 1 }, { name: 'url_icono', maxCount: 1 }]) ,actualizarCategoria)
router.post('/borrarCategoria/:id', verifyAdmin, deleteCategoria)

/** Cursos */
router.post('/cursos', verifyAdmin, uploadImageCurso ,createCurso)
router.get('/cursos', showAllCursos)
router.get('/cursos/:id', obtenerCursoPorId)
router.get('/cursosBuscar/:nombre', buscarPorNombre)
router.post('/cursos/:id', verifyAdmin, uploadImageCurso , actualizarCurso)
router.post('/borrarCurso/:id', verifyAdmin, deleteCurso)

/** Profesores */
router.post('/profesores', verifyAdmin, crearProfesor)
router.get('/profesores', verifyAdmin, showAllProfesores)
router.get('/profesores/:id', verifyAdmin, obtenerProfesorPorId)
router.post('/profesores/:id', verifyAdmin, actualizarProfesor)
router.post('/borrarProfesor/:id', verifyAdmin, deleteProfesor)
router.post('/cargoCurso', verifyAdmin, darleCargoCurso)

/** Alumnos */
router.post('/alumnos', validateSchema(registerSchema) , verifyAdmin, crearAlumno)
router.get('/alumnos', showAllAlumnos)
router.get('/alumnos/:id', verifyAdmin, obtenerAlumnoPorId)
router.post('/alumnos/:id', validateSchema(registerSchema), verifyAdmin, actualizarAlumno)
router.post('/borrarAlumno/:id', verifyAdmin, deleteAlumno)

{/** Mercado */  }
router.post('/mercado', enviarVenta)
router.post('/mercado/webhook', recibirVenta)
router.get('/mercado', verifyAdminOrProfesor, obtenerVentas)

{/** Secciones */  }
router.get('/secciones', verifyAdminOrProfesor, showAllSecciones)
router.post('/secciones', verifyAdminOrProfesor, createSeccion)
router.get('/secciones/:id', verifyAdminOrProfesor, obtenerSeccionPorId)
router.post('/secciones/:id', verifyAdminOrProfesor, actualizarSeccion)
router.post('/borrarSeccion/:id', verifyAdminOrProfesor, deleteSeccion)
router.get('/seccionesBuscar/:nombre', verifyAdminOrProfesor, obtenerSecciones)
router.get('/seccionesCurso/:id', verifyAdminOrProfesor, obtenerSeccionesCurso)

{/** Clases */ }
router.get('/clases', verifyAdminOrProfesor, showAllClases)
router.post('/clases', verifyAdminOrProfesor, createClase)
router.get('/clases/:id', verifyAdminOrProfesor, obtenerClasePorId) 
router.post('/clases/:id', verifyAdminOrProfesor, actualizarClase)
router.post('/borrarClase/:id', verifyAdminOrProfesor, deleteClase)
router.get('/clasesBuscar/:nombre', verifyAdminOrProfesor, obtenerClases)
router.get('/clasesSeccion/:id', verifyAdminOrProfesor, obtenerClasesPorSeccion)

{/** Test */  }
router.post('/tests', verifyAdminOrProfesor ,uploadArchivoTest, createTest)
router.get('/tests', showAllTests)
router.get('/ejercicios', showAllEjercicios)
router.get('/tests/:id', verifyAdminOrProfesor, obtenerTestPorId)
router.post('/tests/:id', verifyAdminOrProfesor, uploadArchivoTest, actualizarTest)
router.post('/borrarTest/:id', verifyAdminOrProfesor, deleteTest)

{/** Ejercicios */}

export default router;
