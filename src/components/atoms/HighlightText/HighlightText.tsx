import { ReactElement } from 'react';

export const HighlightText = (
  text: string,
  highlight: string | (string | null)[] | null
): ReactElement => {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight?.toString().toLowerCase() ? (
          <mark className="bg-yellow-100" key={`${part}-${i}`}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};
