import api from "./base";

export function getUserDetails() {
  let url = "/api/auth/userdetails";
  return api.get(url);
}

export function doLogin(username, password) {
  let url = "/api/auth/login";
  let data = { username: username, password: password };

  return api.post(url, data);
}
