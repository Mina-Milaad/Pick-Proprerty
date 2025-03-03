import mongoose from "mongoose";



const schema = new mongoose.Schema({

    locationName: {
        type: String,
        unique: true,
        required: true
    },

}, { timestamps: true, versionKey: false })



export const Location = mongoose.model('Location', schema)