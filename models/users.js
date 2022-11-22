import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    address: {
        type: String,
        required: true,
        max: 100
    },
    age: {
        type: Number,
        required: true,
        max: 3
    },
    phone: {
        type: String,
        required: true,
        max: 100
    },
/*     image: {
        type: String,
        required: true,
        max: 100
    }, */
    username: {
        type: String,
        required: true,
        max: 100,
    },
    password: {
        type: String,
        required: true,
        max: 100,
    },
    twitterId: {
        type: String,
        required: false,
        max: 100,
    },
    /* cart_id: { type: Schema.Types.ObjectId, ref: 'Cart' }, */
});
userSchema.plugin(findOrCreate);

export const User = mongoose.model('users', userSchema);