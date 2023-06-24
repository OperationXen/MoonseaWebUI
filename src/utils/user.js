export function validatePassword(pass) {
  if (pass && pass.length > 8) return true;
  return false;
}

export function checkDiscordID(discordID) {
  if (!discordID) return false;

  let retval = !!discordID.match(/^[\w ]+\w$/);
  return retval;
}
