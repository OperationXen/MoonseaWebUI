import React from "react";

import { Avatar } from "@mui/material";

import { getRarityColour, getRarityText } from "../../../utils/itemutils";

export default function RarityWidget(props) {
  const { rarity } = props;

  return (
    <Avatar sx={{ bgcolor: getRarityColour(rarity), height: 32, width: 32 }}>
      {getRarityText(rarity).toUpperCase()[0]}
    </Avatar>
  );
}
