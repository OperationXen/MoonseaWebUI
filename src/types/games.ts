import type { Character } from "./character";
import type { GameEvent } from "./events";

export type CharacterGames = {
  character: Character;
  games: GameEvent[];
};
