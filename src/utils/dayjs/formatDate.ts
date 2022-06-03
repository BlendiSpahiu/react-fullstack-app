import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date: string | Date | Dayjs): string => {
  return dayjs(date).format('DD.MM.YYYY');
};
