import { Router } from "express";
import { computeEfficacy } from "../controllers/efficacy.js";

const efficacyRouter = Router();

efficacyRouter.post("/efficacy/:id", computeEfficacy);
//id needed above is drug id

export default efficacyRouter;