import { DrugModel } from "../models/drugs.js";
import { addDrugValidator, updateDrugValidator } from "../validators/drugs.js";


export const addDrug = async (req, res, next) => {
  try {
    //add drug validator
    const { error, value } = addDrugValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    //connect to datadase
    const drug = new DrugModel({
      ...value,
      user: req.auth.id,
    });
    //save new data
    await drug.save();
    res.status(200).json("drug added successfully!");
  } catch (error) {
    res.status(422).json({ message: "failed to add drug", error });
  }
};


export const getDrugById = async (req, res, next) => {
  try {
    //get data details by id from database
    const drug = await DrugModel.findById(req.params.id);
    //if drug does not exist
    if (!drug) {
      return res.status(404).json({ message: "drug not found" });
    }
    res.status(200).json(drug);
  } catch (error) {
    res.status(422).json({ message: "Failed to fetch drug", error });
  }
};


export const getAllDrugs = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 50, skip = 0 } = req.query;

    const drugs = await DrugModel.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    res.status(200).json(drugs);
  } catch (error) {
    res.status(422).json({ message: "Failed to fetch drugs", error });
  }
};


export const updateDrug = async (req, res, next) => {
  try {
    const { error, value } = updateDrugValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details });
    }
    const updatedDrug = await DrugModel.findByIdAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      req.body,
      { new: true }
    );
    if (!updatedDrug) {
      return res.status(404).json({ message: "drug not found" });
    }
    res.status(200).json("drug updated successfully!");
  } catch (error) {
    res.status(422).json({ message: "Failed to update drug", error });
  }
};


export const deleteDrug = async (req, res, next) => {
  try {
    const deleteDrug = await DrugModel.findById(req.params.id);
    if (!deleteDrug) {
      return res.status(404).json({ message: "drug not found" });
    }
    await DrugModel.findByIdAndDelete(req.params.id);
    res.status(200).json("drug deleted!");
  } catch (error) {
    res.status(422).json({ message: "Failed to delete drug", error });
  }
};
