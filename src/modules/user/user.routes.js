import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { deleteUser, getAllUser, getUser, getUserProfile, updateUser } from "./user.controller.js";
import { validate } from "../../middleware/validate.js";
import { updateUserValidation } from "./user.validation.js";


const userRouter = Router()

userRouter.route('/')
    .get(protectedRoutes, allowoedTo('admin'), getAllUser)

userRouter.route('/profile')
    .get(protectedRoutes, allowoedTo('admin', 'user'), getUserProfile)

userRouter.route('/:id')
    .get(protectedRoutes, allowoedTo('admin'), getUser)
    .put(protectedRoutes, allowoedTo('admin'), validate(updateUserValidation), updateUser)
    .delete(protectedRoutes, allowoedTo('admin'), deleteUser)

export default userRouter