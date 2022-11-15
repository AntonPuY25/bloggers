import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TokensSchema = new Schema({
    issueAt: {
        type: String,
        required: true,
    },
    finishedDate: {
        type: String,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: false,
    },
    deviceName: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    },
}, {timestamps: true})

export const TokensModel = mongoose.model('Tokens', TokensSchema)

