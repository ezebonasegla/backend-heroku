import { Router } from 'express';

import { createCart, getAllProductsByCartId, addProduct, deleteCartById, deleteProductById  } from '../controllers/cart.controller.js';

import { checkAuth } from '../middlewares/auth.js';

export const cartRouter = new Router();

cartRouter.get('/:id', getAllProductsByCartId);
cartRouter.post('/', createCart);
cartRouter.post('/:id', addProduct);
cartRouter.delete('/:id', deleteCartById);
cartRouter.delete('/:id/:productId', deleteProductById);
