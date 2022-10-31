import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        max: 100,
    },
    password: {
        type: String,
        required: false,
        max: 100,
    },
    twitterId: {
        type: String,
        required: false,
        max: 100,
    },
});
userSchema.plugin(findOrCreate);

export const User = mongoose.model('users', userSchema);