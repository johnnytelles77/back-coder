
import ProductService from "../service/products.services.js";

class ProductController {
    static async getAll(req, res) {
        try {
            const { limit, page, sort, category, status } = req.query;
            const options = {
                limit: limit || 10,
                page: page || 1,
                sort: {
                    price: sort === "asc" ? 1 : -1,
                },
                lean: true,
            };

            if (status) {
                const products = await ProductService.getAll({ status: status }, options);
                return res.status(200).json({ products });
            }

            if (category) {
                const products = await ProductService.getAll({ category: category }, options);
                return res.status(200).json({ status: "succes", products });
            }

            const products = await ProductService.getAll({}, options);

            res.status(200).json({ status: "success", products });
        } catch (error) {
            console.error("Error al obtener todos los productos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async getById(req, res, next) {
        try {
            const { pid } = req.params;
            const product = await ProductService.getById(pid);
            res.status(200).json({ status: "success", payload: product });
        } catch (error) {
            console.log( error);
            next(error);
        }
    }

    static async create(req, res) {
        try {
            console.log("Agregando un nuevo producto...");
            const product = req.body;
            console.log("Datos del nuevo producto:", product);
            const newProduct = await ProductService.create(product);
            console.log("Producto agregado:", newProduct);
            res.status(201).json({ status: "success", payload: newProduct });
        } catch (error) {
            console.error("Error al agregar un nuevo producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async update(req, res) {
        try {
            const { pid } = req.params;
            console.log(`Actualizando producto con ID: ${pid}`);
            const productData = req.body;
            console.log("Nuevos datos del producto:", productData);
            const updateProduct = await ProductService.update(pid, productData);
            if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });
            res.status(200).json({ status: "success", payload: updateProduct });
        } catch (error) {
            console.error(`Error al actualizar producto con ID ${pid}:`, error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async deleteOne(req, res) {
        try {
            const { pid } = req.params;
            const product = await ProductService.deleteOne(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });

            res.status(200).json({ status: "success", payload: "Producto eliminado" });
        } catch (error) {
            console.error(`Error al eliminar producto con ID ${pid}:`, error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default ProductController;
