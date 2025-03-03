import bcrybt from 'bcrypt'
import mongoose from "mongoose";



const schema = new mongoose.Schema({

    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["admin", "user", "agent"],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    pinCode: String,
    pinCodeExpire: String,
    resetVerified: Boolean,
    passwordChangedAt: Date,
    logoutAt: Date,

}, { timestamps: true, versionKey: false })

schema.pre('save', function (next) {
    this.username = `${this.firstName}${this.lastName}`.toLowerCase();
    next();
});

schema.pre('save', function () {
    this.password = bcrybt.hashSync(this.password, 8)
})

schema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrybt.hashSync(this._update.password, 8)
})



export const User = mongoose.model('User', schema)