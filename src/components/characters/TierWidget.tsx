import { Avatar, Tooltip } from "@mui/material";

type PropsType = {
  level: number;
  sx?: object;
  className?: string;
};

export function TierWidget(props: PropsType) {
  const { level, className, sx } = props;

  const getText = () => {
    if (level >= 17) return "IV";
    if (level >= 11) return "III";
    if (level >= 5) return "II";
    if (level >= 1) return "I";
    return " ";
  };

  const getColor = () => {
    if (level >= 17) return "#FF8C00BB";
    if (level >= 11) return "#4B0082BB";
    if (level >= 5) return "#0000FFBB";
    if (level >= 1) return "#006400BB";
    return "#A9A9A9";
  };

  const getTooltip = () => {
    if (level >= 17) return "Tier 4";
    if (level >= 11) return "Tier 3";
    if (level >= 5) return "Tier 2";
    if (level >= 1) return "Tier 1";
    return "Unknown tier";
  };

  return (
    <Tooltip title={getTooltip()}>
      <Avatar className={className} sx={{ ...sx, background: getColor() }}>
        {getText()}
      </Avatar>
    </Tooltip>
  );
}

export default TierWidget;
