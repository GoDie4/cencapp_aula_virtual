import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  PORT: process.env.SERVER_PORT || "5000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  TOKEN_SECRET: process.env.TOKEN_SECRET || "",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN_MERCADO_PAGO || "",
  MercadoSecret: process.env.SECRET_TOKEN_MERCADO || "",
  Success: process.env.SUCCESS_URL || "http://localhost:3000/"
};
