export const formatLocalDate = (dateString) => {
  return new Date(Number(dateString)).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatISODate = (timestamp) => {
  return new Date(Number(timestamp)).toISOString();
};
