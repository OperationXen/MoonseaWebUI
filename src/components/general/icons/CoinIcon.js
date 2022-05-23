import { Icon } from "@mui/material";
import iconData from "./coins.svg";

export default function CoinIcon(props) {
  return (
    <Icon>
      <img src={iconData} height={20} width={20} />
    </Icon>
  );
}
