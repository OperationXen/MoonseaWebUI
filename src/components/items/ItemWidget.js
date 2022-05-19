import { useState } from "react";
import { Card } from "@mui/material";

import { getRarityColour } from "../../utils/itemUtils";

export default function ItemWidget(props) {
  const { id, name, rarity } = props.data;
  const [equipped, setEquipped] = useState(props.data.equipped);
  const colour = getRarityColour(rarity);

  const handleClick = () => {
    setEquipped(!!!equipped);
  };

  return (
    <Card
      sx={{
        height: "3em",
        margin: "0.2em",
        border: `2px solid ${colour}`,
        background: `${colour}${equipped ? 60 : 20}`,
      }}
      onClick={handleClick}
    >
      {name}
    </Card>
  );
}
