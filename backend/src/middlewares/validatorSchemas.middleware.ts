import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";
export const validateSchema =
  (schema: ZodSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Error de validación",
          errors: error.errors.map((err) => err.message),
        });
        return;
      }
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
