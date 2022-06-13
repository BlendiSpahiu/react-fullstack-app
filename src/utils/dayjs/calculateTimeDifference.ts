import dayjs, { Dayjs } from 'dayjs';

export const calculateTimeDifference = (
  createdAt: string | Date | Dayjs,
  updatedAt: string | Date | Dayjs
) => {
  // time difference in minutes
  const timeDifference = dayjs(createdAt).diff(updatedAt, 'minutes');

  return timeDifference === 0 ? false : timeDifference;
};
