export class Contenedor {
    constructor(mongoDB, cartModel, productModel) {
        this.mongoDB = mongoDB;
        this.cartModel = cartModel;
        this.productModel = productModel;
    }

    async createCart() {
        try {
            let date = new Date();
            let cart = new this.cartModel({
                timestamp: date,
                products: []
            });
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsFromCart(id) {
        try {
            let cart = await this.cartModel.findById(id);
            return cart.products;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            let cart = await this.cartModel.findById(id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(id, product) {
        try {
            await this.cartModel.findByIdAndUpdate(id, { $push: { products: product } });
        } catch (error) {
            console.log(error);
        }
    }


    async deleteProductFromCart(id, id_product) {
        try {
            await this.cartModel.findByIdAndUpdate(id, { $pull: { products: { _id: id_product } } });
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            await this.cartModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.log(error);
        }
    }
}