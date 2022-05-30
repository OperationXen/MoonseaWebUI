import api from "./base";

export function getDMLogData(id) {
  return api.get(`/api/dm_log/${id}`);
}

export function updateDMLogData(id, serviceHours) {
  let url = `/api/dm_log/${id}`;
  let data = { hours: serviceHours };

  return api.patch(url, data);
}
