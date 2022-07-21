import { useEffect, useState } from "react";

import { Typography, Box } from "@mui/material";

import ItemChipWidget from "./widgets/ItemChipWidget";

export default function ItemSummaryWidget(props) {
  const { items } = props;

  const [equipped, setEquipped] = useState([]);

  useEffect(() => {
    let temp = items.filter((item) => item.equipped);
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
        return <ItemChipWidget item={item} key={item.uuid} />;
      })}
    </Box>
  );
}
