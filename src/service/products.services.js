import { productResponseDto } from "../dto/product-response.dto.js";
import ProductRepository from "../persistences/mongo/repositories/products.repository.js";

class ProductService {
    static async getAll(query, options) {
        const products = await ProductRepository.getAll(query, options);
        return products;
    }

    static async getById(id) {
        const productData = await ProductRepository.getById(id);
        const product = productResponseDto(productData)
        return product;
    }

    static async create(data) {
        const product = await ProductRepository.create(data);
        return product;
    }

    static async update(id, data) {
        const product = await ProductRepository.update(id, data);
        return product;
    }

    static async deleteOne(id) {
        const product = await ProductRepository.deleteOne(id);
        return product;
    }
}

export default ProductService;
