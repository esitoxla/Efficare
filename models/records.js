import { Schema, model } from "mongoose";

const recordSchema = new Schema ({
    user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  drug: {
    type: Schema.Types.ObjectId,
    ref: "Drug", // Reference to the Drug model
    required: true,
  },
  start_date: {
    type: Date,
    required: true, // Date when the user started taking the drug
  },
  end_date: {
    type: Date, // Optional: Date when the user stopped taking the drug
  },
  feedback: {
    type: String, // User's feedback about the drug's effectiveness
  },
  side_effects_reported: {
    type: [String], // List of side effects the user experienced
    default: [],
  },
  dosage_taken: {
    type: String, // User-reported dosage (e.g., "500mg twice daily")
  },
}, { timestamps: true }
);

export const RecordModel = model ("record", recordSchema)
