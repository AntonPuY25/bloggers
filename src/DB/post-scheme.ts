import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    blogId: {
        type: String,
        required: true,
    },
    blogName: {
        type: String,
        required: true,
    },
}, {timestamps: true})


export const PostsModel = mongoose.model('Posts', postsSchema);

