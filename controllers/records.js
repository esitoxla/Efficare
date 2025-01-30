import { RecordModel } from "../models/records.js";
import {
  addRecordValidator,
  updateRecordValidator,
} from "../validators/records.js";

export const addRecord = async (req, res, next) => {
  try {
    //add record validator
    const { error, value } = addRecordValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    //connect to datadase
    const record = new RecordModel({
      ...value,
      user: req.auth?.id,
    });
    //save new data
    await record.save();
    res.status(200).json("Record added successfully!");
  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req, res, next) => {
  try {
    //get data details by id from database
    const record = await RecordModel.findById(req.params.id);
    //if record does not exist
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

export const getAllRecords = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 50, skip = 0 } = req.query;

    const records = await RecordModel.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    res.status(200).json(records);
  } catch (error) {
    res.status(422).json({ message: "Failed to fetch records", error });
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const { error, value } = updateRecordValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details });
    }
    const updatedRecord = await RecordModel.findByIdAndUpdate(
      { _id: req.params.id },
      value,
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json("Record updated successfully!");
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    const deleteRecord = await RecordModel.findById(req.params.id);
    if (!deleteRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    await RecordModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Record deleted!");
  } catch (error) {
    res.status(422).json({ message: "Failed to delete record", error });
  }
};
