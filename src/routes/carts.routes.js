import { Router } from "express";
import CartController from "../controllers/carts.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
const router = Router();

router.post("/", passportCall("jwt"), authorization("user"), CartController.createCart );

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), CartController.addProductToCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), CartController.getCartById);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), CartController.deleteProductInCart);

router.put("/:cid", passportCall("jwt"), authorization("user"),CartController.cartUpdate);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), CartController.updateQuantityProductInCart);

router.delete("/:cid", passportCall("jwt"), authorization("user"), CartController.deleteAllProductsInCart);


export default router;
