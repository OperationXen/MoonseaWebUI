import { MagicItem } from "./items";
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
  datetime: Date | null;
};

export type CatchingUpEvent = CharacterEvent & {
  details: string;
};

export type SpellBookUpdateEvent = CharacterEvent & {
  gold_change: number;
  dm_name: string;
  downtime: number;
  source: string;
  spellsText: string;
};

export type MundaneTradeEvent = CharacterEvent & {
  gold_change: number;
  sold?: string;
  purchased?: string;
};

export type GameEvent = CharacterEvent & {
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

export type AnyEvent = GameEvent &
  MundaneTradeEvent &
  SpellBookUpdateEvent &
  CatchingUpEvent;

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
