import { GiScrollUnfurled } from "react-icons/gi";
import { GiEnergyArrow } from "react-icons/gi";
import { GiLockedChest } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { GiPotionBall } from "react-icons/gi";

import { Box, Typography } from "@mui/material";

import type { ConsumableType } from "@/types/items";

type PropsType = {
  type: ConsumableType;
};

export function ConsumableTypeWidget(props: PropsType) {
  const { type } = props;

  const getIcon = () => {
    switch (type) {
      case "ammo":
        return <GiEnergyArrow />;
      case "gear":
        return <GiChestArmor />;
      case "potion":
        return <GiPotionBall />;
      case "scroll":
        return <GiScrollUnfurled />;
      default:
        return <GiLockedChest />;
    }
  };

  return (
    <Box className="flex items-center h-full w-full gap-2">
      {getIcon()}
      <Typography>{type.toUpperCase()[0] + type.substring(1)}</Typography>
    </Box>
  );
}
