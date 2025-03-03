import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addLocation, deleteLocation, getAllLocations, getLocation, updateLocation } from "./location.controller.js";
import { validate } from "../../middleware/validate.js";
import { addLocationValidation, updateLocationValidation } from "./location.validation.js";


const locationRouter = Router()

locationRouter.route('/')
    .post(protectedRoutes, allowoedTo('admin', 'user'), validate(addLocationValidation), addLocation)
    .get(protectedRoutes, allowoedTo('admin', 'user'), getAllLocations)


locationRouter.route('/:id')
    .get(protectedRoutes, allowoedTo('admin', 'user'), getLocation)
    .put(protectedRoutes, allowoedTo('admin'), validate(updateLocationValidation), updateLocation)
    .delete(protectedRoutes, allowoedTo('admin'), deleteLocation)

export default locationRouter