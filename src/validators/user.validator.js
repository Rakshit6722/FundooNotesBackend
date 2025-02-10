import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),

    email: Joi.string()
      .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      .required()
      .messages({ "string.pattern.base": "Email must be a valid Gmail address" }),

    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),

    password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})'))
      .required()
      .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one special character, and must be at least 8 characters long"
      }),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ 
      code: 400,
      message: error.message
    });
  }

  req.validatedBody = value;
  next();
};
