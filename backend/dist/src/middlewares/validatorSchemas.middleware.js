"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
<<<<<<< HEAD
    console.log(req.body);
=======
>>>>>>> ca60c47c16a9731a165cdf69796a26e570d7d3fd
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Error de validación",
                errors: error.errors.map((err) => err.message),
            });
            return;
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validatorSchemas.middleware.js.map