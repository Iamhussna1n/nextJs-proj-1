import mongoose from 'mongoose';
import { type } from 'os';
import { stringify } from 'querystring';

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "please enter a username"],
        unique: true,
    },
    email : {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
    },
    password: {
        type : String,
        required :[true, "please enter a password"],
    },
    isVarified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

export const User = mongoose.models.User ||  mongoose.model('User', userSchema);