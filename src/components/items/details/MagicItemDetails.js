import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Container, Typography, Divider } from "@mui/material";
import { Stack } from "@mui/material";

import { getMagicItemDetails } from "../../../api/items";

export default function MagicItemDetails(props) {
  const { uuid } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getMagicItemDetails(uuid)
      .then((response) => {
        setData(response.data);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  return (
    <Container>
      <Typography variant="h4" marginLeft="0.4em">
        Item Details
      </Typography>
      <Divider variant="middle" />
      <Stack
        sx={{
          gap: "0.2em",
        }}
      >
        <Typography>Item name: {data.name}</Typography>

        <Typography>Current Owner: {data.owner}</Typography>
        <Typography>Description: {data.description}</Typography>
        <Typography>Flavour Text: {data.flavour}</Typography>
        <Typography>Rarity: {data.rarity}</Typography>
        <Typography>Attunement Required: {data.attunement}</Typography>
        <Typography>Currently Equipped: {data.equipped}</Typography>
      </Stack>
    </Container>
  );
}
