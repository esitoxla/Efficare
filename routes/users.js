import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/users.js";

const userRouter = Router();

userRouter.post("/users", addUser);

userRouter.get("/users/:id", getUserById);

userRouter.get("/users", getAllUsers);

userRouter.patch("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);

export default userRouter;