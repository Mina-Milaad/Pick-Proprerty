import { connect } from "mongoose";




export const dbConn = connect('mongodb://localhost:27017/pick_proprerty')
    .then(() => {
        console.log("database Connected Successfully");
    })