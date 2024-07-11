import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";

class CartService {
    static async createCart() {
        return await cartDao.create();

    }

    static async addProductToCart(cid, pid) {
        const product = await productDao.getById(pid);
        const cart = await cartDao.getById(cid)

        const productInCart = await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } })
        if (!productInCart) {
            return await cartDao.update({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } })
        }
        return productInCart
    }

    static async getCartById(id) {
        return await cartDao.getById(id);
    }

    static async deleteProductInCart(cid, pid) {
        const product = await productDao.getById(pid);
        const cart = await cartDao.getById(cid)

        return await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } })

    }

    static async cartUpdate(query, data) {
        return await cartDao.update(query, data)
    }

    static async updateQuantityProductInCart(cid, pid, quantity) {
        const product = await productDao.getById(pid);
        const cart = await cartDao.getById(cid)

        return await cartDao.update({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } })
    }

    static async deleteAllProductsInCart(cid) {
        return await cartDao.update({ _id: cid }, { $set: { product: [] } })

    }
}

export default CartService;
