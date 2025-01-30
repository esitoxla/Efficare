import { Schema, model } from "mongoose";

const efficacySchema = new Schema({
     drug: {
    type: Schema.Types.ObjectId,
    ref: "Drug", // Reference to the Drug model
    required: true,
  },
  average_efficacy_rate: {
    type: Number, // Average efficacy rate based on user feedback or trials
    min: 0,
    max: 100,
    default: 0,
  },
  total_users: {
    type: Number, // Total number of users who used the drug
    default: 0,
  },
  total_feedbacks: {
    type: Number, // Total number of feedback records logged
    default: 0,
  },
  positive_feedback_rate: {
    type: Number, // Percentage of positive feedback based on user responses
    min: 0,
    max: 100,
    default: 0,
  },
  reported_side_effects: {
    type: [String], // Aggregated list of common side effects reported
    default: [],
  },
}, { timestamps: true });

export const EfficacyModel = model ("efficacy", efficacySchema);