import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Container, Stack } from "@mui/material";
import { Typography, Divider } from "@mui/material";

import { getMagicItemDetails } from "../../../api/items";
import MagicItemInformationPane from "./MagicItemInformationPane";
import MagicItemControlPane from "./MagicItemControlsPane";
import MagicItemHistoryPane from "./MagicItemHistoryPane";
import MagicItemImagePane from "./MagicItemImagePane";

export default function MagicItemDetails(props) {
  const { uuid } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    getMagicItemDetails(uuid).then((response) => {
      setData(response.data);
    });
  }, [uuid]);

  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Item Details
      </Typography>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0.4em",
          justifyContent: "center",
          gap: "0.4em",
        }}
      >
        <Stack
          sx={{
            flexGrow: 1,
            alignItems: "center",
            border: "1px solid black",
            borderRadius: "8px",
          }}
        >
          <MagicItemInformationPane item={data} />
          <MagicItemImagePane item={data} />
          <MagicItemControlPane uuid={uuid} />
        </Stack>
        <Stack sx={{ flexGrow: 1, minHeight: "30em" }}>
          <MagicItemHistoryPane uuid={uuid} />
        </Stack>
      </Box>
    </Container>
  );
}
