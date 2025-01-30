import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/users.js";
import drugRouter from "./routes/drugs.js";
import recordRouter from "./routes/records.js";

//connect to database
await mongoose.connect(process.env.MONGO_URI);
console.log("database is connected");

//create an express app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//use routes
app.use(userRouter, drugRouter, recordRouter)

//listen for incoming requests
app.listen(3010,() =>{
    console.log("App is listening on port 3010");
});