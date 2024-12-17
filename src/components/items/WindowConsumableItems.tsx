import { useState } from "react";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useCharacterStore from "@/datastore/character";
import EmptyWindowWidget from "./widgets/EmptyWindowWidget";
import ConsumableItemWidget from "./widgets/ConsumableItemWidget";
import ConsumableDialog from "./ConsumableDialog";
import type { Consumable } from "@/types/items";

type PropsType = {
  consumableItems: Consumable[];
};

export default function WindowConsumableItems(props: PropsType) {
  const { consumableItems } = props;

  const [characterUUID, editable, refreshData] = useCharacterStore((s) => [
    s.uuid,
    s.editable,
    s.requestRefresh,
  ]);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
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
            <ConsumableItemWidget item={item} key={`${index}-${item.uuid}`} />
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
        onCreate={() => refreshData()}
      />
    </Box>
  );
}
