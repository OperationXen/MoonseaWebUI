import { useState } from "react";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CreateMagicItem from "./CreateMagicItem";
import EmptyWindowWidget from "./widgets/EmptyWindowWidget";
import ItemWidget from "./widgets/ItemWidget";

import type { MagicItem } from "@/types/items";
import type { UUID } from "@/types/uuid";

type PropsType = {
  characterUUID: UUID;
  magicItems: MagicItem[];
  editable: boolean;
};

export default function WindowMagicItems(props: PropsType) {
  const { magicItems, characterUUID, editable } = props;

  const [createOpen, setCreateOpen] = useState(false);

  const displayItems = magicItems?.filter(
    (i) => i.rarity !== "common" && !i.market,
  );

  return (
    <Box className="flex flex-col flex-grow">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          overflow: "auto",
          alignItems: "center",
        }}
      >
        {(displayItems?.length &&
          displayItems.map((item, index) => {
            return <ItemWidget item={item} key={`${index}-${item.uuid}`} />;
          })) || <EmptyWindowWidget message="No magic items" />}
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
        <Button
          disabled={!editable}
          startIcon={<AddIcon />}
          onClick={() => {
            setCreateOpen(true);
          }}
          variant="outlined"
        >
          Add Magic Item
        </Button>
      </Box>
      <CreateMagicItem
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        characterUUID={characterUUID}
      />
    </Box>
  );
}
