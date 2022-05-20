import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import { getCharacterDetails } from "../../api/character";
import CharacterDetails from "./CharacterDetails";
import CharacterBiographyPane from "./CharacterBiographyPane";
import EventHistory from "../events/EventHistory";
import ItemSidebar from "../items/ItemSidebar";

export default function CharacterDetailWindow(props) {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getCharacterDetails(id).then((response) => {
      setData(response.data);
    });
  }, [id]);

  return (
    <Grid
      container
      style={{
        height: "calc(100% - 2.5em)",
        padding: "0.5em",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <CharacterDetails characterData={data} />
        <CharacterBiographyPane />
      </Grid>
      <Grid item xs={5}>
        <EventHistory characterID={data.id} />
      </Grid>
      <Grid item xs={3} sx={{ paddingLeft: "0.4em", display: "flex" }}>
        <ItemSidebar itemData={data} />
      </Grid>
    </Grid>
  );
}
