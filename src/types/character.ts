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

		gold: Number,
		downtime: Number,
		ac: Number,
		hp: Number,
		pp: Number,
		dc: Number,
		init: Number,
		vision: string,
		biography: string,
		dm_text: string

	}
