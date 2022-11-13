import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const cartSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
});

export const Cart = mongoose.model('Cart', cartSchema);
