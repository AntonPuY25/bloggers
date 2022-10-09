import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userLogin: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const CommentsModel = mongoose.model('Comments',commentsSchema)