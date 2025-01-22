import { Router } from "express";
import { addDrug, deleteDrug, getAllDrugs, getDrugById, updateDrug } from "../controllers/drugs.js";

const drugRouter = Router();

drugRouter.post("/drugs", addDrug);

drugRouter.get("/drugs/:id", getDrugById);

drugRouter.get("/drugs", getAllDrugs);

drugRouter.patch("/drugs/:id", updateDrug);

drugRouter.delete("/drugs/:id", deleteDrug);


export default drugRouter

