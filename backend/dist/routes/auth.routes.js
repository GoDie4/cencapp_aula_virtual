"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const categoria_controller_1 = require("../controllers/categoria.controller");
const curso_controller_1 = require("../controllers/curso.controller");
// import { createCursoSchema } from "../schemas/curso.schema";
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const user_controller_1 = require("../controllers/user.controller");
const profesor_controller_1 = require("../controllers/profesor.controller");
const alumno_controller_1 = require("../controllers/alumno.controller");
const mercadopago_controller_1 = require("../controllers/mercadopago.controller");
const seccion_controller_1 = require("../controllers/seccion.controller");
const clase_controller_1 = require("../controllers/clase.controller");
const comentarios_controller_1 = require("../controllers/comentarios.controller");
const comentarios_schema_1 = require("../schemas/comentarios.schema");
const validateToken_1 = require("../middlewares/validateToken");
// import { CategoriaSchema } from "../schemas/categoria.schema";
const router = (0, express_1.Router)();
router.post("/crearAdmin", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.crearAdmin);
router.post("/register", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.register);
router.post("/login", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.get("/user", JWTMiddleware_1.verifyAdmin, user_controller_1.getDecodedUser);
router.get("/alumno", JWTMiddleware_1.verifyAlumno, user_controller_1.getDecodedUser);
router.get("/profesor", JWTMiddleware_1.verifyProfesor, user_controller_1.getDecodedUser);
router.post("/alumnos", JWTMiddleware_1.verifyAdmin);
/** Categorias */
router.post("/categorias", 
/*verifyAdmin,*/ categoria_controller_1.upload.fields([
    { name: "url_imagen", maxCount: 1 },
    { name: "url_icono", maxCount: 1 },
]), categoria_controller_1.createCategoriaMemory);
router.get("/categorias", categoria_controller_1.showAllCategorias);
router.get("/categorias/:id", categoria_controller_1.obtenerCategoriaPorId);
router.get("/categoriasBuscar/:nombre", categoria_controller_1.obtenerCategoriaPorNombre);
router.post("/categorias/:id", JWTMiddleware_1.verifyAdmin, categoria_controller_1.upload.fields([
    { name: "url_imagen", maxCount: 1 },
    { name: "url_icono", maxCount: 1 },
]), categoria_controller_1.actualizarCategoria);
router.post("/borrarCategoria/:id", JWTMiddleware_1.verifyAdmin, categoria_controller_1.deleteCategoria);
/** Cursos */
router.post("/cursos", JWTMiddleware_1.verifyAdmin, curso_controller_1.uploadImageCurso, curso_controller_1.createCurso);
router.get("/cursos", curso_controller_1.showAllCursos);
router.get("/cursos/:id", curso_controller_1.obtenerCursoPorId);
router.get("/cursosBuscar/:nombre", curso_controller_1.buscarPorNombre);
router.post("/cursos/:id", JWTMiddleware_1.verifyAdmin, curso_controller_1.uploadImageCurso, curso_controller_1.actualizarCurso);
router.post("/borrarCurso/:id", JWTMiddleware_1.verifyAdmin, curso_controller_1.deleteCurso);
/** Profesores */
router.post("/profesores", JWTMiddleware_1.verifyAdmin, profesor_controller_1.crearProfesor);
router.get("/profesores", JWTMiddleware_1.verifyAdmin, profesor_controller_1.showAllProfesores);
router.get("/profesores/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.obtenerProfesorPorId);
router.post("/profesores/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.actualizarProfesor);
router.post("/borrarProfesor/:id", JWTMiddleware_1.verifyAdmin, profesor_controller_1.deleteProfesor);
/** Alumnos */
router.post("/alumnos", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), JWTMiddleware_1.verifyAdmin, alumno_controller_1.crearAlumno);
router.get("/alumnos", alumno_controller_1.showAllAlumnos);
router.get("/alumnos/:id", JWTMiddleware_1.verifyAdmin, alumno_controller_1.obtenerAlumnoPorId);
router.post("/alumnos/:id", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), JWTMiddleware_1.verifyAdmin, alumno_controller_1.actualizarAlumno);
router.post("/borrarAlumno/:id", JWTMiddleware_1.verifyAdmin, alumno_controller_1.deleteAlumno);
router.post("/mercado", mercadopago_controller_1.enviarVenta);
router.post("/mercado/webhook", mercadopago_controller_1.recibirVenta);
router.get("/secciones", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.showAllSecciones);
router.post("/secciones", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.createSeccion);
router.get("/secciones/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.obtenerSeccionPorId);
router.post("/secciones/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.actualizarSeccion);
router.post("/borrarSeccion/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.deleteSeccion);
router.get("/seccionesBuscar/:nombre", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.obtenerSecciones);
router.get("/seccionesCurso/:id", JWTMiddleware_1.verifyAdminOrProfesor, seccion_controller_1.obtenerSeccionesCurso);
router.get("/clases", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.showAllClases);
router.post("/clases", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.createClase);
router.get("/clases/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.obtenerClasePorId);
router.post("/clases/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.actualizarClase);
router.post("/borrarClase/:id", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.deleteClase);
router.get("/clasesBuscar/:nombre", JWTMiddleware_1.verifyAdminOrProfesor, clase_controller_1.obtenerClases);
/*COMENTARIOS*/
router.post("/comentarios", validateToken_1.authRequired, (0, validatorSchemas_middleware_1.validateSchema)(comentarios_schema_1.comentarioSchema), comentarios_controller_1.agregarComentario);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map