import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";


const getAllUser = catchError(async (req, res, next) => {
    let user = await User.find()
    res.json({ message: "success", user })
})

const getUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})

const getUserProfile = catchError(async (req, res, next) => {
    let user = await User.findOne({ _id: req.user._id })
    res.json({ message: "success", user })
})

const updateUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})


const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndDelete(req.params.id)
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})

export {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    getUserProfile
}