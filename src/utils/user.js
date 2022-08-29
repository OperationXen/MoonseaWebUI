export function validatePassword(pass) {
  if (pass && pass.length > 8) return true;
  return false;
}

export function checkDiscordID(discordID) {
  if (!discordID) return false;

  let retval = !!discordID.match(/^[a-zA-Z]+#[0-9]{4}$/);
  return retval;
}
