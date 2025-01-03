import Joi from "joi";

export const addUserValidator = Joi.object({
  fullname: Joi.string().required(),
  age: Joi.number().integer().min(0).max(120),
  gender: Joi.string().valid("male", "female").required(),
  health_conditions: Joi.array().items(Joi.string()),
});


export const updateUserValidator = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0).max(120),
  gender: Joi.string().valid("male", "female"),
  health_conditions: Joi.array().items(Joi.string()),
});