import { Nullable, PostTypes, PreviewContextProps } from '@interfaces';
import { createContext, ReactElement, ReactNode, useState } from 'react';

export const PreviewPostContext = createContext<PreviewContextProps>({
  previewedPost: null,
  setPreviewedPost: (_post: Nullable<PostTypes>) => null,
});

export const PreviewPostProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [previewedPost, setPreviewedPost] = useState<Nullable<PostTypes>>(null);

  return (
    <PreviewPostContext.Provider
      value={{
        previewedPost,
        setPreviewedPost,
      }}
    >
      {children}
    </PreviewPostContext.Provider>
  );
};
