"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
exports.ENV = {
    PORT: process.env.SERVER_PORT || "5000",
    DATABASE_URL: process.env.DATABASE_URL || "",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "",
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_MERCADO_PAGO || "",
    MercadoSecret: process.env.SECRET_TOKEN_MERCADO || "",
    Success: process.env.SUCCESS_URL || "http://localhost:3000/",
    EMAIL_HOST: process.env.HOST_MAIL || "",
    EMAIL_PORT: process.env.PUERTO_EMAIL || "",
    EMAIL_SECURE: process.env.SECURE_MAIL || "",
    EMAIL_USER: process.env.USER_MAIL || "",
    EMAIL_PASS: process.env.PASS_MAIL || "",
};
//# sourceMappingURL=config.js.map