export function getDateString(datetime) {
  let isoString = datetime.toISOString();

  return isoString.slice(0, 10);
}

// Comparison function for class sort by level
function levelCompare(a, b) {
  if (a.value > b.value) return -1;
  if (b.value > a.value) return 1;
  return 0;
}

export function getCharClassShort(classes) {
  let classStrings = [];
  if (!classes) return "";
  // sort so highest class first
  classes.sort(levelCompare);
  // construct an array of strings, and then join them with formatting characters
  classes.map((item) => {
    if (item.name) classStrings.push(`${item.name} (${item.value})`);
    return null;
  });
  return classStrings.join(" / ");
}
