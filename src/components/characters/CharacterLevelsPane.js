import { Box, Chip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { GiCrossedAxes, GiFlangedMace, GiSickle } from "react-icons/gi";
import { GiCrossedSwords, GiSupersonicArrow } from "react-icons/gi";
import { GiBanjo, GiHolyHandGrenade, GiThrownDaggers } from "react-icons/gi";
import { GiMagicSwirl, GiPentacle, GiBookCover } from "react-icons/gi";
import { FaYinYang } from "react-icons/fa";

const getLevelText = (item) => {
  const { main, variant, count } = item;

  if (variant) return `${main} (${variant}) - ${count}`;
  else return `${main} - ${count}`;
};

const getClassColour = (main) => {
  let c = main.toLowerCase();
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

const getClassIcon = (main) => {
  let c = main.toLowerCase();
  if (c === "barbarian") return <GiCrossedAxes />;
  if (c === "bard") return <GiBanjo />;
  if (c === "cleric") return <GiFlangedMace />;
  if (c === "druid") return <GiSickle />;
  if (c === "fighter") return <GiCrossedSwords />;
  if (c === "monk") return <FaYinYang />;
  if (c === "paladin") return <GiHolyHandGrenade />;
  if (c === "ranger") return <GiSupersonicArrow />;
  if (c === "rogue") return <GiThrownDaggers />;
  if (c === "sorcerer") return <GiMagicSwirl />;
  if (c === "warlock") return <GiPentacle />;
  if (c === "wizard") return <GiBookCover />;
};

export default function CharacterLevelsPane(props) {
  const { data, setData } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.map((item) => {
        return (
          <Chip
            label={getLevelText(item)}
            onDelete={() => {}}
            icon={getClassIcon(item.main)}
            deleteIcon={<EditIcon />}
            sx={{
              margin: "0 0.4em",
              border: `1px solid ${getClassColour(item.main)}`,
              background: `${getClassColour(item.main)}60`,
            }}
          />
        );
      })}
    </Box>
  );
}
