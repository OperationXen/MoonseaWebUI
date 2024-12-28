import { MagicItem } from "./items";
import type { UUID } from "./uuid";

export type EventType =
  | "game"
  | "dm_reward"
  | "dt_sbookupd"
  | "dt_mtrade"
  | "dt_catchingup";
export type ItemEventType = "trade" | "manual" | "edit" | "game" | "dm_reward";
export type AnyEvent = CharacterEvent & GameEvent;

export type CharacterEvent = {
  uuid: UUID;
  character_uuid: UUID;
  event_type: EventType;
  datetime: Date | null;
  details: string;
  name?: string;
  gold_change: number;
  source: string;
};

export type GameEvent = {
  uuid: UUID;
  character_uuid: UUID;
  event_type: EventType;
  datetime: Date | null;
  name: string;

  dm_name: string;
  module: string;
  location: string;
  downtime: number;
  gold: number;
  levels: number;
  items: Partial<MagicItem>[];
  details: string;
};

export type ItemEvent = {
  uuid: UUID;
  datetime: string;
  event_type: ItemEventType;
  name: string;
  character_name: string;
  details: string;
  recipient_name?: string;
  exchanged_item?: string;
  dm_name?: string;
};
