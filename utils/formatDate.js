export const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  })
  return formattedDate
}
