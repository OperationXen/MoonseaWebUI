import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ItemWidget from "./widgets/ItemWidget";
import EmptyWindowWidget from "./widgets/EmptyWindowWidget";

export default function WindowCommonItems(props) {
  const { magicItems } = props;

  const displayItems = magicItems?.filter((i) => i.rarity === "common");

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
        }}
      >
        {(displayItems?.length &&
          displayItems.map((item, index) => {
            return <ItemWidget data={item} key={`${index}-${item.id}`} />;
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
