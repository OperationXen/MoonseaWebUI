import { useEffect, useState } from "react";

import { Typography, Box } from "@mui/material";

import ItemChipWidget from "./widgets/ItemChipWidget";

import type { MagicItem } from "@/types/items";

type PropsType = {
  items: MagicItem[];
};

export default function ItemSummaryWidget(props: PropsType) {
  const { items } = props;

  const [equipped, setEquipped] = useState<MagicItem[]>([]);

  useEffect(() => {
    let temp = items.filter((item) => item.equipped && item.rarity !== "common");
    setEquipped(temp);
  }, [items, setEquipped]);

  if (!equipped)
    return (
      <Box
        style={{
          display: "flex",
          flexGrow: 1,
          margin: "15px",
          border: "4px dashed darkgrey",
          opacity: 0.5,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ color: "darkgrey", margin: "auto" }}>
          No items equipped
        </Typography>
      </Box>
    );

  return (
    <Box
      style={{
        display: "flex",
        minHeight: "9em",
        flexFlow: "column wrap",
        gap: "0.2em",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {equipped.map((item) => {
        return <ItemChipWidget uuid={item.uuid} name={item.name} rarity={item.rarity} key={item.uuid} />;
      })}
    </Box>
  );
}
