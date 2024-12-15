import type { UUID } from "@/types/uuid";

export type Credentials = {
  username: string;
  password: string;
};

export type NewAccount = {
  username: string;
  email: string;
  discord_id: string;
  password: string;
};

export type UserStatus = {
  authenticated: boolean;
  username: string;
  email: string;
  discordID: string;
  dmUUID: UUID;
  dmHours: number;
};
