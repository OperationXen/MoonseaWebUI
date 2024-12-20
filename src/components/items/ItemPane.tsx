import { useState } from "react";

import { Paper, Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import WindowMagicItems from "./WindowMagicItems";
import WindowCommonItems from "./WindowCommonItems";
import ConsumableItems from "./ConsumableItems";

import type { Character } from "@/types/character";

type PropsType = {
  data: Character;
};

export function ItemPane(props: PropsType) {
  const { data: character } = props;

  const [itemTab, setItemTab] = useState("magicitems");

  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TabContext value={itemTab}>
        <Tabs
          value={itemTab}
          onChange={(_e, n) => setItemTab(n)}
          aria-label="item categories"
          centered
          sx={{
            padding: "0 0.2em",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <Tab label="Magic Items" value={"magicitems"} />
          <Tab label="Common Items" value={"commonitems"} />
          <Tab label="Consumables" value={"consumables"} />
        </Tabs>

        <TabPanel value="magicitems" sx={{ flexGrow: 1, padding: 0 }}>
          <WindowMagicItems
            magicItems={character?.items}
            characterUUID={character.uuid}
            editable={character.editable}
          />
        </TabPanel>
        <TabPanel value="consumables" sx={{ flexGrow: 1, padding: 0 }}>
          <ConsumableItems
            characterUUID={character.uuid}
            editable={character.editable}
          />
        </TabPanel>
        <TabPanel value="commonitems" sx={{ flexGrow: 1, padding: 0 }}>
          <WindowCommonItems
            magicItems={character?.items}
            characterUUID={character.uuid}
            editable={character.editable}
          />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

export default ItemPane;
