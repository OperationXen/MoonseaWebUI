import { useState } from "react";

import { Paper, Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import MagicItemList from "./MagicItemList";

export default function ItemPane(props) {
  const { itemData } = props;
  const [itemTab, setItemTab] = useState("magicitems");

  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        maxHeight: "28em",
      }}
    >
      <TabContext value={itemTab}>
        <Tabs
          value={itemTab}
          onChange={(e, n) => setItemTab(n)}
          aria-label="item categories"
          centered
          sx={{
            padding: "0 0.2em",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <Tab label="Magic Items" value={"magicitems"} />
          <Tab label="Consumables" value={"consumables"} />
          <Tab label="Common" value={"commonitems"} />
        </Tabs>
        <TabPanel
          value={"magicitems"}
          sx={{ display: "flex", flexGrow: 1, padding: 0 }}
        >
          <MagicItemList magicItems={itemData} />
        </TabPanel>
        <TabPanel value={"consumables"}>Consumables</TabPanel>
        <TabPanel value={"commonitems"}>Common items</TabPanel>
      </TabContext>
    </Paper>
  );
}
