import axios from "axios";

export function getUserDetails() {
  let url = `${process.env.PUBLIC_URL}/api/auth/userdetails`;
  axios.get();
}
