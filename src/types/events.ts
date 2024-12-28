import type { UUID } from "./uuid";

export type EventType =
  | "game"
  | "dm_reward"
  | "dt_sbookupd"
  | "dt_mtrade"
  | "dt_catchingup";
export type ItemEventType = "trade" | "manual" | "edit" | "game" | "dm_reward";

export type CharacterEvent = {
  uuid: UUID;
  character_uuid: UUID;
  event_type: EventType;
  datetime: Date;
  details: string;
  name?: string;

  module?: string;
  downtime?: number;
  gold?: number;
  gold_change: number;
  source: string;
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
