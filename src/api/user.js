import api from "./base";
import userStore from "../datastore/user";

function clearUserData() {
  userStore.setState({
    authenticated: false,
    username: "",
    email: "",
    discordID: "",
    dmUUID: "",
    dmHours: 0,
  });
}

// Checks the users' session and populates data store
export function getUserDetails() {
  let url = "/auth/user_details";

  return api.get(url).catch((error) => {
    if (error.response.status === 403) clearUserData();
    return Promise.reject("User is not authorised");
  });
}

export function updateDiscordID(discordID) {
  let url = "/auth/user_details";
  let data = { discord_id: discordID };

  return api.patch(url, data);
}

export function updatePassword(oldPass, newPass1, newPass2) {
  let url = "/auth/change_password";
  let data = { oldPass: oldPass, newPass1: newPass1, newPass2: newPass2 };

  return api.post(url, data);
}

// Logs the user in and updates the user information store
export async function doLogin(username, password) {
  let url = "/auth/login";
  let data = { username: username, password: password };

  return api.post(url, data).then((response) => {
    let dm_info = response.data.dm_info[0];

    userStore.setState({
      authenticated: true,
      username: response.data.username,
      email: response.data.email,
      discordID: response.data.discord_id,
      dmUUID: dm_info.uuid,
      dmHours: dm_info.hours,
    });
  });
}

// Create new account
export async function registerAccount(username, email, discord, password) {
  let url = "/auth/register";
  let data = {
    username: username,
    email: email,
    discord_id: discord,
    password: password,
  };

  return api.post(url, data);
}

// Log user out and clear user information
export async function doLogout() {
  let url = "/auth/logout";

  return api.post(url).then(() => {
    clearUserData();
  });
}

export async function requestPasswordReset(email) {
  let url = "/auth/requestpasswordreset";

  return api.post(url);
}
