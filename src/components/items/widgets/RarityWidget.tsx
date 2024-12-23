import React from "react";

import { Avatar, Typography } from "@mui/material";

import { getRarityColour, getRarityText } from "../../../utils/items";

import type { Rarity } from "@/types/items";

type PropsType = {
  rarity: Rarity;
  text?: boolean;
};

export default function RarityWidget(props: PropsType) {
  const { rarity, text = false } = props;

  if (text) {
    return (
      <Typography color={getRarityColour(rarity)}>
        {getRarityText(rarity)}
      </Typography>
    );
  } else
    return (
      <Avatar sx={{ bgcolor: getRarityColour(rarity), height: 32, width: 32 }}>
        {getRarityText(rarity).toUpperCase()[0]}
      </Avatar>
    );
}
