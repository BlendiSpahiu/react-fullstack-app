import Joi from 'joi';
import { validateMethod } from '../utils/file';

export const AddPostFormSchema = (): Joi.ObjectSchema =>
  Joi.object({
    title: Joi.string().trim().required().label('Title').messages({
      'string.empty': 'Title cannot be empty!',
    }),
    description: Joi.string().trim().optional().label('Description').allow(''),
    content: Joi.string().trim().required().label('Content').messages({
      'string.empty': 'Content cannot be empty',
    }),
    image: Joi.alternatives()
      .try(
        Joi.custom(
          (value, helpers) =>
            validateMethod(
              value,
              10,
              ['image/png', 'image/jpg', 'image/jpeg'],
              helpers
            ),
          'file-validate'
        )
      )
      .messages({
        'any.fileSize': 'File size must be 10MB or less',
        'any.fileType': 'Supported file types are JPG, PNG or JEPG',
      }),
  });
