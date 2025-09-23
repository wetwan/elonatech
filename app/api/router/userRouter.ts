import { registerUser } from '@/app/controller/user';
import express from 'express'

const userRoute = express.Router();


userRoute.post("/signup", registerUser);

export default userRoute;