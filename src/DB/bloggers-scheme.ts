import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bloggersSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    youtubeUrl: {
        type: String,
        required: true,
    },
}, {timestamps: true})

export const BloggersModel = mongoose.model('Bloggers', bloggersSchema)

