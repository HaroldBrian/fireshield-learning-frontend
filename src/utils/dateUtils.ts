import dayjs from "dayjs";

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};

export const formatDateShort = (date: string | Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const calculateDurationDays = (startDate: string | Date, endDate: string | Date): number => {
  return dayjs(endDate).diff(dayjs(startDate), "day");
};