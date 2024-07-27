import express from "express";


const router = express.Router();

import { registerUser } from "../Controller/userController.js";

router.post('/register',registerUser);


export default router;