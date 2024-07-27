import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import ProductController from "../controllers/products.controllers.js";

const router = Router();

router.get("/", ProductController.getAll); 

router.get("/:pid", ProductController.getById);

router.post("/", passportCall("jwt"), authorization("admin"), ProductController.create);

router.put("/:pid", passportCall("jwt"), authorization("admin"), ProductController.update);

router.delete("/:pid", passportCall("jwt"), authorization("admin"),ProductController.deleteOne);


export default router;
