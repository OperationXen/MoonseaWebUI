import api from "./base";
import userStore from "../datastore/user";

export function getUserDetails() {
  let url = "/auth/userdetails";
  return api.get(url);
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
