import type { AnyEvent, EventType } from "@/types/events";

// Get human readable event type information
export function getEventTypeName(event: EventType): string {
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

export function getEventName(event: AnyEvent | undefined) {
  if (!event) return "Unknown event";
  if (event.name) return event.name;

  return getEventTypeName(event.event_type);
}
