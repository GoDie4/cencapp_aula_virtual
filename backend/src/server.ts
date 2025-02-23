import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";

const app = express();

app.use(
  cors({
    // origin: ["http://localhost:5173", "http://localhost: 3000"],
    origin: "*",
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
app.use(express.json());
app.use(cookieParser());

export default app;
