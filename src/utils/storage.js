export function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function readList(key) {
  const value = readJSON(key, []);
  return Array.isArray(value) ? value : [];
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
