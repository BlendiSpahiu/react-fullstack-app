import { FieldError, UseFormRegister } from 'react-hook-form';
import { PostInputs } from '../../../interfaces/PostInputs.types';

export interface AddPostFormFieldsProps {
  isEditing?: boolean;
  register: UseFormRegister<PostInputs>;
  errors: {
    title?: FieldError | undefined;
    content?: FieldError | undefined;
    description?: FieldError | undefined;
  };
}
