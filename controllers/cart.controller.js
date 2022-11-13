import { CarritoDAOMongoDB } from '../daos/carrito/CarritoDaoMongoDb.js';

let cartHandler = new CarritoDAOMongoDB();

export const getAllProductsByCartId = async (req, res) => {
    try {
        let id = req.params.id;
        const products = await cartHandler.getProductsFromCart(id);
        if (products.length === 0) {
            res.status(404).json({ error: 'No hay productos en el carrito' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const createCart = async (req, res) => {
    try {
        await cartHandler.createCart();
        res.status(201).json('Carrito creado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

export const addProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = req.body;
        await cartHandler.addProductToCart(id, product);
        res.status(201).json('Producto agregado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCartById = async (req, res) => {
    try {
        let id = req.params.id;
        await cartHandler.deleteCart(id);
        res.status(200).json('Carrito eliminado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductById = async (req, res) => {
    try {
        let id = req.params.id;
        let productId = req.params.productId;
        await cartHandler.deleteProductFromCart(id, productId);
        res.status(200).json('Producto eliminado con exito');
    } catch (error) {
        throw new Error(error);
    }
}