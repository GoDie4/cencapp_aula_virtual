import app from "./server";
import express from "express";
import prisma from "./config/database";
import { ENV } from "./config/config";
import cookieParser from "cookie-parser";

import authRoutes from "../src/routes/auth.routes";
import userRoutes from "../src/routes/user.routes";
import comentariosRoutes from "../src/routes/comentarios.routes";
import beneficiosRoutes from "../src/routes/beneficios.routes";
import certificadosRoutes from "../src/routes/certificados.routes";
import respuestasRoutes from "../src/routes/respuestas.routes";

app.use(express.static("public"));

app.use(cookieParser());
prisma
  .$connect()
  .then(() => {
    console.log("✅ Conectado a la base de datos");
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server corriendo en http://localhost:${ENV.PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
  });

app.use("/api", authRoutes);
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/respuestas", respuestasRoutes);
app.use("/api/user", userRoutes);
app.use("/api/beneficios", beneficiosRoutes);
app.use("/api/certificados", certificadosRoutes);

/*
app.use("/api/usuarios", userRoutes);
app.use("/api/categorias", categoryRoutes)
*/
