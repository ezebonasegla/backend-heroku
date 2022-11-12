import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new Schema({
    title : { type: String, required: true },
    description : { type: String, required: true },
    code : { type: String, required: true },
    price : { type: Number, required: true },
    thumbnail : { type: String, required: true },
    stock : { type: Number, required: true }
});

export const Product = mongoose.model('products', productSchema);