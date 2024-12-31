import express from "express";
import { getAllUsers } from "../controller/UserController.js";

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
export default userRouter;
