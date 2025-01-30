import Joi from "joi";

export const efficacyValidator = Joi.object({
  drug: Joi.string().required(), // Drug ID
  average_efficacy_rate: Joi.number().min(0).max(100).default(0), // Percentage between 0-100
  total_users: Joi.number().integer().min(0).default(0), // Count of users
  total_feedbacks: Joi.number().integer().min(0).default(0), // Count of feedbacks
  positive_feedback_rate: Joi.number().min(0).max(100).default(0), // Percentage between 0-100
  reported_side_effects: Joi.array().items(Joi.string()).default([]), // Side effects list
});