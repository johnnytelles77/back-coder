import cartDao from "../dao/mongoDao/cart.dao";
import CartService from "../service/carts.services";

class CartController {
    static async createCart(req, res) {
        try {
            const cart = await cartDao.create();
            res.status(201).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await cartDao.update(cid, pid);

            if (!cart.product) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            }
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartDao.getById(id);
            if (!cart) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }

            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async deleteProductInCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await cartDao.deleteProductInCart(cid, pid);
            if (cart.product === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            }
            if (cart.cart === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }




    static async cartUpdate(req, res) {
        try {
            const { cid } = req.params;
            const body = req.body;
            const cart = await cartDao.update(cid, body);
            if (cart.cart === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async updateQuantityProductInCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);
            if (cart.product === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            }
            if (cart.cart === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async deleteAllProductsInCart(req, res) {
        try {
            const { cid } = req.params;

            const cart = await cartDao.deleteAllProductsInCart(cid);
            if (cart.cart === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default CartController;

