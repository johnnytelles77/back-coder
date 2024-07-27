import CartsRepository from "../persistences/mongo/repositories/carts.repository.js";

class CartService {
    static async createCart() {
        return await CartsRepository.create();
    }

    static async addProductToCart(cid, pid) {
        return await CartsRepository.addProductToCart(cid, pid);
    }

    static async getCartById(id) {
        return await CartsRepository.getById(id)
    }

    static async deleteProductInCart(cid, pid) {
        return await CartsRepository.deleteProductInCart(cid, pid);
    }

    static async updateQuantityProductInCart(cid, pid, quantity) {
        return await CartsRepository.updateQuantityProductInCart(cid, pid, quantity)
    }

    static async deleteAllProductsInCart(cid) {
        return await CartsRepository.deleteAllProductsInCart(cid);
    }
}

export default CartService;
