import express from "express";
import { loginUser } from "./loginuser.js";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);

export default UserRouter;
