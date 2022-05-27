import Joi from 'joi';

export const AddPostFormSchema = (): Joi.ObjectSchema =>
  Joi.object({
    title: Joi.string().trim().required().label('Title').messages({
      'string.empty': 'Title cannot be empty!',
    }),
    content: Joi.string().trim().required().label('Content').messages({
      'string.empty': 'Content cannot be empty',
    }),
    authorName: Joi.string().trim().required().label('Author Name').messages({
      'string.empty': 'Author Name cannot be empty!',
    }),
    authorEmail: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .trim()
      .label('Author Email')
      .allow(''),
  });
