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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([
    { uuid: 1, datetime: "asdfasdfasdfsdf" },
  ]);

  useEffect(() => {
    getMagicItemDetails(uuid)
      .then((response) => {
        setData(response.data);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <Typography variant="h4" marginLeft="0.4em">
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
        <Stack>
          <MagicItemInformationPane item={data} />
          <MagicItemImagePane item={data} />
          <MagicItemControlPane item={data} />
        </Stack>
        <Stack>
          <MagicItemHistoryPane events={events} />
        </Stack>
      </Box>
    </Container>
  );
}
