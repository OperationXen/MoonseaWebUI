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
    userStore.setState({
      userID: response.data.userID,
      dmID: response.data.dmID,
      username: response.data.username,
    });
  });
}
