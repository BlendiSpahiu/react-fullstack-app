import dayjs, { Dayjs } from 'dayjs';

export const formatDateExtended = (date: string | Date | Dayjs): string => {
  return dayjs(date).format('DD.MM.YYYY HH:MM');
};
