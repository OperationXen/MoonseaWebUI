import { MagicItem } from "./items";
import type { UUID } from "./uuid";

export type EventType =
  | "game"
  | "dm_reward"
  | "dt_freeform"
  | "dt_sbookupd"
  | "dt_mtrade"
  | "dt_catchingup"
  | "dt_bastion";
export type ItemEventType = "trade" | "manual" | "edit" | "game" | "dm_reward";

export type CharacterEvent = {
  uuid: UUID;
  character_uuid: UUID;
  event_type: EventType;
  datetime: Date;
  editable: boolean;
};

export type FreeFormEvent = CharacterEvent & {
  title: string;
  details: string;
  gold_change: number;
  downtime_change: number;
  auto_apply?: boolean;
};

export type SpellBookUpdateEvent = CharacterEvent & {
  gold_change: number;
  dm_name: string;
  downtime: number;
  source: string;
  spellsText: string;
};

export type PartyMember = {
  name: string;
  uuid: UUID;
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
  notes: string;
  characters?: PartyMember[];
};

export type AnyEvent = GameEvent &
  FreeFormEvent &
  MundaneTradeEvent &
  SpellBookUpdateEvent;

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
  module?: string;
};

export type DMEventType = "game" | "dm_reward";

export type DMRewardEvent = {
  uuid: UUID;
  event_type: DMEventType;
  datetime: string;

  dm: string;
  name: string;
  gold: number;
  downtime: number;
  hours: number;
  character_level_assigned: number;
  character_items_assigned: number;
};
export type DMGameEvent = {
  uuid: UUID;
  event_type: DMEventType;
  datetime: string;

  name: string;
  dm_name: string;
  notes: string;
  hours: number;
  hours_notes: string;
  module: string;
  location: string;
  downtime: number;
  gold: number;
  levels: number;
  items: Partial<MagicItem>[];
  details: string;
  characters?: Array<number>;
};

export type DMEvent = DMGameEvent | DMRewardEvent;
