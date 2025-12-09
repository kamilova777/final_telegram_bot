import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String
    },
    username: {
        type: String,
        dafault: null
    },
    active: {
        type: Boolean,
        default: true,
    },
    balance: {
        type: Number,
        default: 2000,
    },
});
export const User = new mongoose.model("User", userSchema)

