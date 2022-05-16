import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, Typography, Tabs, Tab, Paper } from "@mui/material";

import { getCharacterDetails } from "../../api/character";

export default function CharacterDetailWindow(props) {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [itemTab, setItemTab] = useState(0);

  useEffect(() => {
    getCharacterDetails(id).then((response) => {
      setData(response.data);
    });
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        border: "2px solid black",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 0.62,
          border: "1px solid red",
        }}
      >
        <Card>Artwork</Card>
        <Card>Token</Card>
        <Typography>{data.name}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flex: 0.35,
          border: "1px solid blue",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Tabs
          value={itemTab}
          onChange={(e) => setItemTab(e.target.value)}
          aria-label="item categories"
          centered
        >
          <Tab label="Magic Items" />
          <Tab label="Consumables" />
          <Tab label="Common Items" />
          <Tab label="Story Rewards" />
        </Tabs>
        <Paper elevation={8} sx={{ display: "flex", flexGrow: 2 }}>
          g
        </Paper>
      </div>
    </div>
  );
}
