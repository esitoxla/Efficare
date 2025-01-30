import { Router } from "express";
import { addRecord, deleteRecord, getAllRecords, getRecordById, updateRecord } from "../controllers/records.js";

const recordRouter = Router();

recordRouter.post("/records", addRecord);

recordRouter.get("/records", getAllRecords);

recordRouter.get("/records/:id", getRecordById);

recordRouter.patch("/records/:id", updateRecord);

recordRouter.delete("/records/:id", deleteRecord);


export default recordRouter;