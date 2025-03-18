"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const config_1 = require("./config/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("../src/routes/auth.routes"));
/*
import userRoutes from "../src/routes/user.routes";
import categoryRoutes from "../src/routes/category.routes"
*/
server_1.default.use(express_1.default.static('public'));
server_1.default.use((0, cookie_parser_1.default)());
database_1.default
    .$connect()
    .then(() => {
    console.log("✅ Conectado a la base de datos");
    server_1.default.listen(config_1.ENV.PORT, () => {
        console.log(`🚀 Server corriendo en http://localhost:${config_1.ENV.PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
});
server_1.default.use("/api", auth_routes_1.default);
/*
app.use("/api/usuarios", userRoutes);
app.use("/api/categorias", categoryRoutes)
*/
//# sourceMappingURL=index.js.map