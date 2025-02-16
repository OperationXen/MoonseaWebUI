import { Chip, Typography } from "@mui/material";

import { GiCrossedAxes, GiFlangedMace, GiSickle } from "react-icons/gi";
import { GiCrossedSwords, GiSupersonicArrow } from "react-icons/gi";
import { GiBanjo, GiHolyHandGrenade, GiThrownDaggers } from "react-icons/gi";
import { GiMagicSwirl, GiPentacle } from "react-icons/gi";
import { GiGearHammer, GiBookCover } from "react-icons/gi";
import { FaYinYang } from "react-icons/fa";

import type { PlayerClass } from "@/types/character";

const getLevelText = (playerClass: PlayerClass) => {
  const { name, subclass, value } = playerClass;

  if (subclass)
    return <Typography>{`${name} (${subclass}) - ${value}`}</Typography>;
  else return <Typography>{`${name} - ${value}`}</Typography>;
};

const getClassColour = (playerClass: PlayerClass) => {
  let c = playerClass.name?.toLowerCase();
  if (c === "artificer") return "#887242";
  if (c === "barbarian") return "#d0725c";
  if (c === "bard") return "#b58cb6";
  if (c === "cleric") return "#abadae";
  if (c === "druid") return "#899454";
  if (c === "fighter") return "#613e32";
  if (c === "monk") return "#71b8d4";
  if (c === "paladin") return "#b9a662";
  if (c === "ranger") return "#5e8870";
  if (c === "rogue") return "#575851";
  if (c === "sorcerer") return "#df3b45";
  if (c === "warlock") return "#8151b2";
  if (c === "wizard") return "#4472bf";
};

const getClassIcon = (playerClass: PlayerClass) => {
  let c = playerClass.name?.toLowerCase();
  if (c === "artificer") return <GiGearHammer color="black" />;
  if (c === "barbarian") return <GiCrossedAxes color="black" />;
  if (c === "bard") return <GiBanjo color="black" />;
  if (c === "cleric") return <GiFlangedMace color="black" />;
  if (c === "druid") return <GiSickle color="black" />;
  if (c === "fighter") return <GiCrossedSwords color="black" />;
  if (c === "monk") return <FaYinYang color="black" />;
  if (c === "paladin") return <GiHolyHandGrenade color="black" />;
  if (c === "ranger") return <GiSupersonicArrow color="black" />;
  if (c === "rogue") return <GiThrownDaggers color="black" />;
  if (c === "sorcerer") return <GiMagicSwirl color="black" />;
  if (c === "warlock") return <GiPentacle color="black" />;
  if (c === "wizard") return <GiBookCover color="black" />;
};

type PropsType = {
  playerClass: PlayerClass;
  onClick: () => void;
};

export default function ClassChipWidget(props: PropsType) {
  const { playerClass } = props;

  return (
    <Chip
      label={getLevelText(playerClass)}
      icon={getClassIcon(playerClass)}
      onClick={props.onClick}
      sx={{
        margin: "0 0.4em",
        border: `1px solid ${getClassColour(playerClass)}`,
        background: `${getClassColour(playerClass)}60`,
      }}
    />
  );
}
