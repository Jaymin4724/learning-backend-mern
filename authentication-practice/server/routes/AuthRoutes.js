import express from "express";
import { Signup, Login } from "../controller/AuthController.js";

const AuthRouter = express.Router();
AuthRouter.post("/signup", Signup);
AuthRouter.post("/login", Login);

export default AuthRouter;
