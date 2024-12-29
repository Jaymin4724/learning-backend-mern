import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  replaceUser,
  deleteUser,
} from "../controller/user-controller.js";

const userRouter = express.Router();

userRouter
  .post("/", createUser)
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default userRouter;
