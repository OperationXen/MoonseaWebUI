import { useState } from "react";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useCharacterStore from "../../datastore/character";
import CreateMagicItem from "./CreateMagicItem";
import EmptyWindowWidget from "./widgets/EmptyWindowWidget";
import ItemWidget from "./ItemWidget";

export default function WindowMagicItems(props) {
  const { magicItems } = props;
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
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          overflow: "auto",
          height: "15em",
        }}
      >
        {(magicItems &&
          magicItems.length &&
          magicItems.map((item) => {
            if (!item.market) return <ItemWidget data={item} key={item.id} />;
            else return null;
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
        onCreate={() => refreshData()}
        characterUUID={characterUUID}
      />
    </Box>
  );
}
