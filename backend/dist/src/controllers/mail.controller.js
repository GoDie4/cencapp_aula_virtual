"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const config_1 = require("../config/config");
<<<<<<< HEAD
// Usar process.cwd() para obtener la raíz del proyecto
const rootDir = process.cwd();
const uploadDir = path_1.default.join(rootDir, "src/mail");
const logFilePath = path_1.default.join(rootDir, "src", "error.log");
// Función para escribir en el log
const writeLog = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs_1.default.appendFileSync(logFilePath, logMessage, "utf8");
};
=======
const uploadDir = path_1.default.join(__dirname, "../..", "src/mail");
>>>>>>> ca60c47c16a9731a165cdf69796a26e570d7d3fd
const transporter = nodemailer_1.default.createTransport({
    //@ts-ignore
    host: config_1.ENV.EMAIL_HOST,
    port: config_1.ENV.EMAIL_PORT,
    secure: config_1.ENV.EMAIL_SECURE,
    auth: {
        user: config_1.ENV.EMAIL_USER,
        pass: config_1.ENV.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendEmail = async (to, subject, templateName, replacements) => {
    try {
<<<<<<< HEAD
        const templatePath = path_1.default.join(uploadDir, templateName);
        console.log(`Ruta de la plantilla de correo: ${templatePath}`);
        if (!fs_1.default.existsSync(templatePath)) {
            throw new Error(`La plantilla de correo no existe en: ${templatePath}`);
        }
=======
        const templatePath = path_1.default.join(uploadDir, `${templateName}`);
>>>>>>> ca60c47c16a9731a165cdf69796a26e570d7d3fd
        const source = fs_1.default.readFileSync(templatePath, "utf-8").toString();
        const template = handlebars_1.default.compile(source);
        const htmlToSend = template(replacements);
        if (Array.isArray(to)) {
            to = to.join(", ");
        }
        await transporter.sendMail({
            from: config_1.ENV.EMAIL_USER,
            to,
            subject,
            html: htmlToSend,
        });
<<<<<<< HEAD
        writeLog(`Correo enviado a: ${to} | Asunto: ${subject}`);
        return true;
    }
    catch (error) {
        writeLog(`Error al enviar correo a: ${to} | Asunto: ${subject} | Detalle: ${error.message}`);
        console.error("Error enviando correo:", error);
=======
        return true;
    }
    catch (error) {
        console.log(error);
>>>>>>> ca60c47c16a9731a165cdf69796a26e570d7d3fd
        return false;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mail.controller.js.map