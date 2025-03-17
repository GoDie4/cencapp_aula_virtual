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
const uploadDir = path_1.default.join(__dirname, "../..", "src/mail");
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
        const templatePath = path_1.default.join(uploadDir, `${templateName}`);
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
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mail.controller.js.map