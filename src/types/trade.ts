import type { UUID } from "./uuid";
import type { MagicItem } from "./items";

export type Advert = {
	uuid: UUID;
	name: string;
	description: string;
	offers: any;
	item: MagicItem
}