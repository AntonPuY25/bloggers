import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const UsersModel = mongoose.model('Users',usersSchema)