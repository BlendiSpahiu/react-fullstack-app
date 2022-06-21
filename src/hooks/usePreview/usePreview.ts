import { PreviewPostContext } from '@contexts';
import { useContext } from 'react';

export const usePreview = () => {
  return useContext(PreviewPostContext);
};
