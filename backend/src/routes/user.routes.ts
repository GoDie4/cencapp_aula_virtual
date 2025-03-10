import { authRequired } from "../middlewares/validateToken";
import { profile } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/perfil/:userId", authRequired, profile);

export default router;
