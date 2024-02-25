export function validatePassword(pass) {
  if (pass && pass.length > 8) return true;
  return false;
}

export function checkDiscordID(discordID) {
  if (!discordID) return false;

  let retval = !!discordID.match(/^(?=.{2,32}$)(?!(?:everyone|here)$)\.?[a-z0-9_]+(?:\.[a-z0-9_]+)*\.?$/);
  return retval;
}
