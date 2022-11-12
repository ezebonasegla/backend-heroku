export class Container{
    constructor(mongoDB, productModel){
        this.mongoDB = mongoDB;
        this.productModel = productModel;
    }

    async save(product){
        try{
            let newProduct = new this.productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            let product = await this.productModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            let products = await this.productModel.find();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            let product = await this.productModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try {
            let products = await this.productModel.deleteMany();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, title, description, code, price, thumbnail, stock){
        try {
            let product = await this.productModel.findByIdAndUpdate(id, {
                title,
                description,
                code,
                price,
                thumbnail,
                stock
            });
            return product;
        } catch (error) {
            console.log(error);
        }
    }
}