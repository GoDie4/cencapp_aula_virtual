"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentarioSchema = void 0;
const zod_1 = require("zod");
exports.comentarioSchema = zod_1.z.object({
    userId: zod_1.z
        .string()
        .min(1, { message: "El userId es requerido" }),
    claseId: zod_1.z
        .string()
        .min(1, { message: "El claseId es requerido" }),
    comentario: zod_1.z
        .string()
        .min(1, { message: "El comentario no puede estar vacío." })
        .max(500, {
        message: "El comentario no puede exceder los 500 caracteres.",
    }),
});
//# sourceMappingURL=comentarios.schema.js.map