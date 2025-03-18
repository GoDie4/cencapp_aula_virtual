import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { ENV } from "../config/config";

const uploadDir = path.join(__dirname, "../..", "src/mail");

const transporter = nodemailer.createTransport({
  //@ts-ignore
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  secure: ENV.EMAIL_SECURE,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (
  to: string | string[],
  subject: string,
  templateName: string,
  replacements: any
) => {
  try {
    const templatePath = path.join(uploadDir, `${templateName}`);
    const source = fs.readFileSync(templatePath, "utf-8").toString();
    const template = Handlebars.compile(source);
    const htmlToSend = template(replacements);
    if (Array.isArray(to)) {
      to = to.join(", ");
    }
    await transporter.sendMail({
      from: ENV.EMAIL_USER,
      to,
      subject,
      html: htmlToSend,
    });
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
