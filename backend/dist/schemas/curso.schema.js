"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarCursoSchema = exports.createCursoSchema = void 0;
const zod_1 = require("zod");
exports.createCursoSchema = zod_1.z.object({
    nombre: zod_1.z.string({
        required_error: "El nombre es obligatorio.",
    }).max(255, "El nombre debe tener como máximo 255 caracteres."),
    precio: zod_1.z
        .number({
        required_error: "El precio es obligatorio.",
    })
        .refine((value) => String(value).includes("."), "El precio debe ser un número decimal."),
    categoriaId: zod_1.z.number({
        required_error: "El ID de categoría es obligatorio.",
    }).int("El ID de categoría debe ser un número entero."),
});
exports.actualizarCursoSchema = zod_1.z.object({
    nombre: zod_1.z.string({
        required_error: "El nombre es obligatorio.",
    }).max(255, "El nombre debe tener como máximo 255 caracteres."),
    precio: zod_1.z
        .number({
        required_error: "El precio es obligatorio.",
    })
        .refine((value) => String(value).includes("."), "El precio debe ser un número decimal."),
    categoriaId: zod_1.z.number({
        required_error: "El ID de categoría es obligatorio.",
    }).int("El ID de categoría debe ser un número entero."),
});
//# sourceMappingURL=curso.schema.js.map