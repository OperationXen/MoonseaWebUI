import type { AnyEvent } from "@/types/events";

export function getEventName(event: AnyEvent | undefined) {
  if (!event) return "Unknown event";
  if (event.event_type === "dt_freeform") return `${event.title}`;

  switch (event.event_type) {
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
    case "dt_bastion":
      return "Bastion turn";
  }
}
