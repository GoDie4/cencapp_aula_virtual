import { profile } from "../controllers/user.controller";
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.get("/perfil/:userId", authRequired, profile);

export default router;
