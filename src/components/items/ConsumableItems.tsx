import { useState } from "react";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useConsumables } from "@/data/fetch/items/consumables";

import EmptyWindowWidget from "./widgets/EmptyWindowWidget";
import ConsumableItemWidget from "./widgets/ConsumableItemWidget";
import ConsumableDialog from "./ConsumableDialog";

import type { UUID } from "@/types/uuid";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export default function ConsumableItems(props: PropsType) {
  const { characterUUID, editable } = props;

  const {
    data: consumableItems,
    updateConsumable,
    deleteConsumable,
  } = useConsumables(characterUUID);

  const [createOpen, setCreateOpen] = useState(false);

  return (
    <Box className="flex flex-col flex-grow">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row wrap",
          overflow: "auto",
          height: "15em",
          gap: "4px",
          padding: "2px",
        }}
      >
        {(consumableItems &&
          consumableItems.length &&
          consumableItems.map((item, index) => (
            <ConsumableItemWidget
              item={item}
              key={`${index}-${item.uuid}`}
              updateItem={updateConsumable}
              deleteItem={deleteConsumable}
            />
          ))) || <EmptyWindowWidget message="No consumables" />}
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
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => setCreateOpen(true)}
          disabled={!editable}
        >
          Add Consumable
        </Button>
      </Box>
      <ConsumableDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        characterUUID={characterUUID}
      />
    </Box>
  );
}
