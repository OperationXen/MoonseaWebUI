import { useState } from "react";

import { Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import CreateMagicItem from "./CreateMagicItem";
import ItemWidget from "./ItemWidget";

export default function MagicItemList(props) {
  const { magicItems } = props;
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
      }}
    >
      {magicItems &&
        magicItems.map((item) => {
          return <ItemWidget data={item} key={item.id} />;
        })}
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
          Add Item
        </Button>
      </Box>
      <CreateMagicItem open={createOpen} onClose={() => setCreateOpen(false)} />
    </Box>
  );
}
