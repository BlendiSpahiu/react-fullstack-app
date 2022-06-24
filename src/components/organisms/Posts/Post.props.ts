import { ChangeEvent } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FileInputChangeEvent } from 'upload-js';
import { PostFieldsFragment } from '../../../graphql/gen/graphql';
import { PostInputs } from '../../../interfaces/PostInputs.types';

export interface AddPostFormFieldsProps {
  post: PostFieldsFragment | null;
  selected: string;
  filteredCategory: string;
  handleAddCategory: (value: string) => void;
  handleSearchCategory: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  register: UseFormRegister<PostInputs>;
  onChange: (file: FileInputChangeEvent) => void;
  errors: {
    title?: FieldError | undefined;
    content?: FieldError | undefined;
    description?: FieldError | undefined;
  };
}

export interface PostItemProps {
  post: PostFieldsFragment | null;
  handleSetModal: (id: number) => void;
  handleEditPost: (id: number) => void;
}
