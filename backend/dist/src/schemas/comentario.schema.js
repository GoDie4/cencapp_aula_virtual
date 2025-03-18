"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentarioSchema = void 0;
const zod_1 = require("zod");
exports.comentarioSchema = zod_1.z.object({
    claseId: zod_1.z.string({
        required_error: "El ID de la clase es requerido",
    }),
    userId: zod_1.z.string({
        required_error: "El ID del usuario es requerido",
    }),
    comentario: zod_1.z
        .string()
        .min(1, { message: "El comentario no puede estar vacío" })
        .max(1000, {
        message: "El comentario no puede superar los 1000 caracteres",
    }),
});
//# sourceMappingURL=comentario.schema.js.map