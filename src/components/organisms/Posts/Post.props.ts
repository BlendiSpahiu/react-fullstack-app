import { FieldError, UseFormRegister } from 'react-hook-form';
import { PostInputs } from '../../../interfaces/PostInputs';

export interface AddPostFormFieldsProps {
  isEditing?: boolean;
  register: UseFormRegister<PostInputs>;
  errors: {
    title?: FieldError | undefined;
    content?: FieldError | undefined;
    authorName?: FieldError | undefined;
    authorEmail?: FieldError | undefined;
  };
}
