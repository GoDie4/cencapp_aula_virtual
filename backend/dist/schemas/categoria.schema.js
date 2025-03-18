"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaSchema = void 0;
const zod_1 = require("zod");
exports.CategoriaSchema = zod_1.z.object({
    nombre: zod_1.z.string({
        required_error: "El nombre es obligatorio.",
    }).max(255, "El nombre debe tener como máximo 255 caracteres."),
});
//# sourceMappingURL=categoria.schema.js.map