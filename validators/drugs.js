import Joi from "joi";

export const addDrugValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string()
    .valid("tablet", "capsule", "syrup", "injection", "cream", "other")
    .required(),
  dosage: Joi.string().required(),
  approved_date: Joi.date(),
  efficacy_rate: Joi.number().required(),
  trials: Joi.number(),
  reported_effectiveness: Joi.string()
    .valid("High", "Moderate", "Low", "Unknown")
    .default("Low"),
  side_effects: Joi.string().default(""),
  notes: Joi.string(),
  interactions: Joi.string(),
});


export const updateDrugValidator = Joi.object({
  name: Joi.string(),
  type: Joi.string()
    .valid("tablet", "capsule", "syrup", "injection", "cream", "other"),
  dosage: Joi.string(),
  approved_date: Joi.date(),
  efficacy_rate: Joi.number(),
  trials: Joi.number(),
  reported_effectiveness: Joi.string()
    .valid("High", "Moderate", "Low", "Unknown")
    .default("medium"),
  side_effects: Joi.string().default(""),
  notes: Joi.string(),
  interactions: Joi.string(),
});
