export const replaceLineBreaks = (content: string): string => {
  return content.replace(/(?:\r\n|\r|\n)/g, '<br />');
};
