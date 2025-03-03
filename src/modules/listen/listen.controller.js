import { Listen } from "../../../database/models/listen.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";
import path from 'path'
import sharp from 'sharp'


const addListen = catchError(async (req, res, next) => {

    if (req.files) {

        req.body.images = await Promise.all(req.files.map(async (file) => {
            // Clean up filename by replacing spaces with underscores (optional)
            let cleanedFilename = file.originalname
                .replace(/\s+/g, '_')          // Replace spaces with underscores
                .replace(/[^a-zA-Z0-9_.]/g, ''); // Remove all special characters except letters, numbers, underscores, and dots

            const resizedFilename = encodeURIComponent(cleanedFilename);
            const outputPath = path.join("uploads", resizedFilename);
            await sharp(file.buffer)
                .resize(1400, 900)
                .toFile(outputPath);

            return `http://localhost:3000/uploads/${resizedFilename}`;
        }));
    }

    let listen = new Listen(req.body)
    await listen.save()
    res.json({ message: "success", listen })


})


const publishById = catchError(async (req, res, next) => {
    let listen = await Listen.findOneAndUpdate({ _id: req.params.id })
    if (!listen) next(new AppError("listen not found", 404))
    await Listen.findOneAndUpdate({ _id: req.params.id }, { publish: true })
    !listen || res.json({ message: "success" })

})



const allListens = catchError(async (req, res, next) => {

    let apiFeatures = new ApiFeatures(Listen.find(), req.query)
        .fields().filter().sort().search()

    let count = await Listen.countDocuments({ ...req.query })
    apiFeatures = apiFeatures.paginate(count)
    let listens = await apiFeatures.mongooseQuery
    res.json({ message: "success", paginate: apiFeatures.paginationResult, listens })
})


const allListensPublish = catchError(async (req, res, next) => {

    let apiFeatures = new ApiFeatures(Listen.find({ publish: true }), req.query)
        .fields().filter().sort().search()

    let count = await Listen.countDocuments({ ...req.query })
    apiFeatures = apiFeatures.paginate(count)
    let listens = await apiFeatures.mongooseQuery
    res.json({ message: "success", paginate: apiFeatures.paginationResult, listens })
})


const getListen = catchError(async (req, res, next) => {

    let listen = await Listen.findById(req.params.id)
    listen || next(new AppError("listen not found", 404))
    !listen || res.json({ message: "success", listen })
})


const updateListen = catchError(async (req, res, next) => {

    let imageUrls = [];

    if (req.files) {

        imageUrls = await Promise.all(req.files.map(async (file) => {
            // Clean up filename by replacing spaces with underscores (optional)
            let cleanedFilename = file.originalname
                .replace(/\s+/g, '_')          // Replace spaces with underscores
                .replace(/[^a-zA-Z0-9_.]/g, ''); // Remove all special characters except letters, numbers, underscores, and dots

            const resizedFilename = encodeURIComponent(cleanedFilename);
            const outputPath = path.join("uploads", resizedFilename);
            await sharp(file.buffer)
                .resize(1400, 900)
                .toFile(outputPath);

            return `http://localhost:3000/uploads/${resizedFilename}`;
        }));
    }

    if (req.body.images) {
        const urlsFromBody = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
        imageUrls = imageUrls.concat(urlsFromBody.filter(item => item.startsWith('http')));
    }
    const updateData = { ...req.body, images: imageUrls };

    console.log(updateData);
    let listen = await Listen.findByIdAndUpdate(req.params.id, updateData, { new: true })
    listen || next(new AppError("listen not found", 404))
    !listen || res.json({ message: "success", listen })

})


const deleteListen = catchError(async (req, res, next) => {
    let listen = await Listen.findByIdAndDelete(req.params.id)
    listen || next(new AppError("listen not found", 404))
    !listen || res.json({ message: "success", listen })
})

export {
    addListen,
    allListens,
    getListen,
    updateListen,
    deleteListen,
    publishById,
    allListensPublish
}