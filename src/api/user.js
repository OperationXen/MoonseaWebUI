import api from "./base";

export function updateDiscordID(discordID) {
  let url = "api/auth/user_details";
  let data = { discord_id: discordID };

  return api.patch(url, data);
}

export function updatePassword(oldPass, newPass1, newPass2) {
  let url = "api/auth/change_password";
  let data = { oldPass: oldPass, newPass1: newPass1, newPass2: newPass2 };

  return api.post(url, data);
}
