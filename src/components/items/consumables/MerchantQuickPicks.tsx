import { Box, Button, Typography, Divider, Tooltip } from "@mui/material";

import type { PredefConsumable } from "@/types/items";

import rawConsumables from "@/config/consumables.json";

type PropsType = {
  addItem: (c: PredefConsumable) => void;
};

export function MerchantQuickPicks(props: PropsType) {
  const { addItem } = props;

  const consumables = rawConsumables as PredefConsumable[];
  const potions = consumables.filter((c) => c.type === "potion");
  const scrolls = consumables.filter((c) => c.type === "scroll");

  const getTooltip = (c: PredefConsumable) => {
    return (
      <Box>
        <Typography variant="caption">{c.cost} GP</Typography>
        <Divider />
        <Typography variant="caption">{c.description}</Typography>
      </Box>
    );
  };

  const consumableButton = (c: PredefConsumable, key: string) => {
    return (
      <Tooltip title={getTooltip(c)} key={key}>
        <Button
          size="small"
          variant="outlined"
          sx={{ width: "250px", flexShrink: 0 }}
          onClick={() => addItem(c)}
        >
          <Typography variant="caption">{c.name}</Typography>
        </Button>
      </Tooltip>
    );
  };
  const sectionStyle = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
    gap: "4px",
  };

  return (
    <Box>
      <Divider>Potions</Divider>
      <Box sx={sectionStyle}>
        {potions.map((c, index) => {
          return consumableButton(c, `potion-${index}`);
        })}
      </Box>
      <Divider>Scrolls</Divider>
      <Box sx={sectionStyle}>
        {scrolls.map((c, index) => {
          return consumableButton(c, `scroll-${index}`);
        })}
      </Box>
    </Box>
  );
}

export default MerchantQuickPicks;
