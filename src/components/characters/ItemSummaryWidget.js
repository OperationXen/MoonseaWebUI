import { Typography } from "@mui/material";

import { getRarityColour } from "../../utils/itemUtils";

export default function ItemSummaryWidget(props) {
  const { items } = props;

  const emptyList = () => {
    return (
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          margin: "20px",
          border: "4px dashed darkgrey",
          opacity: 0.5,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" sx={{ color: "darkgrey", margin: "auto" }}>
          No items equipped
        </Typography>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "9em", flexFlow: "column wrap" }}>
      {((!items || !items.length) && emptyList()) ||
        items.map((item) => {
          return (
            <Typography
              sx={{
                color: getRarityColour(item.rarity),
                fontWeight: "bold",
                opacity: 0.6,
              }}
            >
              {item.name}
            </Typography>
          );
        })}
    </div>
  );
}
