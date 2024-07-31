import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import userRoute from "./Route/userRoute.js";
import cors from "cors"
dotenv.config()


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys:[process.env.SESSION_SECRET]
}))


app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))

app.use("/api/user",userRoute)
const PORT = process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`the server is running in PORT ${PORT}`);
    })
}).catch((err)=>console.log(err));
