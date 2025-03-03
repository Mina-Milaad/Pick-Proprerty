import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({

    offerType: {
        type: String,
        enum: ["Rent", "Sale"],
        required: true
    },
    category: {
        type: String,
        enum: ["Commercial", "Residential"],
        required: true
    },
    propertyType: {
        type: String,
        enum: ["Apartment",
            "Bungalow",
            "Duplex",
            "Full Floor",
            "Half Floor",
            "Land",
            "Penthouse",
            "Townhouse",
            "villa",
            "Whole Building",
            "Chalet",
            "Bulk Units",
            "Twin House",
            "iVilla",
            "Cabin",
            "Palace",
            "Roof"],
        required: true
    },

    propertyLocation: {
        type: String,
        required: true
    },

    AssignedAgent: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    Reference: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    Available: {
        type: Date,
        default: Date.now,
        require: true
    },
    Rooms: {
        type: Number,
        min: 0,
        max: 20,
        require: true
    },
    Bathrooms: {
        type: Number,
        min: 0,
        max: 20,
        require: true
    },
    propertySize: {
        type: Number,
        min: 50,
        max: 1000,
        require: true
    },
    unitNumber: {
        type: Number,
        min: 0,
        max: 999
    },
    plotSize: {
        type: Number,
        min: 0,
        max: 999
    },
    noOfParkingSpace: {
        type: Number,
        min: 0,
        max: 999
    },
    floorNumber: {
        type: Number,
        min: 0,
        max: 100
    },
    finishingType: {
        type: String,
        enum: ["Fully-Finishing", "Semi-Finishing", "Unfinished"],
        // required: true
    },
    furnishingType: {
        type: String,
        enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
        // required: true
    },
    Amenities: [String],
    titleAr: {
        type: String,
        required: true
    },
    titleEn: {
        type: String,
        required: true
    },
    descAr: {
        type: String,
        required: true
    },
    descEn: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Installments", "Cash & Installments"],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    publish: {
        type: Boolean,
        default: false
    },
    propertyPrice: {
        type: Number,
        required: true
    },
    downPayment: {
        type: Number,
        // required: true
    },
    numberOfYears: {
        type: Number,
        // required: true
    },
    rentalPeriod: {
        type: String,
        enum: ['Per Month', 'Per Day'],
        required: true
    }



}, { timestamps: true, versionKey: false })

// schema.post('init', (docs) => {

//     if (docs.images) docs.images = docs.images.map((img) => "http://localhost:3000/uploads/listen/" + img)
// })


export const Listen = mongoose.model('Listen', schema) 