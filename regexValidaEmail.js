export function isEmailValid(email) {
  return !!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
