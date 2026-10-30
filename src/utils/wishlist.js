import { readList, writeJSON } from "./storage";

const WISHLIST_KEY = "wishlist";

function getWishlistKey(userId) {
  if (!userId) return null;
  return `${WISHLIST_KEY}_${userId}`;
}

export function getWishlist(userId) {
  const key = getWishlistKey(userId);

  if (!key) return [];

  return readList(key);
}

function saveWishlist(items, userId) {
  const key = getWishlistKey(userId);

  if (!key) return;

  writeJSON(key, items);
  window.dispatchEvent(new Event("wishlistUpdated"));
}

export function toggleWishlist(product, userId) {
  if (!userId) return;

  const wishlist = getWishlist(userId);

  if (wishlist.some((item) => item.id === product.id)) {
    saveWishlist(
      wishlist.filter((item) => item.id !== product.id),
      userId,
    );
  } else {
    saveWishlist([...wishlist, product], userId);
  }
}

export function removeFromWishlist(id, userId) {
  if (!userId) return;

  saveWishlist(
    getWishlist(userId).filter((item) => item.id !== id),
    userId,
  );
}
