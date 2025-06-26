const formatTime = (date: Date | string | null) => {
  if (!date) return null;

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default formatTime;
