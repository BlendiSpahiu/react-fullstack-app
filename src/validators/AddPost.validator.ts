import Joi from 'joi';

export const AddPostFormSchema = (): Joi.ObjectSchema =>
  Joi.object({
    title: Joi.string().trim().required().label('Title').messages({
      'string.empty': 'Title cannot be empty!',
    }),
    description: Joi.string().trim().optional().label('Description').allow(''),
    content: Joi.string().trim().required().label('Content').messages({
      'string.empty': 'Content cannot be empty',
    }),
  });
