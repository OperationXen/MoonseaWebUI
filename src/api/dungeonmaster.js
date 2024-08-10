import api from "./base";

export function getDMLogData(id) {
  return api.get(`/api/data/dm_log/${id}/`);
}

export function updateDMLogData(id, serviceHours) {
  let url = `/api/data/dm_log/${id}/`;
  let data = { hours: serviceHours };

  return api.patch(url, data);
}
