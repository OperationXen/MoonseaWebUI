import { Icon } from "@mui/material";
import iconData from "./coins.svg";

export default function CoinIcon(props) {
  return (
    <Icon>
      <img src={iconData} alt="A pile of coins" height={20} width={20} />
    </Icon>
  );
}
