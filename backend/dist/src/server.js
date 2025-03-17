"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}));
// Crear stream para guardar logs en error.log
const errorLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "error.log"), {
    flags: "a",
});
// Definir un formato de log personalizado
morgan_1.default.format("custom", ':date[iso] [ERROR] :method :url | Status: :status | Time: :response-time ms | IP: :remote-addr | User-Agent: ":user-agent"');
// Usar Morgan para registrar solo errores (4xx y 5xx)
app.use((0, morgan_1.default)("custom", {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream,
}));
// Configurar el servidor para usar el directorio 'public' como directorio de archivos estáticos
app.use('/public', express_1.default.static(path_1.default.resolve('public')));
app.use(express_1.default.json());
exports.default = app;
//# sourceMappingURL=server.js.map