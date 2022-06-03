import Joi from 'joi';

export const PersonaInformationSchema = (): Joi.ObjectSchema =>
  Joi.object({
    name: Joi.string().required().label('Username').messages({
      'string.empty': 'Username cannot be empty!',
    }),
  });
