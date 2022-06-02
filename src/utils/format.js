export function getDateString(datetime) {
  let isoString = datetime.toISOString();

  return isoString.slice(0, 10);
}
