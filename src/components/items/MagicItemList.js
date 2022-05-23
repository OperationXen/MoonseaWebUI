import { Box } from "@mui/material";

import ItemWidget from "./ItemWidget";

export default function MagicItemList(props) {
  const { magicItems } = props;

  if (!magicItems) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {magicItems.map((item) => {
        return <ItemWidget data={item} key={item.id} />;
      })}
    </Box>
  );
}
