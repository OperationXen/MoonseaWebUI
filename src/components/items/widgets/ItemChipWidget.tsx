import { Tooltip, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getRarityColour } from "../../../utils/items";

import type { Rarity } from "@/types/items";
import type { UUID } from "@/types/uuid";

type PropsType = {
  name: string;
  rarity: Rarity;
  uuid: UUID;
};

export default function ItemChipWidget(props: PropsType) {
  const { name, rarity, uuid } = props;
  const navigate = useNavigate();

  return (
    <Tooltip placement={"right"} title={`Equipped item: ${name} (${rarity})`}>
      <Chip
        label={name}
        onClick={() => {
          navigate(`/magicitem/${uuid}`);
        }}
        sx={{
          background: `${getRarityColour(rarity)}A5`,
          border: `1px solid ${getRarityColour(rarity)}`,
          color: "white",
          minWidth: "10em",
          maxWidth: "14em",
          cursor: "pointer",
        }}
      />
    </Tooltip>
  );
}