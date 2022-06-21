import { Nullable, PostTypes, PreviewContextProps } from '@interfaces';
import { createContext, ReactElement, ReactNode, useState } from 'react';

export const PreviewPostContext = createContext<PreviewContextProps>({
  previewedPost: null,
  setPreviedPost: () => null,
});

export const PreviewPostProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [previewedPost, setPreviedPost] = useState<Nullable<PostTypes>>(null);

  return (
    <PreviewPostContext.Provider
      value={{
        previewedPost,
        setPreviedPost,
      }}
    >
      {children}
    </PreviewPostContext.Provider>
  );
};
