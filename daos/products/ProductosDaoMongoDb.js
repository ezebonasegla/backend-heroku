import { connectMG } from '../../config/configDB.js';
import { Product } from '../../models/products.js';
import { Container } from '../../dataBase/crudMongo/crudProducts.js';

export class ProductosDAOMongoDB extends Container {
    constructor() {
        super(connectMG, Product);
    }
}
