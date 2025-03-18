import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import {
  cambiarContrasenaSchema,
  loginSchema,
  recuperarSchema,
  registerSchema,
} from "../schemas/auth.schema";
import {
  cambiarContrasena,
  crearAdmin,
  login,
  logout,
  recuperarContrasena,
  register,
} from "../controllers/auth.controller";
import {
  actualizarCategoria,
  createCategoriaMemory,
  deleteCategoria,
  obtenerCategoriaPorId,
  obtenerCategoriaPorSlug,
  showAllCategorias,
  upload,
} from "../controllers/categoria.controller";
import {
  actualizarCurso,
  buscarPorNombre,
  createCurso,
  cursoPorSlug,
  deleteCurso,
  obtenerCursoPorId,
  registrarOActualizarPorcentajeCurso,
  obtenerCursosPorAlumno,
  showAllCursos,
  uploadImageCurso,
  obtenerCursoMateriales,
  getAllCoursesDelProfesor,
  getAlumnoMatriculado,
} from "../controllers/curso.controller";
import {
  verificarCompraCurso,
  verifyAdmin,
  verifyAdminOrProfesor,
  verifyAlumno,
  verifyProfesor,
  verifyUser,
  verifyAlumnoNoCookie,
  // verifyAlumnoOrProfesor
} from "../middlewares/JWTMiddleware";
import { getDecodedUser } from "../controllers/user.controller";
import {
  actualizarProfesor,
  crearProfesor,
  darleCargoCurso,
  deleteProfesor,
  eliminarCargoCurso,
  obtenerCargoCurso,
  obtenerCursosPorProfesor,
  obtenerEjerciciosPorProfesor,
  obtenerExamenesPorProfesor,
  obtenerMaterialesPorProfesor,
  obtenerProfesorPorId,
  showAllProfesores
} from "../controllers/profesor.controller";
import {
  actualizarAlumno,
  crearAlumno,
  deleteAlumno,
  obtenerAlumnoPorId,
  showAllAlumnos
} from "../controllers/alumno.controller";
import {
  enviarVenta,
  obtenerCursosComprados,
  obtenerVentas,
  recibirVenta
} from "../controllers/mercadopago.controller";
import {
  actualizarSeccion,
  createSeccion,
  deleteSeccion,
  obtenerSecciones,
  obtenerSeccionesCurso,
  obtenerSeccionPorId,
  showAllSecciones
} from "../controllers/seccion.controller";
import {
  actualizarClase,
  clasesPorCurso,
  createClase,
  deleteClase,
  obtenerClasePorId,
  obtenerClasePorSlug,
  obtenerClases,
  obtenerClasesPorSeccion,
  showAllClases
} from "../controllers/clase.controller";
import {
  actualizarTest,
  createTest,
  deleteTest,
  enviarExamen,
  obtenerDocumentoTestPorId,
  obtenerExamenesAsignados,
  obtenerExamenesPendientes,
  obtenerTestPorId,
  showAllEjercicios,
  showAllTests,
  uploadArchivoRes,
  uploadArchivoTest
} from "../controllers/test.controller";
import {
  actualizarMaterial,
  createMaterial,
  deleteMaterial,
  obtenerDocumentoPorId,
  obtenerMaterialPorId,
  showAllMateriales,
  uploadArchivo
} from "../controllers/materiales.controller";
import { colocarPuntaje, obtenerExamenesResueltos, obtenerExamenResueltoDocumento } from "../controllers/testResueltos.controller";

const router = Router();

// Auth
router.post("/crearAdmin", validateSchema(registerSchema), crearAdmin);
router.get("/user", verifyAdminOrProfesor, getDecodedUser);
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/recuperar", validateSchema(recuperarSchema), recuperarContrasena);
router.post("/cambiarContrasena", validateSchema(cambiarContrasenaSchema), cambiarContrasena);
router.post("/logout", logout);
router.get("/alumno", verifyAlumno, getDecodedUser);
router.get("/profesor", verifyProfesor, getDecodedUser);

// Categorias
router.post("/categorias", upload.fields([
  { name: "url_imagen", maxCount: 1 },
  { name: "url_icono", maxCount: 1 },
]), createCategoriaMemory);
router.get("/categorias", showAllCategorias);
router.get("/categorias/:id", obtenerCategoriaPorId);
router.get("/categoriasBuscar/:slug", obtenerCategoriaPorSlug);
router.post("/categorias/:id", verifyAdmin, upload.fields([
  { name: "url_imagen", maxCount: 1 },
  { name: "url_icono", maxCount: 1 },
]), actualizarCategoria);
router.post("/borrarCategoria/:id", verifyAdmin, deleteCategoria);

// Cursos
router.post("/cursos", verifyAdmin, uploadImageCurso, createCurso);
router.get("/cursos", showAllCursos);
router.get("/cursos/:id", obtenerCursoPorId);
router.get("/cursosBuscar/:nombre", buscarPorNombre);
router.get("/cursoPorSlug/:slug", verifyAlumno, verificarCompraCurso, cursoPorSlug);
router.post("/cursos/:id", verifyAdmin, uploadImageCurso, actualizarCurso);
router.post("/borrarCurso/:id", verifyAdmin, deleteCurso);
router.post("/porcentajeCurso", registrarOActualizarPorcentajeCurso);
router.get("/obtenerCursoMateriales", verifyAlumno, obtenerCursoMateriales);

// Profesores
router.post("/profesores", verifyAdmin, crearProfesor);
router.get("/profesores", verifyAdmin, showAllProfesores);
router.get("/profesores/:id", verifyAdmin, obtenerProfesorPorId);
router.post("/profesores/:id", verifyAdmin, actualizarProfesor);
router.post("/borrarProfesor/:id", verifyAdmin, deleteProfesor);
router.get("/cargosCurso/:id", verifyProfesor, obtenerCursosPorProfesor);
router.get("/cargoCurso/:id", verifyAdmin, obtenerCargoCurso);
router.post("/cargoCurso", verifyAdmin, darleCargoCurso);
router.post("/eliminarCargoCurso/:id", verifyAdmin, eliminarCargoCurso);
router.get("/cursosDelProfesor/:id", verifyProfesor, getAllCoursesDelProfesor);
router.get("/alumno/matriculado/:id", verifyProfesor, getAlumnoMatriculado);

// Alumnos
router.post("/alumnos", validateSchema(registerSchema), verifyAdmin, crearAlumno);
router.get("/alumnos", showAllAlumnos);
router.get("/alumnos/:id", verifyAdmin, obtenerAlumnoPorId);
router.post("/alumnos/:id", validateSchema(registerSchema), verifyAdmin, actualizarAlumno);
router.post("/borrarAlumno/:id", verifyAdmin, deleteAlumno);
router.get("/matriculadoCurso/:id", verifyAdmin, obtenerCursosPorAlumno);

// MercadoPago
router.post("/mercado", enviarVenta);
router.post("/mercado/webhook", recibirVenta);
router.get("/mercado", verifyAdminOrProfesor, obtenerVentas);
router.get("/cursosComprados", verifyAlumno, obtenerCursosComprados);

// Secciones
router.get("/secciones", verifyAdminOrProfesor, showAllSecciones);
router.post("/secciones", verifyAdminOrProfesor, createSeccion);
router.get("/secciones/:id", verifyAdminOrProfesor, obtenerSeccionPorId);
router.post("/secciones/:id", verifyAdminOrProfesor, actualizarSeccion);
router.post("/borrarSeccion/:id", verifyAdminOrProfesor, deleteSeccion);
router.get("/seccionesBuscar/:nombre", verifyAdminOrProfesor, obtenerSecciones);
router.get("/seccionesCurso/:id", verifyAdminOrProfesor, obtenerSeccionesCurso);

// Clases
router.get("/clases", verifyAdminOrProfesor, showAllClases);
router.get("/clasesPorCurso/:id", clasesPorCurso);
router.post("/clases", verifyAdminOrProfesor, createClase);
router.get("/clases/:id", verifyAdminOrProfesor, obtenerClasePorId);
router.post("/clases/:id", verifyAdminOrProfesor, actualizarClase);
router.post("/borrarClase/:id", verifyAdminOrProfesor, deleteClase);
router.get("/clasesBuscar/:nombre", verifyAdminOrProfesor, obtenerClases);
router.get("/clasePorSlug/:slug", verifyAlumno, verificarCompraCurso, obtenerClasePorSlug);
router.get("/clasesSeccion/:id", verifyAdminOrProfesor, obtenerClasesPorSeccion);

// Tests
router.post("/tests", verifyAdminOrProfesor, uploadArchivoTest, createTest);
router.get("/tests", showAllTests);
router.get("/ejercicios", showAllEjercicios);
router.get("/tests/:id", verifyAdminOrProfesor, obtenerTestPorId);
router.post("/tests/:id", verifyAdminOrProfesor, uploadArchivoTest, actualizarTest);
router.post("/borrarTest/:id", verifyAdminOrProfesor, deleteTest);
router.get("/tests/documento/:id", verifyUser, obtenerDocumentoTestPorId);
router.get("/ejercicios/documento/:id", verifyUser, obtenerEjerciciosPorProfesor);
router.get("/examenes/cargo/:id", verifyProfesor, obtenerExamenesPorProfesor);
router.get("/materiales/cargo/:id", verifyProfesor, obtenerMaterialesPorProfesor);
router.get("/ejercicios/cargo/:id", verifyProfesor, obtenerEjerciciosPorProfesor);
router.post("/examenes/enviar", verifyAlumnoNoCookie, uploadArchivoRes, enviarExamen);
router.get('/obtenerExamenesAsignados', verifyAlumno, obtenerExamenesAsignados)

// Test Resueltos
router.get("/examenes/revisar", verifyProfesor, obtenerExamenesPendientes);
router.post("/testsResuelto/documento", verifyProfesor, obtenerExamenResueltoDocumento)
router.post("/colocarPuntaje", verifyProfesor, colocarPuntaje)
router.get("/examenes/resueltos", verifyAlumno, obtenerExamenesResueltos)

// Materiales
router.get("/materiales", verifyAdminOrProfesor, showAllMateriales);
router.get("/materiales/:id", verifyAdminOrProfesor, obtenerMaterialPorId);
router.post("/materiales", verifyAdminOrProfesor, uploadArchivo, createMaterial);
router.post("/materiales/:id", verifyAdminOrProfesor, uploadArchivo, actualizarMaterial);
router.post("/borrarMaterial/:id", verifyAdminOrProfesor, deleteMaterial);
router.get("/materiales/documento/:id", verifyUser, obtenerDocumentoPorId);

export default router;
