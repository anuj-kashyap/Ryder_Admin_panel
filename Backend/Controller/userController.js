import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js";
import asyncHandler from "express-async-handler";
const genToken = (id)=>{
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"1d"});
};

const registerUser = asyncHandler(async(req,res)=>{
    const {email, username, password} = req.body;

    if(!email || !username || !password){
        res.status(400);
        throw new Error("Please enter all fields")
    }

    if(password.length<6){
        res.status(400);
        throw new Error("Password must contain atleast 6 character")
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error ("User already exist")
    }

    const user = await User.create({
        email,
        username,
        password
    });

    const token = genToken(user._id);
    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 1000 + 86400),
        secure:false,
        sameSite:"lax",
        path:"/"
    });

    if(user){
        const {username, email} = user;
        res.status(201).json({
            username,
            email,
        });
    }
    else{
        res.status(400)
        throw new Error("Invalid user Data")
    }
})

export {registerUser};