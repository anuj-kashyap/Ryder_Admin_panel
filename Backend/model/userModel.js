import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"]
    },
    username: {
        type: String,
        required: [true, "Please add an username"]
    },
    password: {
        type: String,
        required: [true, "please add a password"],
        minLength: [6, "password must contain atleast 6 character"]
    }
},
    {
        timeStamps: true,
    })

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(this.password, salt);
    this.password = hashpass;
})


export const User = mongoose.model("User", UserSchema);


export default User;
