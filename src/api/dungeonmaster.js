import axios from "axios";

export function getDMLogData(id) {
  return axios.get(`${process.env.PUBLIC_URL}/api/dm_log/${id}`);
}
