import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addListen, allListens, allListensPublish, deleteListen, getListen, publishById, updateListen } from "./listen.controller.js";
import { uploadMixOfFields } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addListenValidation, updateListenValidation } from "./listen.validation.js";


const listenRouter = Router()

listenRouter.route('/')
    .post(protectedRoutes, allowoedTo('admin'), uploadMixOfFields('images', 10), validate(addListenValidation), addListen)
    .get(protectedRoutes, allowoedTo('admin', 'user'), allListens)


listenRouter.route('/publish')
    .get(protectedRoutes, allowoedTo('admin', 'user'), allListensPublish)

listenRouter.route('/:id')
    .patch(protectedRoutes, allowoedTo('admin'), publishById)
    .get(protectedRoutes, allowoedTo('admin', 'user'), getListen)
    .put(protectedRoutes, allowoedTo('admin'), uploadMixOfFields('images', 10), validate(updateListenValidation), updateListen)
    .delete(protectedRoutes, allowoedTo('admin'), deleteListen)

export default listenRouter