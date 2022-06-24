import { CategoriesEnums } from '@enums';

export const getPostCategory = (category: string): string => {
  const { GAMING, PROGRAMMING, COOKING, FITNESS } = CategoriesEnums;

  if (category === PROGRAMMING) return 'bg-black text-green-400';
  if (category === GAMING) return 'bg-gray-700 text-white';
  if (category === COOKING) return 'bg-red-600 text-white';
  if (category === FITNESS) return 'bg-yellow-600 text-white';

  return '';
};
