import { readList, writeJSON } from "./storage";

const CART_KEY = "cart";

function getUserCartKey(userId) {
  if (!userId) return null;
  return `${CART_KEY}_${userId}`;
}

export function getCart(userId) {
  const key = getUserCartKey(userId);

  if (!key) return [];

  return readList(key);
}

export function saveCart(items, userId) {
  const key = getUserCartKey(userId);

  if (!key) return;

  writeJSON(key, items);
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(product, quantity = 1, userId) {
  const cart = getCart(userId);

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart, userId);
}

export function countCartItems(cart) {
  return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

export const SHIPPING_FEE = 10;
export const FREE_SHIPPING_FROM = 100;

export function getTotals(cart) {
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;

  return { subtotal, shipping, total: subtotal + shipping };
}
