import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ItemWidget from "./widgets/ItemWidget";
import EmptyWindowWidget from "./widgets/EmptyWindowWidget";

import type { MagicItem } from "@/types/items";
import type { UUID } from "@/types/uuid";

type PropsType = {
  magicItems: MagicItem[];
  characterUUID: UUID;
  editable: boolean;
};

export default function WindowCommonItems(props: PropsType) {
  const { magicItems } = props;

  const displayItems = magicItems?.filter((i) => i.rarity === "common");

  return (
    <Box className="flex flex-col flex-grow">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row wrap",
          overflow: "auto",
          height: "15em",
        }}
      >
        {(displayItems?.length &&
          displayItems.map((item, index) => {
            return <ItemWidget item={item} key={`${index}-${item.uuid}`} />;
          })) || <EmptyWindowWidget message="No common items" />}
      </Box>
      <Box
        sx={{
          marginTop: "auto",
          borderTop: "1px solid black",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "0.4em",
        }}
      >
        <Button startIcon={<AddIcon />} variant="outlined" disabled>
          Add Common Item
        </Button>
      </Box>
    </Box>
  );
}
