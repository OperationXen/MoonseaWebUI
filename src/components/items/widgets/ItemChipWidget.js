import { Tooltip, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getRarityColour } from "../../../utils/itemUtils";

export default function ItemChipWidget(props) {
  const { name, rarity, uuid } = props.item;
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
