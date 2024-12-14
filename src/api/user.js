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

// Create new account
export async function registerAccount(username, email, discord, password) {
  let url = "api/auth/register";
  let data = {
    username: username,
    email: email,
    discord_id: discord,
    password: password,
  };

  return api.post(url, data);
}

export async function requestPasswordReset(email) {
  let url = "api/auth/forgot_password";

  return api.post(url, { email: email });
}

export async function doPasswordReset(userID, token, password) {
  let url = "api/auth/password_reset";

  return api.post(url, { user_id: userID, token: token, password: password });
}
