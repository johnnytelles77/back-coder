import { Router } from "express";
import CartController from "../controllers/carts.controllers.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import ProductAndCart from "../middlewares/checkProductAndCart.middleware.js";
const router = Router();

router.post("/", passportCall("jwt"), authorization("user"), CartController.createCart );

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), ProductAndCart.checkProductAndCart , CartController.addProductToCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), CartController.getCartById);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), CartController.deleteProductInCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), ProductAndCart.checkProductAndCart, CartController.updateQuantityProductInCart);

router.delete("/:cid", passportCall("jwt"), authorization("user"), ProductAndCart.checkProductAndCart, CartController.deleteAllProductsInCart);

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), CartController.purchaseCart);


export default router;
