import Joi from 'joi';

export const ChangePasswordSchema = (): Joi.ObjectSchema =>
  Joi.object({
    newPassword: Joi.string().required().min(8).label('New Password').messages({
      'string.empty': 'Password cannot be empty!',
      'string.min': 'Password must at least 8 characters long!',
    }),
    repeatNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .label('Repeat New Password')
      .messages({
        'string.empty': 'Password must not be empty',
        'any.only': "Passwords don't match!",
      }),
  });
