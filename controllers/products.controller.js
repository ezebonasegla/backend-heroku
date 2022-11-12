import { ProductosDAOMongoDB } from '../daos/products/ProductosDaoMongoDb.js';

let productsStorage = new ProductosDAOMongoDB();

export const addProduct = async (req, res) => {
        try {
            const title = req.body.title;
            const description = req.body.description;
            const code = Number(req.body.code);
            const price = Number(req.body.price);
            const thumbnail = req.body.thumbnail;
            const stock = Number(req.body.stock);
            if (title && description && code && price && thumbnail && stock) {
                const product = {
                    title,
                    description,
                    code,
                    price,
                    thumbnail,
                    stock
                }
                await productsStorage.save(product);
                res.status(201).json('Producto agregado con exito');
            } else {
                res.status(400).json({ error: 'Faltan datos' });
            }
        } catch (error) {
            throw new Error(error);
        }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productsStorage.getAll();
        if (products.length === 0) {
            res.status(404).json({ error: 'No hay productos cargados' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (req, res) => {
    try {
        let id = req.params.id;
        const product = await productsStorage.getById(id);
        if (product.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProductById = async (req, res) => {
        try {
            let id = req.params.id;
            const title = req.body.title;
            const description = req.body.description;
            const code = Number(req.body.code);
            const price = Number(req.body.price);
            const thumbnail = req.body.thumbnail;
            const stock = Number(req.body.stock)
            if (title && description && code && price && thumbnail && stock) {
                await productsStorage.updateById(id, title, description, code, price, thumbnail, stock);
                res.status(200).json('Producto actualizado con exito');
            } else {
                res.status(400).json({ error: 'Faltan datos' });
            }
        } catch (error) {
            throw new Error(error);
        }
}

export const deleteProductById = async (req, res) => {
        try {
            let id = req.params.id;
            await productsStorage.deleteById(id);
            res.status(200).json('Producto eliminado con exito');
        } catch (error) {
            throw new Error(error);
        }
}