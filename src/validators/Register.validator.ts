import Joi from 'joi';

export const RegisterFormSchema = (): Joi.ObjectSchema =>
  Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required()
      .trim()
      .label('Email')
      .messages({
        'string.email': 'Email must be valid',
        'string.empty': 'Email cannot be empty',
      }),
    name: Joi.string().trim().required().label('User Name').messages({
      'string.empty': 'Name cannot be empty!',
    }),
    password: Joi.string().required().min(8).label('Password').messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must at least 8 characters long',
    }),
  });
