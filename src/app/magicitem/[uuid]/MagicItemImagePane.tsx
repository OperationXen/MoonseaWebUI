import React from "react";

import Image from "next/image";
import { Box } from "@mui/material";

import type { MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem | null;
};

const defaultImage = "/media/images/chest-mimic.png";

export default function MagicItemImagePane(props: PropsType) {
  const { item } = props;

  if (!item) return null;

  return (
    <Box sx={{ width: "100%", textAlign: "center", padding: "0.4em" }}>
      <Image src={defaultImage} alt="Magic item image" />
    </Box>
  );
}
