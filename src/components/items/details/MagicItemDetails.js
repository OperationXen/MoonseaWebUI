import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Container, Typography, Divider } from "@mui/material";

import { getMagicItemDetails } from "../../../api/items";
import MagicItemInformationPane from "./MagicItemInformationPane";

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
      <MagicItemInformationPane item={data} />
    </Container>
  );
}
