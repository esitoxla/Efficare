import Joi from "joi";

export const addRecordValidator = Joi.object({
  user: Joi.string().required(), // User ID should be a string (ObjectId)
  drug: Joi.string().required(), // Drug ID should be a string (ObjectId)
  start_date: Joi.date().required(), // Start date is required
  end_date: Joi.date().greater(Joi.ref("start_date")).optional(), // End date must be after start date
  feedback: Joi.string().optional(), // Feedback is optional
  side_effects_reported: Joi.array().items(Joi.string()).optional(), // Array of strings
  dosage_taken: Joi.string().optional(), // Example: "500mg twice daily"
});

export const updateRecordValidator = Joi.object({
  start_date: Joi.date().optional(),
  end_date: Joi.date().greater(Joi.ref("start_date")).optional(),
  feedback: Joi.string().optional(),
  side_effects_reported: Joi.array().items(Joi.string()).optional(),
  dosage_taken: Joi.string().optional(),
});
