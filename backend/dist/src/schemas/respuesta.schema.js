"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarRespuestaSchema = void 0;
const zod_1 = require("zod");
exports.registrarRespuestaSchema = zod_1.z.object({
    comentarioId: zod_1.z.string(),
    respuesta: zod_1.z
        .string()
        .min(1, { message: "La respuesta no puede estar vacía" })
        .max(1000, { message: "La respuesta es demasiado larga" }),
});
//# sourceMappingURL=respuesta.schema.js.map