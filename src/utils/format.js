export function shortTitle(title) {
  return title.length > 22 ? `${title.slice(0, 20)}...` : title;
}

export function formatCategory(category) {
  return typeof category === "string" ? category.replace(/-/g, " ") : "";
}

export function formatDate(date, fallback = "Not available") {
  if (!date) return fallback;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return fallback;

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
