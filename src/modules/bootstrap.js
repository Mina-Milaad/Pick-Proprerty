import authRouter from "./auth/auth.routes.js"
import listenRouter from "./listen/listen.routes.js"
import locationRouter from "./location/location.routes.js"
import userRouter from "./user/user.routes.js"




export const bootstrap = (app) => {
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/listens', listenRouter)
    app.use('/locations', locationRouter)



}