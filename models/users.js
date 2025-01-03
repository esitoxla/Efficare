import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female"], // Only allows "male" or "female"
      required: true,
    },
    health_conditions: {
      type: [String], // Defines an array of strings
      default: [], // Optional: Default to an empty array if not provided
    },
  },
  { timestamps: true }
);

export const UserModel = model ("user", userSchema)