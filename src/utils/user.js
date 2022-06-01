export function validatePassword(pass) {
  if (pass && pass.length > 12) return true;
  return false;
}
