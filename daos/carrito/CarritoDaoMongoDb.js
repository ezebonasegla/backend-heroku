import { connectMG } from '../../config/configDB.js';
import { Cart } from '../../models/carrito.js';
import { Product } from '../../models/products.js';
import { Contenedor } from '../../dataBase/crudMongo/crudCarritos.js';

export class CarritoDAOMongoDB extends Contenedor {
    constructor() {
        super(connectMG, Cart, Product);
    }
}