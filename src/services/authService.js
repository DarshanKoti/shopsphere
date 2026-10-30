const USERS_KEY = "shopsphere_users";
const SESSION_KEY = "shopsphere_session";

function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function startSession(user) {
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signup({ name, email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Email already registered");
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

  return startSession(newUser);
}

export function login({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = getUsers().find(
    (u) => u.email === normalizedEmail && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return startSession(user);
}

// Only the session goes; registered accounts stay in storage.
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}
