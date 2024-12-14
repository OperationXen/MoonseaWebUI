import type { UUID } from "./uuid"

export type EventType = "game" | "dm_reward" | "dt_sbookupd" | "dt_mtrade" | "dt_catchingup"

export type CharacterEvent = {
    uuid: UUID;
    event_type: EventType;
    datetime: Date;
    details: string
    name?: string;

    module?: string;
    downtime?: number;
    gold?: number;
    gold_change: number;
    source: string;
}