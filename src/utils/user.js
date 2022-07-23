export function validatePassword(pass) {
  if (pass && pass.length > 8) return true;
  return false;
}
