import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";

const router = Router();

router.post("/email/reset-password", userControllers.sendEmailResetPassword);
router.post("/reset-password", userControllers.resetPassword);
router.get("/premium/:uid", userControllers.changeUserRole);

export default router;
