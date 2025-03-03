import { Location } from "../../../database/models/location.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";



const addLocation = catchError(async (req, res, body) => {
    let location = new Location(req.body)
    await location.save()
    res.json({ message: "success", location })

})


const getAllLocations = catchError(async (req, res, next) => {
    let locations = await Location.find()
    res.json({ message: "success", locations })
})

const getLocation = catchError(async (req, res, next) => {
    let location = await Location.findById(req.params.id)
    location || next(new AppError("location not found", 404))
    !location || res.json({ message: "success", location })
})

const updateLocation = catchError(async (req, res, next) => {
    let location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
    location || next(new AppError("location not found", 404))
    !location || res.json({ message: "success", location })
})


const deleteLocation = catchError(async (req, res, next) => {
    let location = await Location.findByIdAndDelete(req.params.id)
    location || next(new AppError("location not found", 404))
    !location || res.json({ message: "success", location })
})

export {
    addLocation,
    getAllLocations,
    getLocation,
    updateLocation,
    deleteLocation,
}