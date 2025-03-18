"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var curso, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, 12, 14]);
                    // Registrar Roles
                    return [4 /*yield*/, registrarRoles()];
                case 1:
                    // Registrar Roles
                    _a.sent();
                    // Registrar Administrador
                    return [4 /*yield*/, registrarAdministrador()];
                case 2:
                    // Registrar Administrador
                    _a.sent();
                    // Registrar Categoría
                    return [4 /*yield*/, registrarCategoria()];
                case 3:
                    // Registrar Categoría
                    _a.sent();
                    return [4 /*yield*/, registrarCurso()];
                case 4:
                    curso = _a.sent();
                    return [4 /*yield*/, registrarVentaYDetalles(curso.id)];
                case 5:
                    _a.sent();
                    // Registrar Secciones y Clases
                    return [4 /*yield*/, registrarSeccionesYClases(curso.id)];
                case 6:
                    // Registrar Secciones y Clases
                    _a.sent();
                    // Registrar CursoDetalles
                    return [4 /*yield*/, registrarCursoDetalles(curso.id)];
                case 7:
                    // Registrar CursoDetalles
                    _a.sent();
                    // Registrar Beneficio
                    return [4 /*yield*/, registrarBeneficio(curso.id)];
                case 8:
                    // Registrar Beneficio
                    _a.sent();
                    // Registrar CursoUsuario
                    return [4 /*yield*/, registrarCursoUsuario(curso.id)];
                case 9:
                    // Registrar CursoUsuario
                    _a.sent();
                    // Registrar Comentario
                    return [4 /*yield*/, registrarComentario()];
                case 10:
                    // Registrar Comentario
                    _a.sent();
                    console.log("Seed data inserted successfully!");
                    return [3 /*break*/, 14];
                case 11:
                    error_1 = _a.sent();
                    console.error("Error during seed:", error_1);
                    process.exit(1);
                    return [3 /*break*/, 14];
                case 12: return [4 /*yield*/, prisma.$disconnect()];
                case 13:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function registrarRoles() {
    return __awaiter(this, void 0, void 0, function () {
        var roles, _i, roles_1, nombre, rolExiste;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    roles = ["administrador", "estudiante", "profesor", "prueba"];
                    _i = 0, roles_1 = roles;
                    _a.label = 1;
                case 1:
                    if (!(_i < roles_1.length)) return [3 /*break*/, 5];
                    nombre = roles_1[_i];
                    return [4 /*yield*/, prisma.rol.findUnique({
                            where: { nombre: nombre },
                        })];
                case 2:
                    rolExiste = _a.sent();
                    if (!!rolExiste) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.rol.create({
                            data: { nombre: nombre },
                        })];
                case 3:
                    _a.sent();
                    console.log("Rol '".concat(nombre, "' registrado."));
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function registrarAdministrador() {
    return __awaiter(this, void 0, void 0, function () {
        var hashPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.hash("administrador", 10)];
                case 1:
                    hashPassword = _a.sent();
                    return [4 /*yield*/, prisma.usuario.create({
                            data: {
                                nombres: "Administrador",
                                apellidos: "Logos Perú",
                                celular: "983432123",
                                email: "administrador@gmail.com",
                                password: hashPassword,
                                rolId: 1,
                            },
                        })];
                case 2:
                    _a.sent();
                    console.log("Administrador Creado");
                    return [2 /*return*/];
            }
        });
    });
}
var generarSlug = function (texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
function registrarCategoria() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.categorias.create({
                        data: {
                            nombre: "Topografía",
                            slug: generarSlug("Topografía"),
                            url_icono: "/public/categoriasIcono/url_icono-1741624940177-144144489.png",
                            url_imagen: "/public/categorias/url_imagen-1741624940177-371970580.webp",
                        },
                    })];
                case 1:
                    _a.sent();
                    console.log("Categoría Creada");
                    return [2 /*return*/];
            }
        });
    });
}
function registrarCurso() {
    return __awaiter(this, void 0, void 0, function () {
        var categoria, curso;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.categorias.findFirst()];
                case 1:
                    categoria = _a.sent();
                    if (!categoria) {
                        throw new Error("No se encontró la categoría para crear el curso.");
                    }
                    return [4 /*yield*/, prisma.curso.create({
                            data: {
                                nombre: "TOPOGRAFÍA EN OBRAS CIVILES",
                                slug: generarSlug("TOPOGRAFÍA EN OBRAS CIVILES"),
                                imagen: "/public/cursos/url_imagen-1741102295185-255449320.webp",
                                banner: "topografia-banner.jpg",
                                horas: 40,
                                precio: 199.99,
                                categoriaId: categoria.id,
                            },
                        })];
                case 2:
                    curso = _a.sent();
                    console.log("Curso Creado");
                    return [2 /*return*/, curso];
            }
        });
    });
}
function registrarSeccionesYClases(cursoId) {
    return __awaiter(this, void 0, void 0, function () {
        var secciones, videos, videoIndex, i, seccion, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    secciones = [
                        {
                            nombre: "sesion 1",
                            clases: [
                                "Introducción a la topografía",
                                "Conceptos básicos",
                                "Materiales y recursos",
                                "Metodología",
                            ],
                        },
                        {
                            nombre: "sesion 2",
                            clases: [
                                "Conociendo los Equipos Topográficos",
                                "Manejo de Estación Total Topcon OS-105",
                                "Manejo de Nivel de Ingeniero",
                                "Manejo de GNSS (GPS DIFERENCIAL)",
                            ],
                        },
                    ];
                    videos = [
                        "ouPdZpziMbM",
                        "wZ80815v76M",
                        "UeSjUum3Y7M",
                        "Oe7_nLfUNfU",
                        "ULnhDPuxwMg",
                        "-fh2X88vY5s",
                        "JZcRPMnWESs",
                        "Ce5Uxj1_SsU",
                    ];
                    videoIndex = 0;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < secciones.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.seccion.create({
                            data: {
                                nombre: secciones[i].nombre,
                                slug: generarSlug(secciones[i].nombre),
                                cursoId: cursoId,
                                posicion: i + 1,
                            },
                        })];
                case 2:
                    seccion = _a.sent();
                    console.log("Secci\u00F3n '".concat(secciones[i].nombre, "' Creada"));
                    j = 0;
                    _a.label = 3;
                case 3:
                    if (!(j < secciones[i].clases.length)) return [3 /*break*/, 6];
                    console.log({
                        nombre: secciones[i].clases[j],
                        slug: generarSlug(secciones[i].clases[j]),
                        duracion: "60 minutos",
                        posicion: j + 1,
                        url_video: videos[videoIndex],
                        seccionId: seccion.id,
                    });
                    return [4 /*yield*/, prisma.clases.create({
                            data: {
                                nombre: secciones[i].clases[j],
                                slug: generarSlug(secciones[i].clases[j]),
                                duracion: "60 minutos",
                                posicion: j + 1,
                                url_video: videos[videoIndex],
                                seccionId: seccion.id,
                            },
                        })];
                case 4:
                    _a.sent();
                    console.log("Clase '".concat(secciones[i].clases[j], "' Creada"));
                    videoIndex++;
                    _a.label = 5;
                case 5:
                    j++;
                    return [3 /*break*/, 3];
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function registrarCursoDetalles(cursoId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.cursoDetalles.create({
                        data: {
                            cursoId: cursoId,
                            objetivo: "Dominar las técnicas de topografía en obras civiles.",
                            presentacion: "Este curso te enseñará los fundamentos y aplicaciones de la topografía.",
                            dirigido: "Ingenieros civiles, técnicos y estudiantes.",
                            metodologia: "Clases teórico-prácticas con equipos especializados.",
                            certificacion: "Certificado de finalización del curso.",
                        },
                    })];
                case 1:
                    _a.sent();
                    console.log("CursoDetalles Creado");
                    return [2 /*return*/];
            }
        });
    });
}
function registrarBeneficio(cursoId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.beneficio.create({
                        data: {
                            icono: "compass-icon.png",
                            texto: "Acceso a equipos topográficos durante las prácticas.",
                            cursoId: cursoId,
                        },
                    })];
                case 1:
                    _a.sent();
                    console.log("Beneficio Creado");
                    return [2 /*return*/];
            }
        });
    });
}
function registrarCursoUsuario(cursoId) {
    return __awaiter(this, void 0, void 0, function () {
        var usuario;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.usuario.findFirst()];
                case 1:
                    usuario = _a.sent();
                    if (!usuario) {
                        throw new Error("No se encontró un usuario para crear CursoUsuario.");
                    }
                    return [4 /*yield*/, prisma.cursoUsuario.create({
                            data: {
                                cursoId: cursoId,
                                userId: usuario.id,
                                tipo: "MATRICULADO",
                            },
                        })];
                case 2:
                    _a.sent();
                    console.log("CursoUsuario Creado");
                    return [2 /*return*/];
            }
        });
    });
}
function registrarComentario() {
    return __awaiter(this, void 0, void 0, function () {
        var usuario, clase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.usuario.findFirst()];
                case 1:
                    usuario = _a.sent();
                    return [4 /*yield*/, prisma.clases.findFirst()];
                case 2:
                    clase = _a.sent();
                    if (!usuario || !clase) {
                        throw new Error("No se encontró usuario o clase para crear comentario.");
                    }
                    return [4 /*yield*/, prisma.comentarios.create({
                            data: {
                                userId: usuario.id,
                                claseId: clase.id,
                                comentario: "Excelente curso y explicación.",
                            },
                        })];
                case 3:
                    _a.sent();
                    console.log("Comentario Creado");
                    return [2 /*return*/];
            }
        });
    });
}
function registrarVentaYDetalles(cursoId) {
    return __awaiter(this, void 0, void 0, function () {
        var usuario, venta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.usuario.findFirst()];
                case 1:
                    usuario = _a.sent();
                    if (!usuario) {
                        throw new Error("No se encontró un usuario para registrar la venta.");
                    }
                    return [4 /*yield*/, prisma.ventas.create({
                            data: {
                                usuarioId: usuario.id,
                                pedidoMercadoId: "PED123456789",
                                fecha_aprobada: new Date(),
                                estado: "aprobado",
                                estado_detalle: "pagado",
                                total_neto: new client_1.Prisma.Decimal(150),
                                total: new client_1.Prisma.Decimal(199.99),
                                ultimo_caracteres: "1234",
                            },
                        })];
                case 2:
                    venta = _a.sent();
                    return [4 /*yield*/, prisma.ventasDetalles.create({
                            data: {
                                ventaId: venta.id,
                                productoId: cursoId,
                                cantidad: 1,
                                precio: new client_1.Prisma.Decimal(199.99),
                            },
                        })];
                case 3:
                    _a.sent();
                    console.log("Venta y Detalle registrados correctamente");
                    return [2 /*return*/];
            }
        });
    });
}
main();
