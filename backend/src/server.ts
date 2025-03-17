import express from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:4000",
      "https://aula.cencapperu.com",
      "https://administrador.cencapperu.com/",
    ],
    credentials: true,
  })
);

// Crear stream para guardar logs en error.log
const errorLogStream = fs.createWriteStream(path.join(__dirname, "error.log"), {
  flags: "a",
});

// Definir un formato de log personalizado
morgan.format(
  "custom",
  ':date[iso] [ERROR] :method :url | Status: :status | Time: :response-time ms | IP: :remote-addr | User-Agent: ":user-agent"'
);

// Usar Morgan para registrar solo errores (4xx y 5xx)
app.use(
  morgan("custom", {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream,
  })
);

// Configurar el servidor para usar el directorio 'public' como directorio de archivos estáticos
app.use("/public", express.static(path.resolve("public")));

app.use(express.json());

export default app;
