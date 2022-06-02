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
  let url = "/auth/userdetails";

  return api.get(url).catch((error) => {
    if (error.response.status === 403) clearUserData();
    return Promise.reject("User is not authorised");
  });
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
