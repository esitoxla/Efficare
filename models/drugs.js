import { Schema, model } from "mongoose";

const drugSchema = new Schema({
  name: {
    type: String,
    required: true, // The name of the drug is mandatory
  },

  type: {
    type: String,
    enum: ["tablet", "capsule", "syrup", "injection", "cream", "other"], // Drug type categories
    required: true,
  },

  dosage: {
    type: String, // Example: "500mg", "2 pills daily"
    required: true,
  },

  approved_date: {
    type: Date,
    default: Date.now, // Defaults to the current date if not provided
  },

  efficacy_rate: {
    type: Number,
    min: 0,
    max: 100, // Representing efficacy percentage (e.g., 85%)
    required: true,
  },

  trials: {
    type: Number,
    default: 0, // Number of trials conducted for efficacy tracking
  },

  reported_effectiveness: {
    type: String, // Qualitative assessment (e.g., "High", "Moderate", "Low")
    enum: ["High", "Moderate", "Low", "Unknown"],
    default: "Low",
  },

  side_effects: {
    type: [String], // List of common side effects
    default: [], // Defaults to an empty array
  },

  interactions: {
    type: [String], // List of known drug interactions
    default: [], // Defaults to an empty array
  },
  
  notes: {
    type: String, // Additional notes about the drug
  },
});

export const DrugModel = model ("drug", drugSchema);
