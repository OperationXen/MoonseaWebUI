import type { EventType } from "@/types/events";
import type { ItemOrigin } from "@/types/items";
import type { PlayerClass } from "@/types/character";

export function getDateString(datetime: Date) {
  let dateString: string = "";

  if (datetime instanceof Date) {
    try {
      dateString = datetime.toISOString();
    } catch (e) {
      return "";
    }
  }
  dateString = dateString.slice(0, 10);
  dateString = dateString.replaceAll("-", " / ");
  return dateString;
}

// Comparison function for class sort by level
function levelCompare(a: PlayerClass, b: PlayerClass) {
  if (a.level > b.level) return -1;
  if (b.level > a.level) return 1;
  return 0;
}

export function getCharClassShort(classes: PlayerClass[]) {
  let classStrings: string[] = [];
  if (!classes) return "";
  // sort so highest class first
  classes.sort(levelCompare);
  // construct an array of strings, and then join them with formatting characters
  classes.map((item) => {
    if (item.name) classStrings.push(`${item.name} (${item.level})`);
    return null;
  });
  return classStrings.join(" / ");
}

export function getSourceText(source: ItemOrigin|undefined): string {
  if (source === undefined) return "Unknown";

  if (source === "game") return "Found on adventure";
  else if (source === "dm_reward") return "DM Reward";
  else if (source === "trade") return "Trade";
  else if (source === "manual") return "Manually added";
  else return "Divine intervention";
}

// Get human readable event type information
export function getEventName(event: EventType): string {
  switch (event) {
    case "game":
      return "Game played";
    case "dm_reward":
      return "DM reward";
    case "dt_sbookupd":
      return "Spellbook update";
    case "dt_mtrade":
      return "Merchant visit";
    case "dt_catchingup":
      return "Catching up";
    default:
      return "Unknown event";
  }
}
