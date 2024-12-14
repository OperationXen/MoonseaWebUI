import type { UUID } from "@/types/uuid";

export type UserStatus = {
  authenticated: boolean;
  username: string;
  email: string;
  discordID: string;
  dmUUID: UUID;
  dmHours: number;
};
