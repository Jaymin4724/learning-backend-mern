import express from "express";
import { createUser, getUser } from "../controller/auth-controller.js";
const authRouter = express.Router();

authRouter.post("/signup", createUser);
authRouter.get("/login", getUser);

export default authRouter;
