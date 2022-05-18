import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, Typography, Paper } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import { getCharacterDetails } from "../../api/character";
import CharacterDetails from "./CharacterDetails";

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
      <CharacterDetails characterData={data} />
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexBasis: "fit-content",
          flexDirection: "column"
        }}
      >
        <TabContext value={itemTab}>
          <Tabs
            value={itemTab}
            onChange={(e, n) => setItemTab(n)}
            aria-label="item categories"
            sx={{
              padding: "0 0.4em",
              borderBottom: "1px solid black",
            }}
          >
            <Tab label="Magic Items" value={0} />
            <Tab label="Consumables" value={1} />
            <Tab label="Common" value={2} />
          </Tabs>
          <TabPanel value={0}>Magic items</TabPanel>
          <TabPanel value={1}>Consumables</TabPanel>
          <TabPanel value={2}>Common items</TabPanel>
        </TabContext>
      </Paper>
    </div>
  );
}
