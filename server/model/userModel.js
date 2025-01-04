import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true }, 
            price: { type: String, required: true }, 
        },
    ],
});

userSchema.methods.generateJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_PASSWORD, { expiresIn: '10d' });
};

const User = mongoose.model('User', userSchema);

export default User;
