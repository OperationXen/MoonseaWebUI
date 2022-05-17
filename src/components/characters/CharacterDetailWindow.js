import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, Typography, Paper } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

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
        justifyContent: "space-around",
        verticalAlign: "center",
        height: "calc(100% - 0.7em)",
        padding: "0.5em",
      }}
    >
      <Paper
        elevation={8}
        style={{
          display: "flex column",
          flex: 0.98,
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <Card>Artwork</Card>
          <Card>Summary</Card>
        </div>

        <Typography>{data.name}</Typography>
      </Paper>
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexBasis: "content-min",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <TabContext value={itemTab}>
          <Tabs
            value={itemTab}
            onChange={(e, n) => setItemTab(n)}
            aria-label="item categories"
            centered
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
            }}
          >
            <Tab label="Magic Items" value={0} />
            <Tab label="Consumables" value={1} />
            <Tab label="Common Items" value={2} />
            <Tab label="Story Rewards" value={3} />
          </Tabs>
          <TabPanel value={0}>Magic items</TabPanel>
          <TabPanel value={1}>Consumables</TabPanel>
          <TabPanel value={2}>Common Items</TabPanel>
          <TabPanel value={3}>Story rewards</TabPanel>
        </TabContext>
      </Paper>
    </div>
  );
}
