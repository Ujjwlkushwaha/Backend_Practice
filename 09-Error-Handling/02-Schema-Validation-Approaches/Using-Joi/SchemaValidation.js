let Joi = require("joi"); // package for validate schema

// 📌📌 Define your schema to JOi and Joi will automatically validate your schema
module.exports =  Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password : Joi.string().min(8).required(),
    confirmPassword : Joi.string().min(8).required()
})