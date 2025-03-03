import Joi from "joi";

export const addListenValidation = Joi.object({
    offerType: Joi.string().valid("Rent", "Sale").required(),
    category: Joi.string().valid("Commercial", "Residential").required(),
    propertyType: Joi.string().valid(
        "Apartment", "Bungalow", "Duplex", "Full Floor", "Half Floor", "Land", "Penthouse",
        "Townhouse", "villa", "Whole Building", "Chalet", "Bulk Units", "Twin House", "iVilla",
        "Cabin", "Palace", "Roof"
    ).required(),
    propertyLocation: Joi.string().required(),
    AssignedAgent: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Reference: Joi.string().required().trim().max(100),
    Available: Joi.date().required(),
    Rooms: Joi.number().min(0).max(20).required(),
    Bathrooms: Joi.number().min(0).max(20).required(),
    propertySize: Joi.number().min(50).max(1000).required(),
    unitNumber: Joi.number().min(0).max(999),
    plotSize: Joi.number().min(0).max(999),
    noOfParkingSpace: Joi.number().min(0).max(999),
    floorNumber: Joi.number().min(0).max(100),
    finishingType: Joi.string().valid("Fully-Finishing", "Semi-Finishing", "Unfinished").required(),
    furnishingType: Joi.when('finishingType', {
        is: "Fully-Finishing",
        then: Joi.string().valid("Furnished", "Semi-Furnished", "Unfurnished").required(),
        otherwise: Joi.forbidden()
    }),
    Amenities: Joi.array().items(Joi.string()),
    titleAr: Joi.string().required(),
    titleEn: Joi.string().required(),
    descAr: Joi.string().required(),
    descEn: Joi.string().required(),
    paymentMethod: Joi.string().valid("Cash", "Installments", "Cash & Installments").required(),
    images: Joi.array()
        .items(
            Joi.object({
                fieldname: Joi.string().required(),
                originalname: Joi.string().required(),
                encoding: Joi.string().required(),
                mimetype: Joi.string()
                    .valid("image/png", "image/jpg", "image/jpeg")
                    .required(),
                // destination: Joi.string().required(),
                // filename: Joi.string().required(),
                // path: Joi.string().required(),
                size: Joi.number().max(5242880).required(),
                buffer: Joi.any(),
            })
        ),
    propertyPrice: Joi.number().required(),
    downPayment: Joi.when('paymentMethod', {
        is: Joi.valid("Installments", "Cash & Installments"),
        then: Joi.number().required(),
        otherwise: Joi.forbidden()
    }),
    numberOfYears: Joi.when('paymentMethod', {
        is: Joi.valid("Installments", "Cash & Installments"),
        then: Joi.number().required(),
        otherwise: Joi.forbidden()
    }),
    rentalPeriod: Joi.when('offerType', {
        is: Joi.valid("Rent"),
        then: Joi.string().valid('Per Month', 'Per Day').required(),
        otherwise: Joi.forbidden()
    })
});



export const updateListenValidation = Joi.object({
    id: Joi.string().length(24).hex().required(),

    offerType: Joi.string().valid("Rent", "Sale"),
    category: Joi.string().valid("Commercial", "Residential"),
    propertyType: Joi.string().valid(
        "Apartment", "Bungalow", "Duplex", "Full Floor", "Half Floor", "Land", "Penthouse",
        "Townhouse", "villa", "Whole Building", "Chalet", "Bulk Units", "Twin House", "iVilla",
        "Cabin", "Palace", "Roof"
    ),
    propertyLocation: Joi.string(),
    AssignedAgent: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Reference: Joi.string().trim().max(100),
    Available: Joi.date(),
    Rooms: Joi.number().min(0).max(20),
    Bathrooms: Joi.number().min(0).max(20),
    propertySize: Joi.number().min(50).max(1000),
    unitNumber: Joi.number().min(0).max(999),
    plotSize: Joi.number().min(0).max(999),
    noOfParkingSpace: Joi.number().min(0).max(999),
    floorNumber: Joi.number().min(0).max(100),
    finishingType: Joi.string().valid("Fully-Finishing", "Semi-Finishing", "Unfinished"),
    furnishingType: Joi.when('finishingType', {
        is: "Fully-Finishing",
        then: Joi.string().valid("Furnished", "Semi-Furnished", "Unfurnished"),
        otherwise: Joi.forbidden()
    }),
    Amenities: Joi.array().items(Joi.string()),
    titleAr: Joi.string(),
    titleEn: Joi.string(),
    descAr: Joi.string(),
    descEn: Joi.string(),
    paymentMethod: Joi.string().valid("Cash", "Installments", "Cash & Installments"),
    images: Joi.array()
        .items(
            Joi.object({
                fieldname: Joi.string().required(),
                originalname: Joi.string().required(),
                encoding: Joi.string().required(),
                mimetype: Joi.string()
                    .valid("image/png", "image/jpg", "image/jpeg")
                    .required(),
                // destination: Joi.string().required(),
                // filename: Joi.string().required(),
                // path: Joi.string().required(),
                size: Joi.number().max(5242880).required(),
                buffer: Joi.any()
            })
        ),
    propertyPrice: Joi.number(),
    downPayment: Joi.when('paymentMethod', {
        is: Joi.valid("Installments", "Cash & Installments"),
        then: Joi.number().required(),
        otherwise: Joi.forbidden()
    }),
    numberOfYears: Joi.when('paymentMethod', {
        is: Joi.valid("Installments", "Cash & Installments"),
        then: Joi.number().required(),
        otherwise: Joi.forbidden()
    }),
    rentalPeriod: Joi.when('offerType', {
        is: Joi.valid("Rent"),
        then: Joi.string().valid('Per Month', 'Per Day').required(),
        otherwise: Joi.forbidden()
    })
});

