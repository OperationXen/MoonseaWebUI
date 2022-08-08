import { useState } from "react";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useCharacterStore from "../../datastore/character";
import CreateMagicItem from "./CreateMagicItem";
import EmptyWindowWidget from "./widgets/EmptyWindowWidget";
import ItemWidget from "./ItemWidget";

export default function WindowMagicItems(props) {
  const { magicItems } = props;
  const [characterUUID, refreshData] = useCharacterStore((s) => [
    s.uuid,
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
        }}
      >
        {(magicItems &&
          magicItems.length &&
          magicItems.map((item) => {
            return <ItemWidget data={item} key={item.id} />;
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
        onCreate={() => refreshData()}
        characterUUID={characterUUID}
      />
    </Box>
  );
}
