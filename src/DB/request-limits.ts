import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestLimitsSchema = new Schema({
    ip: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
}, {timestamps: true})

export const RequestLimitsModel = mongoose.model('RequestLimits', RequestLimitsSchema)

