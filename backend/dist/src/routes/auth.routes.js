"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const categoria_controller_1 = require("../controllers/categoria.controller");
const curso_controller_1 = require("../controllers/curso.controller");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const user_controller_1 = require("../controllers/user.controller");
const profesor_controller_1 = require("../controllers/profesor.controller");
const alumno_controller_1 = require("../controllers/alumno.controller");
const mercadopago_controller_1 = require("../controllers/mercadopago.controller");
const seccion_controller_1 = require("../controllers/seccion.controller");
const clase_controller_1 = require("../controllers/clase.controller");
const test_controller_1 = require("../controllers/test.controller");
const materiales_controller_1 = require("../controllers/materiales.controller");
const testResueltos_controller_1 = require("../controllers/testResueltos.controller");
const router = (0, express_1.Router)();
// Auth
router.post("/crearAdmin", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.crearAdmin);
router.get("/user", JWTMiddleware_1.verifyAdminOrProfesor, user_controller_1.getDecodedUser);
router.post("/register", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.register);
router.post("/login", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/recuperar", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.recuperarSchema), auth_controller_1.recuperarContrasena);
router.post("/cambiarContrasena", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.cambiarContrasenaSchema), auth_controller_1.cambiarContrasena);
router.post("/logout", auth_controller_1.logout);
router.get("/alumno", JWTMiddleware_1.verifyAlumno, user_controller_1.getDecodedUser);
router.get("/profesor", JWTMiddleware_1.verifyProfesor, user_controller_1.getDecodedUser);
// Categorias
router.post("/categorias", categoria_controller_1.upload.fields([
    { name: "url_imagen", maxCount: 1 },
    { name: "url_icono", maxCount: 1 },
]), categoria_controller_1.createCategoriaMemory);
router.get("/categorias", categoria_controller_1.showAllCategorias);
router.get("/categorias/:id", categoria_controller_1.obtenerCategoriaPorId);
router.get("/categoriasBuscar/:slug", categoria_controller_1.obtenerCategoriaPorSlug);
router.post("/categorias/:id", JWTMiddleware_1.verifyAdmin, categoria_controller_1.upload.fields([
    { name: "url_imagen", maxCount: 1 },
    { name: "url_icono", maxCount: 1 },
]), categoria_controller_1.actualizarCategoria);
router.post("/borrarCategoria/:id", JWTMiddleware_1.verifyAdmin, categoria_controller_1.deleteCategoria);
// Cursos
router.post("/cursos", JWTMiddleware_1.verifyAdmin, curso_controller_1.uploadImageCurso, curso_controller_1.createCurso);
router.get("/cursos", curso_controller_1.showAllCursos);
router.get("/cursos/:id", curso_controller_1.obtenerCursoPorId);
router.get("/cursosBuscar/:nombre", curso_controller_1.buscarPorNombre);
router.get("/cursoPorSlug/:slug", JWTMiddleware_1.verifyAlumno, JWTMiddleware_1.verificarCompraCurso, curso_controller_1.cursoPorSlug);
router.post("/cursos/:id", JWTMiddleware_1.verifyAdmin, curso_controller_1.uploadImageCurso, curso_controller_1.actualizarCurso);
router.post("/borrarCurso/:id", JWTMiddleware_1.verifyAdmin, curso_controller_1.deleteCurso);
router.post("/porcentajeCurso", curso_controller_1.registrarOActualizarPorcentajeCurso);
router.get("/obtenerCursoMateriales", JWTMiddleware_1.verifyAlumno, curso_controller_1.obtenerCursoMateriales);
// Profesores
router.post("/profesores", JWTMiddleware_1.verifyAdmin, profesor_controller_1.crearProfesor);
router.get("/profesores", JWTMiddleware_1.verifyAdmin, profesor_controller_1.showAllProfesores);
router.get("/profesores/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.obtenerProfesorPorId);
router.post("/profesores/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.actualizarProfesor);
router.post("/borrarProfesor/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.deleteProfesor);
router.get("/cargosCurso/:id", JWTMiddleware_1.verifyProfesor, profesor_controller_1.obtenerCursosPorProfesor);
router.get("/cargoCurso/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.obtenerCargoCurso);
router.post("/cargoCurso", JWTMiddleware_1.verifyAdmin, profesor_controller_1.darleCargoCurso);
router.post("/eliminarCargoCurso/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.eliminarCargoCurso);
router.get("/cursosDelProfesor/:id", JWTMiddleware_1.verifyProfesor, curso_controller_1.getAllCoursesDelProfesor);
router.get("/alumno/matriculado/:id", JWTMiddleware_1.verifyProfesor, curso_controller_1.getAlumnoMatriculado);
// Alumnos
router.post("/alumnos", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), JWTMiddleware_1.verifyAdmin, alumno_controller_1.crearAlumno);
router.get("/alumnos", alumno_controller_1.showAllAlumnos);
router.get("/alumnos/:id", JWTMiddleware_1.verifyAdmin, alumno_controller_1.obtenerAlumnoPorId);
router.post("/alumnos/:id", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), JWTMiddleware_1.verifyAdmin, alumno_controller_1.actualizarAlumno);
router.post("/borrarAlumno/:id", JWTMiddleware_1.verifyAdmin, alumno_controller_1.deleteAlumno);
router.get("/matriculadoCurso/:id", JWTMiddleware_1.verifyAdmin, curso_controller_1.obtenerCursosPorAlumno);
// MercadoPago
router.post("/mercado", mercadopago_controller_1.enviarVenta);
router.post("/mercado/webhook", mercadopago_controller_1.recibirVenta);
router.get("/mercado", JWTMiddleware_1.verifyAdminOrProfesor, mercadopago_controller_1.obtenerVentas);
router.get("/cursosComprados", JWTMiddleware_1.verifyAlumno, mercadopago_controller_1.obtenerCursosComprados);
// Secciones
router.get("/secciones", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.showAllSecciones);
router.post("/secciones", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.createSeccion);
router.get("/secciones/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.obtenerSeccionPorId);
router.post("/secciones/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.actualizarSeccion);
router.post("/borrarSeccion/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.deleteSeccion);
router.get("/seccionesBuscar/:nombre", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.obtenerSecciones);
router.get("/seccionesCurso/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.obtenerSeccionesCurso);
// Clases
router.get("/clases", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.showAllClases);
router.get("/clasesPorCurso/:id", clase_controller_1.clasesPorCurso);
router.post("/clases", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.createClase);
router.get("/clases/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.obtenerClasePorId);
router.post("/clases/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.actualizarClase);
router.post("/borrarClase/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.deleteClase);
router.get("/clasesBuscar/:nombre", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.obtenerClases);
router.get("/clasePorSlug/:slug", JWTMiddleware_1.verifyAlumno, JWTMiddleware_1.verificarCompraCurso, clase_controller_1.obtenerClasePorSlug);
router.get("/clasesSeccion/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.obtenerClasesPorSeccion);
// Tests
router.post("/tests", JWTMiddleware_1.verifyAdminOrProfesor, test_controller_1.uploadArchivoTest, test_controller_1.createTest);
router.get("/tests", test_controller_1.showAllTests);
router.get("/ejercicios", test_controller_1.showAllEjercicios);
router.get("/tests/:id", JWTMiddleware_1.verifyAdminOrProfesor, test_controller_1.obtenerTestPorId);
router.post("/tests/:id", JWTMiddleware_1.verifyAdminOrProfesor, test_controller_1.uploadArchivoTest, test_controller_1.actualizarTest);
router.post("/borrarTest/:id", JWTMiddleware_1.verifyAdminOrProfesor, test_controller_1.deleteTest);
router.get("/tests/documento/:id", JWTMiddleware_1.verifyUser, test_controller_1.obtenerDocumentoTestPorId);
router.get("/ejercicios/documento/:id", JWTMiddleware_1.verifyUser, profesor_controller_1.obtenerEjerciciosPorProfesor);
router.get("/examenes/cargo/:id", JWTMiddleware_1.verifyProfesor, profesor_controller_1.obtenerExamenesPorProfesor);
router.get("/materiales/cargo/:id", JWTMiddleware_1.verifyProfesor, profesor_controller_1.obtenerMaterialesPorProfesor);
router.post("/examenes/enviar", JWTMiddleware_1.verifyAlumnoNoCookie, test_controller_1.uploadArchivoRes, test_controller_1.enviarExamen);
router.get('/obtenerExamenesAsignados', JWTMiddleware_1.verifyAlumno, test_controller_1.obtenerExamenesAsignados);
//Ejercicios
router.post("/ejercicios/enviar", JWTMiddleware_1.verifyAlumnoNoCookie, test_controller_1.uploadArchivoRes, test_controller_1.enviarEjercicio);
router.get("/ejercicios/cargo/:id", JWTMiddleware_1.verifyProfesor, profesor_controller_1.obtenerEjerciciosPorProfesor);
router.get("/obtenerEjerciciosAsignados", JWTMiddleware_1.verifyAlumno, test_controller_1.obtenerEjerciciosAsignados);
// Ejercicios Resueltos
router.get("/ejercicios/revisar", JWTMiddleware_1.verifyProfesor, test_controller_1.obtenerEjerciciosPendientes);
router.get("/ejercicios/resueltos", JWTMiddleware_1.verifyAlumno, testResueltos_controller_1.obtenerEjerciciosResueltos);
// Test Resueltos
router.get("/examenes/revisar", JWTMiddleware_1.verifyProfesor, test_controller_1.obtenerExamenesPendientes);
router.post("/testsResuelto/documento", JWTMiddleware_1.verifyProfesor, testResueltos_controller_1.obtenerExamenResueltoDocumento);
router.post("/colocarPuntaje", JWTMiddleware_1.verifyProfesor, testResueltos_controller_1.colocarPuntaje);
router.get("/examenes/resueltos", JWTMiddleware_1.verifyAlumno, testResueltos_controller_1.obtenerExamenesResueltos);
// Materiales
router.get("/materiales", JWTMiddleware_1.verifyAdminOrProfesor, materiales_controller_1.showAllMateriales);
router.get("/materiales/:id", JWTMiddleware_1.verifyAdminOrProfesor, materiales_controller_1.obtenerMaterialPorId);
router.post("/materiales", JWTMiddleware_1.verifyAdminOrProfesor, materiales_controller_1.uploadArchivo, materiales_controller_1.createMaterial);
router.post("/materiales/:id", JWTMiddleware_1.verifyAdminOrProfesor, materiales_controller_1.uploadArchivo, materiales_controller_1.actualizarMaterial);
router.post("/borrarMaterial/:id", JWTMiddleware_1.verifyAdminOrProfesor, materiales_controller_1.deleteMaterial);
router.get("/materiales/documento/:id", JWTMiddleware_1.verifyUser, materiales_controller_1.obtenerDocumentoPorId);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map