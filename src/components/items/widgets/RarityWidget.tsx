import React from "react";

import { Avatar, Typography } from "@mui/material";

import { getRarityColour, getRarityText } from "../../../utils/items";

import type { Rarity } from "@/types/items";

type PropsType = {
  rarity: Rarity;
  text?: boolean;
  size?: "small" | "medium";
};

export default function RarityWidget(props: PropsType) {
  const { rarity, text = false, size = "medium" } = props;

  const getAvatar = (val: Rarity) => {
    switch (val) {
      case "legendary":
        return "L";
      case "veryrare":
        return "V";
      case "rare":
        return "R";
      case "uncommon":
        return "U";
      case "common":
        return "C";
      default:
        return "-";
    }
  };

  if (text) {
    return (
      <Typography
        color={getRarityColour(rarity)}
        fontSize={size === "medium" ? 14 : 8}
      >
        {getRarityText(rarity)}
      </Typography>
    );
  } else
    return (
      <Avatar
        sx={{
          bgcolor: getRarityColour(rarity),
          height: size === "medium" ? 32 : 26,
          width: size === "medium" ? 32 : 26,
        }}
      >
        {getAvatar(rarity)}
      </Avatar>
    );
}
