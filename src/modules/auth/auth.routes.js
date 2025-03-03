import { Router } from "express";
import { allowoedTo, changeUserPassword, checkpinCode, forgettingPassword, logout, protectedRoutes, resetPassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { changeUserPasswordValidation, checkpinCodeValidation, forgettingPasswordValidation, resetPasswordValidation, signinValidation, signupValidation } from "./auth.validation.js";



const authRouter = Router()


authRouter.post('/signup', validate(signupValidation), checkEmail, signup)
authRouter.post('/signin', validate(signinValidation), signin)
authRouter.patch('/changePassword', verifyToken, validate(changeUserPasswordValidation), changeUserPassword)

authRouter.route("/forgettingPassword")
    .post(validate(forgettingPasswordValidation), forgettingPassword);

authRouter.route("/checkpinCode")
    .post(verifyToken, validate(checkpinCodeValidation), checkpinCode);

authRouter.route("/resetPassword")
    .post(verifyToken, validate(resetPasswordValidation), resetPassword);

authRouter.route('/logout')
    .patch(protectedRoutes, allowoedTo('admin', 'user'), logout)



export default authRouter