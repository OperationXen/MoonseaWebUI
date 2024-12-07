export type PlayerClass = {
	level: number;
	name: string;
	subclass: string;
}


export type Character = {
    uuid: string,
		name: string,
		editable: boolean,
		items?: any[],
		consumables?: any[],

		artwork: string,
		token: string,
		sheet: string

		season: number,
		race: string,
		level: number,
		classes: any[],

		gold: number,
		downtime: number,
		ac: number,
		hp: number,
		pp: number,
		dc: number,
		init: number,
		vision: string,
		biography: string,
		dm_text: string

	}
