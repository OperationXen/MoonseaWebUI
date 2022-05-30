import axios from "axios";

export function getDMLogData(id) {
  return axios.get(`${process.env.PUBLIC_URL}/api/dm_log/${id}`);
}

export function updateDMLogData(id, serviceHours) {
  let url = `${process.env.PUBLIC_URL}/api/dm_log/${id}`;
  let data = { hours: serviceHours };

  return axios.patch(url, data);
}
